import type { Metadata } from "next";
import { ProcessPage } from "@/components/pages/ProcessPage";

export const metadata: Metadata = {
  title: "Process",
  description: "Our 5-step delivery process: discovery, architecture, build, review, ship, and support.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Process - Palentrix",
    description: "How we work: no surprises, no excuses.",
    url: "/process",
  },
};

export default function Page() {
  return <ProcessPage />;
}
