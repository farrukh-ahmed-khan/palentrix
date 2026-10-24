"use client";

import { Reveal } from "./Reveal";
import { CTAButton } from "./CTAButton";
import { siteConfig } from "@/lib/site";

const calendlyUrl = "https://calendly.com/palentrix/30min";

export function CTABanner() {
  return (
    <section className="relative bg-void py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(255,255,255,0.08)_0%,rgba(241,246,252,0.7)_52%,rgba(255,255,255,0.92)_100%)]" />
      <div className="relative mx-auto max-w-[1200px] px-6 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-[820px] font-display font-extrabold text-[32px] md:text-[52px] leading-[1.06] tracking-normal">
            <span className="text-gradient-indigo">Ready to Build Something That Works?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-muted text-[17px] max-w-[640px] mx-auto leading-relaxed">
            Send us your project. We'll respond with a clear technical approach within 24 hours.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <CTAButton href={calendlyUrl}>Book a free call </CTAButton>
            <span className="inline-flex">
              <a
                href={`mailto:${siteConfig.emails.contact}`}
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-1.5 px-6 rounded-xl font-display font-semibold text-[14.5px] border border-indigo/25 bg-white/80 text-indigo shadow-[0_1px_2px_rgba(7,23,43,0.05)] hover:-translate-y-px hover:border-indigo/50 hover:shadow-[0_0_0_3px_rgba(11,95,170,0.08),0_10px_24px_-14px_rgba(11,95,170,0.45)] transition-all duration-300"
              >
                {siteConfig.emails.contact}
              </a>
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-8 font-mono text-[12px] text-muted uppercase tracking-wider">
            No contracts - No retainers - Pay per project
          </p>
        </Reveal>
      </div>
    </section>
  );
}
