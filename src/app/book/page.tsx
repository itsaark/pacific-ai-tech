import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { BookingScheduler } from "@/components/booking-scheduler";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  bookingPageUrl,
  bookingUrl,
  businessId,
  businessPhoneDisplay,
  businessPhoneHref,
  contactEmail,
  schedulerEmbedUrl,
  schedulerProvider,
  schedulerUrl,
  siteUrl,
} from "@/lib/site";

const pageDescription =
  "Book a practical AI consultation with Pacific AI Tech. Talk directly with our Portland founders about a workflow, deployment, or team training need.";

export const metadata: Metadata = {
  title: "Book an AI Consultation in Portland",
  description: pageDescription,
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Book an AI Consultation in Portland | Pacific AI Tech",
    description: pageDescription,
    url: "/book",
    siteName: "Pacific AI Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book an AI Consultation | Pacific AI Tech",
    description: pageDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const conversationPoints = [
  "The repeat work that is taking too much owner or team time",
  "Where the information currently lives and which tools are involved",
  "What AI could handle, what should stay manual, and where approval belongs",
  "Whether a practical first deployment is worth scoping",
];

const faqs = [
  {
    question: "Do I need to know which AI tool I want?",
    answer:
      "No. Bring the business workflow, the tools your team already uses, and the outcome you need. We will help determine whether AI is useful and which approach fits.",
  },
  {
    question: "Is the introductory call a technical sales demo?",
    answer:
      "No. It is a working conversation about how the task happens today, what must remain human-approved, and whether there is enough value to scope an implementation.",
  },
  {
    question: "Can you work with us on-site?",
    answer:
      "Yes. We work on-site across Greater Portland when practical and can combine on-site work with remote implementation and training across Oregon and Washington.",
  },
  {
    question: "Do you provide personal computer repair?",
    answer:
      "No. Pacific AI Tech works exclusively on business AI consulting, workflow implementation, and team training—not consumer repair, password recovery, or general technical support.",
  },
] as const;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${bookingPageUrl}#page`,
    url: bookingPageUrl,
    name: "Book an AI Consultation with Pacific AI Tech",
    description: pageDescription,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": businessId,
    },
    mainEntity: {
      "@id": businessId,
    },
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book an introductory AI consultation",
      target: bookingPageUrl,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Pacific AI Tech",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Book an AI Consultation",
        item: bookingPageUrl,
      },
    ],
  },
];

export default function BookPage() {
  return (
    <main className="pat-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader bookingUrl={bookingUrl} />

      <section className="pat-subpage-hero pat-booking-hero" aria-labelledby="booking-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <span className="pat-eyebrow">
                Founder-led · Business-only · Portland, Oregon
              </span>
              <h1 id="booking-title">
                Bring us the work that keeps following you home.
              </h1>
            </div>
            <div>
              <p className="pat-lede">
                Book an introductory conversation with Aark or Shayan. We will
                start with one real workflow, look at where the time goes, and
                decide honestly whether AI can create useful value.
              </p>
              <div className="pat-booking-trust-line">
                <ShieldCheck aria-hidden="true" />
                <span>No generic pitch. No obligation. No consumer tech support.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pat-booking-section" aria-labelledby="choose-time-title">
        <div className="pat-wrap pat-booking-layout">
          <aside className="pat-booking-brief">
            <span className="pat-eyebrow">Before you choose a time</span>
            <h2 id="choose-time-title">A useful first conversation.</h2>
            <p>
              You do not need a polished requirements document or a preferred
              AI product. A concrete example of the work is enough.
            </p>
            <ol>
              {conversationPoints.map((point, index) => (
                <li key={point}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{point}</p>
                </li>
              ))}
            </ol>
            <div className="pat-booking-contact">
              <a href={businessPhoneHref}>
                <Phone aria-hidden="true" />
                {businessPhoneDisplay}
              </a>
              <a href={`mailto:${contactEmail}`}>
                <Mail aria-hidden="true" />
                {contactEmail}
              </a>
            </div>
          </aside>

          <div className="pat-booking-calendar" aria-label="Choose an available consultation time">
            <div className="pat-booking-calendar-head">
              <div>
                <span className="pat-eyebrow">Current availability</span>
                <h2>Choose a time that works.</h2>
              </div>
              <span className="pat-booking-live">
                <span aria-hidden="true" />
                Live calendar
              </span>
            </div>
            <BookingScheduler
              embedUrl={schedulerEmbedUrl}
              provider={schedulerProvider}
              schedulerUrl={schedulerUrl}
            />
          </div>
        </div>
      </section>

      <section className="pat-local-section pat-local-section-alt" aria-labelledby="fit-title">
        <div className="pat-wrap pat-booking-fit">
          <div>
            <span className="pat-eyebrow">Designed for local operators</span>
            <h2 id="fit-title">The call is a fit when there is real work to examine.</h2>
          </div>
          <div className="pat-booking-fit-copy">
            <p>
              We work with business owners and teams dealing with repeat work
              across inboxes, files, spreadsheets, browser tools, dispatch,
              research, follow-up, reporting, estimates, and other operating
              systems.
            </p>
            <p>
              Greater Portland is our primary local service area. Wider Oregon
              and Washington work is available on-site when practical and by
              screen share when remote work is the better fit.
            </p>
            <Link href="/portland-ai-consultant" className="pat-source-link">
              Explore Portland AI consulting
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="pat-local-section" aria-labelledby="booking-faq-title">
        <div className="pat-wrap">
          <div className="pat-section-head">
            <div>
              <span className="pat-eyebrow">Before we meet</span>
            </div>
            <h2 id="booking-faq-title">Straight answers about the first call.</h2>
          </div>
          <div className="pat-local-faq">
            {faqs.map((faq) => (
              <section key={faq.question}>
                <Check className="pat-booking-faq-mark" aria-hidden="true" />
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </section>
            ))}
          </div>
          <div className="pat-booking-region-note">
            <MapPin aria-hidden="true" />
            <p>
              Based in Portland and serving businesses across Greater Portland
              and the Pacific Northwest. Prefer to keep reading first? Review
              our <Link href="/case-studies">published client work</Link>.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
