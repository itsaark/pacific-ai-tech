export const siteUrl = "https://www.pacificaitech.com";
export const bookingPath = "/book";
export const bookingUrl = bookingPath;
export const bookingPageUrl = `${siteUrl}${bookingPath}`;
export const bookingConfirmationPath = "/booking-confirmed";
export const bookingConfirmationUrl = `${siteUrl}${bookingConfirmationPath}`;

const defaultSchedulerUrl = "https://calendly.com/aark-pacificaitech/30min";

function approvedSchedulerUrl(value: string | undefined, fallback: string) {
  const candidate = value?.trim();
  if (!candidate) return fallback;

  try {
    const url = new URL(candidate);
    const approvedHost =
      url.hostname === "calendar.app.google" ||
      url.hostname === "calendar.google.com" ||
      url.hostname === "calendly.com" ||
      url.hostname.endsWith(".calendly.com");

    return url.protocol === "https:" && approvedHost ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

/** Public scheduling destinations. Environment values allow a future provider change. */
export const schedulerUrl = approvedSchedulerUrl(
  process.env.NEXT_PUBLIC_SCHEDULER_URL,
  defaultSchedulerUrl,
);
export const schedulerEmbedUrl = approvedSchedulerUrl(
  process.env.NEXT_PUBLIC_SCHEDULER_EMBED_URL,
  defaultSchedulerUrl,
);
export const schedulerProvider = schedulerEmbedUrl.includes("calendly.com")
  ? "calendly"
  : "google-calendar";
export const contactEmail = "hello@pacificaitech.com";
export const businessPhone = "+1-971-979-0077";
export const businessPhoneDisplay = "(971) 979-0077";
export const businessPhoneHref = "tel:+19719790077";

export const businessId = `${siteUrl}/#business`;
export const websiteId = `${siteUrl}/#website`;

export const greaterPortlandServiceAreas = [
  { displayName: "Portland", city: "Portland", region: "Oregon" },
  { displayName: "Vancouver", city: "Vancouver", region: "Washington" },
  { displayName: "Beaverton", city: "Beaverton", region: "Oregon" },
  { displayName: "Hillsboro", city: "Hillsboro", region: "Oregon" },
  { displayName: "Tigard", city: "Tigard", region: "Oregon" },
  { displayName: "Lake Oswego", city: "Lake Oswego", region: "Oregon" },
  { displayName: "Gresham", city: "Gresham", region: "Oregon" },
  { displayName: "Oregon City", city: "Oregon City", region: "Oregon" },
  { displayName: "Tualatin", city: "Tualatin", region: "Oregon" },
  { displayName: "Milwaukie", city: "Milwaukie", region: "Oregon" },
  { displayName: "Happy Valley", city: "Happy Valley", region: "Oregon" },
  { displayName: "Camas", city: "Camas", region: "Washington" },
] as const;

export const greaterPortlandSchemaAreas = [
  {
    "@type": "AdministrativeArea",
    name: "Portland metropolitan area",
    alternateName: "Greater Portland",
  },
  ...greaterPortlandServiceAreas.map(({ city, region }) => ({
    "@type": "City",
    name: `${city}, ${region}`,
    containedInPlace: {
      "@type": "State",
      name: region,
    },
  })),
];

export const serviceDescription =
  "Pacific AI Tech provides practical AI consulting, workflow implementation, AI agent deployment, and hands-on training for small businesses across Oregon and Washington. Work is available virtually throughout the region and on-site in selected communities. Every engagement is custom-scoped.";
