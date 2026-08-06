import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { bookingUrl, contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Pacific AI Tech handles website analytics, consultation requests, advertising attribution, cookies, and privacy choices.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "How Pacific AI Tech handles website analytics, consultation requests, advertising attribution, cookies, and privacy choices.",
    url: "/privacy",
    siteName: "Pacific AI Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pacific AI Tech Privacy Policy",
    description:
      "How Pacific AI Tech handles website analytics, consultation requests, advertising attribution, and privacy choices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="pat-site">
      <SiteHeader bookingUrl={bookingUrl} />

      <section className="pat-subpage-hero" aria-labelledby="privacy-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <span className="pat-eyebrow">Privacy</span>
              <h1 id="privacy-title">
                Clear about the data behind a{" "}
                <span className="pat-serif-emphasis">conversation.</span>
              </h1>
            </div>
            <div>
              <p className="pat-lede">
                This policy explains what Pacific AI Tech LLC collects through
                this website, why we use it, and the choices available to you.
              </p>
              <p>Effective August 6, 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pat-case-detail" aria-label="Privacy policy details">
        <div className="pat-wrap">
          <div className="pat-case-narrative">
            <section>
              <h2>Information you give us</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  If you submit a consultation form or email us, we receive the
                  information you choose to provide. That may include your name,
                  email address, company, and details about the workflow or
                  project you want to discuss.
                </p>
                <p>
                  Consultation requests are sent to our business inbox. When
                  email delivery is configured, Resend may process the request
                  to deliver it. Our website does not maintain a separate lead
                  database, although hosting and email providers may retain
                  limited operational or security logs.
                </p>
              </div>
            </section>

            <section>
              <h2>Website analytics</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  We use Vercel Web Analytics to understand aggregate website
                  activity, such as which pages are visited and general device
                  or referral information. Vercel processes this information as
                  our hosting and analytics provider.
                </p>
                <p>
                  We may also enable Google Analytics 4 and Google Ads
                  measurement. When enabled, those tools may process browser and
                  device information, page views, interactions, approximate
                  location derived from network information, and campaign
                  identifiers such as UTM parameters or a Google click ID.
                  Availability and behavior can depend on your consent choices,
                  browser settings, and region.
                </p>
              </div>
            </section>

            <section>
              <h2>Cookies and attribution</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  Vercel Web Analytics is designed to provide aggregate insights
                  without using tracking cookies. If Google measurement is
                  enabled, Google may use cookies or similar browser storage for
                  analytics, advertising measurement, fraud prevention, and
                  attribution where permitted.
                </p>
                <p>
                  A consultation request may include the page you came from and
                  campaign parameters so we can understand which outreach led to
                  the inquiry. We use this information to evaluate our marketing
                  and follow up on your request, not to sell a profile about you.
                </p>
              </div>
            </section>

            <section>
              <h2>How we use and share information</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  We use information to respond to inquiries, schedule calls,
                  prepare proposals, operate and secure the website, understand
                  site performance, measure advertising, and meet legal or
                  accounting obligations.
                </p>
                <p>
                  We do not sell personal information. We share information only
                  with providers that help us run these functions, when you ask
                  us to, or when reasonably necessary to protect rights, safety,
                  and the integrity of our services. Depending on the feature you
                  use, providers may include Vercel, Resend, and Google.
                </p>
              </div>
            </section>

            <section>
              <h2>Scheduling and outside services</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  Our booking links open Google Calendar, and other links may
                  open third-party websites such as LinkedIn. Information you
                  provide on those services is handled under their policies and
                  settings. We encourage you to review them before submitting
                  information.
                </p>
              </div>
            </section>

            <section>
              <h2>Retention and security</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  We keep inquiry and business records only as long as reasonably
                  needed for the purposes described here, including follow-up,
                  project records, security, dispute resolution, and legal or
                  tax obligations. Different providers may maintain their own
                  backup and log-retention schedules.
                </p>
                <p>
                  We use reasonable safeguards, but no internet transmission or
                  storage system can be guaranteed completely secure. Please do
                  not put passwords, regulated data, or other sensitive material
                  in an initial consultation request.
                </p>
              </div>
            </section>

            <section>
              <h2>Your choices</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  You can use browser controls to limit cookies and may use any
                  consent controls shown on the site. You can also ask us to
                  access, correct, or delete information you submitted. Some
                  requests may be limited by security, recordkeeping, or other
                  legal obligations.
                </p>
                <p>
                  To make a request, email{" "}
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. You can
                  also review Google&apos;s advertising controls through your Google
                  account and browser settings.
                </p>
              </div>
            </section>

            <section>
              <h2>Children and policy updates</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  This business website is not directed to children under 13,
                  and we do not knowingly seek personal information from them.
                  We may update this policy as the website and its measurement
                  tools change. The effective date above will show the latest
                  revision.
                </p>
                <p>
                  Questions about this policy can be sent to{" "}
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. For the
                  rules that apply when using this site or engaging us, see our{" "}
                  <Link href="/terms">Terms</Link>.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
