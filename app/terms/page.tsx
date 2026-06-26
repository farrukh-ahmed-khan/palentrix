import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for using the Palentrix website and contacting Palentrix for software services.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms and Conditions - Palentrix",
    description: "Website terms for Palentrix visitors, prospects, and clients.",
    url: "/terms",
  },
};

const sections = [
  {
    title: "Acceptance of terms",
    body: [
      "By accessing or using palentrix.com, you agree to these Terms and Conditions. If you do not agree, please do not use the website.",
      "These terms apply to the public website. Any paid software project, support plan, or consulting engagement may be governed by a separate written agreement.",
    ],
  },
  {
    title: "Website content",
    body: [
      "The content on this website is provided for general information about Palentrix, our services, our process, and software development topics.",
      "We try to keep information accurate and useful, but we do not guarantee that all content will always be complete, current, or error-free.",
    ],
  },
  {
    title: "Use of the website",
    body: [
      "You agree not to misuse the website, attempt unauthorized access, interfere with site operations, scrape content aggressively, or use the website for unlawful activity.",
      "We may restrict access to the website or administrative areas if we believe there is abuse, security risk, or unauthorized use.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "The Palentrix name, branding, design, copy, images, and website content belong to Palentrix or are used with permission, unless stated otherwise.",
      "You may link to our public pages, but you may not copy, republish, sell, or present our content as your own without written permission.",
    ],
  },
  {
    title: "Third-party services and links",
    body: [
      "The website may include links to third-party websites, tools, analytics providers, advertising networks, scheduling systems, or embedded services.",
      "We are not responsible for third-party websites, services, privacy practices, or content. Your use of those services is governed by their own terms.",
    ],
  },
  {
    title: "Project inquiries and proposals",
    body: [
      "Submitting a contact form, booking a call, or sending project details does not create a client relationship, partnership, employment relationship, or obligation for Palentrix to accept a project.",
      "Quotes, timelines, technical recommendations, and proposals are estimates unless confirmed in a signed agreement.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Palentrix is not liable for indirect, incidental, special, consequential, or punitive damages arising from website use.",
      "The website is provided on an as-is and as-available basis. We do not promise uninterrupted access or that the website will be free from all errors or security issues.",
    ],
  },
  {
    title: "Governing law",
    body: [
      "These terms are governed by the laws of Pakistan, unless a separate written agreement states otherwise.",
      "If any part of these terms is found unenforceable, the remaining sections will continue to apply.",
    ],
  },
  {
    title: "Changes to these terms",
    body: [
      "We may update these Terms and Conditions from time to time. The updated version will be posted on this page with a revised date.",
    ],
  },
];

export default function Page() {
  return (
    <LegalPage
      label="Terms"
      title="Terms and Conditions"
      subtitle="The basic rules for using the Palentrix website and contacting us about software projects."
      updated="June 26, 2026"
      sections={sections}
    />
  );
}
