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
  /** Homepage screenshot in /public/work */
  image?: string;
  /** App store listings for projects that ship a mobile app */
  stores?: { label: "App Store" | "Google Play"; href: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cuelogic-tournament-platform",
    title: "CueLogic Billiards Tournament Platform & Mobile Scorekeeper",
    client: "CueLogic",
    category: "SaaS",
    summary:
      "A billiards tournament platform and companion mobile scorekeeper covering bracket engines, live scoring, rankings, billing, and messaging, shipped to the web, the App Store, and Google Play.",
    challenge:
      "Tournament directors needed to run single-elimination, double-elimination, and round-robin events with live scores, table assignments, disputes, and payouts, without juggling spreadsheets and group chats.",
    solution:
      "Palentrix built a React 19 and Vite web platform on Node.js, Express, Prisma, and PostgreSQL with automated bracket generation, scheduling, byes, live scoring, dispute handling, and ELO rankings, then shipped a React Native and Expo companion app with deep links, live match dashboards, and pinch-to-zoom venue maps.",
    outcomes: [
      "Single-elimination, double-elimination, and round-robin engines with automated brackets",
      "Role-based organizer, player, and super-admin experiences",
      "Stripe billing, SMS and email messaging, and analytics",
      "Companion mobile app live on the App Store and Google Play",
    ],
    stack: ["React 19", "Vite", "Tailwind CSS", "Node.js", "Express", "Prisma", "PostgreSQL", "React Native", "Expo"],
    url: "https://cuelogic.app",
    image: "/work/cuelogic.jpg",
    stores: [
      { label: "App Store", href: "https://apps.apple.com/us/app/cuelogic/id6755575023" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=info.cuelogic.app" },
    ],
  },
  {
    slug: "outfitiq-ai-styling-assistant",
    title: "OutfitIQ AI Personal Styling & Wardrobe Assistant",
    client: "OutfitIQ",
    category: "AI",
    summary:
      "An AI personal styling and wardrobe assistant that turns occasion, skin tone, and garment preferences into outfit, color-palette, and makeup recommendations with generated fashion visuals.",
    challenge:
      "Styling advice had to feel personal and reliable: uploaded clothing photos needed validating and understanding, and generated looks had to stay on-brief even when AI responses were slow or inconsistent.",
    solution:
      "Palentrix built a Next.js 15 and TypeScript app using Google Gemini text and vision models for multimodal wardrobe analysis, Gemini 2.5 Flash Image for multi-look visuals with retries, timeouts, and graceful fallbacks, and a deterministic rule-based engine backed by MongoDB.",
    outcomes: [
      "Multimodal wardrobe analysis that identifies garments, colors, and textures",
      "Generated multi-look fashion visuals with resilient fallbacks",
      "AI output combined with a deterministic recommendation engine",
      "Favorites, look comparison, and client-side image compression",
    ],
    stack: ["Next.js 15", "React", "TypeScript", "Gemini API", "MongoDB", "Mongoose"],
    url: "https://outfit-iq-ai.vercel.app",
    image: "/work/outfitiq.jpg",
  },
  {
    slug: "zelos-financial-literacy-platform",
    title: "Zelos Foundation Financial Literacy & Mentorship Platform",
    client: "Zelos Foundation",
    category: "SaaS",
    summary:
      "A nonprofit financial literacy and mentorship platform with role-based access, school-scoped learning content, subscriptions, school licensing, and merch fulfilment.",
    challenge:
      "Zelos needed one platform for mentees, families, schools, moderators, and admins, each with different content, permissions, and billing, plus school licensing with seat limits.",
    solution:
      "Palentrix built it on Next.js 16 App Router, React 19, TypeScript, Ant Design, and MongoDB with JWT authentication in HTTP-only cookies, audience- and school-scoped content libraries with drip unlocking and completion tracking, and Stripe checkout, subscriptions, promo codes, and gift cards with Printify fulfilment and AWS S3 uploads.",
    outcomes: [
      "Role and permission-based access for mentees, families, schools, moderators, and admins",
      "Drip-unlocked content libraries with completion tracking",
      "School licensing with seat limits and invitation workflows",
      "Stripe subscriptions, gift cards, and Printify merch fulfilment",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Ant Design", "MongoDB", "Stripe", "AWS S3"],
    url: "https://zelosfoundation.org",
    image: "/work/zelos.jpg",
  },
  {
    slug: "texas-center-wellness-portal",
    title: "Texas Center Wellness Healthcare Booking Platform",
    client: "Texas Center Wellness",
    category: "Healthcare",
    summary:
      "A healthcare booking platform covering services, providers, blog, and scheduling, integrated with CharmHealth EHR, Square payments, and QuickBooks Online.",
    challenge:
      "Patients needed to find providers and book, reschedule, or cancel appointments online, with payments and accounting flowing through the clinic's existing EHR and finance tools.",
    solution:
      "Palentrix built a Next.js 15 and React 19 site integrated with CharmHealth EHR for availability, patient creation, questionnaires, and appointments, plus Square payments and refunds and QuickBooks Online invoicing via OAuth, webhooks, and automated token refresh on Express 5 APIs with MySQL.",
    outcomes: [
      "Online booking, rescheduling, and cancellation through CharmHealth EHR",
      "Square payments and refunds with QuickBooks Online invoicing",
      "Dynamic metadata, structured data, canonical tags, and generated sitemaps",
      "Google Analytics for ongoing measurement",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Express 5", "MySQL", "Sequelize", "Square", "QuickBooks Online"],
    url: "https://texascenterwellness.com",
    image: "/work/texas-center-wellness.jpg",
  },
  {
    slug: "gofer-assistants-marketplace",
    title: "Gofer Assistants Service Marketplace",
    client: "Gofer Assistants",
    category: "SaaS",
    summary:
      "A service marketplace connecting customers with freelance assistants for pet care, cleaning, and home services.",
    challenge:
      "The business needed customers to find and book trusted assistants, take payments and pay out freelancers, and give operators control over listings and bookings.",
    solution:
      "Palentrix developed secure Laravel REST APIs for authentication, service listings, bookings, and payments on a MySQL schema, integrated Stripe for booking charges and payouts, and shipped an admin panel with payment webhooks and email notifications.",
    outcomes: [
      "Service listings and booking flows for customers and assistants",
      "Stripe booking charges and freelancer payouts",
      "Admin panel for marketplace operations",
      "Production deployment with payment webhooks and email notifications",
    ],
    stack: ["Laravel", "PHP", "MySQL", "Stripe"],
    url: "https://goferassistants.com",
    image: "/work/gofer-assistants.jpg",
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
