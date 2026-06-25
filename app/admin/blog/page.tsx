import type { Metadata } from "next";
import { BlogAdmin } from "@/components/cms/BlogAdmin";

export const metadata: Metadata = {
  title: "Blog CMS",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BlogAdmin />;
}
