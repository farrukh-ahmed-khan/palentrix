export const siteConfig = {
  name: "Palentrix",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://palentrix.com",
  title: "Palentrix - We Engineer Products People Rely On",
  description:
    "Palentrix is a software studio in Karachi building SaaS products, web and mobile apps, and business automations for startups and enterprises.",
  keywords: [
    "Palentrix",
    "software development company Karachi",
    "SaaS development agency",
    "MVP development services",
    "custom web app development",
    "mobile app development",
    "AI automation agency",
    "business automation services",
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
