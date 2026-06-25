import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Collection } from "mongodb";
import { getMongoDb, isMongoConfigured } from "./mongodb";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  readTime: string;
  tag: string;
  author: string;
  body: string;
  published: boolean;
};

export type BlogPostInput = Omit<BlogPost, "dateLabel">;

type BlogPostDocument = BlogPostInput & {
  createdAt: Date;
  updatedAt: Date;
};

const blogDirectory = path.join(process.cwd(), "content", "blog");
const blogCollectionName = process.env.MONGODB_BLOG_COLLECTION || "blog_posts";
let blogIndexPromise: Promise<string> | null = null;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function getDateLabel(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(parsed);
}

async function ensureBlogDirectory() {
  await fs.mkdir(blogDirectory, { recursive: true });
}

function postPath(slug: string) {
  return path.join(blogDirectory, `${slugify(slug)}.md`);
}

function normalizePost(slug: string, data: Record<string, unknown>, body: string): BlogPost {
  const date =
    typeof data.date === "string" && data.date.trim()
      ? data.date
      : new Date().toISOString().slice(0, 10);

  return {
    slug,
    title: typeof data.title === "string" ? data.title : "Untitled post",
    excerpt: typeof data.excerpt === "string" ? data.excerpt : body.slice(0, 150),
    date,
    dateLabel: getDateLabel(date),
    readTime: typeof data.readTime === "string" ? data.readTime : "5 min read",
    tag: typeof data.tag === "string" ? data.tag : "Insights",
    author: typeof data.author === "string" ? data.author : "Palentrix",
    published: data.published !== false,
    body,
  };
}

function normalizeInput(input: BlogPostInput): BlogPostInput {
  const slug = slugify(input.slug || input.title);
  if (!slug) throw new Error("A slug or title is required.");

  return {
    slug,
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    date: input.date || new Date().toISOString().slice(0, 10),
    readTime: input.readTime.trim() || "5 min read",
    tag: input.tag.trim() || "Insights",
    author: input.author.trim() || "Palentrix",
    body: input.body.trim(),
    published: input.published,
  };
}

function fromMongoDocument(doc: BlogPostDocument): BlogPost {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.date,
    dateLabel: getDateLabel(doc.date),
    readTime: doc.readTime,
    tag: doc.tag,
    author: doc.author,
    body: doc.body,
    published: doc.published,
  };
}

async function getBlogCollection(): Promise<Collection<BlogPostDocument>> {
  const db = await getMongoDb();
  const collection = db.collection<BlogPostDocument>(blogCollectionName);

  blogIndexPromise ??= collection.createIndex({ slug: 1 }, { unique: true });
  await blogIndexPromise;

  return collection;
}

async function getMongoBlogPosts({ includeDrafts = false } = {}) {
  const collection = await getBlogCollection();
  const query = includeDrafts ? {} : { published: true };
  const posts = await collection.find(query).sort({ date: -1 }).toArray();

  return posts.map(fromMongoDocument);
}

async function getMongoBlogPost(slug: string, { includeDrafts = false } = {}) {
  const collection = await getBlogCollection();
  const query = includeDrafts
    ? { slug: slugify(slug) }
    : { slug: slugify(slug), published: true };
  const post = await collection.findOne(query);

  return post ? fromMongoDocument(post) : null;
}

export async function getBlogPosts({ includeDrafts = false } = {}) {
  if (isMongoConfigured()) {
    return getMongoBlogPosts({ includeDrafts });
  }

  await ensureBlogDirectory();
  const files = await fs.readdir(blogDirectory);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, "");
        const raw = await fs.readFile(path.join(blogDirectory, file), "utf8");
        const parsed = matter(raw);
        return normalizePost(slug, parsed.data, parsed.content.trim());
      }),
  );

  return posts
    .filter((post) => includeDrafts || post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string, { includeDrafts = false } = {}) {
  if (isMongoConfigured()) {
    return getMongoBlogPost(slug, { includeDrafts });
  }

  const posts = await getBlogPosts({ includeDrafts });
  return posts.find((post) => post.slug === slugify(slug)) ?? null;
}

export async function saveBlogPost(input: BlogPostInput) {
  const postInput = normalizeInput(input);

  if (isMongoConfigured()) {
    const collection = await getBlogCollection();
    const now = new Date();

    await collection.updateOne(
      { slug: postInput.slug },
      {
        $set: {
          ...postInput,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true },
    );

    return getMongoBlogPost(postInput.slug, { includeDrafts: true });
  }

  await ensureBlogDirectory();

  const file = matter.stringify(postInput.body + "\n", {
    title: postInput.title,
    excerpt: postInput.excerpt,
    date: postInput.date,
    readTime: postInput.readTime,
    tag: postInput.tag,
    author: postInput.author,
    published: postInput.published,
  });

  await fs.writeFile(postPath(postInput.slug), file, "utf8");
  return getBlogPost(postInput.slug, { includeDrafts: true });
}

export async function deleteBlogPost(slug: string) {
  if (isMongoConfigured()) {
    const collection = await getBlogCollection();
    await collection.deleteOne({ slug: slugify(slug) });
    return;
  }

  await fs.unlink(postPath(slugify(slug)));
}
