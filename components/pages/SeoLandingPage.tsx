import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { CTABanner } from "@/components/site/CTABanner";
import { PageShell } from "@/components/site/PageShell";
import type { SeoPage } from "@/lib/seo-pages";

const relatedLinks = [
  { href: "/software-house-pakistan", label: "Software House Pakistan" },
  { href: "/saas-mvp-development", label: "SaaS MVP Development" },
  { href: "/nextjs-development", label: "Next.js Development" },
  { href: "/ai-web-app-development", label: "AI Web App Development" },
  { href: "/custom-software-development", label: "Custom Software Development" },
];

export function SeoLandingPage({ page }: { page: SeoPage }) {
  return (
    <PageShell>
      <main>
        <section className="rb-section pt-32 pb-20">
          <div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-indigo">
                [ {page.eyebrow} ]
              </div>
              <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-normal md:text-5xl">
                {page.h1}
              </h1>
              <p className="mt-6 max-w-[680px] text-[17px] leading-[1.8] text-muted">
                {page.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="btn-teal inline-flex items-center justify-center rounded-lg px-6 py-3 text-[14px] font-semibold"
                >
                  Start a project
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink/20 px-6 py-3 text-[14px] font-semibold text-ink/75 transition-colors hover:border-indigo hover:text-indigo"
                >
                  View case studies
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="rb-panel rounded-2xl p-7">
              <h2 className="font-display text-xl font-bold tracking-normal">What we build</h2>
              <ul className="mt-5 space-y-3">
                {page.services.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink/75">
                    <CheckCircle size={18} className="mt-0.5 shrink-0 text-indigo" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="rb-section py-20">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-6 md:grid-cols-2">
            <div className="rb-card rounded-2xl border p-7">
              <h2 className="font-display text-2xl font-bold tracking-normal">Business outcomes</h2>
              <ul className="mt-5 space-y-3">
                {page.outcomes.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <CheckCircle size={18} className="mt-0.5 shrink-0 text-indigo" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rb-card rounded-2xl border p-7">
              <h2 className="font-display text-2xl font-bold tracking-normal">Tech stack</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {page.stack.map((tool) => (
                  <span
                    key={tool}
                    className="rb-chip rounded-full border border-indigo/20 px-3 py-1 font-mono text-[12px] text-ink/70"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-muted">
                We choose tools based on product risk, speed, maintainability, and the kind of team that will own the system after launch.
              </p>
            </div>
          </div>
        </section>

        <section className="rb-section py-20">
          <div className="mx-auto max-w-[980px] px-6">
            <h2 className="font-display text-2xl font-bold tracking-normal md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="mt-10 space-y-4">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="rb-panel rounded-2xl p-6">
                  <h3 className="font-display text-[18px] font-bold tracking-normal">{faq.question}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rb-section py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="font-display text-2xl font-bold tracking-normal">Related services</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {relatedLinks
                .filter((link) => link.href !== `/${page.slug}`)
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-indigo/20 bg-white/70 px-4 py-2 text-[14px] text-ink/70 transition-colors hover:border-indigo hover:text-indigo"
                  >
                    {link.label}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <CTABanner />
    </PageShell>
  );
}
