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

/* Pill buttons with a status dot, in the style of Lusion's "Let's talk ●" */
export function CTAButton({ to, href, children, variant = "teal" }: CTAButtonProps) {
  const base =
    "pill h-12 w-full sm:w-auto justify-center px-6 text-[14.5px]";
  const cls =
    variant === "teal"
      ? `${base} btn-teal`
      : `${base} border border-ink/20 bg-ink/[0.03] text-ink backdrop-blur hover:border-ink/60 hover:bg-ink hover:text-void`;

  const content = (
    <>
      <span>{children}</span>
      <span className="pill-dot" aria-hidden="true" />
    </>
  );

  return (
    <span className="inline-flex">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {content}
        </a>
      ) : (
        <Link href={to ?? "/"} className={cls}>
          {content}
        </Link>
      )}
    </span>
  );
}
