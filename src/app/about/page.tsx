import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  bookingUrl,
  businessPhoneDisplay,
  businessPhoneHref,
  businessId,
  contactEmail,
  siteUrl,
  websiteId,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About Our Portland AI Consulting Team",
  description:
    "Meet Aark Kodur and Shayan Jalalipour, the two-person team behind Pacific AI Tech's practical AI consulting for Greater Portland businesses.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Pacific AI Tech",
    description:
      "A two-person Portland consultancy helping small businesses put practical, owner-controlled AI systems to work.",
    url: "/about",
    siteName: "Pacific AI Tech",
    type: "website",
    images: [
      {
        url: "/pacific-ai-tech/img/roses.jpeg",
        width: 1200,
        height: 800,
        alt: "Pacific AI Tech in Portland, Oregon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pacific AI Tech",
    description:
      "Meet the two-person team helping Greater Portland small businesses use practical AI with confidence.",
    images: ["/pacific-ai-tech/img/roses.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${siteUrl}/about#webpage`,
      url: `${siteUrl}/about`,
      name: "About Pacific AI Tech",
      description: metadata.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": businessId },
      mainEntity: { "@id": businessId },
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#aark-kodur`,
      name: "Aark Kodur",
      jobTitle: "Co-founder",
      worksFor: { "@id": businessId },
      sameAs: "https://www.linkedin.com/in/aarkkodur/",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#shayan-jalalipour`,
      name: "Shayan Jalalipour",
      jobTitle: "Co-founder",
      worksFor: { "@id": businessId },
      sameAs: "https://www.linkedin.com/in/shayanjalalipour/",
    },
  ],
};

const principles = [
  {
    title: "Start with the work",
    copy: "We begin with the repeat work that consumes the week, then decide where AI is useful and where human judgment should remain in charge.",
  },
  {
    title: "Build for the operator",
    copy: "The system should fit the business that already exists. We design around the owner's tools, approval points, and tolerance for change.",
  },
  {
    title: "Leave people confident",
    copy: "Deployment includes a practical handoff. Owners and teams should understand what the system does, how to inspect it, and when to step in.",
  },
];

export default function AboutPage() {
  return (
    <main className="pat-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader bookingUrl={bookingUrl} />

      <section className="pat-subpage-hero" aria-labelledby="about-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <span className="pat-eyebrow">About Pacific AI Tech</span>
              <h1 id="about-title">
                Small team. Practical systems.{" "}
                <span className="pat-serif-emphasis">Human control.</span>
              </h1>
            </div>
            <p className="pat-lede">
              Pacific AI Tech is a two-person Portland consultancy. We help
              small businesses turn repeat computer work into useful AI
              workflows, deploy those systems, and teach the people who will
              run them.
            </p>
          </div>
        </div>
      </section>

      <section id="founders" className="pat-local-section" aria-labelledby="founders-title">
        <div className="pat-wrap">
          <div className="pat-case-detail-hero">
            <div>
              <span className="pat-eyebrow">The people doing the work</span>
              <h2 id="founders-title">
                Meet Aark Kodur &amp; Shayan Jalalipour.
              </h2>
              <p className="pat-lede">
                Our backgrounds bring together software engineering from
                Amazon and AI/ML research from Portland State. Clients work
                directly with the two people responsible for architecture,
                deployment, and training.
              </p>
            </div>
            <div className="pat-founder-photos" aria-label="Co-founder profiles">
              <a
                className="pat-founder-photo"
                href="https://www.linkedin.com/in/aarkkodur/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Aark Kodur on LinkedIn"
              >
                <span className="pat-founder-photo-image">
                  <Image
                    src="/pacific-ai-tech/img/founder.jpg"
                    alt="Aark Kodur"
                    width={462}
                    height={482}
                  />
                </span>
                <span className="pat-founder-photo-name">Aark Kodur</span>
              </a>
              <a
                className="pat-founder-photo pat-founder-photo-shayan"
                href="https://www.linkedin.com/in/shayanjalalipour/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Shayan Jalalipour on LinkedIn"
              >
                <span className="pat-founder-photo-image">
                  <Image
                    src="/pacific-ai-tech/img/shayan-jalalipour.jpg"
                    alt="Shayan Jalalipour"
                    width={654}
                    height={900}
                  />
                </span>
                <span className="pat-founder-photo-name">Shayan Jalalipour</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="pat-local-section pat-local-section-alt"
        aria-labelledby="principles-title"
      >
        <div className="pat-wrap">
          <div className="pat-section-title-row">
            <div>
              <span className="pat-eyebrow">How we work</span>
              <h2 id="principles-title">Useful AI, quietly put to work.</h2>
            </div>
            <p className="pat-lede">
              We serve businesses, not consumer computer-support requests. Each
              engagement is custom-scoped around a real operating need and a
              clear handoff.
            </p>
          </div>
          <div className="pat-local-faq">
            {principles.map((principle) => (
              <section key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="pat-local-section" aria-labelledby="proof-title">
        <div className="pat-wrap">
          <div className="pat-case-submit">
            <div>
              <span className="pat-eyebrow">See the work</span>
              <h2 id="proof-title">Judge us by the operating change.</h2>
              <p>
                Our case studies show the starting problem, the systems we
                deployed, the approval points we preserved, and what changed
                for the owner afterward.
              </p>
              <Link className="pat-source-link" href="/case-studies">
                Read client case studies
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
            <Button
              render={<a href={bookingUrl} />}
              nativeButton={false}
              className="pat-btn pat-btn-primary"
            >
              Book an intro call
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <p>
            Prefer email or phone? Write to{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a> or call{" "}
            <a href={businessPhoneHref}>{businessPhoneDisplay}</a>.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
