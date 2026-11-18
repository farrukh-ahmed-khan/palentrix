/**
 * Glowing organic light field — a morphing blurred blob over a soft aurora haze.
 * Pure CSS, so it renders before hydration and costs no WebGL.
 */
export function GlowField({
  className = "",
  intensity = 1,
  tone = "blue",
}: {
  className?: string;
  intensity?: number;
  tone?: "blue" | "cyan";
}) {
  const core = tone === "cyan" ? "rgba(62,242,208,0.55)" : "rgba(67,180,255,0.55)";
  const ring = tone === "cyan" ? "rgba(67,180,255,0.35)" : "rgba(62,242,208,0.28)";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      {/* aurora haze (Dogstudio) */}
      <div
        className="absolute -left-[15%] -top-[20%] h-[70%] w-[60%] rounded-full blur-[110px]"
        style={{ background: "rgba(47,125,255,0.22)", animation: "aurora-a 18s ease-in-out infinite" }}
      />
      <div
        className="absolute -right-[10%] top-[5%] h-[60%] w-[55%] rounded-full blur-[120px]"
        style={{ background: "rgba(122,208,255,0.12)", animation: "aurora-b 22s ease-in-out infinite" }}
      />

      {/* glowing core shape (fromanother) */}
      <div
        className="glow-blob"
        style={{
          width: "min(62vw, 720px)",
          height: "min(42vw, 480px)",
          background: `radial-gradient(closest-side, ${core}, ${ring} 55%, transparent 100%)`,
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: "min(30vw, 340px)",
          height: "min(30vw, 340px)",
          background: "radial-gradient(closest-side, rgba(220,240,255,0.35), transparent)",
          animationDuration: "13s",
          animationDirection: "reverse",
          filter: "blur(40px)",
        }}
      />

      {/* grain */}
      <div className="noise" style={{ opacity: 0.07 }} />
    </div>
  );
}
