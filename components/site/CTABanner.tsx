"use client";

import { Reveal } from "./Reveal";
import { CTAButton } from "./CTAButton";
import { GlowField } from "./GlowField";
import { siteConfig } from "@/lib/site";

const calendlyUrl = "https://calendly.com/palentrix/30min";

/* fromanother "Let's create something together" closer. */
export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-void py-32 md:py-48">
      <GlowField intensity={0.8} tone="cyan" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />

      <div className="relative mx-auto max-w-[1320px] px-6">
        <Reveal>
          <h2 className="max-w-[1100px] font-display text-[44px] font-extrabold leading-[0.95] tracking-[-0.045em] text-snow md:text-[104px]">
            Ready to Build{" "}
            <span className="serif-accent font-normal text-gradient-indigo">Something</span>
            <br className="hidden md:block" /> That Works?
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal delay={0.1}>
            <div>
              <p className="max-w-[520px] text-[17px] leading-relaxed text-ink/70">
                Send us your project. We&apos;ll respond with a clear technical approach within 24 hours.
              </p>
              <p className="mt-6 font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink/45">
                No contracts - No retainers - Pay per project
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CTAButton href={calendlyUrl}>Book a free call</CTAButton>
              <span className="inline-flex">
                <a
                  href={`mailto:${siteConfig.emails.contact}`}
                  className="pill h-12 w-full justify-center border border-ink/20 bg-ink/[0.03] px-6 text-[14.5px] text-ink backdrop-blur hover:border-ink hover:bg-ink hover:text-void sm:w-auto"
                >
                  {siteConfig.emails.contact}
                </a>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
