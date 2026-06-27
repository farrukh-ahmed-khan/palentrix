"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Quote, Star } from "lucide-react";
import { Reveal, fadeUp } from "./Reveal";
import { OrbsBg } from "./OrbsBg";
import { SectionLabel } from "./SectionLabel";

const upworkProfileUrl = "https://www.upwork.com/freelancers/~01274935b3fd67609d?mp_source=share";

const items = [
  {
    quote:
      "I have been very impressed with Farrukh's attention to detail. He was able to create a solid sandbox for future iterations and design considerations.",
    name: "Chris Hill",
    company: "CueClub",
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

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleItems = [
    items[activeIndex],
    items[(activeIndex + 1) % items.length],
    items[(activeIndex + 2) % items.length],
  ];

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  return (
    <section className="relative bg-slate overflow-hidden py-24">
      <OrbsBg />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <Reveal><SectionLabel>04  What Clients Say</SectionLabel></Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display font-bold text-2xl md:text-4xl tracking-normal">
            Straight from the People We've Shipped For.
          </h2>
        </Reveal>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                const swipePower = Math.abs(info.offset.x) * info.velocity.x;

                if (swipePower < -3500 || info.offset.x < -80) {
                  showNext();
                }

                if (swipePower > 3500 || info.offset.x > 80) {
                  showPrevious();
                }
              }}
              className="grid cursor-grab select-none gap-5 active:cursor-grabbing md:grid-cols-2 xl:grid-cols-3"
            >
              {visibleItems.map((t, itemIndex) => (
                <motion.div
                  key={`${t.name}-${itemIndex}`}
                  variants={fadeUp}
                  whileHover={{ y: -5, borderColor: "rgba(50,200,255,0.34)" }}
                  transition={{ duration: 0.24 }}
                  className={`rb-card relative min-h-[370px] flex-col overflow-hidden rounded-2xl border bg-void p-6 group ${
                    itemIndex === 1 ? "hidden md:flex" : "flex"
                  } ${
                    itemIndex === 2 ? "hidden xl:flex" : ""
                  }`}
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 72% 52% at 50% 0%, rgba(120,108,255,0.08) 0%, transparent 70%)",
                    }}
                  />
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo via-x-blue to-violet opacity-70" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-mono text-[11px] font-semibold"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(120,108,255,0.2) 0%, rgba(50,200,255,0.18) 100%)",
                          border: "1px solid rgba(120,108,255,0.22)",
                          color: "var(--indigo)",
                        }}
                      >
                        {t.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-medium text-[14px] text-ink">{t.name}</div>
                        <div className="truncate text-[12px] text-muted">{t.company}</div>
                      </div>
                    </div>

                    <div className="shrink-0 rounded-full border border-indigo/15 bg-slate/70 px-2.5 py-1">
                      <div className="flex items-center gap-0.5 text-indigo">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} size={12} fill="currentColor" strokeWidth={1.5} />
                        ))}
                        {t.value ? (
                          <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                            {t.value}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-6 flex h-9 w-9 items-center justify-center rounded-xl border border-indigo/15 bg-indigo/5 text-indigo">
                    <Quote size={17} />
                  </div>

                  <p className="relative mt-4 text-[14px] leading-[1.75] text-ink/78 font-light">
                    {t.quote}
                  </p>

                  <div className="relative mt-5 rounded-2xl border border-indigo/15 bg-gradient-to-br from-slate/70 to-white/80 p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-indigo">
                      Project
                    </div>
                    <div className="mt-2 text-[13px] leading-relaxed text-ink/78">{t.project}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-indigo/15 bg-white/75 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={upworkProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-auto inline-flex items-center gap-2 pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-indigo transition-colors hover:text-violet"
                    aria-label={`View ${t.name}'s testimonial on Upwork`}
                  >
                    View Upwork profile
                    <ExternalLink size={13} />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex gap-2">
            {items.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-indigo" : "w-2 bg-indigo/25 hover:bg-indigo/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
