import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";
import { CTABanner } from "@/components/site/CTABanner";
import { PageShell } from "@/components/site/PageShell";
import { caseStudies, caseStudyJsonLd, getCaseStudy } from "@/lib/case-studies";

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

export function generateStaticParams(): Params[] {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {};
  }

  return {
    title: `${study.title} Case Study`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.title} Case Study - Palentrix`,
      description: study.summary,
      url: `/work/${study.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} Case Study - Palentrix`,
      description: study.summary,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return (
    <PageShell>
      <script
        id={`${study.slug}-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd(study)) }}
      />
      <main>
        <section className="rb-section pt-32 pb-20">
          <div className="mx-auto max-w-[980px] px-6">
            <Link href="/work" className="inline-flex items-center gap-2 text-[14px] text-indigo hover:text-violet">
              <ArrowLeft size={16} />
              Back to work
            </Link>
            <h1 className="mt-8 font-display text-3xl font-bold leading-tight tracking-normal md:text-5xl">
              {study.title}
            </h1>
            <p className="mt-6 text-[17px] leading-[1.8] text-muted">{study.summary}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {study.url ? (
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill btn-teal h-11 px-5 text-[14px]"
                >
                  Visit project
                  <ExternalLink size={15} />
                </a>
              ) : null}
              {study.stores?.map((store) => (
                <a
                  key={store.href}
                  href={store.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${study.client} on ${store.label}`}
                  className="pill h-11 border border-ink/20 px-5 text-[14px] text-ink hover:border-ink hover:bg-ink hover:text-void"
                >
                  {store.label}
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </div>

          {study.image ? (
            <div className="mx-auto mt-14 max-w-[1100px] px-6">
              <div className="overflow-hidden rounded-[24px] border border-border bg-[#060c22] shadow-[0_40px_120px_-50px_rgba(47,107,255,0.6)]">
                <div className="flex h-10 items-center gap-1.5 border-b border-border px-4">
                  <span className="h-2 w-2 rounded-full bg-ink/20" />
                  <span className="h-2 w-2 rounded-full bg-ink/20" />
                  <span className="h-2 w-2 rounded-full bg-glow" />
                  {study.url ? (
                    <span className="ml-3 truncate font-mono text-[11px] text-ink/50">
                      {study.url.replace(/^https?:\/\//, "")}
                    </span>
                  ) : null}
                </div>
                <div className="relative aspect-[16/10]">
                  <Image
                    src={study.image}
                    alt={`${study.client} website homepage`}
                    fill
                    priority
                    sizes="(min-width: 1100px) 1100px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className="rb-section py-20">
          <div className="mx-auto grid max-w-[1100px] gap-6 px-6 md:grid-cols-2">
            <div className="rb-card rounded-2xl border p-7">
              <h2 className="font-display text-2xl font-bold tracking-normal">Challenge</h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-muted">{study.challenge}</p>
            </div>
            <div className="rb-card rounded-2xl border p-7">
              <h2 className="font-display text-2xl font-bold tracking-normal">Solution</h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-muted">{study.solution}</p>
            </div>
          </div>
        </section>

        <section className="rb-section py-20">
          <div className="mx-auto grid max-w-[1100px] gap-8 px-6 md:grid-cols-[1fr_0.8fr]">
            <div className="rb-panel rounded-2xl p-7">
              <h2 className="font-display text-2xl font-bold tracking-normal">Outcomes</h2>
              <ul className="mt-5 space-y-3">
                {study.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <CheckCircle size={18} className="mt-0.5 shrink-0 text-indigo" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rb-panel rounded-2xl p-7">
              <h2 className="font-display text-2xl font-bold tracking-normal">Tech stack</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {study.stack.map((tool) => (
                  <span
                    key={tool}
                    className="rb-chip rounded-full border border-indigo/20 px-3 py-1 font-mono text-[12px] text-ink/70"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <CTABanner />
    </PageShell>
  );
}
