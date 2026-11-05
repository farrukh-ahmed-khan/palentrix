import type { ReactNode } from "react";
import { CTAButton } from "./CTAButton";
import { CountUp } from "./CountUp";
import { HeroCrosses } from "./HeroCrosses";

const calendlyUrl = "https://calendly.com/palentrix/30min";

const heroStats = [
  { n: 50, suf: "+", label: "Projects shipped" },
  { n: 100, suf: "%", label: "Client retention" },
  { n: 3, suf: "+", label: "Years delivering" },
  { n: 24, suf: "hrs", label: "Avg response" },
];

/* Same words as before: "Software Development Company in the USA." */
const lines: ReactNode[] = [
  "Software",
  <span key="dev" className="text-gradient-indigo">Development</span>,
  "Company",
  <>
    <span className="serif-accent text-[0.95em] text-indigo-dim">in the</span> USA.
  </>,
];

/**
 * Lusion-style hero banner: one large framed stage on the first screen with
 * the interactive 3D cluster on the right and the headline on the left.
 */
export function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-void">
      <div className="relative mx-auto w-full max-w-[1440px] px-3 pt-[84px] md:px-5 md:pt-[92px]">
        <div
          className="relative flex min-h-[640px] flex-col overflow-hidden rounded-[22px] border border-border md:h-[calc(100svh-112px)] md:min-h-[600px] md:rounded-[30px]"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 70% 48%, rgba(47,107,255,0.28), transparent 70%), radial-gradient(ellipse 60% 50% at 15% 100%, rgba(62,242,208,0.08), transparent 60%), linear-gradient(180deg, #071029, #03061a)",
          }}
        >
          {/* faint grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(150,185,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(150,185,255,0.06) 1px, transparent 1px)",
              backgroundSize: "88px 88px",
              maskImage: "radial-gradient(ellipse 75% 75% at 60% 50%, black, transparent)",
              WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 60% 50%, black, transparent)",
            }}
          />

          <HeroCrosses />

          {/* keeps the headline readable where pieces drift behind it */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(3,6,26,0.85)_0%,rgba(3,6,26,0.25)_45%,transparent_70%)] md:bg-[linear-gradient(90deg,rgba(3,6,26,0.75)_0%,rgba(3,6,26,0.35)_40%,transparent_62%)]"
          />
          <div className="noise" style={{ opacity: 0.06 }} />

          {/* headline + intro (pointer events pass through to the 3D except on links) */}
          <div className="pointer-events-none relative mt-auto flex flex-col gap-8 p-6 pt-[46svh] md:p-12 md:pt-12 lg:p-14">
            <h1
              aria-label="Software Development Company in the USA."
              className="max-w-[760px] font-display text-[clamp(40px,6.4vw,104px)] font-extrabold uppercase leading-[0.92] tracking-[-0.045em] text-snow"
            >
              {lines.map((line, i) => (
                <span key={i} aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
                  <span className="line-up" style={{ animationDelay: `${120 + i * 110}ms` }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p
                className="hero-rise max-w-[480px] text-[15px] leading-[1.75] text-ink/75 md:text-[16px]"
                style={{ animationDelay: "600ms" }}
              >
                Palentrix is a software development company and software house in Parsippany, New Jersey, USA building SaaS MVPs, custom web apps, AI products, dashboards, and business automation systems for clients worldwide.
              </p>
              <div
                className="hero-rise pointer-events-auto flex flex-col gap-3 sm:flex-row"
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
      </div>

      {/* scroll marker row (Lusion) */}
      <div className="relative mx-auto hidden w-full max-w-[1320px] items-center justify-between px-6 py-6 md:flex">
        <span className="crosshair" />
        <span className="crosshair" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">Scroll to explore</span>
        <span className="crosshair" />
        <span className="crosshair" />
      </div>

      {/* stats */}
      <div className="hero-rise relative mt-6 w-full border-t border-border md:mt-0" style={{ animationDelay: "860ms" }}>
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
