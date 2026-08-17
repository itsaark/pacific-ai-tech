export const VERIFIED_BOOKING_STORAGE_KEY =
  "pacificaitech_verified_booking_v1";

export const VERIFIED_BOOKING_TTL_MS = 30 * 60 * 1000;

export type VerifiedBooking = {
  completedAt: string;
  provider: "calendly";
  /** Calendly invitee API URI, used to look up the invitee email for enhanced conversions. */
  inviteeUri?: string;
};
