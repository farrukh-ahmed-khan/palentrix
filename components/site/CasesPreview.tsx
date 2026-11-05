"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { Reveal } from "./Reveal";
import { CTAButton } from "./CTAButton";

type StoreLink = { label: string; href: string };

type Project = {
  title: string;
  client?: string;
  tag: string;
  desc: string;
  stack: string[];
  url?: string;
  urlLabel: string;
  privateLink?: boolean;
  /** Homepage screenshot in /public/work */
  image?: string;
  /** App store listings for projects that ship a mobile app */
  stores?: StoreLink[];
};

const projects: Project[] = [
  {
    title: "CueLogic",
    tag: "Tournament SaaS + Mobile",
    desc: "Billiards tournament platform with single-elimination, double-elimination, and round-robin engines, live scoring, ELO rankings, Stripe billing, and a companion mobile scorekeeper on iOS and Android.",
    stack: ["React 19", "Node.js", "PostgreSQL", "React Native", "Expo"],
    url: "https://cuelogic.app",
    urlLabel: "cuelogic.app",
    image: "/work/cuelogic.jpg",
    stores: [
      { label: "App Store", href: "https://apps.apple.com/us/app/cuelogic/id6755575023" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=info.cuelogic.app" },
    ],
  },
  {
    title: "OutfitIQ",
    tag: "AI Fashion",
    desc: "AI styling assistant that analyzes wardrobe photos with Gemini vision, generates multi-look fashion visuals, and recommends outfits, color palettes, and makeup.",
    stack: ["Next.js 15", "TypeScript", "Gemini API", "MongoDB"],
    url: "https://outfit-iq-ai.vercel.app",
    urlLabel: "outfit-iq-ai.vercel.app",
    image: "/work/outfitiq.jpg",
  },
  {
    title: "Zelos Foundation",
    tag: "EdTech + FinTech",
    desc: "Financial literacy and mentorship platform with role-based access, school licensing, drip-unlocked content, Stripe subscriptions and gift cards, and Printify fulfilment.",
    stack: ["Next.js 16", "TypeScript", "MongoDB", "Stripe"],
    url: "https://zelosfoundation.org",
    urlLabel: "zelosfoundation.org",
    image: "/work/zelos.jpg",
  },
  {
    title: "Texas Center Wellness",
    tag: "Healthcare Booking",
    desc: "Healthcare booking platform integrated with CharmHealth EHR, Square payments, and QuickBooks Online, with structured data and full technical SEO.",
    stack: ["Next.js 15", "Express", "MySQL", "Square"],
    url: "https://texascenterwellness.com",
    urlLabel: "texascenterwellness.com",
    image: "/work/texas-center-wellness.jpg",
  },
  {
    title: "Gofer Assistants",
    tag: "Service Marketplace",
    desc: "Marketplace connecting customers with freelance assistants for pet care, cleaning, and home services, with bookings, Stripe payments and payouts, and an admin panel.",
    stack: ["Laravel", "PHP", "MySQL", "Stripe"],
    url: "https://goferassistants.com",
    urlLabel: "goferassistants.com",
    image: "/work/gofer-assistants.jpg",
  },
];

/* Each project gets its own glow tint inside the blue → cyan family. */
const tints = ["#4d9dff", "#3ef2d0", "#7ad0ff", "#2f7dff", "#43b4ff", "#8fb8ff"];

const pad = (n: number) => String(n + 1).padStart(2, "0");

function ProjectLink({ project, className = "" }: { project: Project; className?: string }) {
  if (!project.url) {
    return (
      <span className={`inline-flex items-center gap-2 text-[13px] font-medium text-muted ${className}`}>
        <Lock size={14} />
        {project.urlLabel}
      </span>
    );
  }
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${className}`}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link inline-flex items-center gap-2 text-[13px] font-semibold text-ink transition-colors hover:text-glow"
      >
        {project.urlLabel}
        <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
      </a>
      {project.stores?.map((store) => (
        <a
          key={store.href}
          href={store.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on ${store.label}`}
          className="pill h-8 border border-ink/20 px-3.5 text-[12px] text-ink hover:border-ink hover:bg-ink hover:text-void"
        >
          {store.label === "App Store" ? <AppleGlyph /> : <PlayGlyph />}
          {store.label}
        </a>
      ))}
    </div>
  );
}

