import Link from "next/link";
import { Linkedin, Github, Twitter, Mail } from "lucide-react";

const calendlyUrl = "https://calendly.com/d/cvsh-jw5-d8x";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate border-t border-[rgba(120,108,255,0.15)]">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <img
              src="/brand/palentrix-logo-footer-400.png"
              alt="Palentrix"
              width={400}
              height={286}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="w-[200px] max-w-full"
            />
            <p className="mt-4 text-muted text-[14px] leading-relaxed max-w-[240px]">
              We Engineer Products People Rely On.
            </p>
            <a
              href="mailto:hello@palentrix.com"
              className="mt-4 inline-flex items-center gap-2 text-[13px] text-muted hover:text-indigo transition-colors"
            >
              <Mail size={14} />
              hello@palentrix.com
            </a>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-[13px] text-muted hover:text-indigo transition-colors"
            >
              Book a free 30-min discovery call
            </a>
          </div>
          <FooterCol title="Quick Links" items={[
            { label: "Home", to: "/" },
            { label: "Work", to: "/work" },
            { label: "Blog", to: "/blog" },
            { label: "Contact", to: "/contact" },
          ]} />
          <FooterCol title="Services" items={[
            { label: "SaaS & MVP", to: "/services" },
            { label: "Web & Mobile", to: "/services" },
            { label: "Automation", to: "/services" },
          ]} />
          <FooterCol title="Company" items={[
            { label: "About", to: "/about" },
            { label: "Process", to: "/process" },
            { label: "Privacy Policy", to: "/privacy-policy" },
            { label: "Terms", to: "/terms" },
          ]} />
        </div>

        <div className="mt-12 pt-6 border-t border-[rgba(120,108,255,0.1)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-muted text-[13px]">(c) {currentYear} Palentrix. All rights reserved. Karachi, Pakistan</p>
          <div className="flex items-center gap-4 text-muted">
            <a href="#" aria-label="LinkedIn" className="hover:text-indigo transition-colors"><Linkedin size={18} /></a>
            <a href="https://github.com/farrukh-ahmed-khan" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-indigo transition-colors"><Github size={18} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-indigo transition-colors"><Twitter size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="font-mono text-[12px] text-indigo uppercase tracking-wider mb-4">{title}</p>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.label}>
            <Link href={it.to} className="text-[14px] text-ink/60 hover:text-indigo transition-colors">{it.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
