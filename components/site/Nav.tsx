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

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "linear-gradient(90deg, rgba(255,255,255,0.97), rgba(246,250,255,0.96), rgba(255,255,255,0.97))"
            : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-color)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <PalentrixLogo
              size={38}
              showWordmark
              className="transition-transform duration-200 hover:scale-[1.04]"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.to || (link.to !== "/" && pathname.startsWith(link.to));

              return (
                <Link
                  key={link.to}
                  href={link.to}
                  className={`relative px-3.5 py-1.5 rounded-lg text-[14px] font-medium tracking-wide transition-colors duration-200 ${
                    isActive ? "text-indigo" : "nav-link text-ink/60 hover:text-ink"
                  }`}
                  style={{ fontFamily: "var(--font-nav)" }}
                >
                  {isActive ? (
                    <span
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: "rgba(11,95,170,0.08)",
                        border: "1px solid rgba(11,95,170,0.16)",
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
            className="hidden md:inline-flex items-center px-5 py-2 rounded-lg border border-indigo/50 text-indigo text-[13px] font-semibold tracking-wide hover:bg-indigo hover:border-indigo hover:text-white transition-all duration-300 hover:shadow-[0_0_0_3px_rgba(11,95,170,0.18)]"
          >
            Book a call
          </a>

          <button aria-label="Menu" className="md:hidden text-ink" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[100] bg-white md:hidden">
          <div className="flex items-center justify-between h-[72px] px-6">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
              <PalentrixLogo size={38} showWordmark />
            </Link>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col gap-2 px-6 pt-8">
            {links.map((link) => {
              const isActive = pathname === link.to || (link.to !== "/" && pathname.startsWith(link.to));

              return (
                <Link
                  key={link.to}
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className={`block text-3xl font-semibold tracking-tight py-2 ${
                    isActive ? "text-indigo" : "text-ink"
                  }`}
                  style={{ fontFamily: "var(--font-nav)" }}
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
              className="mt-6 inline-flex items-center justify-center px-6 py-3.5 rounded-lg btn-teal font-semibold tracking-wide text-[15px]"
            >
              Book a call
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
