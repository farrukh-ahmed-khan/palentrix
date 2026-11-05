"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { Layers, Smartphone, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { SaasVisual, MobileVisual, AutomationVisual } from "./ServiceVisuals";

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
    borderColor: "#4D9DFF",
  },
  {
    num: "03",
    Icon: Zap,
    title: "Automation & Workflows",
    desc: "Business processes automated end-to-end - integrations, webhooks, scheduled jobs, and pipelines that eliminate manual work and errors.",
    tags: ["Python", "Node.js", "REST APIs", "Webhooks", "PostgreSQL"],
    Visual: AutomationVisual,
    borderColor: "#3EF2D0",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Services() {
  return (
    <section className="relative overflow-hidden bg-void py-28 md:py-40">
      {/* soft aurora edge */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[rgba(47,125,255,0.14)] blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[420px] w-[420px] rounded-full bg-[rgba(62,242,208,0.07)] blur-[140px]" />

      <div className="relative mx-auto max-w-[1320px] px-6">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <Reveal>
              <h2 className="font-display text-[40px] font-extrabold leading-[0.98] tracking-[-0.035em] md:text-[76px]">
                Three Things We Do{" "}
                <span className="serif-accent font-normal text-indigo-dim">Exceptionally</span> Well.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 border-b border-border">
          {services.map((s, i) => (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.05 }}
              className="group relative grid gap-8 border-t border-border py-12 md:grid-cols-[90px_1.05fr_1fr] md:gap-10 md:py-16 lg:grid-cols-[90px_1fr_0.9fr_0.85fr]"
            >
              {/* hover light sweep */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse 50% 80% at 20% 50%, ${s.borderColor}14, transparent 70%)`,
                }}
              />

              <div className="relative font-mono text-[12px] tracking-[0.2em] text-ink/40">
                ({s.num})
              </div>

              <div className="relative">
                <h3 className="font-display text-[30px] font-bold leading-[1.02] tracking-[-0.03em] text-snow transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-[42px]">
                  {s.title}
                </h3>
                <div
                  className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full border transition-transform duration-500 group-hover:-rotate-12"
                  style={{ borderColor: `${s.borderColor}55`, color: s.borderColor }}
                >
                  <s.Icon size={18} strokeWidth={1.75} />
                </div>
              </div>

              <div className="relative">
                <p className="text-[15.5px] leading-[1.8] text-ink/70">{s.desc}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-ink/60 transition-colors group-hover:border-ink/20 group-hover:text-ink/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* framed media (Lusion) */}
              <div className="relative md:col-span-3 md:col-start-2 lg:col-span-1 lg:col-start-auto">
                <div className="overflow-hidden rounded-[20px] border border-border bg-void shadow-[0_30px_80px_-50px_rgba(67,180,255,0.6)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-[1.02]">
                  <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.borderColor }} />
                  </div>
                  <s.Visual />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
