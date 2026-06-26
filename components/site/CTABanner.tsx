"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { CTAButton } from "./CTAButton";

const LiquidEther = dynamic(() => import("@/components/reactbits/LiquidEther/LiquidEther"), {
  ssr: false,
});

const calendlyUrl = "https://calendly.com/d/cvsh-jw5-d8x";

export function CTABanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showLiquidEther, setShowLiquidEther] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || showLiquidEther) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowLiquidEther(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [showLiquidEther]);

  return (
    <section ref={sectionRef} className="relative bg-void py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-55">
        {showLiquidEther ? (
          <LiquidEther
            colors={["#32C8FF", "#786CFF", "#F4F5F9"]}
            mouseForce={24}
            cursorSize={120}
            resolution={0.36}
            autoDemo
            autoSpeed={0.36}
            autoIntensity={1.7}
            autoResumeDelay={900}
          />
        ) : null}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(255,255,255,0.08)_0%,rgba(244,242,253,0.7)_52%,rgba(255,255,255,0.92)_100%)]" />
      <div className="relative mx-auto max-w-[1200px] px-6 text-center">
        <Reveal>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.1] tracking-normal">
            <span className="text-gradient-indigo">Ready to Build Something That Works?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-muted text-[17px] max-w-[640px] mx-auto leading-relaxed">
            Send us your project. We'll respond with a clear technical approach within 24 hours.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href={calendlyUrl}>Book a free call </CTAButton>
            <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <a
                href="mailto:hello@palentrix.com"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-lg font-semibold text-[14px] tracking-wide border border-indigo/30 text-indigo/80 hover:border-indigo hover:text-indigo hover:bg-indigo/5 hover:shadow-[0_0_0_3px_rgba(120,108,255,0.1)] transition-all duration-300"
              >
                hello@palentrix.com
              </a>
            </motion.span>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-8 font-mono text-[12px] text-muted uppercase tracking-wider">
            No contracts· No retainers· Pay per project
          </p>
        </Reveal>
      </div>
    </section>
  );
}
