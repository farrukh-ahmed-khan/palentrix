"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CTAButtonProps = {
  children: ReactNode;
  variant?: "teal" | "ghost";
} & (
  | { to: string; href?: never }
  | { href: string; to?: never }
);

export function CTAButton({ to, href, children, variant = "teal" }: CTAButtonProps) {
  const base = "inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-lg font-semibold text-[14px] tracking-wide";
  const cls = variant === "teal"
    ? `${base} btn-teal`
    : `${base} border border-ink/20 text-ink/70 hover:border-indigo hover:text-indigo hover:bg-indigo/5 hover:shadow-[0_0_0_3px_rgba(120,108,255,0.1)] transition-all duration-300`;

  return (
    <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
      ) : (
        <Link href={to ?? "/"} className={cls}>{children}</Link>
      )}
    </motion.span>
  );
}
