import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";
import { MongoClient } from "mongodb";

async function loadEnvFile(fileName) {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), fileName), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
      if (!match) continue;

      const [, key, value] = match;
      process.env[key] ??= value.replace(/^["']|["']$/g, "");
    }
  } catch {
    // Missing env files are fine; deployed environments usually provide real vars.
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

await loadEnvFile(".env.local");
await loadEnvFile(".env");

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is required to import blog posts.");
}

const dbName = process.env.MONGODB_DB || "palentrix";
const collectionName = process.env.MONGODB_BLOG_COLLECTION || "blog_posts";
const blogDirectory = path.join(process.cwd(), "content", "blog");

const client = new MongoClient(uri);
await client.connect();

try {
  const collection = client.db(dbName).collection(collectionName);
  await collection.createIndex({ slug: 1 }, { unique: true });

  const files = await fs.readdir(blogDirectory);
  let imported = 0;

  for (const file of files.filter((name) => name.endsWith(".md"))) {
    const raw = await fs.readFile(path.join(blogDirectory, file), "utf8");
    const parsed = matter(raw);
    const slug = slugify(file.replace(/\.md$/, ""));
    const now = new Date();

    await collection.updateOne(
      { slug },
      {
        $set: {
          slug,
          title: String(parsed.data.title || "Untitled post").trim(),
          excerpt: String(parsed.data.excerpt || parsed.content.slice(0, 150)).trim(),
          date:
            typeof parsed.data.date === "string" && parsed.data.date.trim()
              ? parsed.data.date
              : now.toISOString().slice(0, 10),
          readTime: String(parsed.data.readTime || "5 min read").trim(),
          tag: String(parsed.data.tag || "Insights").trim(),
          author: String(parsed.data.author || "Palentrix").trim(),
          body: parsed.content.trim(),
          published: parsed.data.published !== false,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true },
    );

    imported += 1;
  }

  console.log(`Imported ${imported} blog post(s) into ${dbName}.${collectionName}.`);
} finally {
  await client.close();
}
