"use client";

import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { CasesPreview } from "@/components/site/CasesPreview";
import { Process } from "@/components/site/Process";
import { LogosStrip } from "@/components/site/LogosStrip";
import { TechTicker } from "@/components/site/TechTicker";
import { Testimonials } from "@/components/site/Testimonials";
import { CTABanner } from "@/components/site/CTABanner";

export function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <CasesPreview />
      <LogosStrip />
      <Process />
      <TechTicker />
      <Testimonials />
      <CTABanner />
    </main>
  );
}
