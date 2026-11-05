import type { ReactNode } from "react";
import { CTAButton } from "./CTAButton";
import { CountUp } from "./CountUp";
import { GlowField } from "./GlowField";

const calendlyUrl = "https://calendly.com/palentrix/30min";

const heroStats = [
  { n: 50, suf: "+", label: "Projects shipped" },
  { n: 100, suf: "%", label: "Client retention" },
  { n: 3, suf: "+", label: "Years delivering" },
  { n: 24, suf: "hrs", label: "Avg response" },
];

/* Staggered editorial lines — same words as before: "Software Development Company in the USA." */
const lines: { text: ReactNode; indent: string }[] = [
  { text: "Software", indent: "md:-translate-x-[14%]" },
  { text: <span className="text-gradient-indigo">Development</span>, indent: "md:translate-x-[6%]" },
  { text: "Company", indent: "md:-translate-x-[10%]" },
  {
    text: (
      <>
        <span className="serif-accent text-[0.92em] text-indigo-dim">in the</span> USA.
      </>
    ),
    indent: "md:translate-x-[12%]",
  },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-void">
      <GlowField />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-void to-transparent" />

      {/* headline */}
      <div className="relative flex flex-1 items-center pt-24 md:pt-28">
        <div className="mx-auto w-full max-w-[1320px] px-6 py-14">
          <h1
            aria-label="Software Development Company in the USA."
            className="mx-auto flex max-w-[1100px] flex-col items-center text-center font-display font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-snow text-[clamp(38px,9vw,128px)]"
          >
            {lines.map((line, i) => (
              <span key={i} aria-hidden="true" className={`block overflow-hidden pb-[0.06em] ${line.indent}`}>
                <span className="line-up" style={{ animationDelay: `${120 + i * 110}ms` }}>
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <div className="mx-auto mt-14 grid max-w-[1100px] items-end gap-8 md:grid-cols-[1fr_auto]">
            <p
              className="hero-rise mx-auto max-w-[520px] text-center text-[15px] leading-[1.75] text-ink/70 md:mx-0 md:text-left md:text-[16px]"
              style={{ animationDelay: "600ms" }}
            >
              Palentrix is a software development company and software house in Parsippany, New Jersey, USA building SaaS MVPs, custom web apps, AI products, dashboards, and business automation systems for clients worldwide.
            </p>
            <div
              className="hero-rise flex flex-col justify-center gap-3 sm:flex-row"
              style={{ animationDelay: "720ms" }}
            >
              <CTAButton href={calendlyUrl}>Book a free call</CTAButton>
              <CTAButton to="/work" variant="ghost">
                See our work
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      {/* scroll marker row (Lusion) */}
      <div className="relative mx-auto hidden w-full max-w-[1320px] items-center justify-between px-6 pb-6 md:flex">
        <span className="crosshair" />
        <span className="crosshair" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">Scroll to explore</span>
        <span className="crosshair" />
        <span className="crosshair" />
      </div>

      {/* stats */}
      <div
        className="hero-rise relative w-full border-t border-border"
        style={{ animationDelay: "860ms" }}
      >
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-y-6 px-6 py-7 md:grid-cols-4 md:py-8">
          {heroStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center md:px-6 md:text-left ${index > 0 ? "md:border-l md:border-border" : ""}`}
            >
              <div className="font-display text-[30px] font-extrabold leading-none tracking-normal text-snow md:text-[44px]">
                <CountUp to={stat.n} suffix={stat.suf} />
              </div>
              <div className="mt-2.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-muted md:text-[11px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
