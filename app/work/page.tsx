import type { Metadata } from "next";
import { WorkPage } from "@/components/pages/WorkPage";

export const metadata: Metadata = {
  title: "Software Development Case Studies",
  description:
    "Case studies from Palentrix covering SaaS MVP development, AI web apps, healthcare portals, marketplaces, and custom software projects.",
  keywords: ["software development case studies", "SaaS case studies", "AI web app case studies", "custom software projects"],
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Software Development Case Studies - Palentrix",
    description: "SaaS, AI, healthcare, marketplace, and custom software projects shipped by Palentrix.",
    url: "/work",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Case Studies - Palentrix",
    description: "SaaS, AI, healthcare, marketplace, and custom software projects shipped by Palentrix.",
  },
};

export default function Page() {
  return <WorkPage />;
}
