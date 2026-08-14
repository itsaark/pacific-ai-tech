import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConsultationForm } from "@/components/consultation-form";
import { CtaButton } from "@/components/cta-button";
import { FounderSection } from "@/components/founder-section";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contactOptions } from "@/lib/marketing-content";
import {
  bookingUrl,
  businessId,
  businessPhone,
  businessPhoneDisplay,
  contactEmail,
  siteUrl,
  websiteId,
} from "@/lib/site";

const pageDescription =
  "Book a Pacific AI Tech consultation, email the founders, or call. Tell us the repeat workflow and we will tell you whether AI should take it.";

export const metadata: Metadata = {
  title: "Contact",
  description: pageDescription,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Pacific AI Tech",
    description: pageDescription,
    url: "/contact",
    siteName: "Pacific AI Tech",
    type: "website",
    images: [
      {
        url: "/pacific-ai-tech/img/roses.jpeg",
        width: 1280,
        height: 853,
        alt: "Contact Pacific AI Tech in Portland, Oregon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Pacific AI Tech",
    description: pageDescription,
    images: ["/pacific-ai-tech/img/roses.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${siteUrl}/contact#webpage`,
      url: `${siteUrl}/contact`,
      name: "Contact Pacific AI Tech",
      description: pageDescription,
      isPartOf: { "@id": websiteId },
      about: { "@id": businessId },
      breadcrumb: { "@id": `${siteUrl}/contact#breadcrumb` },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/contact#breadcrumb`,
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
          name: "Contact",
          item: `${siteUrl}/contact`,
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: "Pacific AI Tech",
      url: `${siteUrl}/`,
      email: contactEmail,
      telephone: businessPhone,
    },
  ],
};

export default function ContactPage() {
  const leadFormEnabled = Boolean(
    process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL
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

      <section className="pat-subpage-hero" aria-labelledby="contact-page-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <span className="pat-eyebrow">Contact</span>
              <h1 id="contact-page-title">
                No packages. Start with{" "}
                <span className="pat-serif-emphasis">one workflow</span>.
              </h1>
            </div>
            <p className="pat-lede">
              Book a call, write first, or call{" "}
              <span className="whitespace-nowrap">{businessPhoneDisplay}</span>.
              Bring
              the task that keeps stealing the week. We will tell you whether
              AI can take it, and what we would build first.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="pat-contact" aria-labelledby="contact-title">
        <div className="pat-wrap">
          <SectionHeading eyebrow="How engagements start">
            <h2 id="contact-title">
              Every engagement is{" "}
              <span className="pat-serif-emphasis">scoped to your business</span>
              .
            </h2>
          </SectionHeading>
          <div className="pat-contact-row">
            {contactOptions.map((option) => (
              <Card
                className={
                  option.featured
                    ? "pat-contact-card feature"
                    : "pat-contact-card"
                }
                key={option.title}
              >
                <CardHeader>
                  <CardTitle>{option.title}</CardTitle>
                  <div className="headline">{option.headline}</div>
                  <CardDescription className="meta">
                    {option.meta}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDescription>{option.desc}</CardDescription>
                  <div className="mt-5">
                    <CtaButton
                      href={option.href}
                      variant={option.featured ? "outline" : "default"}
                    >
                      {option.cta}
                    </CtaButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {leadFormEnabled ? (
            <ConsultationForm location="contact-page" />
          ) : null}
        </div>
      </section>

      <FounderSection />

      <SiteFooter />
    </main>
  );
}
