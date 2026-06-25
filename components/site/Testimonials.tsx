"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerGroup, fadeUp } from "./Reveal";
import { OrbsBg } from "./OrbsBg";
import { SectionLabel } from "./SectionLabel";

const items = [
  {
    quote:
      "Palentrix didn't just build what we asked for  they told us what we actually needed. The SaaS they delivered handled our launch week without a single outage.",
    name: "Alex R.",
    role: "Founder, TechStartup",
    initials: "AR",
  },
  {
    quote:
      "We'd worked with three agencies before. Palentrix was the first one that read our brief properly. Fast, communicative, and the code was clean.",
    name: "Sarah M.",
    role: "Product Lead, GrowthCo",
    initials: "SM",
  },
  {
    quote:
      "The automation pipeline they built replaced two full-time manual processes. ROI within the first month.",
    name: "David K.",
    role: "Ops Director, ScaleUp Inc.",
    initials: "DK",
  },
];

export function Testimonials() {
  return (
    <section className="relative bg-slate overflow-hidden py-28">
      <OrbsBg />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <Reveal><SectionLabel>04  What Clients Say</SectionLabel></Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display font-bold text-2xl md:text-4xl tracking-normal">
            Straight from the People We've Shipped For.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: "rgba(50,200,255,0.3)" }}
              transition={{ duration: 0.22 }}
              className="rb-card relative bg-void rounded-2xl p-8 border overflow-hidden group"
              style={{ borderColor: "var(--border-color)" }}
            >
              {/* Subtle teal glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(50,200,255,0.07) 0%, transparent 70%)",
                }}
              />

              {/* Opening quote mark */}
              <div
                className="font-display font-extrabold text-[72px] leading-none absolute top-2 left-5 select-none"
                style={{ color: "rgba(120,108,255,0.12)" }}
              >
                "
              </div>

              <p className="relative pt-8 text-[15px] leading-[1.8] text-ink/75 font-light">
                {t.quote}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-[11px] font-medium shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(120,108,255,0.3) 0%, rgba(50,200,255,0.2) 100%)",
                    border: "1px solid rgba(120,108,255,0.3)",
                    color: "var(--teal)",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-medium text-[14px] text-ink">{t.name}</div>
                  <div className="text-[12px] text-muted">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
