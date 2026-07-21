/**
 * Soft glowing orbs â€” reuses aurora-a/b/c keyframes from styles.css.
 * Tuned for the Testimonials section (indigo/teal bias, lower opacity than AuroraBg).
 */
export function OrbsBg({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Large indigo orb â€” top-left */}
      <div
        style={{
          position: "absolute",
          width: "55%",
          height: "60%",
          left: "-8%",
          top: "-12%",
          background:
            "radial-gradient(circle, rgba(11,95,170,0.28) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "aurora-b 20s ease-in-out infinite",
        }}
      />
      {/* Teal orb â€” right-center */}
      <div
        style={{
          position: "absolute",
          width: "45%",
          height: "50%",
          right: "-6%",
          top: "15%",
          background:
            "radial-gradient(circle, rgba(67,180,255,0.18) 0%, transparent 70%)",
          filter: "blur(65px)",
          animation: "aurora-a 16s ease-in-out infinite",
          animationDelay: "-3s",
        }}
      />
      {/* Purple orb â€” bottom-center */}
      <div
        style={{
          position: "absolute",
          width: "60%",
          height: "50%",
          left: "15%",
          bottom: "-18%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)",
          filter: "blur(72px)",
          animation: "aurora-c 22s ease-in-out infinite",
        }}
      />
    </div>
  );
}
