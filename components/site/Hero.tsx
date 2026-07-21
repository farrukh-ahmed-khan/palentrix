"use client";

import { CTAButton } from "./CTAButton";
import { Noise } from "./Noise";
import { CountUp } from "./CountUp";
import { HeroVisuals } from "./HeroVisuals";
import Link from "next/link";

const headlineWords = ["Software", "Development", "Company", "in", "Pakistan."];
const calendlyUrl = "https://calendly.com/palentrix/30min";
const seoLinks = [
  { href: "/software-house-pakistan", label: "Software House Pakistan" },
  { href: "/saas-mvp-development", label: "SaaS MVP Development" },
  { href: "/nextjs-development", label: "Next.js Agency" },
  { href: "/ai-web-app-development", label: "AI App Development" },
];

const heroStats = [
  { n: 50, suf: "+", label: "Projects shipped" },
  { n: 100, suf: "%", label: "Client retention" },
  { n: 3, suf: "+", label: "Years delivering" },
  { n: 24, suf: "hrs", label: "Avg response" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-void overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(67,180,255,0.12),transparent_30%),radial-gradient(circle_at_78%_20%,rgba(23,139,210,0.14),transparent_34%),linear-gradient(135deg,rgba(11,95,170,0.08),transparent_42%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_42%,rgba(255,255,255,0.05)_0%,rgba(241,246,252,0.35)_40%,rgba(255,255,255,0.72)_72%,rgba(255,255,255,0.92)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
      <Noise />

      <div className="relative flex-1 flex items-center w-full">
        <div className="mx-auto max-w-[1240px] px-6 w-full py-28 grid lg:grid-cols-[1.15fr_1fr] gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-indigo border border-indigo/30 rounded-full px-4 py-1.5 bg-indigo/5">
              [ Software House - Karachi, Pakistan ]
            </div>

            <h1 className="mt-8 font-display font-extrabold text-[36px] md:text-[54px] leading-[1.1] tracking-normal">
              <span className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2">
                {headlineWords.map((word, index) => (
                  <span key={word} className="inline-block overflow-hidden pb-1">
                    <span className={`inline-block ${index === 0 || index === 4 ? "text-gradient-indigo" : ""}`}>
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            </h1>

            <p className="mt-8 text-muted text-[16px] md:text-[18px] max-w-[560px] mx-auto lg:mx-0 leading-relaxed">
              Palentrix is a software development company and software house in Karachi, Pakistan building SaaS MVPs, custom web apps, AI products, dashboards, and business automation systems for clients worldwide.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <CTAButton href={calendlyUrl}>Book a free call </CTAButton>
              <CTAButton to="/work" variant="ghost">
                See our work
              </CTAButton>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
              {seoLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-indigo/15 bg-white/70 px-3 py-1.5 text-[12px] text-muted transition-colors hover:border-indigo hover:text-indigo"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <HeroVisuals />
          </div>
        </div>
      </div>

      <div className="relative w-full border-t border-[rgba(11,95,170,0.15)]">
        <div className="mx-auto max-w-[1240px] px-6 py-8 grid grid-cols-2 md:grid-cols-4">
          {heroStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center md:px-6 ${index > 0 ? "md:border-l border-[rgba(11,95,170,0.25)]" : ""}`}
            >
              <div className="font-display font-bold text-[32px] md:text-[40px] leading-none text-ink">
                <CountUp to={stat.n} suffix={stat.suf} />
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
