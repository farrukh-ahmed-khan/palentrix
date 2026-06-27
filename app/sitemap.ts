import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";
import { seoPages } from "@/lib/seo-pages";
import { caseStudies } from "@/lib/case-studies";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const staticRoutes = [
    "",
    "/services",
    "/work",
    "/process",
    "/about",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms",
    ...seoPages.map((page) => `/${page.slug}`),
    ...caseStudies.map((study) => `/work/${study.slug}`),
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route || "/"),
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
