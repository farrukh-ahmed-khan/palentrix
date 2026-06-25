"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CTABanner } from "@/components/site/CTABanner";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { StaggerGroup, fadeUp } from "@/components/site/Reveal";

const filters = ["All", "SaaS", "Mobile", "Automation", "Web"] as const;
type Filter = (typeof filters)[number];

const cases = [
  {
    slug: "saas-rebuild",
    tag: "SaaS",
    metric: "-42% build time",
    title: "Rebuilt a production SaaS from broken foundations",
    desc: "Inherited a codebase with security holes and no test coverage. Delivered a stable, scalable platform in 6 weeks.",
  },
  {
    slug: "ops-automation",
    tag: "Automation",
    metric: "+60% efficiency",
    title: "Automated a 3-person manual workflow into a single pipeline",
    desc: "Document processing pipeline that replaced spreadsheets and email chains with a real system.",
  },
  {
    slug: "mobile-marketplace",
    tag: "Mobile",
    metric: "4.8 rating",
    title: "Cross-platform marketplace app, iOS and Android in one codebase",
    desc: "React Native build with offline-first sync. Shipped to both stores in 10 weeks.",
  },
  {
    slug: "web-platform",
    tag: "Web",
    metric: "<100ms TTFB",
    title: "Edge-rendered content platform handling 200k visitors/day",
    desc: "Migration from monolith to edge-served Next.js. Halved hosting costs in the process.",
  },
  {
    slug: "billing-engine",
    tag: "SaaS",
    metric: "$0 chargebacks",
    title: "Stripe billing engine with usage-based pricing and tax",
    desc: "Subscriptions, metered billing, invoicing, and tax compliance built into a production product.",
  },
  {
    slug: "etl-pipeline",
    tag: "Automation",
    metric: "30 min sync",
    title: "ETL pipeline syncing 14 data sources into a single warehouse",
    desc: "Replaced fragile glue scripts with a typed, observable pipeline.",
  },
];

export function WorkPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = cases.filter((item) => filter === "All" || item.tag === filter);

  return (
    <PageShell>
      <PageHero
        label="Selected Work"
        title="Proof in Real Outcomes."
        subtitle="A sample of products we have shipped: SaaS platforms, mobile apps, web systems, and automation pipelines."
      />

      <section className="rb-section pb-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-wrap gap-2 mb-12">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-4 py-2 rounded-full text-[13px] font-mono uppercase tracking-wider border transition-colors ${
                  filter === item
                    ? "bg-indigo text-white border-indigo"
                    : "border-[var(--border-color)] text-muted hover:text-ink hover:border-indigo/40"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <StaggerGroup className="grid gap-6 md:grid-cols-2">
            {visible.map((item) => (
              <motion.div
                key={item.slug}
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: "rgba(50,200,255,0.35)" }}
                transition={{ duration: 0.2 }}
                className="rb-card bg-slate rounded-2xl p-10 border group"
                style={{ borderColor: "var(--border-color)" }}
              >
                <Link href="/work" className="block">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-indigo border border-indigo/30 bg-indigo/5 rounded-full px-3 py-1">
                      {item.tag}
                    </span>
                    <span className="font-display font-bold text-2xl md:text-3xl text-indigo">
                      {item.metric}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display font-bold text-[22px] leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-muted text-[15px] leading-[1.7] font-light">
                    {item.desc}
                  </p>
                  <div className="mt-8 inline-flex items-center gap-2 text-indigo text-[14px] font-medium">
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
