import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Mail, Phone } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  bookingUrl,
  businessPhoneDisplay,
  businessPhoneHref,
  contactEmail,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Consultation Booking Confirmed",
  description: "Your Pacific AI Tech introductory consultation is on the calendar.",
  alternates: {
    canonical: "/booking-confirmed",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookingConfirmedPage() {
  return (
    <main className="pat-site">
      <SiteHeader bookingUrl={bookingUrl} />

      <section className="pat-confirmation" aria-labelledby="confirmation-title">
        <div className="pat-wrap pat-confirmation-layout">
          <div className="pat-confirmation-mark" aria-hidden="true">
            <CalendarCheck />
          </div>
          <div>
            <span className="pat-eyebrow">You are on the calendar</span>
            <h1 id="confirmation-title">Thank you. We will come prepared.</h1>
            <p className="pat-lede">
              Your scheduling provider will send the meeting details and add
              the appointment to your calendar. Aark or Shayan will review the
              context you shared before the call.
            </p>
            <div className="pat-confirmation-actions">
              <Button
                render={<Link href="/case-studies" />}
                nativeButton={false}
                className="pat-btn pat-btn-primary"
              >
                Read client stories
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                render={<Link href="/" />}
                nativeButton={false}
                variant="outline"
                className="pat-btn"
              >
                Return to the website
              </Button>
            </div>
            <div className="pat-confirmation-contact">
              <span>Need to add context before the call?</span>
              <a href={`mailto:${contactEmail}`}>
                <Mail aria-hidden="true" />
                {contactEmail}
              </a>
              <a href={businessPhoneHref}>
                <Phone aria-hidden="true" />
                {businessPhoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
