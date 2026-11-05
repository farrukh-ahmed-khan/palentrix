"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ScrollRibbon } from "@/components/site/ScrollRibbon";

const ReelSection = dynamic(
  () => import("@/components/site/ReelSection").then((mod) => mod.ReelSection),
  { ssr: false },
);

const Services = dynamic(() => import("@/components/site/Services").then((mod) => mod.Services), {
  ssr: false,
});

const CasesPreview = dynamic(
  () => import("@/components/site/CasesPreview").then((mod) => mod.CasesPreview),
  { ssr: false },
);

const TechTicker = dynamic(() => import("@/components/site/TechTicker").then((mod) => mod.TechTicker), {
  ssr: false,
});

const Process = dynamic(() => import("@/components/site/Process").then((mod) => mod.Process), {
  ssr: false,
});

const Testimonials = dynamic(
  () => import("@/components/site/Testimonials").then((mod) => mod.Testimonials),
  { ssr: false },
);

const CTABanner = dynamic(() => import("@/components/site/CTABanner").then((mod) => mod.CTABanner), {
  ssr: false,
});

const interactionEvents = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const;

export function DeferredHomeSections() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ribbonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    const loadSections = () => setShouldLoad(true);

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, loadSections, { once: true, passive: true });
    });

    // Fallback so sections still appear for visitors who don't interact.
    const idleTimer = window.setTimeout(loadSections, 3500);

    return () => {
      window.clearTimeout(idleTimer);
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, loadSections);
      });
    };
  }, [shouldLoad]);

  if (!shouldLoad) {
    return <div aria-hidden="true" className="h-px bg-void" />;
  }

  return (
    <>
      <ReelSection />
      {/* one continuous ribbon weaves through these sections on scroll */}
      <div ref={ribbonRef} className="relative">
        <ScrollRibbon targetRef={ribbonRef} />
        <Services />
        <CasesPreview />
        <TechTicker />
        <Process />
        <Testimonials />
      </div>
      <CTABanner />
    </>
  );
}
