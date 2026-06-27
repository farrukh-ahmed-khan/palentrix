"use client";

import { motion } from "framer-motion";
import { Check, Layers, Smartphone, Zap, type LucideIcon } from "lucide-react";
import Link from "next/link";
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

const seoServiceLinks = [
  { href: "/software-house-pakistan", label: "Software House Pakistan" },
  { href: "/saas-mvp-development", label: "SaaS MVP Development" },
  { href: "/nextjs-development", label: "Next.js Development" },
  { href: "/ai-web-app-development", label: "AI Web App Development" },
  { href: "/custom-software-development", label: "Custom Software Development" },
];

const faqs = [
  {
    question: "Is Palentrix a software house in Pakistan?",
    answer:
      "Yes. Palentrix is a Karachi-based software development company building SaaS MVPs, custom web apps, AI applications, dashboards, and automation systems.",
  },
  {
    question: "Do you build SaaS MVPs?",
    answer:
      "Yes. We build SaaS MVPs with authentication, billing, dashboards, admin panels, APIs, and production deployment.",
  },
  {
    question: "Can you build AI web apps?",
    answer:
      "Yes. We build AI web applications using OpenAI, Claude, Gemini, custom APIs, usage tracking, and SaaS billing flows.",
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

      <section className="rb-section py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="rb-panel rounded-2xl p-7">
            <h2 className="font-display text-2xl font-bold tracking-normal">
              SEO-focused software development services
            </h2>
            <p className="mt-3 max-w-[780px] text-[15px] leading-relaxed text-muted">
              Explore dedicated service pages for software house Pakistan, SaaS MVP development, Next.js development, AI web app development, and custom software development.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {seoServiceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-indigo/20 bg-white/70 px-4 py-2 text-[14px] text-ink/70 transition-colors hover:border-indigo hover:text-indigo"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <section className="rb-section py-24">
        <div className="mx-auto max-w-[980px] px-6">
          <Reveal>
            <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-indigo mb-4">
              [ FAQ ]
            </div>
            <h2 className="font-display text-2xl font-bold tracking-normal md:text-4xl">
              Common questions about working with Palentrix.
            </h2>
          </Reveal>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <Reveal key={faq.question}>
                <div className="rb-panel rounded-2xl p-6">
                  <h3 className="font-display text-[18px] font-bold tracking-normal">{faq.question}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{faq.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </PageShell>
  );
}
