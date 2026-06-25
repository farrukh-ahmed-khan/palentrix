import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/pages/BlogIndexPage";
import { getBlogPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SaaS, MVP, AI & Full Stack Development Blog",
  description:
    "Practical guides on SaaS development, MVP launches, AI automation, full stack development, Next.js SEO, and custom web apps.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "SaaS, MVP, AI & Full Stack Development Blog - Palentrix",
    description:
      "Actionable software development guides for founders and businesses planning SaaS products, MVPs, AI automations, and custom web apps.",
    url: "/blog",
  },
};

export default async function Page() {
  const posts = await getBlogPosts();
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Palentrix Blog",
    url: absoluteUrl("/blog"),
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: absoluteUrl(`/blog/${post.slug}`),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogIndexPage posts={posts} />
    </>
  );
}
