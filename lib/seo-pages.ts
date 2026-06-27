import { absoluteUrl, siteConfig } from "./site";

export type SeoPage = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  services: string[];
  outcomes: string[];
  stack: string[];
  faqs: { question: string; answer: string }[];
  keywords: string[];
};

export const seoPages: SeoPage[] = [
  {
    slug: "software-house-pakistan",
    title: "Software House Pakistan",
    metaTitle: "Software House in Pakistan | Palentrix",
    description:
      "Palentrix is a software house in Pakistan building SaaS products, custom web apps, AI applications, and business automation systems.",
    eyebrow: "Software House in Pakistan",
    h1: "Software House in Pakistan for SaaS, Web Apps, and Automation",
    intro:
      "Palentrix is a Karachi-based software development company serving startups, SMBs, and international teams that need reliable production software. We build SaaS platforms, custom web applications, admin dashboards, portals, and automation systems with senior engineers involved from planning to launch.",
    services: [
      "Custom software development for startups and businesses",
      "SaaS MVP planning, design, development, and launch",
      "Admin dashboards, portals, marketplaces, and workflow systems",
      "Payment integrations, authentication, subscriptions, and reporting",
    ],
    outcomes: [
      "Clear scope and delivery milestones before development starts",
      "Production-ready code with scalable architecture",
      "Fast communication from engineers, not only account managers",
      "Launch support, QA, and performance-focused handoff",
    ],
    stack: ["Next.js", "NestJS", "React", "Node.js", "PostgreSQL", "MongoDB", "Supabase", "Stripe"],
    faqs: [
      {
        question: "Is Palentrix a software house in Pakistan?",
        answer:
          "Yes. Palentrix is a software house based in Karachi, Pakistan, building SaaS products, custom software, web apps, and AI-enabled platforms for local and international clients.",
      },
      {
        question: "Do you work with clients outside Pakistan?",
        answer:
          "Yes. We work remotely with founders, agencies, and businesses in multiple markets and use clear milestones, async updates, and regular calls to keep delivery transparent.",
      },
      {
        question: "What type of software do you build?",
        answer:
          "We build SaaS platforms, marketplaces, dashboards, portals, custom business software, AI web apps, automation systems, and integrations.",
      },
    ],
    keywords: ["software house Pakistan", "software development company Pakistan", "software house Karachi"],
  },
  {
    slug: "saas-mvp-development",
    title: "SaaS MVP Development",
    metaTitle: "SaaS MVP Development Company | Palentrix",
    description:
      "Build and launch SaaS MVPs with authentication, billing, dashboards, admin tools, and scalable architecture.",
    eyebrow: "SaaS MVP Development",
    h1: "SaaS MVP Development for Founders Who Need to Launch",
    intro:
      "We help founders turn SaaS ideas into working MVPs with the core product flows needed for early users, demos, pilots, and revenue. Palentrix handles product planning, full-stack development, billing, dashboards, and launch support.",
    services: [
      "MVP scope, feature mapping, and technical planning",
      "Authentication, user roles, subscriptions, and billing",
      "Customer dashboards, admin dashboards, and analytics",
      "Production deployment, QA, and iteration support",
    ],
    outcomes: [
      "Launch a focused MVP instead of an overbuilt prototype",
      "Reduce rework with a clear technical foundation",
      "Support demos, pilots, and early paid customers",
      "Keep the codebase ready for future scale",
    ],
    stack: ["Next.js", "TypeScript", "NestJS", "Supabase", "PostgreSQL", "Stripe", "Vercel"],
    faqs: [
      {
        question: "How long does a SaaS MVP take?",
        answer:
          "Most focused SaaS MVPs take 4 to 10 weeks depending on scope, integrations, roles, billing requirements, and design complexity.",
      },
      {
        question: "Can you build Stripe subscriptions?",
        answer:
          "Yes. We build Stripe subscriptions, checkout, billing portals, webhooks, invoices, and usage-based payment flows.",
      },
      {
        question: "Do you help after launch?",
        answer:
          "Yes. We can support QA, bug fixes, feature iterations, performance improvements, and deployment handoff after launch.",
      },
    ],
    keywords: ["SaaS MVP development", "SaaS development company", "MVP development services"],
  },
  {
    slug: "nextjs-development",
    title: "Next.js Development",
    metaTitle: "Next.js Development Agency | Palentrix",
    description:
      "Next.js development for fast websites, SaaS dashboards, portals, marketplaces, and production web applications.",
    eyebrow: "Next.js Development",
    h1: "Next.js Development Agency for Production Web Apps",
    intro:
      "Palentrix builds fast, SEO-ready, and scalable web applications with Next.js. We use it for SaaS dashboards, marketing sites, portals, admin systems, marketplaces, blogs, and AI products that need strong performance and maintainable code.",
    services: [
      "Next.js app router builds and migrations",
      "SEO-focused landing pages and content architecture",
      "Dashboards, portals, authenticated apps, and admin panels",
      "API integrations, server actions, analytics, and deployment",
    ],
    outcomes: [
      "Fast loading pages with clean metadata and routing",
      "Reusable components and maintainable frontend architecture",
      "Better crawlability for Google and AI search systems",
      "Smooth deployment on Vercel or custom infrastructure",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "MongoDB", "Vercel"],
    faqs: [
      {
        question: "Do you build SEO websites with Next.js?",
        answer:
          "Yes. We build Next.js websites with metadata, sitemap, robots, structured content, Open Graph tags, and performance-focused rendering.",
      },
      {
        question: "Can you migrate an existing React app to Next.js?",
        answer:
          "Yes. We can migrate React apps to Next.js and improve routing, performance, SEO, and deployment workflows.",
      },
      {
        question: "Do you build dashboards in Next.js?",
        answer:
          "Yes. We build authenticated dashboards, admin panels, customer portals, and SaaS interfaces with Next.js.",
      },
    ],
    keywords: ["Next.js agency", "Next.js development", "Next.js development company"],
  },
  {
    slug: "ai-web-app-development",
    title: "AI Web App Development",
    metaTitle: "AI Web App Development Company | Palentrix",
    description:
      "AI web app development using OpenAI, Claude, Gemini, custom workflows, chat interfaces, image generation, and automation.",
    eyebrow: "AI Web App Development",
    h1: "AI Web App Development for SaaS, Tools, and Automation",
    intro:
      "We build AI-powered web applications that connect modern models with real product workflows. Palentrix helps teams create AI chat tools, code assistants, image generation flows, document automation, internal agents, and AI-enabled SaaS features.",
    services: [
      "AI chat interfaces and multi-model workflows",
      "OpenAI, Claude, Gemini, and custom API integrations",
      "Document processing, summarization, and automation flows",
      "Usage tracking, billing, authentication, and admin controls",
    ],
    outcomes: [
      "Turn AI ideas into usable product features",
      "Protect cost and reliability with careful API design",
      "Add dashboards, permissions, and billing around AI usage",
      "Ship interfaces users can actually understand and trust",
    ],
    stack: ["Next.js", "OpenAI", "Claude", "Gemini API", "Supabase", "MongoDB", "Stripe"],
    faqs: [
      {
        question: "Can you build AI apps with OpenAI or Gemini?",
        answer:
          "Yes. We build AI applications using OpenAI, Claude, Gemini, and other model APIs depending on the product requirements.",
      },
      {
        question: "Do AI apps need billing and usage limits?",
        answer:
          "Most production AI apps need usage tracking, rate limits, billing controls, and admin visibility because model calls have real operating costs.",
      },
      {
        question: "Can you add AI to an existing SaaS product?",
        answer:
          "Yes. We can integrate AI features into existing SaaS platforms, dashboards, CRMs, internal tools, and customer portals.",
      },
    ],
    keywords: ["AI app development", "AI web app development", "AI SaaS development"],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    metaTitle: "Custom Software Development Company | Palentrix",
    description:
      "Custom software development for dashboards, portals, workflow systems, integrations, automations, and business applications.",
    eyebrow: "Custom Software Development",
    h1: "Custom Software Development for Business Workflows",
    intro:
      "Palentrix builds custom software for teams that have outgrown spreadsheets, manual workflows, disconnected tools, or template-based systems. We design and develop internal tools, portals, dashboards, automation systems, and integrations around how your business actually works.",
    services: [
      "Custom dashboards, portals, and admin systems",
      "Workflow automation and internal operations tools",
      "Third-party API integrations and data syncing",
      "Role-based access, reporting, and deployment support",
    ],
    outcomes: [
      "Replace manual processes with software your team can rely on",
      "Create one source of truth for operations and reporting",
      "Reduce repetitive work and support cleaner handoffs",
      "Own a system designed around your business instead of forcing a template",
    ],
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "REST APIs", "Webhooks"],
    faqs: [
      {
        question: "What is custom software development?",
        answer:
          "Custom software development means building a system around your specific business process, users, roles, integrations, and reporting needs instead of forcing a generic template.",
      },
      {
        question: "Can you automate internal workflows?",
        answer:
          "Yes. We build workflow automation, data syncing, dashboards, approval systems, notifications, and integrations with existing tools.",
      },
      {
        question: "Do you build admin dashboards?",
        answer:
          "Yes. Admin dashboards, internal tools, reporting systems, and role-based portals are a core part of our custom software work.",
      },
    ],
    keywords: ["custom software development", "business software development", "software development company Pakistan"],
  },
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

export function serviceJsonLd(page: SeoPage) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl(`/${page.slug}#service`),
        name: page.title,
        description: page.description,
        provider: {
          "@type": "ProfessionalService",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        areaServed: [
          { "@type": "Country", name: "Pakistan" },
          { "@type": "City", name: "Karachi" },
        ],
        serviceType: page.title,
        url: absoluteUrl(`/${page.slug}`),
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl(`/${page.slug}#faq`),
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`/${page.slug}#breadcrumb`),
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title,
            item: absoluteUrl(`/${page.slug}`),
          },
        ],
      },
    ],
  };
}
