import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send Palentrix your project. We respond within 4 hours during working hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact - Palentrix",
    description: "Tell us what you are building. We will respond within 4 hours.",
    url: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
