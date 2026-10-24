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
  const base = "inline-flex h-12 w-full sm:w-auto items-center justify-center gap-1.5 px-6 rounded-xl font-display font-semibold text-[14.5px]";
  const cls = variant === "teal"
    ? `${base} btn-teal`
    : `${base} border border-ink/15 bg-white/80 text-ink shadow-[0_1px_2px_rgba(7,23,43,0.05)] backdrop-blur hover:-translate-y-px hover:border-indigo/40 hover:text-indigo hover:shadow-[0_0_0_3px_rgba(11,95,170,0.08),0_10px_24px_-14px_rgba(11,95,170,0.45)] active:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`;

  return (
    <span className="inline-flex">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
      ) : (
        <Link href={to ?? "/"} className={cls}>{children}</Link>
      )}
    </span>
  );
}
