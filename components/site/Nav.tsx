"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PalentrixLogo } from "@/components/site/PalentrixLogo";
import { GlowField } from "@/components/site/GlowField";
import { siteConfig } from "@/lib/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/process", label: "Process" },
  { to: "/blog", label: "Blog" },
] as const;

const calendlyUrl = "https://calendly.com/palentrix/30min";

function isActivePath(pathname: string, to: string) {
  return pathname === to || (to !== "/" && pathname.startsWith(to));
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(5,10,26,0.55)" : "transparent",
          backdropFilter: scrolled ? "saturate(160%) blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(160%) blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(150,185,255,0.08)" : "1px solid transparent",
        }}
      >
        <div
          className={`mx-auto flex max-w-[1320px] items-center justify-between px-6 transition-[height] duration-300 ${
            scrolled ? "h-[64px]" : "h-[80px]"
          }`}
        >
          <Link href="/" className="flex items-center">
            <PalentrixLogo
              size={34}
              showWordmark
              className="transition-transform duration-200 hover:scale-[1.04]"
            />
          </Link>

          <nav
            aria-label="Primary"
            className="glass hidden items-center gap-0.5 rounded-full p-1 lg:flex"
          >
            {links.map((link) => {
              const isActive = isActivePath(pathname, link.to);
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-4 py-1.5 font-nav text-[13px] font-semibold transition-colors duration-300 ${
                    isActive ? "bg-ink text-void" : "text-ink/65 hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill btn-teal hidden h-10 px-5 text-[13px] sm:inline-flex"
            >
              Book a call
              <span className="pill-dot" aria-hidden="true" />
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="pill glass h-10 px-4 text-[13px] text-ink hover:border-ink/40 lg:hidden"
            >
              Menu
              <span className="flex flex-col gap-[3px]" aria-hidden="true">
                <span className="block h-px w-3.5 bg-current" />
                <span className="block h-px w-3.5 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[100] overflow-y-auto bg-void animate-in fade-in duration-300"
        >
          <GlowField intensity={0.55} tone="cyan" />
          <div className="relative mx-auto flex min-h-full max-w-[1320px] flex-col px-6">
            <div className="flex h-[80px] items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
                <PalentrixLogo size={34} showWordmark />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="pill glass h-10 px-4 text-[13px] text-ink"
              >
                Close
                <span className="relative block h-3 w-3" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-3 rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 h-px w-3 -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <div className="menu-list flex flex-1 flex-col justify-center py-10">
              {links.map((link, index) => {
                const isActive = isActivePath(pathname, link.to);
                return (
                  <Link
                    key={link.to}
                    href={link.to}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className="menu-word flex items-baseline gap-4 font-display text-[clamp(44px,12vw,120px)] font-extrabold uppercase leading-[0.98] tracking-[-0.04em] animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-fill-mode:both]"
                    style={{ animationDelay: `${80 + index * 60}ms` }}
                  >
                    <span className="font-mono text-[12px] font-normal tracking-[0.2em] text-ink/40">
                      0{index + 1}
                    </span>
                    <span className={isActive ? "text-gradient-indigo" : "text-snow"}>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={`mailto:${siteConfig.emails.contact}`}
                className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink/60 hover:text-glow"
              >
                {siteConfig.emails.contact}
              </a>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="pill btn-teal h-12 justify-center px-6 text-[15px]"
              >
                Book a call
                <span className="pill-dot" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
