"use client";

import { motion } from "framer-motion";
import { Compass, Shield, Target, Users, type LucideIcon } from "lucide-react";
import { CTABanner } from "@/components/site/CTABanner";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, StaggerGroup, fadeUp } from "@/components/site/Reveal";

const team = [
  {
    name: "Farrukh Ahmed Khan",
    role: "Senior Full Stack Developer",
    bio: "Leads architecture, backend systems, and production delivery for SaaS platforms, marketplaces, and complex web applications.",
    initials: "FA",
  },
  {
    name: "Muhammad Sarim Khan",
    role: "Senior Full Stack Developer",
    bio: "Builds polished full-stack products across Next.js, APIs, databases, and user-facing dashboards with a focus on speed and usability.",
    initials: "MS",
  },
  {
    name: "Taimoor Abid",
    role: "Senior Project Manager / QA",
    bio: "Owns delivery flow, QA standards, client communication, and release readiness so every project ships with clarity and confidence.",
    initials: "TA",
  },
];

const values: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Shield,
    title: "Honesty first",
    desc: "We tell you what will not work, even when it costs us the project. The truth saves money downstream.",
  },
  {
    Icon: Target,
    title: "Outcomes over activity",
    desc: "We measure success by what ships, not by hours logged. If it does not make the product better, we do not do it.",
  },
  {
    Icon: Users,
    title: "No handoffs",
    desc: "The engineers you meet on the first call are the engineers writing your code. No sales layer, no proxy team.",
  },
  {
    Icon: Compass,
    title: "Long-term thinking",
    desc: "We build systems that hold up two years from now: clean code, real tests, and honest documentation.",
  },
];

export function AboutPage() {
  return (
    <PageShell>
      <PageHero
        label="About"
        title="Three Engineers. One Studio. Zero Excuses."
        subtitle="Palentrix is a small, deliberately senior software studio in Karachi. We work directly with founders, product leaders, and operators."
      />

      <section className="rb-section py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-indigo mb-4">
              [ The Partners ]
            </div>
            <h2 className="font-display font-bold text-2xl md:text-4xl tracking-normal">
              The people you will actually be talking to.
            </h2>
          </Reveal>
          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: "rgba(67,180,255,0.35)" }}
                transition={{ duration: 0.2 }}
                className="rb-card bg-slate rounded-2xl p-8 border"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="w-14 h-14 rounded-full bg-indigo-dim text-white flex items-center justify-center font-mono text-[15px]">
                  {member.initials}
                </div>
                <h3 className="mt-6 font-display font-bold text-[20px]">{member.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-indigo">
                  {member.role}
                </p>
                <p className="mt-4 text-muted text-[15px] leading-[1.7]">{member.bio}</p>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="rb-section py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <div className="font-mono text-[12px] uppercase tracking-[0.15em] rb-section-label mb-4">
              [ How We Think ]
            </div>
            <h2 className="font-display font-bold text-2xl md:text-4xl tracking-normal">
              Four values, deeply enforced.
            </h2>
          </Reveal>
          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="rb-card rounded-2xl p-8 border border-[rgba(11,95,170,0.18)]"
              >
                <value.Icon size={28} className="text-indigo" />
                <h3 className="mt-5 font-display font-bold text-[20px]">{value.title}</h3>
                <p className="mt-3 text-muted text-[15px] leading-[1.7]">{value.desc}</p>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="rb-section py-28">
        <div className="mx-auto px-6 max-w-[820px]">
          <Reveal>
            <div className="rb-panel rounded-2xl p-8 md:p-10">
              <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-indigo mb-4">
                [ Studio Story ]
              </div>
              <h2 className="font-display font-bold text-2xl md:text-4xl tracking-normal">
                Why we started Palentrix.
              </h2>
              <div className="mt-8 space-y-6 text-muted text-[17px] leading-[1.8]">
                <p>
                  The three of us worked at agencies, startups, and enterprise teams before
                  this. We kept seeing smart founders pay for software that technically worked
                  but could not survive contact with real users.
                </p>
                <p>
                  Palentrix exists to do the work the way we would want it done if we were
                  paying: senior engineers from first call to last commit, honest scoping, and
                  working software every week.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </PageShell>
  );
}
