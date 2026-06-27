import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Software Development Services",
  description:
    "Software development services from Palentrix: SaaS MVP development, custom software, Next.js apps, AI web apps, web and mobile apps, and automation.",
  keywords: [
    "software development services",
    "SaaS MVP development",
    "custom software development",
    "Next.js development",
    "AI web app development",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Software Development Services - Palentrix",
    description: "SaaS MVPs, custom software, Next.js apps, AI web apps, and automation.",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Services - Palentrix",
    description: "SaaS MVPs, custom software, Next.js apps, AI web apps, and automation.",
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": absoluteUrl("/services#service"),
      name: "Software Development Services",
      description: metadata.description,
      provider: {
        "@type": "ProfessionalService",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      serviceType: ["SaaS MVP Development", "Custom Software Development", "Next.js Development", "AI Web App Development"],
      areaServed: [{ "@type": "Country", name: "Pakistan" }, { "@type": "Place", name: "Worldwide" }],
    },
    {
      "@type": "FAQPage",
      "@id": absoluteUrl("/services#faq"),
      mainEntity: [
        {
          "@type": "Question",
          name: "Is Palentrix a software house in Pakistan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Palentrix is a Karachi-based software development company building SaaS MVPs, custom web apps, AI applications, dashboards, and automation systems.",
          },
        },
        {
          "@type": "Question",
          name: "Do you build SaaS MVPs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We build SaaS MVPs with authentication, billing, dashboards, admin panels, APIs, and production deployment.",
          },
        },
        {
          "@type": "Question",
          name: "Can you build AI web apps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We build AI web applications using OpenAI, Claude, Gemini, custom APIs, usage tracking, and SaaS billing flows.",
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        id="services-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <ServicesPage />
    </>
  );
}
