import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/pages/SeoLandingPage";
import { getSeoPage, serviceJsonLd } from "@/lib/seo-pages";

const page = getSeoPage("ai-web-app-development")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  keywords: page.keywords,
  alternates: { canonical: `/${page.slug}` },
  openGraph: {
    title: page.metaTitle,
    description: page.description,
    url: `/${page.slug}`,
  },
  twitter: {
    card: "summary_large_image",
    title: page.metaTitle,
    description: page.description,
  },
};

export default function Page() {
  return (
    <>
      <script
        id="ai-web-app-development-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(page)) }}
      />
      <SeoLandingPage page={page} />
    </>
  );
}
