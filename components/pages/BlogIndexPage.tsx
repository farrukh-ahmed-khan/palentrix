"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { CTABanner } from "@/components/site/CTABanner";
import { StaggerGroup, fadeUp } from "@/components/site/Reveal";
import type { BlogPost } from "@/lib/blog";

export function BlogIndexPage({ posts }: { posts: BlogPost[] }) {
  return (
    <PageShell>
      <PageHero
        label="Field Notes"
        title="SaaS, MVP, AI and Full Stack Development Guides."
        subtitle="Practical articles for founders and businesses planning SaaS products, MVP launches, AI automations, custom web apps, and SEO-ready software."
      />

      <section className="rb-section pt-16 pb-28 md:pt-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <StaggerGroup className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <motion.article
                key={post.slug}
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: "rgba(67,180,255,0.35)" }}
                transition={{ duration: 0.2 }}
                className="rb-card bg-slate rounded-2xl border group"
                style={{ borderColor: "var(--border-color)" }}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full overflow-hidden rounded-2xl">
                  {post.imageUrl && (
                    <div className="aspect-[16/9] overflow-hidden border-b border-[var(--border-color)] bg-void">
                      <img
                        src={post.imageUrl}
                        alt={post.imageAlt || post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="p-10">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-indigo border border-indigo/30 bg-indigo/5 rounded-full px-3 py-1">
                        {post.tag}
                      </span>
                      <span className="font-mono text-[11px] text-muted">{post.dateLabel}</span>
                      <span className="font-mono text-[11px] text-muted">- {post.readTime}</span>
                    </div>
                    <h2 className="mt-6 font-display font-bold text-[24px] leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-4 text-muted text-[15px] leading-[1.7]">{post.excerpt}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-indigo text-[14px] font-medium">
                      Read article
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CTABanner />
    </PageShell>
  );
}
