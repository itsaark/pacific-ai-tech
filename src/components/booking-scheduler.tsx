"use client";

import { useEffect } from "react";
import Script from "next/script";
import { ExternalLink } from "lucide-react";
import {
  VERIFIED_BOOKING_STORAGE_KEY,
  type VerifiedBooking,
} from "@/lib/analytics/booking";

type BookingSchedulerProps = {
  embedUrl: string;
  provider: "calendly" | "google-calendar";
  schedulerUrl: string;
};

function rememberVerifiedBooking() {
  const booking: VerifiedBooking = {
    completedAt: new Date().toISOString(),
    provider: "calendly",
  };

  try {
    window.sessionStorage.setItem(
      VERIFIED_BOOKING_STORAGE_KEY,
      JSON.stringify(booking),
    );
  } catch {
    // The scheduler remains usable when browser storage is unavailable.
  }
}

export function BookingScheduler({
  embedUrl,
  provider,
  schedulerUrl,
}: BookingSchedulerProps) {
  useEffect(() => {
    if (provider !== "calendly") return;

    const onCalendlyMessage = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com") return;
      if (
        !event.data ||
        typeof event.data !== "object" ||
        event.data.event !== "calendly.event_scheduled"
      ) {
        return;
      }

      rememberVerifiedBooking();
      window.location.assign("/booking-confirmed");
    };

    window.addEventListener("message", onCalendlyMessage);
    return () => window.removeEventListener("message", onCalendlyMessage);
  }, [provider]);

  return (
    <div className="pat-booking-scheduler">
      {provider === "calendly" ? (
        <>
          <Script
            id="calendly-widget"
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="afterInteractive"
          />
          <div
            className="calendly-inline-widget pat-booking-embed"
            data-url={embedUrl}
            aria-label="Pacific AI Tech consultation availability"
          />
        </>
      ) : (
        <iframe
          className="pat-booking-embed"
          src={embedUrl}
          title="Book an introductory call with Pacific AI Tech"
          loading="eager"
          allow="payment"
        />
      )}

      <p className="pat-booking-fallback">
        Calendar not displaying?{" "}
        <a href={schedulerUrl} target="_blank" rel="noopener noreferrer">
          Open the secure scheduling page
          <ExternalLink aria-hidden="true" />
        </a>
        .
      </p>
    </div>
  );
}
