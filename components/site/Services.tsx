"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { Layers, Smartphone, Zap, type LucideIcon } from "lucide-react";
import { Reveal, StaggerGroup, fadeUp } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { SaasVisual, MobileVisual, AutomationVisual } from "./ServiceVisuals";
import { GridBg } from "./GridBg";
import { LightfallBg } from "./LightfallBg";

type Service = {
  num: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
  Visual: ComponentType;
  borderColor: string;
};

const services: Service[] = [
  {
    num: "01",
    Icon: Layers,
    title: "SaaS & MVP Development",
    desc: "Full-stack SaaS products engineered for real users from day one. Auth, billing, dashboards, and APIs - production-ready, no shortcuts.",
    tags: ["Next.js", "NestJS", "Supabase", "PostgreSQL", "Stripe"],
    Visual: SaasVisual,
    borderColor: "#43B4FF",
  },
  {
    num: "02",
    Icon: Smartphone,
    title: "Web & Mobile Apps",
    desc: "Responsive web platforms and cross-platform mobile apps. Clean architecture, polished UI, and performance that holds under real-world load.",
    tags: ["React", "React Native", "Node.js", "Tailwind", "AWS"],
    Visual: MobileVisual,
    borderColor: "#0B5FAA",
  },
  {
    num: "03",
    Icon: Zap,
    title: "Automation & Workflows",
    desc: "Business processes automated end-to-end - integrations, webhooks, scheduled jobs, and pipelines that eliminate manual work and errors.",
    tags: ["Python", "Node.js", "REST APIs", "Webhooks", "PostgreSQL"],
    Visual: AutomationVisual,
    borderColor: "#178bd2",
  },
];

export function Services() {
  return (
    <section className="relative bg-void py-28 overflow-hidden">
      <LightfallBg />
      <GridBg />
      <div className="relative mx-auto max-w-[1200px] px-6">
        <Reveal>
          <SectionLabel>01 - What We Build</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display font-bold text-[30px] md:text-[44px] leading-[1.08] tracking-normal max-w-[720px]">
            Three Things We Do Exceptionally Well.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`group rounded-2xl ${i === services.length - 1 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="rb-card service-card relative h-full overflow-hidden rounded-2xl border border-[rgba(11,95,170,0.12)] bg-slate">
                <div
                  className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, ${s.borderColor}, transparent)` }}
                />
                <s.Visual />
                <div className="p-7 md:p-8">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl border bg-white shadow-[0_1px_2px_rgba(7,23,43,0.05)] transition-transform duration-300 group-hover:-rotate-6"
                      style={{ borderColor: `${s.borderColor}40`, color: s.borderColor }}
                    >
                      <s.Icon size={20} strokeWidth={1.75} />
                    </div>
                    <div
                      className="font-display font-extrabold text-[40px] leading-none tracking-normal"
                      style={{ color: "rgba(11,95,170,0.12)" }}
                    >
                      {s.num}
                    </div>
                  </div>
                  <h3 className="mt-6 font-display font-bold text-[21px] leading-snug tracking-normal">{s.title}</h3>
                  <p className="mt-3 text-muted text-[15px] leading-[1.7]">{s.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rb-chip font-mono text-[11px] text-ink/60 bg-slate-light rounded-full border border-indigo/10 px-2.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
