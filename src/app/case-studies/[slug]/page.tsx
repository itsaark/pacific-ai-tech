import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import type { CaseStudy } from "@/lib/case-studies";
import { businessId, bookingUrl, siteUrl, websiteId } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {
      title: "Case Study",
    };
  }

  return {
    title: study.seoTitle,
    description: study.metaDescription,
    alternates: {
      canonical: `/case-studies/${study.slug}`,
    },
    openGraph: {
      title: study.seoTitle,
      description: study.metaDescription,
      url: `/case-studies/${study.slug}`,
      siteName: "Pacific AI Tech",
      type: "article",
      publishedTime: study.publishedDate,
      modifiedTime: study.modifiedDate,
      images: study.heroImage
        ? [
            {
              url: study.heroImage.src,
              width: study.heroImage.width,
              height: study.heroImage.height,
              alt: study.heroImage.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: study.seoTitle,
      description: study.metaDescription,
      images: study.heroImage ? [study.heroImage.src] : undefined,
    },
  };
}

function getSchemaKeywords(study: CaseStudy) {
  return [
    study.clientLabel,
    ...(study.founderName ? [study.founderName] : []),
    study.industry,
    study.location,
    ...study.services,
    ...study.topics,
  ];
}

function getSchemaAbout(study: CaseStudy) {
  const client =
    study.clientSchemaType === "Person"
      ? {
          "@type": "Person",
          name: study.clientLabel,
          url: study.clientUrl,
        }
      : {
          "@type": "Organization",
          name: study.clientLabel,
          url: study.clientUrl,
          founder: study.founderName
            ? {
                "@type": "Person",
                name: study.founderName,
              }
            : undefined,
        };

  return [
    client,
    {
      "@type": "Thing",
      name: study.industry,
    },
    {
      "@type": "Place",
      name: study.location,
    },
    ...study.services.map((service) => ({
      "@type": "Service",
      name: service,
      provider: { "@id": businessId },
      areaServed: study.location,
    })),
    ...study.topics.map((topic) => ({
      "@type": "Thing",
      name: topic,
    })),
  ];
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/case-studies/${study.slug}#webpage`,
        url: `${siteUrl}/case-studies/${study.slug}`,
        name: study.seoTitle,
        description: study.metaDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": `${siteUrl}/case-studies/${study.slug}#article` },
        breadcrumb: {
          "@id": `${siteUrl}/case-studies/${study.slug}#breadcrumb`,
        },
        datePublished: study.publishedDate,
        dateModified: study.modifiedDate,
        inLanguage: "en-US",
      },
      {
        "@type": "Article",
        "@id": `${siteUrl}/case-studies/${study.slug}#article`,
        headline: study.title,
        description: study.metaDescription,
        image: study.heroImage ? `${siteUrl}${study.heroImage.src}` : undefined,
        datePublished: study.publishedDate,
        dateModified: study.modifiedDate,
        author: {
          "@type": "Organization",
          "@id": businessId,
          name: "Pacific AI Tech",
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          "@id": businessId,
          name: "Pacific AI Tech",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/pacific-ai-tech/img/logo-pine-icon.png`,
          },
        },
        mainEntityOfPage: {
          "@id": `${siteUrl}/case-studies/${study.slug}#webpage`,
        },
        about: getSchemaAbout(study),
        keywords: getSchemaKeywords(study),
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/case-studies/${study.slug}#breadcrumb`,
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
          {
            "@type": "ListItem",
            position: 3,
            name: study.clientLabel,
            item: `${siteUrl}/case-studies/${study.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <main className="pat-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader bookingUrl={bookingUrl} />

      <article className="pat-case-detail">
        <div className="pat-wrap">
          <Link className="pat-back-link" href="/case-studies">
            <ArrowLeft data-icon="inline-start" />
            Case studies
          </Link>

          <header className="pat-case-detail-hero">
            <div>
              <p className="pat-case-client-line">
                {study.clientLabel} · {study.industry}
              </p>
              <h1>{study.title}</h1>
              <p className="pat-lede">{study.summary}</p>
            </div>
            <aside className="pat-case-facts" aria-label="Case study facts">
              <dl>
                <div>
                  <dt>Client</dt>
                  <dd>
                    {study.clientUrl ? (
                      <a
                        href={study.clientUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {study.clientLabel}
                      </a>
                    ) : (
                      study.clientLabel
                    )}
                  </dd>
                </div>
                {study.founderName ? (
                  <div>
                    <dt>Founder</dt>
                    <dd>{study.founderName}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Industry</dt>
                  <dd>{study.industry}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{study.location}</dd>
                </div>
              </dl>
            </aside>
          </header>

          {study.heroImage ? (
            <figure className="pat-case-hero-image">
              <Image
                src={study.heroImage.src}
                alt={study.heroImage.alt}
                width={study.heroImage.width}
                height={study.heroImage.height}
                sizes="(max-width: 900px) calc(100vw - 28px), 1240px"
                preload
              />
              <figcaption>{study.heroImage.caption}</figcaption>
            </figure>
          ) : null}

          <section className="pat-case-proof" aria-labelledby="case-proof-title">
            <div className="pat-case-proof-head">
              <h2 id="case-proof-title">What changed</h2>
              <p>
                Observable changes in daily work, operating cadence, and the
                decisions that still stay with the owner.
              </p>
            </div>
            <div className="pat-case-proof-ledger">
              {study.metrics.map((metric) => (
                <div className="pat-case-proof-row" key={`${metric.value}-${metric.label}`}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                  <p>{metric.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <aside
            className="pat-case-inline-cta"
            aria-label="Discuss a similar AI workflow"
          >
            <div>
              <p className="pat-case-inline-cta-label">See a similar bottleneck?</p>
              <p>
                Bring us one repeat task from your business. In a free
                30-minute consultation, we&apos;ll compare it with the workflow
                above and tell you whether AI is a practical fit.
              </p>
            </div>
            <Button
              render={<Link href={bookingUrl} />}
              nativeButton={false}
              variant="outline"
              className="pat-btn"
            >
              Discuss your workflow
              <ArrowRight data-icon="inline-end" />
            </Button>
          </aside>

          <div className="pat-case-narrative">
            {study.narrative.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <div className="pat-case-narrative-copy">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="pat-case-record" aria-labelledby="case-record-title">
            <div className="pat-case-record-head">
              <h2 id="case-record-title">Operational record</h2>
              <blockquote>
                <p>{study.pullQuote}</p>
                {study.pullQuoteAttribution ? (
                  <cite>{study.pullQuoteAttribution}</cite>
                ) : null}
              </blockquote>
            </div>

            <div className="pat-case-record-rows">
              <section aria-labelledby="challenge-title">
                <h3 id="challenge-title">What needed to change</h3>
                <p>{study.challenge}</p>
              </section>

              <section aria-labelledby="approach-title">
                <h3 id="approach-title">What we built and taught</h3>
                <ul>
                  {study.approach.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="outcomes-title">
                <h3 id="outcomes-title">What changed</h3>
                <ul>
                  {study.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
          </section>

          <div className="pat-case-next">
            <div>
              <h2>Book a free 30 min consultation</h2>
              <p>
                Talk directly with a founder about the repeat task slowing down
                your business. See how our{" "}
                <Link href={study.servicePath}>{study.serviceLinkLabel}</Link>{" "}
                works, then choose a time that fits your schedule.
              </p>
            </div>
            <Button
              render={<Link href={bookingUrl} />}
              nativeButton={false}
              className="pat-btn pat-btn-primary"
            >
              Choose a time
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
