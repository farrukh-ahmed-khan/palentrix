"use client";

import { useEffect, useRef } from "react";

/** Lusion-style interactive 3D cluster that lives inside the hero banner frame. */
export function HeroCrosses() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let disposed = false;
    let cleanup = () => {};

    import("@/lib/cross-field").then(({ createCrossField }) => {
      if (disposed) return;

      const small = window.matchMedia("(max-width: 767px)").matches;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let field: ReturnType<typeof createCrossField>;
      try {
        field = createCrossField(canvas, {
          count: small ? 20 : 34,
          pixelRatio: Math.min(window.devicePixelRatio, small ? 1.5 : 2),
          seed: 11,
        });
      } catch {
        return; // no WebGL — the frame's gradient stays as the backdrop
      }

      // Where the cluster sits: right half on landscape frames (headline lives
      // on the left), upper part on portrait/mobile frames (headline below).
      const base = { x: 0, y: 0 };
      const resize = () => {
        const { width, height } = wrap.getBoundingClientRect();
        field.resize(width, height);
        const aspect = width / Math.max(1, height);
        if (aspect >= 1) {
          const halfH = 24 * Math.tan((16 * Math.PI) / 180);
          base.x = halfH * aspect * 0.42;
          base.y = halfH * 0.08;
        } else {
          const halfH = 24 * Math.tan((25 * Math.PI) / 180);
          base.x = 0;
          base.y = halfH * 0.36;
        }
        field.setAttractor(base.x, base.y, 0);
        field.render();
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(wrap);

      if (reduceMotion) {
        for (let i = 0; i < 240; i++) field.step(1 / 60);
        field.render();
      }

      // Listen on the whole banner so the headline overlay doesn't block the cursor.
      const surface = wrap.parentElement ?? wrap;

      const onMove = (event: PointerEvent) => {
        const rect = wrap.getBoundingClientRect();
        field.setPointer(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
          true,
        );
      };
      const onLeave = () => field.setPointer(0, 0, false);
      surface.addEventListener("pointermove", onMove);
      surface.addEventListener("pointerleave", onLeave);

      let visible = false;
      let raf = 0;
      let last = performance.now();
      const start = last;

      const loop = (now: number) => {
        raf = 0;
        if (!visible || document.hidden || reduceMotion) return;
        const dt = Math.min((now - last) / 1000, 1 / 30);
        last = now;
        const t = (now - start) / 1000;
        // slow idle wander so the cluster always breathes
        field.setAttractor(base.x + Math.sin(t * 0.35) * 0.6, base.y + Math.cos(t * 0.27) * 0.35, 0);
        field.step(dt);
        field.render();
        raf = requestAnimationFrame(loop);
      };
      const kick = () => {
        if (!raf && visible && !document.hidden && !reduceMotion) {
          last = performance.now();
          raf = requestAnimationFrame(loop);
        }
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        kick();
      });
      io.observe(wrap);
      document.addEventListener("visibilitychange", kick);

      cleanup = () => {
        if (raf) cancelAnimationFrame(raf);
        io.disconnect();
        resizeObserver.disconnect();
        document.removeEventListener("visibilitychange", kick);
        surface.removeEventListener("pointermove", onMove);
        surface.removeEventListener("pointerleave", onLeave);
        field.dispose();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0">
      <canvas ref={canvasRef} className="hero-canvas block h-full w-full" aria-hidden="true" />
    </div>
  );
}
