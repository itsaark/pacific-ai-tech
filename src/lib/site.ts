export const siteUrl = "https://www.pacificaitech.com";
export const bookingPath = "/book";
export const bookingUrl = bookingPath;
export const bookingPageUrl = `${siteUrl}${bookingPath}`;
export const bookingConfirmationPath = "/booking-confirmed";
export const bookingConfirmationUrl = `${siteUrl}${bookingConfirmationPath}`;

const googleSchedulerUrl =
  "https://calendar.app.google/4ye2LLZjAwpgNNxNA";
const googleSchedulerEmbedUrl =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2z4aNeV1doWLl4L0rKNNHecJr_TBCWCJeKeMmEF1dzxfQpRIxOjBcRvX1mRnPXwWQPvIvOc84w?gv=true";

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

/** Public scheduling destinations. Override both values when Calendly is ready. */
export const schedulerUrl = approvedSchedulerUrl(
  process.env.NEXT_PUBLIC_SCHEDULER_URL,
  googleSchedulerUrl,
);
export const schedulerEmbedUrl = approvedSchedulerUrl(
  process.env.NEXT_PUBLIC_SCHEDULER_EMBED_URL,
  googleSchedulerEmbedUrl,
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
  "Pacific AI Tech is an AI consulting practice for small businesses: solutions architecture, AI agent deployment on client-owned computers, and hands-on training across greater Portland and the Pacific Northwest. Every engagement is custom-scoped.";
