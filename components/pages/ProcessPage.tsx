"use client";

import { CTABanner } from "@/components/site/CTABanner";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";

const steps = [
  {
    n: "01",
    title: "Discovery",
    what: "We read your brief, ask the questions that surface hidden requirements, and write back a structured technical understanding of what you need.",
    you: "Send the brief, deck, mockups, and notes. Answer questions over a 45-minute call.",
    we: "Written technical understanding, scope document, and estimate.",
  },
  {
    n: "02",
    title: "Architecture",
    what: "Before writing code, we design the system: data model, API surface, infrastructure, and tradeoffs.",
    you: "Review the architecture document and push back on anything that feels off.",
    we: "System diagram, data model, infrastructure plan, and milestone breakdown.",
  },
  {
    n: "03",
    title: "Build",
    what: "Iterative weekly delivery. You see working software every Friday instead of waiting a month for a surprise.",
    you: "Join weekly demo calls, provide feedback, and test the staging build.",
    we: "Working software on staging every week.",
  },
  {
    n: "04",
    title: "Review",
    what: "Before launch we run a hardening pass for security, performance, accessibility, and edge cases.",
    you: "Test it like a real user and list everything wrong.",
    we: "Fixes for every issue and a launch checklist signed off by both sides.",
  },
  {
    n: "05",
    title: "Ship & Support",
    what: "Deployment, monitoring, alerts, and a 30-day post-launch window where we fix anything that breaks.",
    you: "Sign off and launch.",
    we: "Production deploy, monitoring, and 30 days of post-launch support.",
  },
];

export function ProcessPage() {
  return (
    <PageShell>
      <PageHero
        label="Our Process"
        title="No Surprises. No Excuses."
        subtitle="A clear five-step pipeline from your first message to a production launch. The same on every project, regardless of size."
      />

      {steps.map((step) => (
        <section key={step.n} className="rb-section py-28">
          <div className="mx-auto max-w-[1200px] px-6 grid gap-12 md:grid-cols-[260px_1fr] md:items-start">
            <Reveal>
              <div
                className="font-display font-extrabold text-[120px] md:text-[180px] leading-none"
                style={{ color: "rgba(11,95,170,0.15)" }}
              >
                {step.n}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="rb-panel rounded-2xl p-8 md:p-10">
                <h2 className="font-display font-bold text-2xl md:text-4xl tracking-normal">
                  {step.title}
                </h2>
                <p className="mt-6 text-[17px] leading-[1.7] text-muted">{step.what}</p>
                <div className="mt-10 grid gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="font-mono text-[12px] uppercase tracking-wider mb-2 text-indigo">
                      What you do
                    </h4>
                    <p className="text-[15px] leading-relaxed">{step.you}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[12px] uppercase tracking-wider mb-2 text-indigo">
                      What we deliver
                    </h4>
                    <p className="text-[15px] leading-relaxed">{step.we}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <CTABanner />
    </PageShell>
  );
}
