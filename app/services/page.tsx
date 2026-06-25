import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description: "SaaS and MVP development, web and mobile apps, and business automation from Palentrix.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services - Palentrix",
    description: "SaaS and MVP, web and mobile apps, and business automation.",
    url: "/services",
  },
};

export default function Page() {
  return <ServicesPage />;
}
