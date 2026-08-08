"use client";

import { useEffect } from "react";
import Script from "next/script";
import { ExternalLink } from "lucide-react";

const BOOKING_FLOW_STORAGE_KEY = "pacificaitech_booking_flow_started";

type BookingSchedulerProps = {
  embedUrl: string;
  provider: "calendly" | "google-calendar";
  schedulerUrl: string;
};

function rememberBookingFlow() {
  try {
    window.sessionStorage.setItem(
      BOOKING_FLOW_STORAGE_KEY,
      JSON.stringify({ startedAt: new Date().toISOString() }),
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
    rememberBookingFlow();
  }, []);

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

      rememberBookingFlow();
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
