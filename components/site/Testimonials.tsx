"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { Reveal, StaggerGroup, fadeUp } from "./Reveal";
import { OrbsBg } from "./OrbsBg";
import { SectionLabel } from "./SectionLabel";

const upworkProfileUrl = "https://www.upwork.com/freelancers/~01274935b3fd67609d?mp_source=share";

const items = [
  {
    quote:
      "I have been very impressed with Farrukh's attention to detail. He was able to create a solid sandbox for future iterations and design considerations.",
    name: "Chris Hill",
    company: "CueClub",
    project: "Production Website Sandbox & Staging Environment",
    tags: ["Detail Oriented", "Solution Oriented", "Committed to Quality"],
    initials: "CH",
  },
  {
    quote: "Great developer to work with. Highly recommend.",
    name: "Ria Kumar",
    company: "OutfitIQ",
    project: "AI Fashion Styling Platform + Speaker Kit + Wardrobe Feature",
    tags: ["Clear Communicator", "Detail Oriented", "Committed to Quality"],
    initials: "RK",
  },
  {
    quote:
      "Farrukh is a true professional. He delivered exactly what I expected on time and handled the project with great attention to detail. Very easy to communicate with.",
    name: "SamuelJediael Bautista Sosa",
    company: "Upwork Client",
    project: "Next.js & NestJS Authentication Refactor & Security Hardening",
    tags: ["On Time", "Clear Communication", "Security Hardening"],
    initials: "SB",
    value: "$100",
  },
  {
    quote:
      "The seller's expertise and attention to detail resulted in a top-notch deliverable. Highly recommended for quality work.",
    name: "Baynton Jesse",
    company: "Upwork Client",
    project: "Redux State Sync & API Latency Optimization",
    tags: ["Expertise", "Attention to Detail", "Quality Work"],
    initials: "BJ",
    value: "$110",
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

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2">
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

              <div className="relative flex items-center gap-1 text-indigo">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" strokeWidth={1.5} />
                ))}
                {t.value ? (
                  <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {t.value}
                  </span>
                ) : null}
              </div>

              <p className="relative pt-8 text-[15px] leading-[1.8] text-ink/75 font-light">
                {t.quote}
              </p>

              <div className="relative mt-6 rounded-xl border border-[rgba(120,108,255,0.16)] bg-slate/55 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-indigo">
                  Project
                </div>
                <div className="mt-2 text-[13px] leading-relaxed text-ink/75">{t.project}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-indigo/15 bg-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

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
                  <div className="text-[12px] text-muted">{t.company}</div>
                </div>
              </div>

              <a
                href={upworkProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-indigo transition-colors hover:text-violet"
                aria-label={`View ${t.name}'s testimonial on Upwork`}
              >
                View Upwork profile
                <ExternalLink size={13} />
              </a>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
