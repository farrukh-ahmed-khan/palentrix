"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  GitBranch,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Discovery",
    desc: "We read everything. We ask the questions no one else does.",
    Icon: FileSearch,
    accent: "#43B4FF",
    note: "Scope locked",
  },
  {
    n: "02",
    title: "Architecture",
    desc: "We plan the system before writing a line of code.",
    Icon: GitBranch,
    accent: "#4D9DFF",
    note: "System map",
  },
  {
    n: "03",
    title: "Build",
    desc: "Iterative delivery with you in the loop at every milestone.",
    Icon: Sparkles,
    accent: "#7AD0FF",
    note: "Weekly drops",
  },
  {
    n: "04",
    title: "Review",
    desc: "You test it. We fix everything before it ships.",
    Icon: ShieldCheck,
    accent: "#4D9DFF",
    note: "QA pass",
  },
  {
    n: "05",
    title: "Ship & Support",
    desc: "Deployed, monitored, and backed by us post-launch.",
    Icon: Rocket,
    accent: "#3EF2D0",
    note: "Launch ready",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Process() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">

      <div className="relative mx-auto max-w-[1320px] px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <Reveal>
              <h2 className="font-display text-[40px] font-extrabold leading-[0.98] tracking-[-0.035em] md:text-[76px]">
                No Surprises.{" "}
                <span className="serif-accent font-normal text-gradient-indigo">No Excuses.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[460px] text-[15px] leading-[1.8] text-ink/65 md:ml-auto md:text-[16px]">
              A clean build rhythm from first call to launch: visible decisions, weekly progress,
              and no mystery work hiding between milestones.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Delivery map */}
          <div>
            <Reveal>
              <div className="glass relative overflow-hidden rounded-[24px] p-7 md:p-9 lg:sticky lg:top-28">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[rgba(67,180,255,0.22)] blur-[80px]" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-glow/30 bg-glow/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-glow">
                    <CheckCircle2 size={14} />
                    Delivery map
                  </div>
                  <h3 className="mt-8 font-display text-[24px] font-bold leading-[1.2] tracking-[-0.02em] md:text-[30px]">
                    Every phase has a decision, a deliverable, and a clear owner.
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.7] text-ink/65">
                    You always know what is being built, why it matters, and what will be ready
                    next.
                  </p>
                </div>

                <div className="relative mt-10 grid grid-cols-5 gap-2">
                  {steps.map((s, i) => (
                    <div key={s.n} className="relative">
                      {i < steps.length - 1 && (
                        <div className="absolute left-[52%] right-[-48%] top-5 h-px bg-gradient-to-r from-indigo/70 to-glow/30" />
                      )}
                      <div
                        className="relative z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full border bg-void font-mono text-[11px]"
                        style={{ borderColor: `${s.accent}99`, color: s.accent, boxShadow: `0 0 18px -4px ${s.accent}` }}
                      >
                        {s.n}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative mt-10 grid grid-cols-2 gap-3">
                  {["Estimate", "Milestones", "QA", "Launch"].map((label) => (
                    <div key={label} className="rounded-2xl border border-border bg-void/40 px-4 py-3">
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{label}</div>
                      <div className="mt-2 h-1 rounded-full bg-[linear-gradient(90deg,#2f7dff,#43b4ff,#3ef2d0)]" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Steps — giant numerals (fromanother) */}
          <ol className="border-t border-border">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.04 }}
                className="group relative grid grid-cols-[auto_1fr] items-center gap-6 border-b border-border py-8 md:gap-10 md:py-10"
              >
                <span
                  className="font-display text-[72px] font-extrabold leading-none tracking-[-0.06em] text-outline transition-all duration-700 md:text-[120px]"
                  style={{ ["--accent" as never]: s.accent }}
                >
                  <span className="transition-colors duration-700 group-hover:text-[var(--accent)]">{s.n}</span>
                </span>
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-[24px] font-bold tracking-[-0.025em] text-snow md:text-[32px]">
                      {s.title}
                    </h3>
                    <span
                      className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border sm:flex"
                      style={{ borderColor: `${s.accent}55`, color: s.accent }}
                    >
                      <s.Icon size={17} />
                    </span>
                  </div>
                  <p className="mt-2 max-w-[460px] text-[15px] leading-[1.7] text-ink/65">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-ink/60">
                      {s.note}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-glow opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
