export function AuroraBg({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Teal blob â€” top-left */}
      <div
        className="absolute rounded-full"
        style={{
          width: "65%",
          height: "65%",
          left: "-10%",
          top: "-15%",
          background: "radial-gradient(circle, rgba(50,200,255,0.38) 0%, transparent 70%)",
          filter: "blur(72px)",
          animation: "aurora-a 16s ease-in-out infinite",
        }}
      />
      {/* Indigo blob â€” top-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: "72%",
          height: "68%",
          right: "-18%",
          top: "0%",
          background: "radial-gradient(circle, rgba(120,108,255,0.45) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "aurora-b 20s ease-in-out infinite",
        }}
      />
      {/* Purple blob â€” bottom-center */}
      <div
        className="absolute rounded-full"
        style={{
          width: "55%",
          height: "60%",
          left: "22%",
          bottom: "-20%",
          background: "radial-gradient(circle, rgba(168,85,247,0.32) 0%, transparent 70%)",
          filter: "blur(64px)",
          animation: "aurora-c 13s ease-in-out infinite",
        }}
      />
      {/* Small teal accent â€” bottom-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: "38%",
          height: "38%",
          right: "4%",
          bottom: "8%",
          background: "radial-gradient(circle, rgba(50,200,255,0.22) 0%, transparent 70%)",
          filter: "blur(52px)",
          animation: "aurora-a 11s ease-in-out infinite reverse",
          animationDelay: "-5s",
        }}
      />
    </div>
  );
}
