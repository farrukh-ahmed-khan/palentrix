"use client";

import { useEffect } from "react";

type GoogleTagLoaderProps = {
  tagId: string;
  configuredTags: string[];
};

export function GoogleTagLoader({ tagId, configuredTags }: GoogleTagLoaderProps) {
  useEffect(() => {
    let loaded = false;
    const events = ["scroll", "pointerdown", "keydown", "touchstart"] as const;

    function cleanup() {
      events.forEach((event) => window.removeEventListener(event, load));
    }

    function load() {
      if (loaded || document.querySelector(`script[data-palentrix-gtag="${tagId}"]`)) {
        return;
      }

      loaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
      script.dataset.palentrixGtag = tagId;
      document.head.appendChild(script);

      window.gtag("js", new Date());
      configuredTags.forEach((configuredTagId) => {
        window.gtag("config", configuredTagId);
      });

      cleanup();
    }

    events.forEach((event) => window.addEventListener(event, load, { once: true, passive: true }));

    return cleanup;
  }, [configuredTags, tagId]);

  return null;
}

declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag: (...args: unknown[]) => void;
  }
}
