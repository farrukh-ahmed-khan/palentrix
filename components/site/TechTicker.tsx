const techs = [
  "Next.js", "React", "NestJS", "Node.js", "TypeScript", "Python", "PostgreSQL",
  "MongoDB", "Supabase", "Stripe", "AWS", "Vercel", "React Native", "Tailwind CSS",
  "Redux", "REST API", "Webhooks", "JWT",
];

function Pill({ label }: { label: string }) {
  return (
    <span className="shrink-0 font-mono text-[12px] text-muted rounded-full px-[14px] py-[6px]" style={{ background: "rgba(120,108,255,0.06)", border: "1px solid rgba(120,108,255,0.15)" }}>
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
