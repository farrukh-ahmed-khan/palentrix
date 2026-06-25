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
    borderColor: "#32C8FF",
  },
  {
    num: "02",
    Icon: Smartphone,
    title: "Web & Mobile Apps",
    desc: "Responsive web platforms and cross-platform mobile apps. Clean architecture, polished UI, and performance that holds under real-world load.",
    tags: ["React", "React Native", "Node.js", "Tailwind", "AWS"],
    Visual: MobileVisual,
    borderColor: "#786CFF",
  },
  {
    num: "03",
    Icon: Zap,
    title: "Automation & Workflows",
    desc: "Business processes automated end-to-end - integrations, webhooks, scheduled jobs, and pipelines that eliminate manual work and errors.",
    tags: ["Python", "Node.js", "REST APIs", "Webhooks", "PostgreSQL"],
    Visual: AutomationVisual,
    borderColor: "#9b5cff",
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
          <h2 className="mt-4 font-display font-bold text-2xl md:text-4xl tracking-normal max-w-[720px]">
            Three Things We Do Exceptionally Well.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <motion.div
              key={s.num}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl"
            >
              <div className="rb-card service-card relative h-full overflow-hidden rounded-2xl bg-slate">
                <s.Visual />
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <div
                      className="font-display font-extrabold text-[48px] leading-none"
                      style={{ color: "rgba(120,108,255,0.15)" }}
                    >
                      {s.num}
                    </div>
                    <s.Icon style={{ color: s.borderColor }} size={26} />
                  </div>
                  <h3 className="mt-5 font-display font-bold text-[22px]">{s.title}</h3>
                  <p className="mt-3 text-muted text-[15px] leading-[1.7] font-light">{s.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rb-chip font-mono text-[11px] text-muted bg-slate-light rounded-full px-3 py-1"
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
