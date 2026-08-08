export const siteUrl = "https://www.pacificaitech.com";
export const bookingUrl = "https://calendar.app.google/4ye2LLZjAwpgNNxNA";
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
