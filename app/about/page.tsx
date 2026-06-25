import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description: "Three engineers running a software studio out of Karachi. Honest, technical, and accountable.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Palentrix",
    description: "Three engineers. One studio. Zero excuses.",
    url: "/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
