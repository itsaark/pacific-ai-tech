import { getMarketingAttribution } from "@/lib/analytics/attribution";

export const GOOGLE_CONSENT_STORAGE_KEY = "pacificaitech_google_consent_v1";
const CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000;

type ConsentValue = "granted" | "denied";

export type GoogleConsentPreferences = {
  analytics: boolean;
  advertising: boolean;
  adPersonalization: boolean;
};

type StoredConsent = {
  preferences: GoogleConsentPreferences;
  updatedAt: string;
  expiresAt: string;
};

export type ConversionPlacement =
  | "header"
  | "hero"
  | "body"
  | "footer"
  | "contact"
  | "unknown";

export type BookCallClickParameters = {
  placement: ConversionPlacement;
  destination?: string;
};

export type EmailClickParameters = {
  placement: ConversionPlacement;
};

export type PhoneClickParameters = {
  placement: ConversionPlacement;
};

export type LeadFormSubmitParameters = {
  formId: string;
  formLocation?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID?.trim();
const conversionDestinations = {
  book_call_click:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOK_CALL_SEND_TO?.trim(),
  email_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_EMAIL_SEND_TO?.trim(),
  phone_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CLICK_SEND_TO?.trim(),
  lead_form_submit:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_FORM_SEND_TO?.trim(),
} as const;

function consentValue(value: boolean): ConsentValue {
  return value ? "granted" : "denied";
}

function isBrowser() {
  return typeof window !== "undefined";
}

function getGtag() {
  if (!isBrowser() || !googleTagId) return null;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  return window.gtag;
}

function eventAttribution() {
  const attribution = getMarketingAttribution();
  if (!attribution) return {};

  return {
    gclid: attribution.gclid,
    gbraid: attribution.gbraid,
    wbraid: attribution.wbraid,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_term: attribution.utm_term,
    utm_content: attribution.utm_content,
    landing_page: attribution.landing_page,
  };
}

function trackConversionEvent(
  eventName: keyof typeof conversionDestinations,
  parameters: Record<string, string | undefined>,
) {
  const gtag = getGtag();
  if (!gtag) return;

  const eventParameters = {
    ...eventAttribution(),
    ...parameters,
  };

  gtag("event", eventName, eventParameters);

  const sendTo = conversionDestinations[eventName];
  if (sendTo) {
    gtag("event", "conversion", {
      ...eventParameters,
      send_to: sendTo,
    });
  }
}

export function getGoogleConsentPreferences(): GoogleConsentPreferences | null {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(GOOGLE_CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const stored = JSON.parse(raw) as StoredConsent;
    if (Date.parse(stored.expiresAt) <= Date.now()) {
      window.localStorage.removeItem(GOOGLE_CONSENT_STORAGE_KEY);
      return null;
    }

    return stored.preferences;
  } catch {
    return null;
  }
}

/** Persists a visitor's choice and immediately updates Consent Mode v2. */
export function updateGoogleConsent(preferences: GoogleConsentPreferences) {
  if (!isBrowser()) return;

  const now = new Date();
  const stored: StoredConsent = {
    preferences,
    updatedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + CONSENT_TTL_MS).toISOString(),
  };

  try {
    window.localStorage.setItem(
      GOOGLE_CONSENT_STORAGE_KEY,
      JSON.stringify(stored),
    );
  } catch {
    // Consent is still applied for the current page when persistence is blocked.
  }

  getGtag()?.("consent", "update", {
    analytics_storage: consentValue(preferences.analytics),
    ad_storage: consentValue(preferences.advertising),
    ad_user_data: consentValue(preferences.advertising),
    ad_personalization: consentValue(preferences.adPersonalization),
  });

  window.dispatchEvent(
    new CustomEvent("pacificaitech:consent-updated", {
      detail: preferences,
    }),
  );
}

export function trackBookCallClick(parameters: BookCallClickParameters) {
  trackConversionEvent("book_call_click", {
    placement: parameters.placement,
    destination: parameters.destination,
  });
}

export function trackEmailClick(parameters: EmailClickParameters) {
  trackConversionEvent("email_click", {
    placement: parameters.placement,
  });
}

export function trackPhoneClick(parameters: PhoneClickParameters) {
  trackConversionEvent("phone_click", {
    placement: parameters.placement,
  });
}

export function trackLeadFormSubmit(parameters: LeadFormSubmitParameters) {
  trackConversionEvent("lead_form_submit", {
    form_id: parameters.formId,
    form_location: parameters.formLocation,
  });
}
