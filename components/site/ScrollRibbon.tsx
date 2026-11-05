"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";

/**
 * Lusion-style light ribbon that weaves left ↔ right through the sections
 * inside `targetRef`, drawing itself as you scroll.
 * The path is built in real pixels from the container size (no stretched
 * viewBox), so stroke width and the scroll-driven draw stay correct.
 */

// horizontal stops as a fraction of width, top → bottom (outside 0–1 leaves the screen)
const STOPS = [-0.06, 1.06, 0.05, 1.06, -0.05, 0.98, 0.1, 1.06];

function buildPath(width: number, height: number) {
  const segment = height / (STOPS.length - 1);
  const x = (f: number) => (f * width).toFixed(1);
  let d = `M ${x(STOPS[0])} 0`;
  for (let i = 1; i < STOPS.length; i++) {
    const y0 = (i - 1) * segment;
    const y1 = i * segment;
    d += ` C ${x(STOPS[i - 1])} ${(y0 + segment * 0.62).toFixed(1)}, ${x(STOPS[i])} ${(y1 - segment * 0.62).toFixed(1)}, ${x(STOPS[i])} ${y1.toFixed(1)}`;
  }
  return d;
}

export function ScrollRibbon({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [head, setHead] = useState<{ x: number; y: number } | null>(null);

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start 0.75", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const measure = () => {
      const { width, height } = box.getBoundingClientRect();
      setSize((prev) =>
        prev && Math.abs(prev.w - width) < 1 && Math.abs(prev.h - height) < 1 ? prev : { w: width, h: height },
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  const d = useMemo(() => (size ? buildPath(size.w, size.h) : ""), [size]);
  const stroke = size && size.w < 768 ? 7 : 12;

  const placeHead = (value: number) => {
    const path = pathRef.current;
    if (!path || !d) return;
    const point = path.getPointAtLength(Math.max(0.001, value) * path.getTotalLength());
    setHead(value > 0.002 && value < 0.998 ? { x: point.x, y: point.y } : null);
  };

  useMotionValueEvent(progress, "change", placeHead);
  useEffect(() => placeHead(progress.get()), [d]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={boxRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {size ? (
        <svg className="absolute inset-0" width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} fill="none">
          <defs>
            <linearGradient id="ribbon-grad" x1="0" y1="0" x2="0" y2={size.h} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2f6bff" />
              <stop offset="35%" stopColor="#43b4ff" />
              <stop offset="65%" stopColor="#3ef2d0" />
              <stop offset="100%" stopColor="#2f6bff" />
            </linearGradient>
          </defs>

          {/* faint guide of the full route */}
          <path d={d} stroke="rgba(150,185,255,0.07)" strokeWidth={2} />

          {/* soft halo (wide, faint strokes — cheaper than a blur filter on a page-tall SVG) */}
          <motion.path
            d={d}
            stroke="url(#ribbon-grad)"
            strokeWidth={stroke * 3.2}
            strokeLinecap="round"
            opacity={0.08}
            style={{ pathLength: progress }}
          />
          <motion.path
            d={d}
            stroke="url(#ribbon-grad)"
            strokeWidth={stroke * 1.9}
            strokeLinecap="round"
            opacity={0.16}
            style={{ pathLength: progress }}
          />
          {/* core */}
          <motion.path
            ref={pathRef}
            d={d}
            stroke="url(#ribbon-grad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            style={{ pathLength: progress }}
          />
        </svg>
      ) : null}

      {/* glowing tip */}
      {head ? (
        <span
          className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-snow shadow-[0_0_24px_8px_rgba(67,180,255,0.7)]"
          style={{ left: head.x, top: head.y }}
        />
      ) : null}
    </div>
  );
}
