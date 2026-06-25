export const siteConfig = {
  name: "Palentrix",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://palentrix.com",
  title: "Palentrix - We Engineer Products People Rely On",
  description:
    "Palentrix is a software studio in Karachi building SaaS products, web and mobile apps, and business automations for startups and enterprises.",
  email: "hello@palentrix.com",
  calendlyUrl: "https://calendly.com/d/cvsh-jw5-d8x",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
