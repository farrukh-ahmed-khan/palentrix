import { AdSenseLoader } from "./AdSenseLoader";
import { GoogleTagLoader } from "./GoogleTagLoader";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const adsenseClientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;

export function GoogleTags() {
  const googleTagId = gaMeasurementId || googleAdsId;
  const configuredTags = [gaMeasurementId, googleAdsId].filter((tagId): tagId is string => Boolean(tagId));

  return (
    <>
      {googleTagId ? <GoogleTagLoader tagId={googleTagId} configuredTags={configuredTags} /> : null}

      {adsenseClientId ? <AdSenseLoader clientId={adsenseClientId} /> : null}
    </>
  );
}
