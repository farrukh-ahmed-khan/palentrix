import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

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

const blogDirectory = path.join(process.cwd(), "content", "blog");

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

export async function getBlogPosts({ includeDrafts = false } = {}) {
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
  const posts = await getBlogPosts({ includeDrafts });
  return posts.find((post) => post.slug === slugify(slug)) ?? null;
}

export async function saveBlogPost(input: BlogPostInput) {
  await ensureBlogDirectory();
  const slug = slugify(input.slug || input.title);
  if (!slug) throw new Error("A slug or title is required.");

  const file = matter.stringify(input.body.trim() + "\n", {
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    date: input.date,
    readTime: input.readTime.trim() || "5 min read",
    tag: input.tag.trim() || "Insights",
    author: input.author.trim() || "Palentrix",
    published: input.published,
  });

  await fs.writeFile(postPath(slug), file, "utf8");
  return getBlogPost(slug, { includeDrafts: true });
}

export async function deleteBlogPost(slug: string) {
  await fs.unlink(postPath(slugify(slug)));
}
