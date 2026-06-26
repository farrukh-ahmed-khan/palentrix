"use client";

import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";

type LegalSection = {
  title: string;
  body: string[];
};

export function LegalPage({
  label,
  title,
  subtitle,
  updated,
  sections,
}: {
  label: string;
  title: string;
  subtitle: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <PageShell>
      <PageHero label={label} title={title} subtitle={subtitle} />

      <section className="rb-section py-20">
        <div className="mx-auto max-w-[880px] px-6">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-indigo">
              Last updated: {updated}
            </p>
          </Reveal>

          <div className="mt-10 space-y-12">
            {sections.map((section, index) => (
              <Reveal key={section.title} delay={index * 0.03}>
                <section className="border-t border-[rgba(120,108,255,0.18)] pt-8">
                  <h2 className="font-display text-2xl font-bold tracking-normal">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[16px] leading-[1.85] text-ink/70">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 border-t border-[rgba(120,108,255,0.18)] pt-8 text-[15px] leading-relaxed text-muted">
              Questions about these terms or this policy? Email{" "}
              <a className="text-indigo underline underline-offset-4" href="mailto:hello@palentrix.com">
                hello@palentrix.com
              </a>
              . You can also visit our{" "}
              <Link className="text-indigo underline underline-offset-4" href="/contact">
                contact page
              </Link>
              .
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
