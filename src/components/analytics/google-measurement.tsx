/* eslint-disable @next/next/no-before-interactive-script-outside-document -- This component is mounted once by the root App Router layout, where Next 16 permits beforeInteractive scripts. */
import Script from "next/script";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { GoogleMeasurementClient } from "@/components/analytics/google-measurement-client";
import { GOOGLE_CONSENT_STORAGE_KEY } from "@/lib/analytics/google";

const GOOGLE_TAG_ID_PATTERN = /^(?:G|GT|AW|DC)-[A-Z0-9-]+$/i;

function validTagId(value: string | undefined) {
  const tagId = value?.trim();
  return tagId && GOOGLE_TAG_ID_PATTERN.test(tagId) ? tagId : null;
}

function consentInitializationScript() {
  return `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
window.gtag('set', 'ads_data_redaction', true);
window.gtag('set', 'url_passthrough', true);
try {
  var storedConsent = JSON.parse(localStorage.getItem(${JSON.stringify(GOOGLE_CONSENT_STORAGE_KEY)}) || 'null');
  if (storedConsent && Date.parse(storedConsent.expiresAt) > Date.now()) {
    var preferences = storedConsent.preferences || {};
    window.gtag('consent', 'update', {
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_storage: preferences.advertising ? 'granted' : 'denied',
      ad_user_data: preferences.advertising ? 'granted' : 'denied',
      ad_personalization: preferences.adPersonalization ? 'granted' : 'denied'
    });
  }
} catch (_) {}
`;
}

/** Site-wide Google measurement with client-side attribution bookkeeping. */
export function GoogleMeasurement() {
  const googleTagId = validTagId(process.env.NEXT_PUBLIC_GOOGLE_TAG_ID);
  const googleAdsId = validTagId(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID);

  return (
    <>
      {googleTagId ? (
        <>
          <Script
            id="google-consent-defaults"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: consentInitializationScript() }}
          />
          <Script
            id="google-tag-library"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag-config" strategy="afterInteractive">
            {`
window.gtag('js', new Date());
window.gtag('config', ${JSON.stringify(googleTagId)}, { send_page_view: false });
${googleAdsId && googleAdsId !== googleTagId ? `window.gtag('config', ${JSON.stringify(googleAdsId)}, { send_page_view: false });` : ""}
`}
          </Script>
          <ConsentBanner />
        </>
      ) : null}
      <GoogleMeasurementClient />
    </>
  );
}
