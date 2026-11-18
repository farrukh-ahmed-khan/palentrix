import Image from "next/image";

function ServicePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[3/2] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1320px) 330px, (min-width: 1024px) 26vw, (min-width: 768px) 70vw, calc(100vw - 48px)"
        className="object-cover"
      />
    </div>
  );
}

export function SaasVisual() {
  return (
    <ServicePhoto
      src="/services/saas-laptop.webp"
      alt="Laptop displaying a SaaS analytics dashboard on a sunlit office desk"
    />
  );
}

export function MobileVisual() {
  return (
    <ServicePhoto
      src="/services/web-mobile-devices.webp"
      alt="Laptop and smartphone displaying matching project management apps"
    />
  );
}

export function AutomationVisual() {
  return (
    <ServicePhoto
      src="/services/automation-workstation.webp"
      alt="Desktop monitor displaying an automation workflow and execution history"
    />
  );
}
