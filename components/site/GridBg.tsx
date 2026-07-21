export function GridBg({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(11,95,170,0.22) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
        }}
      />
      {/* Subtle teal cross-lines at every 4th column/row */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(67,180,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(67,180,255,0.04) 1px, transparent 1px)",
          backgroundSize: "144px 144px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 90%)",
        }}
      />
    </div>
  );
}
