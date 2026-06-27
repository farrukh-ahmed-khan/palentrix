import { absoluteUrl, siteConfig } from "./site";

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: "SaaS" | "AI" | "Healthcare" | "E-commerce" | "Web";
  summary: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  stack: string[];
  url?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "gofer-assistants-marketplace",
    title: "Gofer Assistants Multi-Tenant Marketplace",
    client: "Gofer Assistants",
    category: "SaaS",
    summary:
      "A multi-tenant SaaS marketplace with vendor onboarding, role-based access, booking workflows, admin operations, and Stripe Connect payouts.",
    challenge:
      "The product needed to support multiple vendors, customers, admins, bookings, and payout flows without becoming hard to operate as usage grew.",
    solution:
      "Palentrix built a full-stack marketplace architecture with tenant-aware workflows, RBAC, admin controls, booking management, and Stripe Connect payment flows.",
    outcomes: [
      "Vendor onboarding and marketplace operations in one platform",
      "Stripe Connect payout foundation for multi-party payments",
      "Admin dashboard for operational visibility",
      "Scalable SaaS structure ready for future feature expansion",
    ],
    stack: ["NestJS", "Next.js", "PostgreSQL", "Stripe Connect"],
    url: "https://goferassistants.com",
  },
  {
    slug: "zelos-financial-literacy-platform",
    title: "Zelos Youth Financial Literacy Platform",
    client: "Zelos",
    category: "SaaS",
    summary:
      "A full-stack education and youth development platform with role-based dashboards, scholarships, community, events, online store, billing, and content management.",
    challenge:
      "Zelos needed one platform for students, schools, mentors, admins, subscribers, learning content, community features, and commerce.",
    solution:
      "Palentrix delivered a role-based product architecture with dashboards, video library, scholarship workflows, forums, events, store functionality, Stripe billing, and admin content tools.",
    outcomes: [
      "Multiple user roles supported through dedicated dashboards",
      "Scholarship and community workflows connected to learning content",
      "Stripe billing and online store foundation",
      "Admin content management for platform operations",
    ],
    stack: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
    url: "https://zelos.vercel.app",
  },
  {
    slug: "aegisiq-investor-portal",
    title: "AegisIQ Investor Screening Portal",
    client: "PatientTrac Limited",
    category: "SaaS",
    summary:
      "A financial intelligence and screening platform with investor onboarding, gated document access, authentication, and payment processing.",
    challenge:
      "The platform needed secure onboarding and document access for investors while keeping payment and user management flows clean.",
    solution:
      "Palentrix built the portal with Clerk authentication, Neon PostgreSQL, gated document workflows, onboarding screens, and payment processing.",
    outcomes: [
      "Investor onboarding flow with protected access",
      "Gated documents and user-specific portal experience",
      "Payment-enabled access model",
      "Modern Next.js 14 implementation",
    ],
    stack: ["Next.js 14", "TypeScript", "Neon PostgreSQL", "Clerk"],
    url: "https://aegisiqfintech.com",
  },
  {
    slug: "saas-ai-platform",
    title: "Multi-Model SaaS AI Platform",
    client: "SaaS AI Platform",
    category: "AI",
    summary:
      "An AI SaaS platform supporting chat, code, and image generation with model integrations, user accounts, usage flows, and Stripe billing.",
    challenge:
      "The product needed to expose multiple AI capabilities while keeping the interface usable and the business model subscription-ready.",
    solution:
      "Palentrix implemented a Next.js and Supabase platform integrating OpenAI and Claude APIs with product flows for chat, code, image generation, and billing.",
    outcomes: [
      "Multi-model AI feature set in one product",
      "Subscription-ready SaaS foundation",
      "Reusable architecture for adding future AI tools",
      "User-facing workflows for chat, code, and image generation",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "OpenAI", "Claude"],
    url: "https://saas-ai-azure.vercel.app",
  },
  {
    slug: "texas-center-wellness-portal",
    title: "Texas Center Wellness Patient Portal",
    client: "Texas Center Wellness",
    category: "Healthcare",
    summary:
      "A healthcare portal and patient dashboard with multi-role access, sensitive data handling, and structured patient-facing workflows.",
    challenge:
      "The healthcare workflow needed clear role separation, careful data handling, and a simple dashboard experience for patients and operators.",
    solution:
      "Palentrix built a React and Node.js portal with role-based access, dashboard views, and secure handling patterns for sensitive user information.",
    outcomes: [
      "Multi-role portal experience",
      "Patient dashboard workflows",
      "Healthcare-focused data handling patterns",
      "Cleaner digital access for operational teams",
    ],
    stack: ["React", "Node.js"],
    url: "https://texascenterwellness.com",
  },
  {
    slug: "jstyle-ecommerce-platform",
    title: "JStyle Fashion E-Commerce Platform",
    client: "JStyle",
    category: "E-commerce",
    summary:
      "A full-stack fashion e-commerce platform with cart, checkout, admin dashboard, order management, and MySQL-backed operations.",
    challenge:
      "The brand needed an online store that could manage products, customers, orders, and checkout without relying on a rigid template.",
    solution:
      "Palentrix delivered a Laravel-based commerce platform with storefront flows, checkout, admin controls, and order management.",
    outcomes: [
      "Custom storefront for fashion commerce",
      "Cart and checkout flow",
      "Admin dashboard for order operations",
      "MySQL-backed product and order management",
    ],
    stack: ["Laravel", "PHP", "MySQL"],
    url: "https://jstyle.pk",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function caseStudyJsonLd(study: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": absoluteUrl(`/work/${study.slug}#case-study`),
        name: study.title,
        description: study.summary,
        about: study.category,
        creator: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        url: absoluteUrl(`/work/${study.slug}`),
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`/work/${study.slug}#breadcrumb`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/work") },
          { "@type": "ListItem", position: 3, name: study.title, item: absoluteUrl(`/work/${study.slug}`) },
        ],
      },
    ],
  };
}
