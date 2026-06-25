import { useId } from "react";

const BEAMS = [
  { x: "7%",  delay: 0,   dur: 5.5 },
  { x: "17%", delay: 0.9, dur: 4.5 },
  { x: "28%", delay: 1.8, dur: 6.0 },
  { x: "40%", delay: 0.4, dur: 5.0 },
  { x: "53%", delay: 2.2, dur: 4.8 },
  { x: "64%", delay: 1.1, dur: 5.8 },
  { x: "76%", delay: 0.6, dur: 4.2 },
  { x: "88%", delay: 1.7, dur: 5.2 },
];

export function BeamsBg({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`bm-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(50,200,255,0)"    />
            <stop offset="30%"  stopColor="rgba(120,108,255,0.45)" />
            <stop offset="65%"  stopColor="rgba(50,200,255,0.18)"  />
            <stop offset="100%" stopColor="rgba(50,200,255,0)"    />
          </linearGradient>
        </defs>
        {BEAMS.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y="0"
            width="0.7%"
            height="100%"
            fill={`url(#bm-${uid})`}
            style={{
              animation: `beam-rise ${b.dur}s ease-in-out infinite`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </svg>
      {/* Central radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(120,108,255,0.13) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
