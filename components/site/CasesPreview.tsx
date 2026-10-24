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
        <Reveal><SectionLabel>02 - Our Work</SectionLabel></Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display font-bold text-[30px] md:text-[44px] leading-[1.08] tracking-normal">Portfolio Built Across SaaS, AI, Commerce, and Healthcare.</h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -5, borderColor: "rgba(11,95,170,0.28)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rb-card case-card flex min-h-[340px] flex-col overflow-hidden rounded-2xl border bg-white p-6 md:p-7 group"
              style={{ borderColor: "rgba(11,95,170,0.12)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex items-center rounded-full border border-indigo/20 bg-indigo/[0.05] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-indigo">
                  {project.tag}
                </span>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo/12 bg-slate/70 text-indigo/80 transition-all duration-300 group-hover:border-indigo/30 group-hover:bg-indigo group-hover:text-white">
                  {project.privateLink ? <Lock size={15} /> : <ExternalLink size={15} />}
                </div>
              </div>

              <h3 className="mt-6 font-display text-[21px] font-bold leading-snug tracking-normal">
                {project.title}
              </h3>
              {project.client ? (
                <div className="mt-1 text-[13px] font-medium text-muted">{project.client}</div>
              ) : null}

              <p className="mt-3 text-[14.5px] leading-[1.7] text-muted">
                {project.desc}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-indigo/10 bg-slate/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink/60"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <div className="mb-4 h-px bg-gradient-to-r from-indigo/15 via-indigo/10 to-transparent" />
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-indigo transition-colors hover:text-violet"
                  >
                    {project.urlLabel}
                    <ExternalLink size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
