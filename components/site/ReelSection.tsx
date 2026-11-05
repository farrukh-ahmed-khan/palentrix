"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, X } from "lucide-react";

const REEL_SRC = "/video/palentrix-reel.mp4";
const REEL_POSTER = "/video/palentrix-reel-poster.jpg";

/**
 * Lusion-style "PLAY ● REEL": the reel frame grows from a card to (almost)
 * full-bleed while scrolling, the two words slide apart around it.
 */
export function ReelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const width = useTransform(scrollYProgress, [0, 0.75], ["38%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.75], ["42%", "100%"]);
  const radius = useTransform(scrollYProgress, [0, 0.75], [28, 18]);
  const leftX = useTransform(scrollYProgress, [0, 0.75], ["0vw", "-30vw"]);
  const rightX = useTransform(scrollYProgress, [0, 0.75], ["0vw", "30vw"]);
  const wordOpacity = useTransform(scrollYProgress, [0.45, 0.75], [1, 0]);

  // Only play the inline loop while it is on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload !== "auto") video.preload = "auto";
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section ref={sectionRef} aria-label="Palentrix showreel" className="relative h-[220vh] bg-void">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-3 py-20 md:px-6 md:py-24">
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play the Palentrix showreel"
          style={{ width, height, borderRadius: radius }}
          className="group relative z-10 min-h-[220px] min-w-[280px] max-w-[1320px] overflow-hidden border border-border bg-[#060c22] shadow-[0_40px_120px_-40px_rgba(47,107,255,0.6)]"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={REEL_SRC}
            poster={REEL_POSTER}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
          <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(3,6,26,0.55))]" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-snow text-void shadow-[0_10px_40px_-10px_rgba(67,180,255,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 md:h-20 md:w-20">
            <Play size={22} fill="currentColor" className="translate-x-[2px]" />
          </span>
        </motion.button>

        {/* PLAY · REEL */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: wordOpacity }}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center gap-[24vw] font-display text-[clamp(56px,11vw,180px)] font-extrabold uppercase leading-none tracking-[-0.05em] text-snow mix-blend-difference"
        >
          <motion.span style={{ x: leftX }}>Play</motion.span>
          <motion.span style={{ x: rightX }}>Reel</motion.span>
        </motion.div>

        {/* Lusion crosshair corners */}
        <div className="pointer-events-none absolute inset-x-6 bottom-6 hidden items-center justify-between md:flex">
          <span className="crosshair" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/45">Showreel — 2026</span>
          <span className="crosshair" />
        </div>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Palentrix showreel"
          className="fixed inset-0 z-[150] flex items-center justify-center bg-[rgba(2,4,14,0.92)] p-4 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close showreel"
            className="pill glass absolute right-5 top-5 h-10 px-4 text-[13px] text-ink"
          >
            Close <X size={14} />
          </button>
          <video
            className="max-h-[85vh] w-full max-w-[1400px] rounded-[18px] border border-border bg-black"
            src={REEL_SRC}
            poster={REEL_POSTER}
            controls
            autoPlay
            playsInline
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}
