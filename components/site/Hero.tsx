"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CTAButton } from "./CTAButton";
import { Noise } from "./Noise";
import { HeroVisuals } from "./HeroVisuals";
import { CountUp } from "./CountUp";

const Prism = dynamic(() => import("@/components/reactbits/Prism/Prism"), {
  ssr: false,
});

const ease = [0.16, 1, 0.3, 1] as const;
const headlineWords = ["We", "Engineer", "Products", "People", "Rely", "On."];
const calendlyUrl = "https://calendly.com/d/cvsh-jw5-d8x";

const heroStats = [
  { n: 50, suf: "+", label: "Projects shipped" },
  { n: 100, suf: "%", label: "Client retention" },
  { n: 3, suf: "+", label: "Years delivering" },
  { n: 24, suf: "hrs", label: "Avg response" },
];

export function Hero() {
  const [showPrism, setShowPrism] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => setShowPrism(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = globalThis.setTimeout(() => setShowPrism(true), 1500);
    return () => globalThis.clearTimeout(timerId);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col bg-void overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        {showPrism ? (
          <Prism
            animationType="hover"
            height={3.2}
            baseWidth={4.8}
            scale={3.4}
            glow={1.15}
            noise={0.12}
            bloom={1.4}
            hueShift={0.45}
            colorFrequency={1.35}
            hoverStrength={1.35}
            inertia={0.08}
            suspendWhenOffscreen
          />
        ) : null}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_42%,rgba(255,255,255,0.05)_0%,rgba(244,242,253,0.35)_40%,rgba(255,255,255,0.72)_72%,rgba(255,255,255,0.92)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
      <Noise />

      <div className="relative flex-1 flex items-center w-full">
        <div className="mx-auto max-w-[1240px] px-6 w-full py-28 grid lg:grid-cols-[1.15fr_1fr] gap-16 items-center">
        <div className="text-center lg:text-left">
        <div className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-indigo border border-indigo/30 rounded-full px-4 py-1.5 bg-indigo/5">
          [ Software Studio - Karachi, PK ]
        </div>

        <h1 className="mt-8 font-display font-extrabold text-[36px] md:text-[54px] leading-[1.1] tracking-normal">
          <span className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2">
            {headlineWords.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1">
                <span className={`inline-block ${i === 2 || i === 5 ? "text-gradient-indigo" : ""}`}>
                  {w}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <p className="mt-8 text-muted text-[16px] md:text-[18px] max-w-[560px] mx-auto lg:mx-0 leading-relaxed">
          Palentrix builds SaaS products, web & mobile applications, and business automations - shipped on time, built to scale, with zero shortcuts.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <CTAButton href={calendlyUrl}>Book a free call </CTAButton>
          <CTAButton to="/work" variant="ghost">See our work</CTAButton>
        </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="hidden lg:block"
        >
          <HeroVisuals />
        </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 1.1 }}
        className="relative w-full border-t border-[rgba(120,108,255,0.15)]"
      >
        <div className="mx-auto max-w-[1240px] px-6 py-8 grid grid-cols-2 md:grid-cols-4">
          {heroStats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center md:px-6 ${i > 0 ? "md:border-l border-[rgba(120,108,255,0.25)]" : ""}`}
            >
              <div className="font-display font-bold text-[32px] md:text-[40px] leading-none text-ink">
                <CountUp to={s.n} suffix={s.suf} />
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
