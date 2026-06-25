"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
] as const;

const calendlyUrl = "https://calendly.com/d/cvsh-jw5-d8x";

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
            ? "linear-gradient(90deg, rgba(255,255,255,0.97), rgba(248,246,255,0.96), rgba(255,255,255,0.97))"
            : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-color)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/brand/palentrix-logo-dark.png"
              alt="Palentrix"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                className={
                  pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to))
                    ? "nav-link text-[14px] text-indigo font-semibold"
                    : "nav-link text-[14px] text-ink/70 hover:text-ink transition-colors"
                }
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-5 py-2 rounded-lg border border-indigo/50 text-indigo text-[13px] font-semibold tracking-wide hover:bg-indigo hover:border-indigo hover:text-white transition-all duration-300 hover:shadow-[0_0_0_3px_rgba(120,108,255,0.18)]"
          >
            Book a call
          </a>
          <button
            aria-label="Menu"
            className="md:hidden text-ink"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white md:hidden"
          >
            <div className="flex items-center justify-between h-[72px] px-6">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
                <img
                  src="/brand/palentrix-logo-dark.png"
                  alt="Palentrix"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <button onClick={() => setOpen(false)} aria-label="Close"><X size={22} /></button>
            </div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
              className="flex flex-col gap-4 px-6 pt-8"
            >
              {links.map((l) => (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl font-bold"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center px-6 py-3.5 rounded-lg btn-teal font-semibold tracking-wide text-[15px]"
              >
                Book a call 
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
