"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    const loadSections = () => setShouldLoad(true);

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, loadSections, { once: true, passive: true });
    });

    return () => {
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
      <Services />
      <CasesPreview />
      <TechTicker />
      <Process />
      <Testimonials />
      <CTABanner />
    </>
  );
}
