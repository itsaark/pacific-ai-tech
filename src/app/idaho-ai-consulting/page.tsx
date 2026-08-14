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
  idahoConsultingPath,
  idahoSchemaAreas,
  idahoServiceClusters,
  regionalConsultingPath,
  serviceDescription,
  siteUrl,
  websiteId,
} from "@/lib/site";

const pageTitle = "Idaho AI Consulting";
const pageDescription =
  "Virtual AI consulting for small businesses across Idaho, from Boise and the Treasure Valley to Coeur d'Alene, Idaho Falls, and Twin Falls. Workflow automation, AI agent deployment, and hands-on training.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: idahoConsultingPath,
  },
  keywords: [
    "Idaho AI consulting",
    "Idaho AI consultant",
    "Boise AI consultant",
    "Boise AI consulting",
    "Idaho small business AI",
    "Coeur d'Alene AI consultant",
    "Idaho Falls AI consulting",
    "Twin Falls AI consultant",
    "virtual AI consulting Idaho",
  ],
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: idahoConsultingPath,
    siteName: "Pacific AI Tech",
    type: "website",
    images: [
      {
        url: "/pacific-ai-tech/img/tulips.jpeg",
        width: 1280,
        height: 853,
        alt: "Pacific AI Tech AI consulting for Idaho small businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/pacific-ai-tech/img/tulips.jpeg"],
  },
};

const featuredProof = caseStudies.filter((study) =>
  [
    "frostbox-logistics-ai-dispatch",
    "aspen-pest-control-ai-marketing-automation",
  ].includes(study.slug),
);

const faqs = [
  {
    question: "Do you come on-site in Idaho?",
    answer:
      "Idaho engagements start virtually, and most stay that way: working sessions over video, deployment on your machines by screen share, and training with your team. An on-site visit is added to the scope only when it is needed.",
  },
  {
    question: "Does remote setup actually work?",
    answer:
      "Yes. The work happens on your computers either way. We map your workflows over video calls, install and configure the tools on your machines, and teach your team to run them. Several of our engagements have been fully remote.",
  },
  {
    question: "We are in Coeur d'Alene. Is North Idaho covered?",
    answer:
      "Yes. We already serve Spokane and Eastern Washington, so North Idaho sits inside our regular working footprint.",
  },
  {
    question: "What about Oregon or Washington?",
    answer:
      "Businesses in Oregon or Washington should use the Oregon and Washington page, and Greater Portland businesses should use the Portland page.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}${idahoConsultingPath}#webpage`,
      url: `${siteUrl}${idahoConsultingPath}`,
      name: pageTitle,
      description: pageDescription,
      isPartOf: { "@id": websiteId },
      about: { "@id": `${siteUrl}${idahoConsultingPath}#service` },
      breadcrumb: { "@id": `${siteUrl}${idahoConsultingPath}#breadcrumb` },
      inLanguage: "en-US",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}${idahoConsultingPath}#service`,
      name: "Idaho business AI consulting",
      url: `${siteUrl}${idahoConsultingPath}`,
      description: serviceDescription,
      provider: { "@id": businessId },
      areaServed: idahoSchemaAreas,
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
      "@id": `${siteUrl}${idahoConsultingPath}#faq`,
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
      "@id": `${siteUrl}${idahoConsultingPath}#breadcrumb`,
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
          name: "Idaho AI consulting",
          item: `${siteUrl}${idahoConsultingPath}`,
        },
      ],
    },
  ],
};

export default function IdahoConsultingPage() {
  const leadFormEnabled = Boolean(
    process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL,
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

      <section className="pat-subpage-hero" aria-labelledby="idaho-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <span className="pat-eyebrow">Idaho</span>
              <h1 id="idaho-title">AI consulting for Idaho small businesses.</h1>
            </div>
            <div>
              <p className="pat-lede">
                We help small businesses automate repeat work, set up the tools
                on their own machines, and train the people who will run them.
                Idaho engagements are virtual-first, from the Treasure Valley
                to the Panhandle.{" "}
                <Link href={regionalConsultingPath}>
                  Oregon and Washington businesses should use the regional page
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
            Remote consulting is available throughout Idaho. On-site visits are
            added to a scope when they are needed.
          </p>
          <dl className="pat-area-list">
            {idahoServiceClusters.map((cluster) => (
              <div key={cluster.name}>
                <dt>{cluster.name}</dt>
                <dd>{cluster.places.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        className="pat-local-section pat-local-section-alt"
        aria-labelledby="proof-title"
      >
        <div className="pat-wrap">
          <span className="pat-eyebrow">Case studies</span>
          <h2 id="proof-title">Recent work in the Pacific Northwest.</h2>
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
          aria-label="Request an Idaho AI consultation"
        >
          <div className="pat-wrap">
            <ConsultationForm location="idaho-landing-page" />
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
