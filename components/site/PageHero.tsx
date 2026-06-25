import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { Noise } from "./Noise";
import Antigravity from "@/components/reactbits/Antigravity/Antigravity";
import LaserFlow from "@/components/reactbits/LaserFlow/LaserFlow";

export function PageHero({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <section className="relative bg-void overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 opacity-55">
        <Antigravity
          count={160}
          color="#786CFF"
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
      <div className="absolute inset-y-0 right-0 hidden w-[62%] opacity-30 md:block">
        <LaserFlow
          color="#32C8FF"
          horizontalBeamOffset={0.08}
          verticalBeamOffset={-0.34}
          horizontalSizing={0.62}
          verticalSizing={1.75}
          wispDensity={0.85}
          wispSpeed={12}
          wispIntensity={3.2}
          flowSpeed={0.28}
          flowStrength={0.22}
          fogIntensity={0.32}
          fogScale={0.38}
          fogFallSpeed={0.42}
          decay={1.05}
          falloffStart={1.05}
          mouseTiltStrength={0.018}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_38%_34%,rgba(120,108,255,0.08)_0%,rgba(244,242,253,0.6)_54%,rgba(255,255,255,0.9)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      <Noise />
      <div className="relative mx-auto max-w-[1200px] px-6 text-center md:text-left">
        <Reveal><div className="flex justify-center md:justify-start"><SectionLabel>{label}</SectionLabel></div></Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-[860px] font-display font-extrabold text-4xl md:text-6xl leading-[1.1] tracking-normal">{title}</h1>
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
