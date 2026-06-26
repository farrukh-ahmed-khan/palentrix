"use client";

import Link from "next/link";
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
    : `${base} border border-ink/30 text-ink/80 hover:border-indigo hover:text-indigo hover:bg-indigo/5 hover:shadow-[0_0_0_3px_rgba(120,108,255,0.12)] transition-all duration-300`;

  return (
    <span className="inline-block transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97]">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
      ) : (
        <Link href={to ?? "/"} className={cls}>{children}</Link>
      )}
    </span>
  );
}
