import Script from "next/script";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const adsenseClientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;

export function GoogleTags() {
  const googleTagId = gaMeasurementId || googleAdsId;
  const configuredTags = [gaMeasurementId, googleAdsId].filter(Boolean);

  return (
    <>
      {googleTagId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${configuredTags.map((tagId) => `gtag('config', '${tagId}');`).join("\n")}
            `}
          </Script>
        </>
      ) : null}

      {adsenseClientId ? (
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
        />
      ) : null}
    </>
  );
}
