"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { CTABanner } from "@/components/site/CTABanner";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { StaggerGroup, fadeUp } from "@/components/site/Reveal";
import { caseStudies } from "@/lib/case-studies";

type Filter = "All" | (typeof caseStudies)[number]["category"];

export function WorkPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const filters = useMemo<Filter[]>(
    () => ["All", ...Array.from(new Set(caseStudies.map((item) => item.category)))],
    [],
  );
  const visible = useMemo(
    () => caseStudies.filter((item) => filter === "All" || item.category === filter),
    [filter],
  );

  return (
    <PageShell>
      <PageHero
        label="Selected Work"
        title="Case Studies with Real Product Context."
        subtitle="Detailed examples of SaaS platforms, AI products, healthcare portals, and commerce systems Palentrix has shipped."
      />

      <section className="rb-section pb-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-12 flex flex-wrap gap-2" role="tablist" aria-label="Filter case studies">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                onClick={() => setFilter(item)}
                className={`rounded-full border px-4 py-2 font-mono text-[13px] uppercase tracking-wider transition-colors ${
                  filter === item
                    ? "border-indigo bg-indigo text-white"
                    : "border-[var(--border-color)] text-muted hover:border-indigo/40 hover:text-ink"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <StaggerGroup key={filter} className="grid gap-6 md:grid-cols-2">
            {visible.map((item) => (
              <motion.div
                key={item.slug}
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: "rgba(67,180,255,0.35)" }}
                transition={{ duration: 0.2 }}
                className="rb-card group rounded-2xl border bg-slate p-8"
                style={{ borderColor: "var(--border-color)" }}
              >
                <Link href={`/work/${item.slug}`} className="block">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="rounded-full border border-indigo/30 bg-indigo/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-indigo">
                      {item.category}
                    </span>
                    <span className="text-[13px] text-muted">{item.client}</span>
                  </div>
                  <h2 className="mt-7 font-display text-[22px] font-bold leading-snug tracking-normal">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-[15px] font-light leading-[1.7] text-muted">
                    {item.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.stack.slice(0, 5).map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-indigo/15 bg-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-indigo">
                    Read case study
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CTABanner />
    </PageShell>
  );
}
