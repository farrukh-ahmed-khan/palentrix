import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: "Software Development Company in Pakistan | Palentrix",
  description:
    "Palentrix is a software development company and software house in Karachi, Pakistan building SaaS MVPs, custom software, Next.js apps, AI web apps, and automation systems.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Software Development Company in Pakistan | Palentrix",
    description: "SaaS MVPs, custom software, Next.js apps, AI web apps, and automation systems from Palentrix.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Company in Pakistan | Palentrix",
    description: "Palentrix builds SaaS MVPs, custom software, Next.js apps, AI web apps, and automation systems.",
  },
};

export default function Page() {
  return <HomePage />;
}
