"use client";

import { useEffect } from "react";

type AdSenseLoaderProps = {
  clientId: string;
};

export function AdSenseLoader({ clientId }: AdSenseLoaderProps) {
  useEffect(() => {
    let loaded = false;
    const events = ["scroll", "pointerdown", "keydown", "touchstart"] as const;

    function cleanup() {
      events.forEach((event) => window.removeEventListener(event, load));
    }

    function load() {
      if (loaded || document.querySelector(`script[data-palentrix-adsense="${clientId}"]`)) {
        return;
      }

      loaded = true;

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      script.crossOrigin = "anonymous";
      script.dataset.palentrixAdsense = clientId;
      document.head.appendChild(script);

      cleanup();
    }

    events.forEach((event) => window.addEventListener(event, load, { once: true, passive: true }));

    return cleanup;
  }, [clientId]);

  return null;
}
