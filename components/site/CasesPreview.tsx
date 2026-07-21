"use client";

import { motion } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";
import { Reveal, StaggerGroup, fadeUp } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { CTAButton } from "./CTAButton";
import { AuroraBg } from "./AuroraBg";

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

export function CasesPreview() {
  return (
    <section className="relative bg-void py-28 overflow-hidden">
      <AuroraBg className="opacity-40" />
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal><SectionLabel>02  Our Work</SectionLabel></Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display font-bold text-2xl md:text-4xl tracking-normal">Portfolio Built Across SaaS, AI, Commerce, and Healthcare.</h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: "rgba(67,180,255,0.35)" }}
              transition={{ duration: 0.2 }}
              className="rb-card flex min-h-[360px] flex-col overflow-hidden rounded-2xl border bg-slate p-6 group"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-indigo border border-indigo/30 bg-indigo/5 rounded-full px-3 py-1">
                    {project.tag}
                  </span>
                  <h3 className="mt-6 font-display text-[20px] font-bold leading-snug">
                    {project.title}
                  </h3>
                  {project.client ? (
                    <div className="mt-1 text-[13px] text-muted">{project.client}</div>
                  ) : null}
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo/15 bg-white/65 text-indigo">
                  {project.privateLink ? <Lock size={17} /> : <ExternalLink size={17} />}
                </div>
              </div>

              <p className="mt-5 text-[14px] leading-[1.75] text-muted font-light">
                {project.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-indigo/15 bg-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-8">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-indigo transition-colors hover:text-violet"
                  >
                    {project.urlLabel}
                    <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 text-[13px] font-medium text-muted">
                    <Lock size={14} />
                    {project.urlLabel}
                  </div>
                )}
                </div>
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
