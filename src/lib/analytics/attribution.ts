const ATTRIBUTION_STORAGE_KEY = "pacificaitech_marketing_attribution_v1";
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;
const MAX_VALUE_LENGTH = 500;

const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid"] as const;

export type ClickIdKey = (typeof CLICK_ID_KEYS)[number];
export type UtmKey = `utm_${string}`;

export type MarketingAttribution = Partial<Record<ClickIdKey | UtmKey, string>> & {
  landing_page: string;
  landing_referrer?: string;
  captured_at: string;
  expires_at: string;
};

function isBrowser() {
  return typeof window !== "undefined";
}

function cleanValue(value: string) {
  return value.trim().slice(0, MAX_VALUE_LENGTH);
}

function isFresh(attribution: MarketingAttribution) {
  const expiry = Date.parse(attribution.expires_at);
  return Number.isFinite(expiry) && expiry > Date.now();
}

function readStoredValue(): MarketingAttribution | null {
  if (!isBrowser()) return null;

  try {
    const value = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!value) return null;

    const attribution = JSON.parse(value) as MarketingAttribution;
    if (!attribution.landing_page || !isFresh(attribution)) {
      window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
      return null;
    }

    return attribution;
  } catch {
    return null;
  }
}

function trackingParameters(searchParams: URLSearchParams) {
  const parameters: Partial<Record<ClickIdKey | UtmKey, string>> = {};

  for (const [rawKey, rawValue] of searchParams.entries()) {
    const key = rawKey.toLowerCase();
    const isClickId = CLICK_ID_KEYS.includes(key as ClickIdKey);
    const isUtm = key.startsWith("utm_");

    if ((!isClickId && !isUtm) || !rawValue.trim()) continue;
    parameters[key as ClickIdKey | UtmKey] = cleanValue(rawValue);
  }

  return parameters;
}

/**
 * Stores the most recent non-direct landing attribution. Direct return visits do
 * not erase a still-valid campaign, while a new click ID or UTM campaign does.
 */
export function captureLandingAttribution(): MarketingAttribution | null {
  if (!isBrowser()) return null;

  const existing = readStoredValue();
  const parameters = trackingParameters(
    new URLSearchParams(window.location.search),
  );
  const hasCampaignParameters = Object.keys(parameters).length > 0;

  if (existing && !hasCampaignParameters) return existing;

  const now = new Date();
  const attribution: MarketingAttribution = {
    ...parameters,
    landing_page: `${window.location.origin}${window.location.pathname}`,
    captured_at: now.toISOString(),
    expires_at: new Date(now.getTime() + ATTRIBUTION_TTL_MS).toISOString(),
  };

  if (document.referrer) {
    attribution.landing_referrer = cleanValue(document.referrer);
  }

  try {
    window.localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution),
    );
  } catch {
    // Storage can be unavailable in private or hardened browser contexts.
  }

  return attribution;
}

export function getMarketingAttribution(): MarketingAttribution | null {
  return readStoredValue();
}
