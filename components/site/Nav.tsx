"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/process", label: "Process" },
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
          {/* Logo with subtle spring on hover */}
          <Link href="/" className="flex items-center">
            <motion.img
              src="/brand/palentrix-logo-nav.png"
              alt="Palentrix"
              width={112}
              height={80}
              className="h-10 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            />
          </Link>

          {/* Desktop nav — animated sliding pill for active link */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const isActive =
                pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
              return (
                <Link
                  key={l.to}
                  href={l.to}
                  className={`relative px-3.5 py-1.5 rounded-lg text-[14px] font-medium tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-indigo"
                      : "nav-link text-ink/60 hover:text-ink"
                  }`}
                  style={{ fontFamily: "var(--font-nav)" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: "rgba(120,108,255,0.08)",
                        border: "1px solid rgba(120,108,255,0.16)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </Link>
              );
            })}
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

      {/* Mobile menu — slides in from right with staggered links */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-0 z-[100] bg-white md:hidden"
          >
            <div className="flex items-center justify-between h-[72px] px-6">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
                <img
                  src="/brand/palentrix-logo-nav.png"
                  alt="Palentrix"
                  width={112}
                  height={80}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-2 px-6 pt-8">
              {links.map((l, i) => {
                const isActive =
                  pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
                return (
                  <motion.div
                    key={l.to}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: i * 0.055 + 0.08,
                      type: "spring",
                      stiffness: 340,
                      damping: 28,
                    }}
                  >
                    <Link
                      href={l.to}
                      onClick={() => setOpen(false)}
                      className={`block text-3xl font-semibold tracking-tight py-2 ${
                        isActive ? "text-indigo" : "text-ink"
                      }`}
                      style={{ fontFamily: "var(--font-nav)" }}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: links.length * 0.055 + 0.08,
                  type: "spring",
                  stiffness: 340,
                  damping: 28,
                }}
              >
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
