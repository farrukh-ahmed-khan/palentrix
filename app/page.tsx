import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: "Palentrix - We Engineer Products People Rely On",
  description:
    "Software studio in Karachi building SaaS, web and mobile apps, and automation: shipped on time, built to scale.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Palentrix - We Engineer Products People Rely On",
    description: "SaaS, web and mobile, and automation builds from a senior software studio.",
    url: "/",
  },
};

export default function Page() {
  return <HomePage />;
}
