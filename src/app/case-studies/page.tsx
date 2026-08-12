import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { caseStudies } from "@/lib/case-studies";
import { businessId, bookingUrl, siteUrl, websiteId } from "@/lib/site";

export const metadata: Metadata = {
  title: "Small Business AI Consulting Case Studies",
  description:
    "See how Oregon and Washington small businesses use practical AI for dispatch, real estate research, missed calls, report follow-up, and daily operations.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Small Business AI Consulting Case Studies",
    description:
      "Oregon and Washington client stories showing how practical AI workflows change day-to-day operations while owners stay in control.",
    url: "/case-studies",
    siteName: "Pacific AI Tech",
    type: "website",
    images: [
      {
        url: "/pacific-ai-tech/img/case-studies/frostbox-logistics-ascii.jpg",
        width: 1800,
        height: 1040,
        alt: "Pacific AI Tech small business AI consulting case studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Small Business AI Consulting Case Studies",
    description:
      "Practical AI deployment stories from Oregon small businesses, with implementation details and owner-controlled outcomes.",
    images: ["/pacific-ai-tech/img/case-studies/frostbox-logistics-ascii.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/case-studies#webpage`,
      url: `${siteUrl}/case-studies`,
      name: "Small Business AI Consulting Case Studies",
      description: metadata.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": businessId },
      breadcrumb: { "@id": `${siteUrl}/case-studies#breadcrumb` },
      mainEntity: { "@id": `${siteUrl}/case-studies#case-study-list` },
      dateModified: "2026-08-11",
      inLanguage: "en-US",
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/case-studies#case-study-list`,
      name: "Pacific AI Tech client case studies",
      numberOfItems: caseStudies.length,
      itemListElement: caseStudies.map((study, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/case-studies/${study.slug}`,
        name: study.title,
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/case-studies#breadcrumb`,
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
          name: "Case studies",
          item: `${siteUrl}/case-studies`,
        },
      ],
    },
  ],
};

function getPrimaryChange(study: (typeof caseStudies)[number]) {
  const primaryMetric = study.metrics[0];

  if (!primaryMetric) {
    return study.services[0] ?? study.industry;
  }

  return `${primaryMetric.value} ${primaryMetric.label}`;
}

export default function CaseStudiesPage() {
  return (
    <main className="pat-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader bookingUrl={bookingUrl} />

      <section className="pat-subpage-hero" aria-labelledby="case-studies-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <h1 id="case-studies-title">
                AI consulting case studies: proof from client work, not just{" "}
                <span className="pat-serif-emphasis">promises</span>.
              </h1>
            </div>
            <p className="pat-lede">
              These Oregon small business stories show the starting problem,
              the local AI setup we built, the handoff, and the operating
              change that followed while each owner stayed in control.
            </p>
          </div>
        </div>
      </section>

      <section className="pat-case-index" aria-label="Client case studies">
        <div className="pat-wrap">
          <div className="pat-case-index-grid">
            {caseStudies.map((study) => (
              <Link
                className="pat-case-index-card"
                href={`/case-studies/${study.slug}`}
                key={study.slug}
              >
                <div>
                  <div className="pat-case-index-meta">
                    <Badge variant="ghost" className="pat-num" aria-label="Client">
                      {study.clientLabel}
                    </Badge>
                    <span>{study.industry}</span>
                  </div>
                  {study.heroImage ? (
                    <div className="pat-case-index-thumb" aria-hidden="true">
                      <Image
                        src={study.heroImage.src}
                        alt=""
                        width={study.heroImage.width}
                        height={study.heroImage.height}
                        sizes="(max-width: 620px) calc(100vw - 40px), (max-width: 1080px) calc(50vw - 62px), 540px"
                      />
                    </div>
                  ) : null}
                  <h2>{study.title}</h2>
                  <p>{study.summary}</p>
                </div>
                <div className="pat-case-index-details">
                  <span>{study.clientLabel}</span>
                  <span>{study.location}</span>
                  <span>{getPrimaryChange(study)}</span>
                </div>
                <span className="pat-case-card-foot">
                  Read case study
                  <ArrowUpRight data-icon="inline-end" />
                </span>
              </Link>
            ))}
          </div>

          <div className="pat-case-submit">
            <div>
              <h2>Have a workflow that keeps stealing the day?</h2>
              <p>
                We help small operators turn repeat work into local AI systems:
                research, reminders, files, follow-ups, approvals, and the
                handoff back to the person in charge.
              </p>
            </div>
            <Button
              render={<a href={bookingUrl} />}
              nativeButton={false}
              className="pat-btn pat-btn-primary"
            >
              Talk through a workflow
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