function AppleGlyph() {
  return (
    <svg width="12" height="14" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width="12" height="13" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
      <path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
}

export function CasesPreview() {
  const [active, setActive] = useState(0);
  const current = projects[active];
  const tint = tints[active % tints.length];

  // Warm the cache so hovering through the list swaps screenshots instantly (desktop only).
  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    projects.forEach((project) => {
      if (project.image) {
        const img = new window.Image();
        img.src = project.image;
      }
    });
  }, []);

  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <h2 className="max-w-[900px] font-display text-[36px] font-extrabold leading-[1] tracking-[-0.035em] md:text-[64px]">
                Portfolio Built Across SaaS, AI,{" "}
                <span className="serif-accent font-normal text-indigo-dim">Commerce,</span> and Healthcare.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink/40">
              ({pad(active)} / {pad(projects.length - 1)})
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          {/* Dogstudio-style list */}
          <ul className="border-t border-border">
            {projects.map((project, i) => (
              <li key={project.title} className="border-b border-border">
                <div
                  data-active={i === active}
                  tabIndex={0}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="fade-row group grid cursor-default grid-cols-[48px_1fr] items-baseline gap-x-4 py-5 outline-none md:grid-cols-[64px_150px_1fr] md:py-6"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-ink/35">{pad(i)}</span>
                  <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/40 md:block">
                    {project.tag}
                  </span>
                  <span className="font-display text-[28px] font-bold leading-[1.05] tracking-[-0.03em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[active=true]:translate-x-2 max-md:text-snow md:text-[44px]">
                    {project.title}
                  </span>

                  {/* mobile details (no hover on touch) */}
                  <div className="col-span-2 mt-3 pl-[64px] md:hidden">
                    {project.image ? (
                      <div className="relative -ml-[64px] mb-4 aspect-[16/10] w-[calc(100%+64px)] overflow-hidden rounded-[14px] border border-border">
                        <Image
                          src={project.image}
                          alt={`${project.title} website homepage`}
                          fill
                          sizes="90vw"
                          className="object-cover object-top"
                        />
                      </div>
                    ) : null}
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-glow/80">{project.tag}</div>
                    {project.client ? <div className="mt-1 text-[13px] text-muted">{project.client}</div> : null}
                    <p className="mt-2 text-[14px] leading-[1.7] text-ink/65">{project.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink/55">
                          {item}
                        </span>
                      ))}
                    </div>
                    <ProjectLink project={project} className="mt-4" />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* fromanother-style numbered preview */}
          <div className="relative hidden md:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-border bg-[#060d24]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.08, filter: "blur(18px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.96, filter: "blur(18px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    {current.image ? (
                      <>
                        {/* browser chrome */}
                        <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center gap-1.5 border-b border-border bg-[#081130]/90 px-4 backdrop-blur">
                          <span className="h-2 w-2 rounded-full bg-ink/20" />
                          <span className="h-2 w-2 rounded-full bg-ink/20" />
                          <span className="h-2 w-2 rounded-full" style={{ background: tint }} />
                          <span className="ml-3 truncate font-mono text-[10.5px] text-ink/50">{current.urlLabel}</span>
                        </div>
                        <Image
                          src={current.image}
                          alt={`${current.title} website homepage`}
                          fill
                          unoptimized
                          className="object-cover object-top pt-9"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(3,6,26,0.92)_100%)]" />
                      </>
                    ) : (
                      <>
                        <div
                          className="glow-blob"
                          style={{
                            width: "85%",
                            height: "70%",
                            background: `radial-gradient(closest-side, ${tint}cc, ${tint}33 60%, transparent)`,
                            filter: "blur(40px)",
                          }}
                        />
                        <div className="noise" style={{ opacity: 0.08 }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-display text-[clamp(120px,16vw,220px)] font-extrabold leading-none tracking-[-0.06em] text-outline">
                            {pad(active)}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                      <span className="font-display text-[22px] font-bold tracking-[-0.02em] text-snow">{current.title}</span>
                      <span className="rounded-full border border-ink/20 bg-void/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/80 backdrop-blur">
                        {current.tag}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-7"
                >
                  {current.client ? <div className="text-[13px] font-medium text-muted">{current.client}</div> : null}
                  <p className="mt-1 text-[15px] leading-[1.75] text-ink/70">{current.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {current.stack.map((item) => (
                      <span key={item} className="rounded-full border border-border px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink/60">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-border pt-5">
                    <ProjectLink project={current} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 flex justify-center">
            <CTAButton to="/work" variant="ghost">View all case studies</CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
