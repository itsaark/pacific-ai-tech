"use client";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
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

const CALENDLY_ORIGIN = "https://calendly.com";
const CALENDLY_ASSETS_ORIGIN = "https://assets.calendly.com";
const CALENDLY_WIDGET_URL = `${CALENDLY_ASSETS_ORIGIN}/assets/external/widget.js`;

function CalendlyResourceHints() {
  ReactDOM.preconnect(CALENDLY_ORIGIN);
  ReactDOM.preconnect(CALENDLY_ASSETS_ORIGIN);
  ReactDOM.preload(CALENDLY_WIDGET_URL, { as: "script" });
  ReactDOM.prefetchDNS("https://js.stripe.com");
  ReactDOM.prefetchDNS("https://www.recaptcha.net");

  return null;
}

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
  const [isCalendlyReady, setIsCalendlyReady] = useState(
    provider !== "calendly",
  );

  useEffect(() => {
    if (provider !== "calendly") return;

    const readyFallback = window.setTimeout(() => {
      setIsCalendlyReady(true);
    }, 12_000);

    const onCalendlyMessage = (event: MessageEvent) => {
      if (event.origin !== CALENDLY_ORIGIN) return;
      if (!event.data || typeof event.data !== "object") return;

      const calendlyEvent = event.data.event;

      if (
        calendlyEvent === "calendly.event_type_viewed" ||
        calendlyEvent === "calendly.profile_page_viewed" ||
        calendlyEvent === "calendly.date_and_time_selected"
      ) {
        window.clearTimeout(readyFallback);
        setIsCalendlyReady(true);
      }

      if (calendlyEvent !== "calendly.event_scheduled") return;

      rememberVerifiedBooking();
      window.location.assign("/booking-confirmed");
    };

    window.addEventListener("message", onCalendlyMessage);
    return () => {
      window.clearTimeout(readyFallback);
      window.removeEventListener("message", onCalendlyMessage);
    };
  }, [provider]);

  return (
    <div className="pat-booking-scheduler">
      {provider === "calendly" ? (
        <>
          <CalendlyResourceHints />
          <Script
            id="calendly-widget"
            src={CALENDLY_WIDGET_URL}
            strategy="afterInteractive"
          />
          <div
            className="pat-booking-embed-shell"
            data-ready={isCalendlyReady}
          >
            <div
              className="pat-booking-loader"
              role="status"
              aria-live="polite"
              aria-hidden={isCalendlyReady}
            >
              <span className="pat-booking-loader-mark" aria-hidden="true" />
              <span>Loading live availability…</span>
            </div>
            <div
              className="calendly-inline-widget pat-booking-embed"
              data-url={embedUrl}
              aria-label="Pacific AI Tech consultation availability"
            />
          </div>
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
