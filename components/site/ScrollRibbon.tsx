"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";

/**
 * A quiet scroll accent that changes sides in measured gaps between content.
 * The path is built in real pixels from the container size (no stretched
 * viewBox), so stroke width and the scroll-driven draw stay correct.
 */

type Crossing = { y: number; halfHeight: number };

function buildPath(width: number, height: number, crossings: Crossing[]) {
  const gutter = Math.max(14, Math.min(180, (width - 1320) / 2 + 8));
  let left = true;
  let x = gutter;
  let y = 0;
  let d = `M ${x} 0`;

  // Bow gently toward the outer edge while passing a block of content.
  const followEdge = (end: number) => {
    const bow = left ? Math.max(10, gutter * 0.3) : width - Math.max(10, gutter * 0.3);
    const distance = end - y;
    d += ` C ${bow} ${y + distance * 0.32}, ${bow} ${y + distance * 0.68}, ${x} ${end}`;
    y = end;
  };

  for (const crossing of crossings) {
    const start = crossing.y - crossing.halfHeight;
    const end = crossing.y + crossing.halfHeight;
    if (start < y || end > height) continue;
    followEdge(start);
    const nextX = left ? width - gutter : gutter;
    // All control points stay inside the empty band, so the curve cannot
    // stray into the heading, image, or service copy above or below it.
    const bend = (end - start) * 0.65;
    d += ` C ${x} ${start + bend}, ${nextX} ${end - bend}, ${nextX} ${end}`;
    left = !left;
    x = nextX;
    y = end;
  }
  followEdge(height);
  return d;
}

// Layout offsets exclude the temporary transforms used by reveal animations.
function layoutTop(element: HTMLElement) {
  let top = 0;
  let current: HTMLElement | null = element;
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return top;
}

export function ScrollRibbon({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [size, setSize] = useState<{ w: number; h: number; d: string } | null>(null);
  const [head, setHead] = useState<{ x: number; y: number } | null>(null);

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start 0.75", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 55, damping: 28, mass: 0.6 });

  useEffect(() => {
    const box = boxRef.current;
    const target = targetRef.current;
    if (!box || !target) return;
    let frame = 0;
    const measure = () => {
      const { width, height } = box.getBoundingClientRect();
      if (!width || !height) {
        setSize(null);
        return;
      }
      const origin = layoutTop(target);
      const sections = Array.from(target.children).filter(
        (element): element is HTMLElement => element instanceof HTMLElement && element.tagName === "SECTION",
      );
      const crossings: Crossing[] = [];
      sections.forEach((section, index) => {
        if (index === 0) return;
        const previous = sections[index - 1];
        const gapStart = layoutTop(previous) - origin + previous.offsetHeight - parseFloat(getComputedStyle(previous).paddingBottom);
        const gapEnd = layoutTop(section) - origin + parseFloat(getComputedStyle(section).paddingTop);
        const halfHeight = Math.min(110, (gapEnd - gapStart) / 2 - 40);
        if (halfHeight >= 24) crossings.push({ y: (gapStart + gapEnd) / 2, halfHeight });
      });
      target.querySelectorAll<HTMLElement>("[data-ribbon-crossing]").forEach((row) => {
        // Each service row has 64px of desktop padding on both sides of
        // its divider. A 64px band leaves room for the halo and hover motion.
        crossings.push({ y: layoutTop(row) - origin, halfHeight: 32 });
      });
      crossings.sort((a, b) => a.y - b.y);
      const d = buildPath(width, height, crossings);
      setSize((prev) => prev?.w === width && prev.h === height && prev.d === d ? prev : { w: width, h: height, d });
    };
    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const ro = new ResizeObserver(scheduleMeasure);
    const observeLayout = () => {
      ro.disconnect();
      ro.observe(box);
      ro.observe(target);
      target.querySelectorAll(":scope > section, [data-ribbon-crossing]").forEach((element) => ro.observe(element));
      scheduleMeasure();
    };
    // Deferred sections mount independently; observe their arrival as well
    // as later font, image, and responsive layout changes.
    const mutations = new MutationObserver(observeLayout);
    mutations.observe(target, { childList: true });
    observeLayout();
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      mutations.disconnect();
    };
  }, [targetRef]);

  const d = size?.d ?? "";
  const stroke = 6;

  const placeHead = (value: number) => {
    const path = pathRef.current;
    if (!path || !d) return;
    const point = path.getPointAtLength(Math.min(1, Math.max(0, value)) * path.getTotalLength());
    setHead(value > 0.002 && value < 0.998 ? { x: point.x, y: point.y } : null);
  };

  useMotionValueEvent(progress, "change", placeHead);
  useEffect(() => placeHead(progress.get()), [d]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={boxRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block lg:motion-reduce:hidden">
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
          <path d={d} stroke="rgba(150,185,255,0.035)" strokeWidth={1} />

          {/* soft halo (wide, faint strokes — cheaper than a blur filter on a page-tall SVG) */}
          <motion.path
            d={d}
            stroke="url(#ribbon-grad)"
            strokeWidth={stroke * 3}
            strokeLinecap="round"
            opacity={0.025}
            style={{ pathLength: progress }}
          />
          <motion.path
            d={d}
            stroke="url(#ribbon-grad)"
            strokeWidth={stroke * 1.8}
            strokeLinecap="round"
            opacity={0.05}
            style={{ pathLength: progress }}
          />
          {/* core */}
          <motion.path
            ref={pathRef}
            d={d}
            stroke="url(#ribbon-grad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            opacity={0.35}
            style={{ pathLength: progress }}
          />
        </svg>
      ) : null}

      {/* glowing tip */}
      {head ? (
        <span
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8bcaff]/70 shadow-[0_0_10px_2px_rgba(67,180,255,0.2)]"
          style={{ left: head.x, top: head.y }}
        />
      ) : null}
    </div>
  );
}
