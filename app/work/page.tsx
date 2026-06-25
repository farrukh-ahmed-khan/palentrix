import type { Metadata } from "next";
import { WorkPage } from "@/components/pages/WorkPage";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected case studies from Palentrix: SaaS, mobile, automation, and web projects we have shipped.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work - Palentrix",
    description: "Selected case studies from Palentrix.",
    url: "/work",
  },
};

export default function Page() {
  return <WorkPage />;
}
