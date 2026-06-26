import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Orbitron, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/site/Footer";
import { GoogleTags } from "@/components/site/GoogleTags";
import { Nav } from "@/components/site/Nav";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-orbitron",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05050a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s - Palentrix",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: "Palentrix",
  authors: [{ name: "Palentrix" }],
  creator: "Palentrix",
  publisher: "Palentrix",
  category: "Software Development",
  classification: "Software development studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  other: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT
    ? { "google-adsense-account": process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT }
    : undefined,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: "/brand/palentrix-logo-dark.png", width: 1200, height: 630, alt: "Palentrix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/brand/palentrix-logo-dark.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/brand/palentrix-logo-dark.png"),
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: ["https://github.com/farrukh-ahmed-khan"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${orbitron.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      >
        <GoogleTags />
        <script
          id="palentrix-organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
   
        
        <ScrollProgress />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
