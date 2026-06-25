"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, StaggerGroup, fadeUp } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { CTAButton } from "./CTAButton";
import { BrowserChrome, MetricsVisual, PipelineVisual } from "./CaseVisuals";
import { AuroraBg } from "./AuroraBg";
import type { ComponentType } from "react";

type Case = { tag: string; metric: string; title: string; desc: string; url: string; Visual: ComponentType };

const cases: Case[] = [
  { tag: "SaaS Platform", metric: "-42% build time", title: "Rebuilt a production SaaS from broken foundations", desc: "Inherited a codebase with security holes, broken auth, and no test coverage. Delivered a stable, scalable platform in 6 weeks.", url: "app.cuelogic.io/dashboard", Visual: MetricsVisual },
  { tag: "Automation", metric: "+60% efficiency", title: "Automated a 3-person manual workflow into a single pipeline", desc: "End-to-end document processing pipeline that replaced spreadsheets and email chains with a real system.", url: "pipeline.autoflow.io", Visual: PipelineVisual },
];

export function CasesPreview() {
  return (
    <section className="relative bg-void py-28 overflow-hidden">
      <AuroraBg className="opacity-40" />
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal><SectionLabel>02  Our Work</SectionLabel></Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display font-bold text-2xl md:text-4xl tracking-normal">Proof in Real Outcomes.</h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2">
          {cases.map((c) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: "rgba(50,200,255,0.35)" }}
              transition={{ duration: 0.2 }}
              className="rb-card bg-slate rounded-2xl overflow-hidden border group cursor-pointer"
              style={{ borderColor: "var(--border-color)" }}
            >
              <Link href="/work" className="block">
                <BrowserChrome url={c.url}>
                  <c.Visual />
                </BrowserChrome>
                <div className="p-10">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-indigo border border-indigo/30 bg-indigo/5 rounded-full px-3 py-1">{c.tag}</span>
                  <span className="font-display font-bold text-2xl md:text-3xl text-indigo">{c.metric}</span>
                </div>
                <h3 className="mt-8 font-display font-bold text-[22px] leading-snug">{c.title}</h3>
                <p className="mt-4 text-muted text-[15px] leading-[1.7] font-light">{c.desc}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-indigo text-[14px] font-medium">
                  Read case study
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerGroup>

        <Reveal delay={0.15}>
          <div className="mt-12 flex justify-center">
            <CTAButton to="/work" variant="ghost">View all case studies</CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
