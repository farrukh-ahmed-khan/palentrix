"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorDot() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 36 });
  const sy = useSpring(y, { stiffness: 520, damping: 36 });
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.classList.add("custom-cursor-enabled");
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 13);
      y.set(e.clientY - 14);
    };

    const updateActive = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      setActive(Boolean(target?.closest("a, button, input, textarea, select, [role='button']")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", updateActive);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", updateActive);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      animate={{ scale: active ? 1.28 : 1, rotate: active ? -8 : 0 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed top-0 left-0 z-[300] flex h-7 w-7 items-center justify-center font-display text-[26px] font-black leading-none tracking-normal text-transparent mix-blend-screen"
      aria-hidden="true"
    >
      <span className="palentrix-x-cursor">X</span>
    </motion.div>
  );
}
