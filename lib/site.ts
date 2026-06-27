export const siteConfig = {
  name: "Palentrix",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://palentrix.com",
  title: "Palentrix - We Engineer Products People Rely On",
  description:
    "Palentrix is a software development company and software house in Karachi, Pakistan building SaaS MVPs, custom software, Next.js web apps, AI applications, and business automations.",
  keywords: [
    "Palentrix",
    "software house Pakistan",
    "software house Karachi",
    "software development company Pakistan",
    "software development company Karachi",
    "SaaS development agency",
    "SaaS MVP development",
    "MVP development services",
    "custom web app development",
    "custom software development",
    "mobile app development",
    "AI app development",
    "AI web app development",
    "AI automation agency",
    "business automation services",
    "Next.js agency",
    "Next.js development",
    "full stack development agency",
  ],
  email: "contact@palentrix.com",
  emails: {
    contact: "contact@palentrix.com",
    info: "info@palentrix.com",
    billing: "billing@palentrix.com",
    support: "support@palentrix.com",
  },
  calendlyUrl: "https://calendly.com/palentrix/30min",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
