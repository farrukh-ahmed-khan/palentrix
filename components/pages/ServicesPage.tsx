"use client";

import { motion } from "framer-motion";
import { Check, Layers, Smartphone, Zap, type LucideIcon } from "lucide-react";
import { CTABanner } from "@/components/site/CTABanner";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, StaggerGroup, fadeUp } from "@/components/site/Reveal";

type Block = {
  Icon: LucideIcon;
  title: string;
  problem: string;
  includes: string[];
  stack: string[];
  audience: string;
};

const blocks: Block[] = [
  {
    Icon: Layers,
    title: "SaaS & MVP Development",
    problem:
      "You have a product idea or a half-finished SaaS that needs to become a real, revenue-generating system. We take it from spec to production.",
    includes: [
      "Authentication, billing, dashboards",
      "Multi-tenant architecture",
      "Stripe and subscription logic",
      "CI/CD and monitoring",
      "Production-grade API design",
    ],
    stack: ["Next.js", "NestJS", "Supabase", "PostgreSQL", "Stripe", "Vercel"],
    audience: "Founders shipping MVPs, startups raising on traction, and SMBs replacing legacy SaaS.",
  },
  {
    Icon: Smartphone,
    title: "Web & Mobile Apps",
    problem:
      "You need a polished app across web, iOS, and Android that performs under real load and feels like a native experience.",
    includes: [
      "Responsive web platforms",
      "React Native iOS and Android",
      "Design system and UI architecture",
      "Offline-first patterns",
      "App Store and Play Store submission",
    ],
    stack: ["React", "React Native", "Node.js", "Tailwind", "AWS", "Expo"],
    audience: "Consumer apps, internal tools, marketplaces, and customer-facing platforms.",
  },
  {
    Icon: Zap,
    title: "Automation & Workflows",
    problem:
      "Your team is doing manual work that software should handle: spreadsheets, email chains, and copy-paste between tools.",
    includes: [
      "End-to-end workflow automation",
      "REST and webhook integrations",
      "Scheduled jobs and queues",
      "Data pipelines and ETL",
      "Internal admin dashboards",
    ],
    stack: ["Python", "Node.js", "PostgreSQL", "REST APIs", "Webhooks", "n8n"],
    audience: "Ops teams, agencies, and anyone losing hours to repeatable manual processes.",
  },
];

export function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        label="Services"
        title="Everything We Build, We Build Right."
        subtitle="Three core practices, deeply done. We build production software for teams who need reliable systems, not throwaway prototypes."
      />

      {blocks.map((block, index) => (
        <section key={block.title} className="rb-section py-28">
          <div className="mx-auto max-w-[1200px] px-6 grid gap-12 md:grid-cols-2 md:items-start">
            <Reveal>
              <div className="font-mono text-[12px] uppercase tracking-[0.15em] mb-6 rb-section-label">
                [ 0{index + 1} Service ]
              </div>
              <block.Icon size={32} className="text-indigo" />
              <h2 className="mt-6 font-display font-bold text-2xl md:text-4xl tracking-normal leading-tight">
                {block.title}
              </h2>
              <p className="mt-6 text-[16px] leading-[1.7] text-muted">{block.problem}</p>
            </Reveal>
            <StaggerGroup className="space-y-5">
              <motion.div variants={fadeUp} className="rb-panel rounded-2xl p-7">
                <h4 className="font-mono text-[12px] uppercase tracking-wider mb-4 text-indigo">
                  What's included
                </h4>
                <ul className="space-y-2.5">
                  {block.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px]">
                      <Check size={18} className="text-indigo mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={fadeUp} className="rb-panel rounded-2xl p-7">
                <h4 className="font-mono text-[12px] uppercase tracking-wider mb-4 text-indigo">
                  Tech stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {block.stack.map((tool) => (
                    <span
                      key={tool}
                      className="rb-chip font-mono text-[12px] rounded-full px-3 py-1 border border-[rgba(120,108,255,0.25)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="rb-panel rounded-2xl p-7">
                <h4 className="font-mono text-[12px] uppercase tracking-wider mb-4 text-indigo">
                  Who it's for
                </h4>
                <p className="text-[15px] leading-relaxed text-muted">{block.audience}</p>
              </motion.div>
            </StaggerGroup>
          </div>
        </section>
      ))}

      <CTABanner />
    </PageShell>
  );
}
