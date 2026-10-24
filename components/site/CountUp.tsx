"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders the real value on the server (so crawlers, no-JS visitors and slow
 * hydration never see "0"), then counts up from zero once the number scrolls
 * into view. Reduced-motion users get the final value with no animation.
 */
export function CountUp({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(to);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setV(to);
      return;
    }

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setV(p < 1 ? Math.round(to * eased) : to);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setV(0);
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {v}
      {suffix}
    </span>
  );
}
