import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Palentrix, including how we collect information, use analytics, cookies, and advertising technologies.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy - Palentrix",
    description: "How Palentrix handles visitor information, cookies, analytics, and advertising.",
    url: "/privacy-policy",
  },
};

const sections = [
  {
    title: "Who we are",
    body: [
      `Palentrix is a software studio based in Karachi, Pakistan. Our website address is palentrix.com, and our contact email is ${siteConfig.emails.info}.`,
      "This Privacy Policy explains what information we collect when people visit our website, read our blog, contact us, or interact with services connected to the site.",
    ],
  },
  {
    title: "Information we collect",
    body: [
      "We may collect information you choose to send us, such as your name, email address, company name, project details, and messages submitted through contact forms or email.",
      "We may also collect basic technical information automatically, including browser type, device information, approximate location, referring pages, pages visited, and usage events.",
    ],
  },
  {
    title: "Cookies, analytics, and advertising",
    body: [
      "We use cookies and similar technologies to understand website traffic, improve content, measure performance, and support advertising features.",
      "We use Google Analytics to measure visits and usage patterns. We may also use Google AdSense to display ads on the website. Third-party vendors, including Google, may use cookies to serve ads based on a user's prior visits to this and other websites.",
      "Users can manage personalized ads through Google Ads Settings and can control cookies through their browser settings. Some website features may not work as expected if cookies are disabled.",
    ],
  },
  {
    title: "How we use information",
    body: [
      "We use collected information to respond to inquiries, improve the website, publish better content, understand what visitors find useful, protect the site from abuse, and operate analytics or advertising features.",
      "We do not sell personal information. We may share limited information with service providers that help us run the website, analytics, hosting, email, security, or advertising systems.",
    ],
  },
  {
    title: "Data retention and security",
    body: [
      "We keep information only as long as reasonably needed for the purpose it was collected, for business records, or to comply with legal obligations.",
      "We use reasonable technical and organizational safeguards, but no website or internet transmission can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can contact us to request access, correction, or deletion of personal information you have provided to us, subject to legal and operational limits.",
      "You can unsubscribe from optional communications, block cookies in your browser, or use privacy tools provided by Google and other advertising providers.",
    ],
  },
  {
    title: "Children's privacy",
    body: [
      "Our website and services are intended for business and general professional audiences. We do not knowingly collect personal information from children under 13.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. When we do, we will update the date on this page.",
    ],
  },
];

export default function Page() {
  return (
    <LegalPage
      label="Privacy"
      title="Privacy Policy"
      subtitle="How Palentrix handles visitor information, analytics, cookies, and advertising technologies."
      updated="June 26, 2026"
      sections={sections}
    />
  );
}
