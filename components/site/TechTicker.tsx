const techs = [
  "Next.js", "React", "NestJS", "Node.js", "TypeScript", "Python", "PostgreSQL",
  "MongoDB", "Supabase", "Stripe", "AWS", "Vercel", "React Native", "Tailwind CSS",
  "Redux", "REST API", "Webhooks", "JWT",
];

function Pill({ label }: { label: string }) {
  return (
    <span className="shrink-0 font-mono text-[12px] text-ink/60 rounded-full bg-white px-[14px] py-[7px] shadow-[0_1px_2px_rgba(7,23,43,0.04)] transition-colors hover:text-indigo" style={{ border: "1px solid rgba(11,95,170,0.13)" }}>
      {label}
    </span>
  );
}

export function TechTicker() {
  return (
    <section className="bg-void py-16 marquee-pause">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-6">Built with</p>
      <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
        <div className="marquee flex gap-3 w-max">
          {[...techs, ...techs].map((t, i) => <Pill key={"a"+i} label={t} />)}
        </div>
      </div>
      <div className="overflow-hidden mt-3" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
        <div className="marquee-reverse flex gap-3 w-max">
          {[...techs, ...techs].map((t, i) => <Pill key={"b"+i} label={t} />)}
        </div>
      </div>
    </section>
  );
}
