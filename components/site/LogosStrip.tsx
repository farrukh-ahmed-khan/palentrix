export function LogosStrip() {
  const slots = Array.from({ length: 8 });
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[#8B95B0] mb-8">
          Trusted by teams at
        </p>
        <div className="marquee-pause overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
          <div className="marquee flex gap-8 w-max">
            {[...slots, ...slots].map((_, i) => (
              <div key={i} className="w-[140px] h-[44px] rounded-md bg-[#E4E6EE]" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
