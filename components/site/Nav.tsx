"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { PalentrixLogo } from "@/components/site/PalentrixLogo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/process", label: "Process" },
  { to: "/blog", label: "Blog" },
] as const;

const calendlyUrl = "https://calendly.com/palentrix/30min";

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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "saturate(180%) blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(180%) blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(11,95,170,0.1)" : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 24px -20px rgba(7,23,43,0.35)" : "none",
        }}
      >
        <div
          className={`mx-auto max-w-[1200px] px-6 flex items-center justify-between transition-[height] duration-300 ${
            scrolled ? "h-[64px]" : "h-[72px]"
          }`}
        >
          <Link href="/" className="flex items-center">
            <PalentrixLogo
              size={38}
              showWordmark
              className="transition-transform duration-200 hover:scale-[1.04]"
            />
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-0.5 rounded-xl p-1">
            {links.map((link) => {
              const isActive = pathname === link.to || (link.to !== "/" && pathname.startsWith(link.to));

              return (
                <Link
                  key={link.to}
                  href={link.to}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3.5 py-2 rounded-lg font-nav text-[14px] font-semibold transition-colors duration-200 ${
                    isActive ? "text-indigo" : "text-ink/60 hover:text-ink hover:bg-indigo/[0.04]"
                  }`}
                >
                  {isActive ? (
                    <span
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: "rgba(11,95,170,0.07)",
                        boxShadow: "inset 0 0 0 1px rgba(11,95,170,0.12)",
                      }}
                    />
                  ) : null}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex h-10 items-center px-5 rounded-xl border border-indigo/35 bg-white/70 font-nav text-indigo text-[13.5px] font-semibold hover:bg-indigo hover:border-indigo hover:text-white transition-all duration-300 hover:shadow-[0_0_0_3px_rgba(11,95,170,0.14),0_10px_22px_-12px_rgba(11,95,170,0.6)]"
          >
            Book a call
          </a>

          <button
            aria-label="Open menu"
            aria-expanded={open}
            className="md:hidden -mr-2 flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-indigo/5"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[100] overflow-y-auto bg-white md:hidden animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between h-[72px] px-6">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
              <PalentrixLogo size={38} showWordmark />
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-indigo/5"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col gap-1 px-6 pt-6 pb-10">
            {links.map((link, index) => {
              const isActive = pathname === link.to || (link.to !== "/" && pathname.startsWith(link.to));

              return (
                <Link
                  key={link.to}
                  href={link.to}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`block border-b border-indigo/[0.08] py-3.5 font-nav text-[28px] font-bold tracking-normal animate-in fade-in slide-in-from-bottom-2 duration-300 [animation-fill-mode:both] ${
                    isActive ? "text-indigo" : "text-ink"
                  }`}
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  {link.label}
                </Link>
              );
            })}

            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex h-12 items-center justify-center px-6 rounded-xl btn-teal font-nav font-semibold text-[15px]"
            >
              Book a call
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
