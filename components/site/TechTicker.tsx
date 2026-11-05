const techs = [
  "Next.js", "React", "NestJS", "Node.js", "TypeScript", "Python", "PostgreSQL",
  "MongoDB", "Supabase", "Stripe", "AWS", "Vercel", "React Native", "Tailwind CSS",
  "Redux", "REST API", "Webhooks", "JWT",
];

const half = Math.ceil(techs.length / 2);
const rowA = techs.slice(0, half);
const rowB = techs.slice(half);

/* Big tilted word bands, like fromanother's slanted client list. */
function Band({ items, reverse, outline }: { items: string[]; reverse?: boolean; outline?: boolean }) {
  return (
    <div className="overflow-hidden py-2">
      <div
        className={`${reverse ? "marquee-reverse" : "marquee"} flex w-max items-center gap-10 md:gap-14`}
        style={{ animationDuration: "60s" }}
      >
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10 md:gap-14">
            <span
              className={`font-display text-[44px] font-extrabold uppercase leading-none tracking-[-0.04em] transition-colors duration-500 md:text-[88px] ${
                outline ? "text-outline hover:text-glow" : "text-snow/90 hover:text-glow"
              }`}
            >
              {t}
            </span>
            <span className="serif-accent text-[36px] text-indigo md:text-[64px]" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechTicker() {
  return (
    <section className="marquee-pause relative overflow-hidden bg-void py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(47,125,255,0.16)] blur-[120px]" />
      <p className="relative mb-12 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50">
        Built with
      </p>
      <div
        className="relative -rotate-[4deg] scale-[1.08]"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <Band items={rowA} />
        <Band items={rowB} reverse outline />
      </div>
    </section>
  );
}
