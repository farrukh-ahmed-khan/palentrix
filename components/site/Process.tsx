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
import { Reveal, StaggerGroup, fadeUp } from "./Reveal";
import { GridBg } from "./GridBg";

const steps = [
  {
    n: "01",
    title: "Discovery",
    desc: "We read everything. We ask the questions no one else does.",
    Icon: FileSearch,
    accent: "#32C8FF",
    note: "Scope locked",
  },
  {
    n: "02",
    title: "Architecture",
    desc: "We plan the system before writing a line of code.",
    Icon: GitBranch,
    accent: "#786CFF",
    note: "System map",
  },
  {
    n: "03",
    title: "Build",
    desc: "Iterative delivery with you in the loop at every milestone.",
    Icon: Sparkles,
    accent: "#9B5CFF",
    note: "Weekly drops",
  },
  {
    n: "04",
    title: "Review",
    desc: "You test it. We fix everything before it ships.",
    Icon: ShieldCheck,
    accent: "#786CFF",
    note: "QA pass",
  },
  {
    n: "05",
    title: "Ship & Support",
    desc: "Deployed, monitored, and backed by us post-launch.",
    Icon: Rocket,
    accent: "#32C8FF",
    note: "Launch ready",
  },
];

export function Process() {
  return (
    <section className="relative bg-void py-24 md:py-28 overflow-hidden">
      <GridBg />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[rgba(120,108,255,0.06)] to-transparent" />
      <div className="absolute left-1/2 top-28 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo/5 blur-[120px]" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="grid gap-8 md:grid-cols-[0.95fr_1fr] md:items-end">
          <div>
            <Reveal>
              <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-indigo">
                [ 03 How We Work ]
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 max-w-[680px] font-display font-bold text-3xl md:text-5xl tracking-normal leading-[1.1]">
                No Surprises. <span className="text-gradient-indigo">No Excuses.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[520px] text-muted text-[15px] md:text-[16px] leading-[1.8] md:ml-auto">
              A clean build rhythm from first call to launch: visible decisions, weekly progress,
              and no mystery work hiding between milestones.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-[rgba(120,108,255,0.24)] bg-white p-7 shadow-[0_24px_70px_-58px_rgba(120,108,255,0.55)] md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(120,108,255,0.06),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(155,92,255,0.06),transparent_42%)]" />
              <div className="absolute inset-x-8 top-28 h-px bg-gradient-to-r from-transparent via-indigo/30 to-transparent" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo/25 bg-indigo/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-indigo">
                  <CheckCircle2 size={14} />
                  Delivery map
                </div>
                <h3 className="mt-8 font-display text-[26px] md:text-[32px] leading-tight">
                  Every phase has a decision, a deliverable, and a clear owner.
                </h3>
                <p className="mt-4 text-muted text-[15px] leading-[1.7]">
                  You always know what is being built, why it matters, and what will be ready
                  next.
                </p>
              </div>

              <div className="relative mt-10 grid grid-cols-5 gap-2">
                {steps.map((s, i) => (
                  <div key={s.n} className="relative">
                    {i < steps.length - 1 && (
                      <div className="absolute left-[52%] right-[-48%] top-5 h-px bg-gradient-to-r from-indigo/50 to-violet/20" />
                    )}
                    <div
                      className="relative z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full border bg-void font-mono text-[11px]"
                      style={{ borderColor: `${s.accent}88`, color: s.accent }}
                    >
                      {s.n}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative mt-10 grid grid-cols-2 gap-3">
                {["Estimate", "Milestones", "QA", "Launch"].map((label) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[rgba(120,108,255,0.16)] bg-slate/60 px-4 py-3"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      {label}
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-[linear-gradient(90deg,rgba(94,70,201,0.9),rgba(155,92,255,0.6))]" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <StaggerGroup className="grid gap-4 sm:grid-cols-2">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.22 }}
                className={i === steps.length - 1 ? "sm:col-span-2" : ""}
              >
                <div className="rb-step group relative h-full overflow-hidden rounded-2xl border border-[rgba(120,108,255,0.16)] bg-white p-5 md:p-6">
                  <div
                    className="absolute inset-x-0 top-0 h-px opacity-70"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
                    }}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-void/80"
                      style={{ borderColor: `${s.accent}55`, color: s.accent }}
                    >
                      <s.Icon size={20} />
                    </div>
                    <div className="font-display text-[34px] leading-none text-ink/[0.07]">
                      {s.n}
                    </div>
                  </div>

                  <h3 className="mt-5 font-display font-bold text-[19px] text-ink">{s.title}</h3>
                  <p className="mt-2 text-muted text-[14px] leading-[1.65]">{s.desc}</p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[rgba(120,108,255,0.16)] bg-slate-light/50 px-3 py-1 font-mono text-[11px] text-muted">
                      {s.note}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-indigo opacity-60 transition-transform group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
