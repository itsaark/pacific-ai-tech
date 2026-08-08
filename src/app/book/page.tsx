import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BookingScheduler } from "@/components/booking-scheduler";
import {
  bookingPageUrl,
  businessId,
  businessPhoneDisplay,
  businessPhoneHref,
  contactEmail,
  schedulerEmbedUrl,
  schedulerProvider,
  schedulerUrl,
  siteUrl,
} from "@/lib/site";
import styles from "./book.module.css";

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
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className={styles.header}>
        <div className={`${styles.shell} ${styles.headerInner}`}>
          <Link
            className={`${styles.brand} ${styles.actionLink}`}
            href="/"
            aria-label="Pacific AI Tech home"
          >
            <Image
              className={styles.brandMark}
              src="/pacific-ai-tech/img/logo-pine.png"
              alt=""
              width={225}
              height={512}
              priority
            />
            <span>Pacific AI Tech</span>
          </Link>
          <Link className={`${styles.backLink} ${styles.actionLink}`} href="/">
            Back to site
          </Link>
        </div>
      </header>

      <section className={styles.booking} aria-labelledby="booking-title">
        <div className={`${styles.shell} ${styles.bookingLayout}`}>
          <div className={styles.intro}>
            <h1 id="booking-title">Book an AI consultation.</h1>
            <p className={styles.introCopy}>
              Pick a time that works. You’ll talk directly with Aark or Shayan.
            </p>
            <div className={styles.contact}>
              <a
                className={styles.actionLink}
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>
              <a className={styles.actionLink} href={businessPhoneHref}>
                {businessPhoneDisplay}
              </a>
            </div>
          </div>

          <div
            className={styles.calendar}
            aria-label="Choose an available call time"
          >
            <div className={styles.calendarHeader}>
              <h2>Choose a time.</h2>
            </div>
            <BookingScheduler
              embedUrl={schedulerEmbedUrl}
              provider={schedulerProvider}
              schedulerUrl={schedulerUrl}
            />
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.footerInner}`}>
          <p>Pacific AI Tech LLC · Portland, Oregon</p>
          <nav className={styles.footerLinks} aria-label="Legal">
            <Link className={styles.actionLink} href="/privacy">
              Privacy
            </Link>
            <Link className={styles.actionLink} href="/terms">
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
