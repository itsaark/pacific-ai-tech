import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConsultationForm } from "@/components/consultation-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { caseStudies } from "@/lib/case-studies";
import {
  bookingUrl,
  businessId,
  businessPhoneDisplay,
  businessPhoneHref,
  contactEmail,
  oregonWashingtonSchemaAreas,
  portlandConsultingPath,
  regionalConsultingPath,
  regionalServiceClusters,
  serviceDescription,
  siteUrl,
  websiteId,
} from "@/lib/site";

const pageTitle = "Oregon & Washington AI Consulting";
const pageDescription =
  "AI consulting for small businesses across Oregon and Washington. Virtual throughout both states, with on-site work in Greater Portland and selected nearby communities.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: regionalConsultingPath,
  },
  keywords: [
    "Oregon AI consulting",
    "Washington AI consulting",
    "Oregon AI consultant",
    "Washington small business AI",
    "Eugene AI consultant",
    "Salem AI consulting",
    "Bend AI consultant",
    "Spokane AI consulting",
    "virtual AI consulting Oregon Washington",
  ],
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: regionalConsultingPath,
    siteName: "Pacific AI Tech",
    type: "website",
    images: [
      {
        url: "/pacific-ai-tech/img/bridge.jpeg",
        width: 1200,
        height: 800,
        alt: "Pacific AI Tech AI consulting across Oregon and Washington",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/pacific-ai-tech/img/bridge.jpeg"],
  },
};

const featuredProof = caseStudies.filter((study) =>
  [
    "frostbox-logistics-ai-dispatch",
    "kristi-blain-real-estate-ai-assistant",
  ].includes(study.slug),
);

const faqs = [
  {
    question: "Do you only work in Portland?",
    answer:
      "No. We work with businesses across Oregon and Washington. Greater Portland is where we do most on-site work. Other locations are usually served remotely.",
  },
  {
    question: "Do you travel to Bend, Spokane, or the coast?",
    answer:
      "Those engagements start remotely. An on-site visit is added to the scope only when it is needed.",
  },
  {
    question: "I am in Greater Portland. Is this the right page?",
    answer:
      "Use the Portland AI consultant page if your business is in Portland, Vancouver, Beaverton, Hillsboro, or a nearby metro city.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}${regionalConsultingPath}#webpage`,
      url: `${siteUrl}${regionalConsultingPath}`,
      name: pageTitle,
      description: pageDescription,
      isPartOf: { "@id": websiteId },
      about: { "@id": `${siteUrl}${regionalConsultingPath}#service` },
      breadcrumb: { "@id": `${siteUrl}${regionalConsultingPath}#breadcrumb` },
      inLanguage: "en-US",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}${regionalConsultingPath}#service`,
      name: "Oregon and Washington business AI consulting",
      url: `${siteUrl}${regionalConsultingPath}`,
      description: serviceDescription,
      provider: { "@id": businessId },
      areaServed: oregonWashingtonSchemaAreas,
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Small businesses and local operators",
      },
      serviceType: [
        "Business AI consulting",
        "AI workflow implementation",
        "Virtual AI consulting",
        "Business AI training",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}${regionalConsultingPath}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}${regionalConsultingPath}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Oregon & Washington AI consulting",
          item: `${siteUrl}${regionalConsultingPath}`,
        },
      ],
    },
  ],
};

export default function OregonWashingtonConsultingPage() {
  const leadFormEnabled = Boolean(
    process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL,
  );
  const oregonClusters = regionalServiceClusters.filter(
    (cluster) => cluster.state === "Oregon",
  );
  const washingtonClusters = regionalServiceClusters.filter(
    (cluster) => cluster.state === "Washington",
  );

  return (
    <main className="pat-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader bookingUrl={bookingUrl} />

      <section className="pat-subpage-hero" aria-labelledby="regional-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <span className="pat-eyebrow">Oregon &amp; Washington</span>
              <h1 id="regional-title">
                AI consulting across Oregon and Washington.
              </h1>
            </div>
            <div>
              <p className="pat-lede">
                We help small businesses automate repeat work, set up the
                tools, and train the people who will run them. Work outside
                Greater Portland is usually remote.{" "}
                <Link href={portlandConsultingPath}>
                  Greater Portland businesses should use the Portland page
                </Link>
                .
              </p>
              <div className="pat-local-actions">
                <Button
                  render={<a href={bookingUrl} />}
                  nativeButton={false}
                  className="pat-btn pat-btn-primary"
                >
                  Book a consultation
                </Button>
                <Button
                  render={<a href={businessPhoneHref} />}
                  nativeButton={false}
                  variant="outline"
                  className="pat-btn"
                >
                  Call {businessPhoneDisplay}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pat-local-section" aria-labelledby="coverage-title">
        <div className="pat-wrap">
          <span className="pat-eyebrow">Service area</span>
          <h2 id="coverage-title">Cities and counties we serve.</h2>
          <p className="pat-lede">
            Remote consulting is available throughout both states. On-site
            work is scheduled when the drive makes sense.
          </p>
          <dl className="pat-area-list">
            <div>
              <dt>Oregon</dt>
              <dd>
                {oregonClusters.flatMap((cluster) => cluster.places).join(", ")}
              </dd>
            </div>
            <div>
              <dt>Washington</dt>
              <dd>
                {washingtonClusters
                  .flatMap((cluster) => cluster.places)
                  .join(", ")}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        className="pat-local-section pat-local-section-alt"
        aria-labelledby="proof-title"
      >
        <div className="pat-wrap">
          <span className="pat-eyebrow">Case studies</span>
          <h2 id="proof-title">Recent work in Oregon.</h2>
          <ul className="pat-plain-list">
            {featuredProof.map((study) => (
              <li key={study.slug}>
                <Link href={`/case-studies/${study.slug}`}>
                  {study.clientLabel}
                  <ArrowRight aria-hidden="true" />
                </Link>
                <span>{study.location}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {leadFormEnabled ? (
        <section
          className="pat-local-section"
          aria-label="Request an Oregon or Washington AI consultation"
        >
          <div className="pat-wrap">
            <ConsultationForm location="oregon-washington-landing-page" />
          </div>
        </section>
      ) : null}

      <section className="pat-local-section" aria-labelledby="faq-title">
        <div className="pat-wrap">
          <span className="pat-eyebrow">FAQ</span>
          <h2 id="faq-title">Common questions.</h2>
          <div className="pat-local-faq">
            {faqs.map((faq) => (
              <section key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </section>
            ))}
          </div>
          <p className="pat-inline-contact">
            Prefer email? Write to{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
