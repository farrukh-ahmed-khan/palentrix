import Link from "next/link";
import { ArrowUp, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { PalentrixLogo } from "@/components/site/PalentrixLogo";

const calendlyUrl = "https://calendly.com/palentrix/30min";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-void">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[360px] w-[80%] -translate-x-1/2 translate-y-1/2 rounded-full bg-[rgba(47,125,255,0.18)] blur-[120px]" />

      <div className="relative mx-auto max-w-[1320px] px-6 pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <PalentrixLogo size={64} showWordmark stacked />
            <p className="mt-5 max-w-[260px] font-display text-[20px] font-bold leading-snug tracking-[-0.02em] text-snow">
              We Engineer Products{" "}
              <span className="serif-accent font-normal text-indigo-dim">People Rely On.</span>
            </p>
            <a
              href={`mailto:${siteConfig.emails.contact}`}
              className="mt-6 inline-flex items-center gap-2 text-[13px] text-ink/60 transition-colors hover:text-glow"
            >
              <Mail size={14} />
              {siteConfig.emails.contact}
            </a>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-[13px] text-ink/60 transition-colors hover:text-glow"
            >
              Book a free 30-min discovery call
            </a>
          </div>
          <FooterCol
            title="Quick Links"
            items={[
              { label: "Home", to: "/" },
              { label: "Work", to: "/work" },
              { label: "Blog", to: "/blog" },
              { label: "Contact", to: "/contact" },
            ]}
          />
          <FooterCol
            title="Services"
            items={[
              { label: "SaaS & MVP", to: "/services" },
              { label: "Web & Mobile", to: "/services" },
              { label: "Automation", to: "/services" },
            ]}
          />
          <FooterCol
            title="Company"
            items={[
              { label: "About", to: "/about" },
              { label: "Process", to: "/process" },
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Terms", to: "/terms" },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[12.5px] text-ink/50">
            &copy;{currentYear} Palentrix. All rights reserved. 8 Campus Dr Suite # 105
            Parsippany, NJ 07054
          </p>
          <div className="flex items-center gap-3 text-ink/60">
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-ink hover:text-ink"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-void transition-transform duration-300 hover:-translate-y-1"
            >
              <ArrowUp size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* giant wordmark */}
      <div aria-hidden="true" className="relative mt-6 select-none overflow-hidden">
        <div className="text-outline translate-y-[18%] text-center font-brand text-[18vw] font-semibold leading-none tracking-[0.06em]">
          PALENTRIX
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string }[];
}) {
  return (
    <div>
      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">{title}</p>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            <Link
              href={it.to}
              className="font-display text-[16px] font-semibold text-ink/75 transition-colors hover:text-glow"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
