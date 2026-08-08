"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { captureLandingAttribution } from "@/lib/analytics/attribution";
import {
  trackAppointmentBooked,
  trackBookCallClick,
  trackEmailClick,
  trackLeadFormSubmit,
  trackPhoneClick,
} from "@/lib/analytics/google";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleMeasurementClient() {
  const pathname = usePathname();
  const previousPage = useRef<string | null>(null);

  useEffect(() => {
    captureLandingAttribution();
  }, []);

  useEffect(() => {
    const trackLinkClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (!link) return;

      const href = link.href;
      const placement = link.closest("header")
        ? "header"
        : link.closest("footer")
          ? "footer"
          : link.closest("#contact")
            ? "contact"
            : link.closest(".pat-subpage-hero, .pat-hero")
              ? "hero"
              : "body";

      if (
        new URL(href, window.location.origin).pathname === "/book" ||
        href.startsWith("https://calendar.app.google/") ||
        href.startsWith("https://calendar.google.com/calendar/appointments/") ||
        href.startsWith("https://calendly.com/")
      ) {
        trackBookCallClick({ placement, destination: href });
      } else if (href.startsWith("mailto:")) {
        trackEmailClick({ placement });
      } else if (href.startsWith("tel:")) {
        trackPhoneClick({ placement });
      }
    };

    document.addEventListener("click", trackLinkClick);
    return () => document.removeEventListener("click", trackLinkClick);
  }, []);

  useEffect(() => {
    if (!window.gtag) return;

    const pageLocation = window.location.href;
    if (pageLocation === previousPage.current) return;

    window.gtag("event", "page_view", {
      page_location: pageLocation,
      page_path: `${window.location.pathname}${window.location.search}`,
      page_title: document.title,
    });
    previousPage.current = pageLocation;
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/booking-confirmed") return;

    const storageKey = "pacificaitech_booking_flow_started";
    let flowStarted: string | null = null;
    try {
      flowStarted = window.sessionStorage.getItem(storageKey);
    } catch {
      return;
    }
    if (!flowStarted) return;

    try {
      const parsed = JSON.parse(flowStarted) as { startedAt?: string };
      const startedAt = parsed.startedAt ? Date.parse(parsed.startedAt) : NaN;
      const withinBookingWindow =
        Number.isFinite(startedAt) && Date.now() - startedAt < 4 * 60 * 60 * 1000;

      if (withinBookingWindow) {
        trackAppointmentBooked();
      }
    } catch {
      // Ignore malformed state rather than emitting an unverified conversion.
    } finally {
      try {
        window.sessionStorage.removeItem(storageKey);
      } catch {
        // The conversion has already been queued for this page view.
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/thank-you") return;

    const storageKey = "pacificaitech_pending_lead_conversion";
    let pendingConversion: string | null = null;
    try {
      pendingConversion = window.sessionStorage.getItem(storageKey);
    } catch {
      return;
    }
    if (!pendingConversion) return;

    try {
      const parsed = JSON.parse(pendingConversion) as { location?: string };
      trackLeadFormSubmit({
        formId: "consultation-request",
        formLocation: parsed.location,
      });
    } catch {
      // Ignore malformed session data rather than emitting a false conversion.
    } finally {
      try {
        window.sessionStorage.removeItem(storageKey);
      } catch {
        // The conversion has already been queued for this page view.
      }
    }
  }, [pathname]);

  return null;
}
