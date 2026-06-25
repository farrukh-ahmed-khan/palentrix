import type { CSSProperties } from "react";

const beams = [
  { left: "4%", delay: "-1s", duration: "7.5s", height: "170px", opacity: 0.28 },
  { left: "10%", delay: "-6s", duration: "9.6s", height: "230px", opacity: 0.18 },
  { left: "17%", delay: "-3s", duration: "8.4s", height: "200px", opacity: 0.24 },
  { left: "24%", delay: "-8s", duration: "10.5s", height: "280px", opacity: 0.16 },
  { left: "31%", delay: "-2s", duration: "7.8s", height: "190px", opacity: 0.26 },
  { left: "39%", delay: "-5s", duration: "9.2s", height: "250px", opacity: 0.2 },
  { left: "47%", delay: "-9s", duration: "11s", height: "310px", opacity: 0.15 },
  { left: "55%", delay: "-4s", duration: "8.8s", height: "215px", opacity: 0.22 },
  { left: "63%", delay: "-7s", duration: "9.8s", height: "265px", opacity: 0.17 },
  { left: "70%", delay: "-2.5s", duration: "8.1s", height: "180px", opacity: 0.24 },
  { left: "78%", delay: "-6.5s", duration: "10.2s", height: "245px", opacity: 0.18 },
  { left: "86%", delay: "-3.5s", duration: "7.7s", height: "205px", opacity: 0.25 },
  { left: "93%", delay: "-8.5s", duration: "9.4s", height: "235px", opacity: 0.19 },
  { left: "98%", delay: "-5.5s", duration: "8.6s", height: "190px", opacity: 0.22 },
];

export function LightfallBg() {
  return (
    <div className="lightfall-bg" aria-hidden="true">
      <div className="lightfall-glow lightfall-glow-a" />
      <div className="lightfall-glow lightfall-glow-b" />
      {beams.map((beam) => (
        <span
          key={beam.left}
          className="lightfall-beam"
          style={
            {
              left: beam.left,
              animationDelay: beam.delay,
              animationDuration: beam.duration,
              height: beam.height,
              "--beam-opacity": beam.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
