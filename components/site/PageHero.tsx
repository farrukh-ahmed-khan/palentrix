import { Reveal } from "./Reveal";
import { Noise } from "./Noise";
import Antigravity from "@/components/reactbits/Antigravity/Antigravity";
import LaserFlow from "@/components/reactbits/LaserFlow/LaserFlow";

export function PageHero({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <section className="relative bg-void overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 opacity-55">
        <Antigravity
          count={160}
          color="#4D9DFF"
          particleShape="tetrahedron"
          particleSize={0.9}
          ringRadius={5.8}
          magnetRadius={7}
          waveAmplitude={0.55}
          autoAnimate
          rotationSpeed={0.18}
          fieldStrength={6}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_38%_34%,rgba(47,125,255,0.14)_0%,rgba(5,10,26,0.55)_54%,rgba(5,10,26,0.92)_100%)]" />
      <div className="absolute right-[8%] top-[25%] hidden h-[320px] w-[420px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(67,180,255,0.16),rgba(11,95,170,0.12)_42%,transparent_72%)] blur-3xl md:block" />
      <div className="absolute inset-y-0 right-0 hidden w-[62%] opacity-45 md:block">
        <LaserFlow
          color="#4D9DFF"
          horizontalBeamOffset={0.08}
          verticalBeamOffset={-0.34}
          horizontalSizing={0.62}
          verticalSizing={1.75}
          wispDensity={0.85}
          wispSpeed={12}
          wispIntensity={2.5}
          flowSpeed={0.28}
          flowStrength={0.18}
          fogIntensity={0.24}
          fogScale={0.38}
          fogFallSpeed={0.42}
          decay={1.05}
          falloffStart={1.05}
          mouseTiltStrength={0.018}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />
      <Noise />
      <div className="relative mx-auto max-w-[1200px] px-6 text-center md:text-left">
        <Reveal delay={0.1}>
          <h1 className="max-w-[980px] font-display font-extrabold text-[40px] md:text-[76px] leading-[0.98] tracking-[-0.04em] text-snow">{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.2}>
            <p className="mt-6 text-muted text-[17px] max-w-[680px] mx-auto md:mx-0 leading-relaxed">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
