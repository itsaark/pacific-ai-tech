import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CtaButton } from "@/components/cta-button";
import { FramedImage } from "@/components/framed-image";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  automations,
  flow,
  offerings,
} from "@/lib/marketing-content";
import {
  bookingUrl,
  businessId,
  greaterPortlandSchemaAreas,
  siteUrl,
  websiteId,
} from "@/lib/site";

const pageDescription =
  "AI consulting, workflow architecture, local-first deployment, and hands-on training for small businesses. See the systems Pacific AI Tech actually builds.";

export const metadata: Metadata = {
  title: "AI Solutions & Workflow Automation",
  description: pageDescription,
  alternates: {
    canonical: "/services",
  },
  keywords: [
    "AI workflow automation",
    "AI solutions for small business",
    "AI agent deployment",
    "small business AI consulting",
    "AI training for business owners",
    "local-first AI setup",
  ],
  openGraph: {
    title: "AI Solutions & Workflow Automation",
    description: pageDescription,
    url: "/services",
    siteName: "Pacific AI Tech",
    type: "website",
    images: [
      {
        url: "/pacific-ai-tech/img/tulips.jpeg",
        width: 1280,
        height: 853,
        alt: "Pacific AI Tech AI solutions and workflow automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions & Workflow Automation",
    description: pageDescription,
    images: ["/pacific-ai-tech/img/tulips.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/services#webpage`,
      url: `${siteUrl}/services`,
      name: "AI Solutions & Workflow Automation",
      description: pageDescription,
      isPartOf: { "@id": websiteId },
      about: { "@id": businessId },
      breadcrumb: { "@id": `${siteUrl}/services#breadcrumb` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/pacific-ai-tech/img/tulips.jpeg`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/services#breadcrumb`,
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
          name: "Services",
          item: `${siteUrl}/services`,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/services#offerings`,
      name: "Pacific AI Tech services",
      numberOfItems: offerings.length,
      itemListElement: offerings.map((offering, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: offering.title,
        url: `${siteUrl}/services#${offering.id}`,
      })),
    },
    ...offerings.map((offering) => ({
      "@type": "Service",
      "@id": `${siteUrl}/services#${offering.id}`,
      name: offering.title,
      description: offering.text,
      provider: { "@id": businessId },
      areaServed: greaterPortlandSchemaAreas,
      url: `${siteUrl}/services#${offering.id}`,
    })),
  ],
};

export default function ServicesPage() {
  return (
    <main className="pat-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader bookingUrl={bookingUrl} />

      <section className="pat-subpage-hero" aria-labelledby="services-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <span className="pat-eyebrow">What we actually do</span>
              <h1 id="services-title">
                AI systems for the work you already{" "}
                <span className="pat-serif-emphasis">repeat</span>.
              </h1>
            </div>
            <p className="pat-lede">
              We study the week, design the stack, deploy it on your machines,
              and stay until you can run it. Every engagement is custom-scoped.
              The examples below are the ones clients tend to keep.
            </p>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="pat-local-section"
        aria-labelledby="offerings-title"
      >
        <div className="pat-wrap">
          <SectionHeading eyebrow="The engagement">
            <h2 id="offerings-title">
              Three parts. One visit. A system you can{" "}
              <span className="pat-serif-emphasis">steer</span>.
            </h2>
          </SectionHeading>
          <div className="pat-who-grid pat-local-service-grid">
            {offerings.map((offering) => (
              <Card
                className="pat-who-card"
                id={offering.id}
                key={offering.id}
              >
                <CardHeader>
                  <CardTitle>{offering.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{offering.text}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="pat-wrap">
        <section className="pat-showcase" aria-labelledby="flow-title">
          <div className="pat-showcase-text">
            <span className="pat-eyebrow">How the system behaves</span>
            <h2 id="flow-title">
              After setup, the computer can work while{" "}
              <span className="pat-serif-emphasis">you stay in charge</span>.
            </h2>
            <p className="pat-lede">
              We install AI on your laptop. Then we teach it the jobs you do
              every day, and teach you what to ask, what to approve, and what
              to keep an eye on.
            </p>
            <div className="pat-flow">
              {flow.map((item) => (
                <div className="pat-flow-row" key={item.title}>
                  <span className="text">
                    {item.title}
                    <span className="pat-flow-detail">{item.text}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <FramedImage
            src="/pacific-ai-tech/img/tulips.jpeg"
            alt="Wooden Shoe tulip fields rendered in ASCII"
            sizes="(max-width: 900px) 100vw, 50vw"
            className="pat-showcase-image"
          />
        </section>
      </div>

      <section className="pat-autos" aria-labelledby="autos-title">
        <div className="pat-wrap">
          <SectionHeading eyebrow="Automations · examples">
            <h2 id="autos-title">
              Every engagement is different. These are the ones most of our
              clients <span className="pat-serif-emphasis">end up keeping</span>
              .
            </h2>
          </SectionHeading>
          <div className="pat-autos-grid">
            {automations.map((automation) => (
              <Card className="pat-auto-card" key={automation.id}>
                <CardHeader>
                  <div className="pat-auto-id">
                    <Badge variant="ghost">{automation.id}</Badge>
                    <Badge variant="outline">{automation.cadence}</Badge>
                  </div>
                  <CardTitle>{automation.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{automation.text}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pat-local-section" aria-labelledby="services-cta-title">
        <div className="pat-wrap">
          <div className="pat-case-submit">
            <div>
              <span className="pat-eyebrow">Start with one workflow</span>
              <h2 id="services-cta-title">
                Bring the repeat task. We will map the first useful system.
              </h2>
              <p>
                Case studies show how this looks inside a real business.
                Portland-area owners should use the local page. Everyone else
                in Oregon or Washington should use the regional page.
              </p>
              <div className="pat-close-inline-links">
                <Link className="pat-source-link" href="/case-studies">
                  Read case studies
                  <ArrowUpRight aria-hidden="true" />
                </Link>
                <Link className="pat-source-link" href="/portland-ai-consultant">
                  Portland AI consulting
                  <ArrowUpRight aria-hidden="true" />
                </Link>
                <Link
                  className="pat-source-link"
                  href="/oregon-washington-ai-consulting"
                >
                  Oregon and Washington
                  <ArrowUpRight aria-hidden="true" />
                </Link>
                <Link className="pat-source-link" href="/idaho-ai-consulting">
                  Idaho
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>
            <CtaButton href={bookingUrl}>Book an intro call</CtaButton>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
