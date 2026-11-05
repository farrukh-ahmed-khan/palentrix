"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { Reveal } from "./Reveal";
import { CTAButton } from "./CTAButton";

type Project = {
  title: string;
  client?: string;
  tag: string;
  desc: string;
  stack: string[];
  url?: string;
  urlLabel: string;
  privateLink?: boolean;
};

const projects: Project[] = [
  {
    title: "Gofer Assistants",
    tag: "Marketplace SaaS",
    desc: "Multi-tenant vendor marketplace with onboarding, RBAC, bookings, admin dashboard, and Stripe Connect payouts.",
    stack: ["NestJS", "Next.js", "PostgreSQL", "Stripe Connect"],
    url: "https://goferassistants.com",
    urlLabel: "goferassistants.com",
  },
  {
    title: "Zelos",
    tag: "EdTech + FinTech",
    desc: "Financial literacy and youth development platform with role dashboards, video, scholarships, forums, events, store, and billing.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
    url: "https://zelos.vercel.app",
    urlLabel: "zelos.vercel.app",
  },
  {
    title: "AegisIQ",
    client: "PatientTrac Limited",
    tag: "Investor Portal",
    desc: "Financial intelligence and screening platform with investor onboarding, gated documents, and payment processing.",
    stack: ["Next.js 14", "TypeScript", "Neon", "Clerk"],
    url: "https://aegisiqfintech.com",
    urlLabel: "aegisiqfintech.com",
  },
  {
    title: "VELOOSH",
    tag: "Career Intelligence",
    desc: "Assessment platform MVP for learners across MENA and Africa with quiz modes, readiness scoring, dashboards, and history.",
    stack: ["Next.js", "Supabase"],
    url: "https://veloosh.com",
    urlLabel: "veloosh.com",
  },
  {
    title: "SaaS AI Platform",
    tag: "AI SaaS",
    desc: "Multi-model AI platform supporting chat, code, and image generation through OpenAI and Claude APIs.",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    url: "https://saas-ai-azure.vercel.app",
    urlLabel: "saas-ai-azure.vercel.app",
  },
  {
    title: "OutfitIQ",
    tag: "AI Fashion",
    desc: "AI styling app with multi-step outfit suggestions, Gemini image generation, and wardrobe uploads.",
    stack: ["Next.js", "Gemini API", "MongoDB"],
    urlLabel: "Client-owned",
    privateLink: true,
  },
  {
    title: "Texas Center Wellness",
    tag: "Healthcare Portal",
    desc: "Patient dashboard and healthcare portal with multi-role access and sensitive data handling.",
    stack: ["React", "Node.js"],
    url: "https://texascenterwellness.com",
    urlLabel: "texascenterwellness.com",
  },
  {
    title: "JStyle",
    tag: "E-commerce",
    desc: "Fashion commerce platform with cart, checkout, admin dashboard, and order management.",
    stack: ["Laravel", "PHP", "MySQL"],
    url: "https://jstyle.pk",
    urlLabel: "jstyle.pk",
  },
  {
    title: "Kepka House",
    tag: "Corporate Website",
    desc: "Clean responsive company website with interactive UI and smooth navigation.",
    stack: ["Next.js"],
    url: "https://kepkahouse.com",
    urlLabel: "kepkahouse.com",
  },
  {
    title: "Lavanya Suresh",
    client: "Speaker Kit",
    tag: "Personal Brand",
    desc: "Speaker website with photo gallery, video embeds, and downloadable PDF media kit.",
    stack: ["Next.js"],
    url: "https://lavanya-suresh.vercel.app",
    urlLabel: "lavanya-suresh.vercel.app",
  },
  {
    title: "Peptide MD",
    tag: "Health Landing Page",
    desc: "Minimal health-brand product landing page tuned for clean presentation and fast load performance.",
    stack: ["Next.js"],
    url: "https://brandon-rosy.vercel.app",
    urlLabel: "brandon-rosy.vercel.app",
  },
  {
    title: "LMIL",
    tag: "Animated Marketing",
    desc: "Animated marketing landing page with scroll effects, GSAP motion, and CSS transitions.",
    stack: ["GSAP", "CSS", "Landing Page"],
    urlLabel: "Launch-ready",
    privateLink: true,
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
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/link inline-flex items-center gap-2 text-[13px] font-semibold text-ink transition-colors hover:text-glow ${className}`}
    >
      {project.urlLabel}
      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
  );
}

export function CasesPreview() {
  const [active, setActive] = useState(0);
  const current = projects[active];
  const tint = tints[active % tints.length];

  return (
    <section className="relative overflow-hidden bg-void py-28 md:py-40">
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
