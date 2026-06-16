import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { bookingUrl, siteUrl } from "@/lib/site";

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
    robots:
      study.status === "Draft slot"
        ? {
            index: false,
            follow: false,
          }
        : undefined,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const jsonLd =
    study.status === "Published"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.metaDescription,
          image: study.heroImage ? `${siteUrl}${study.heroImage.src}` : undefined,
          datePublished: study.publishedDate,
          dateModified: study.modifiedDate,
          author: {
            "@type": "Organization",
            name: "Pacific AI Tech",
            url: siteUrl,
          },
          publisher: {
            "@type": "Organization",
            name: "Pacific AI Tech",
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/pacific-ai-tech/img/logo-pine-icon.png`,
            },
          },
          mainEntityOfPage: `${siteUrl}/case-studies/${study.slug}`,
          about: [
            study.clientLabel,
            study.industry,
            "AI dispatch automation",
            "freight load board automation",
            "Pacific Northwest logistics",
          ],
        }
      : undefined;

  return (
    <main className="pat-site">
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
      <SiteHeader bookingUrl={bookingUrl} />

      <article className="pat-case-detail">
        <div className="pat-wrap">
          <Link className="pat-back-link" href="/case-studies">
            <ArrowLeft data-icon="inline-start" />
            Case studies
          </Link>

          <header className="pat-case-detail-hero">
            <div>
              <span className="pat-eyebrow">{study.eyebrow}</span>
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
                <div>
                  <dt>Industry</dt>
                  <dd>{study.industry}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{study.location}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{study.status}</dd>
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
                priority
              />
              <figcaption>{study.heroImage.caption}</figcaption>
            </figure>
          ) : null}

          <section className="pat-case-metrics" aria-label="Case study results">
            {study.metrics.map((metric) => (
              <div className="pat-case-metric" key={`${metric.value}-${metric.label}`}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                <p>{metric.detail}</p>
              </div>
            ))}
          </section>

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

          <div className="pat-case-story-grid">
            <section className="pat-case-story-block" aria-labelledby="challenge-title">
              <span className="pat-case-label">01 / Challenge</span>
              <h2 id="challenge-title">What needed to change</h2>
              <p>{study.challenge}</p>
            </section>

            <section className="pat-case-story-block" aria-labelledby="approach-title">
              <span className="pat-case-label">02 / Approach</span>
              <h2 id="approach-title">What we built and taught</h2>
              <ul>
                {study.approach.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="pat-case-story-block" aria-labelledby="outcomes-title">
              <span className="pat-case-label">03 / Outcomes</span>
              <h2 id="outcomes-title">What changed</h2>
              <ul>
                {study.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <aside className="pat-case-quote">
              <span className="pat-case-label">Quote</span>
              <p>{study.pullQuote}</p>
            </aside>
          </div>

          <div className="pat-case-next">
            <div>
              <span className="pat-eyebrow">Build the next workflow</span>
              <h2>Have a dispatch, inbox, or operations workflow like this?</h2>
            </div>
            <Button
              render={<a href={bookingUrl} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              className="pat-btn pat-btn-primary"
            >
              Book a call
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
