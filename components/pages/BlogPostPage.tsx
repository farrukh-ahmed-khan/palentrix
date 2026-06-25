"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { CTABanner } from "@/components/site/CTABanner";
import { BlogBody } from "@/components/site/BlogBody";
import type { BlogPost } from "@/lib/blog";

export function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <PageShell>
      <article className="rb-section pt-32 pb-24">
        <div className="mx-auto max-w-[860px] px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-indigo hover:text-violet transition-colors"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>

          <div className="mt-10 flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-indigo border border-indigo/30 bg-indigo/5 rounded-full px-3 py-1">
              {post.tag}
            </span>
            <span className="font-mono text-[11px] text-muted">{post.dateLabel}</span>
            <span className="font-mono text-[11px] text-muted">- {post.readTime}</span>
          </div>

          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.08] tracking-normal">
            {post.title}
          </h1>
          <p className="mt-6 text-muted text-[18px] leading-[1.8]">{post.excerpt}</p>
          <div className="mt-6 font-mono text-[12px] uppercase tracking-[0.16em] text-indigo">
            Written by {post.author}
          </div>

          <div className="mt-12 rb-card rounded-2xl border border-[var(--border-color)] bg-slate p-7 md:p-10">
            <BlogBody body={post.body} />
          </div>
        </div>
      </article>

      <CTABanner />
    </PageShell>
  );
}
