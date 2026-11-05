"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Star } from "lucide-react";
import { Reveal } from "./Reveal";

const upworkProfileUrl = "https://www.upwork.com/freelancers/~01274935b3fd67609d?mp_source=share";

const items = [
  {
    quote:
      "I have been very impressed with Farrukh's attention to detail. He was able to create a solid sandbox for future iterations and design considerations.",
    name: "Chris Hill",
    company: "CueLogic",
    project: "Production-Ready Website Infrastructure",
    tags: ["Reliable Delivery", "Design Systems", "Quality Build"],
    initials: "CH",
  },
  {
    quote: "Great developer to work with. Highly recommend.",
    name: "Ria Kumar",
    company: "OutfitIQ",
    project: "AI Fashion Styling Product Suite",
    tags: ["AI Product", "User Experience", "Fast Delivery"],
    initials: "RK",
  },
  {
    quote:
      "Farrukh is a true professional. He delivered exactly what I expected on time and handled the project with great attention to detail. Very easy to communicate with.",
    name: "SamuelJediael Bautista Sosa",
    company: "Upwork Client",
    project: "Secure SaaS Platform Foundation",
    tags: ["On Time", "Secure Architecture", "Clean Handoff"],
    initials: "SB",
    value: "$100",
  },
  {
    quote:
      "The seller's expertise and attention to detail resulted in a top-notch deliverable. Highly recommended for quality work.",
    name: "Baynton Jesse",
    company: "Upwork Client",
    project: "Performance Optimization for a Web App",
    tags: ["Performance", "Frontend Systems", "Quality Work"],
    initials: "BJ",
    value: "$110",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = items[activeIndex];

  const showNext = () => setActiveIndex((c) => (c + 1) % items.length);
  const showPrevious = () => setActiveIndex((c) => (c - 1 + items.length) % items.length);

  return (
    <section className="relative overflow-hidden bg-void py-28 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-[rgba(47,125,255,0.12)] blur-[140px]" />

      <div className="relative mx-auto max-w-[1320px] px-6">
        <Reveal>
          <h2 className="max-w-[900px] font-display text-[36px] font-extrabold leading-[1] tracking-[-0.035em] md:text-[64px]">
            Straight from the People{" "}
            <span className="serif-accent font-normal text-indigo-dim">We&apos;ve Shipped For.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
          {/* client index */}
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-border lg:pb-0">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={item.name} className="shrink-0 lg:border-b lg:border-border">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-pressed={isActive}
                    className={`flex w-full items-center gap-3 rounded-full border px-2 py-2 text-left transition-all duration-500 lg:rounded-none lg:border-0 lg:px-0 lg:py-4 ${
                      isActive ? "border-ink/30 text-ink" : "border-border text-ink/35 hover:text-ink/70"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[10.5px] font-semibold transition-all duration-500 ${
                        isActive ? "bg-ink text-void" : "border border-border"
                      }`}
                    >
                      {item.initials}
                    </span>
                    <span className="min-w-0 pr-2">
                      <span className="block truncate font-display text-[14px] font-bold">{item.name}</span>
                      <span className="hidden truncate text-[12px] text-muted lg:block">{item.company}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* statement quote */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="serif-accent pointer-events-none absolute -left-2 -top-14 select-none text-[180px] leading-none text-indigo/25 md:-left-8 md:-top-20 md:text-[240px]"
            >
              &ldquo;
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
                transition={{ duration: 0.7, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) showNext();
                  if (info.offset.x > 80) showPrevious();
                }}
                className="relative cursor-grab select-none active:cursor-grabbing"
              >
                <p className="font-display text-[24px] font-medium leading-[1.35] tracking-[-0.02em] text-snow md:text-[38px]">
                  {t.quote}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div>
                    <div className="font-display text-[16px] font-bold text-ink">{t.name}</div>
                    <div className="text-[13px] text-muted">{t.company}</div>
                  </div>
                  <div className="flex items-center gap-0.5 text-glow">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={13} fill="currentColor" strokeWidth={1.5} />
                    ))}
                    {t.value ? (
                      <span className="ml-2 font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">{t.value}</span>
                    ) : null}
                  </div>
                </div>

                <div className="glass mt-8 rounded-[20px] p-5 md:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-glow">Project</div>
                      <div className="mt-1.5 text-[14px] leading-relaxed text-ink/80">{t.project}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between gap-4">
              <a
                href={upworkProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-glow"
                aria-label={`View ${t.name}'s testimonial on Upwork`}
              >
                View Upwork profile
                <ExternalLink size={13} />
              </a>
              <div className="flex items-center gap-2">
                <span className="mr-2 font-mono text-[11px] tracking-[0.2em] text-ink/40">
                  0{activeIndex + 1} / 0{items.length}
                </span>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-void"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-void"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
