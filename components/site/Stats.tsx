import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

const stats = [
  { n: 100, suf: "%", label: "Job success rate" },
  { n: 3, suf: "+", label: "Years delivering" },
  { n: 50, suf: "+", label: "Projects shipped" },
  { n: 4, suf: "hrs", label: "Average response" },
];

export function Stats() {
  return (
    <section className="bg-white text-[#0B0F1A] py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-0">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className={`text-center md:px-6 ${i > 0 ? "md:border-l border-[rgba(11,95,170,0.3)]" : ""}`}>
                <div className="font-display font-bold text-[56px] md:text-[72px] leading-none text-[#003B78]">
                  <CountUp to={s.n} suffix={s.suf} />
                </div>
                <div className="mt-3 font-mono text-[12px] uppercase tracking-[0.15em] text-[#8B95B0]">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
