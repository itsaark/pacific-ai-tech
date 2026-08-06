import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { bookingUrl, contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Consultation Request Received",
  description: "Pacific AI Tech received your consultation request.",
  alternates: {
    canonical: "/thank-you",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <main className="pat-site">
      <SiteHeader bookingUrl={bookingUrl} />

      <section className="pat-subpage-hero" aria-labelledby="thank-you-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <span className="pat-eyebrow">Request received</span>
              <h1 id="thank-you-title">
                Thank you. We will read this before we reply.
              </h1>
            </div>
            <div>
              <p className="pat-lede">
                Aark or Shayan will respond within one business day. If the
                workflow looks like a fit, the next step is a short call to map
                what should be automated, what should stay human, and what a
                first deployment could include.
              </p>
              <div className="pat-local-actions">
                <Button
                  render={
                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer" />
                  }
                  nativeButton={false}
                  className="pat-btn pat-btn-primary"
                >
                  <CalendarDays data-icon="inline-start" />
                  Choose a meeting time
                </Button>
                <Button
                  render={<Link href="/case-studies" />}
                  nativeButton={false}
                  variant="outline"
                  className="pat-btn"
                >
                  Read client stories
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
              <p className="pat-thank-you-note">
                Need to add something? Email{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
