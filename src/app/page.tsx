import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CtaButton } from "@/components/cta-button";
import { FounderSection } from "@/components/founder-section";
import { FramedImage } from "@/components/framed-image";
import { SectionHeading } from "@/components/section-heading";
import { caseStudies } from "@/lib/case-studies";
import { clients, offerings, ticker } from "@/lib/marketing-content";
import {
  bookingUrl,
  businessPhone,
  businessPhoneDisplay,
  businessPhoneHref,
  businessId,
  contactEmail,
  greaterPortlandSchemaAreas,
  serviceDescription,
  siteUrl,
  websiteId,
} from "@/lib/site";

const featuredStudies = caseStudies.slice(0, 2);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: "Pacific AI Tech",
      legalName: "Pacific AI Tech LLC",
      url: `${siteUrl}/`,
      description: serviceDescription,
      image: `${siteUrl}/pacific-ai-tech/img/river.jpg`,
      logo: `${siteUrl}/pacific-ai-tech/img/logo-pine-icon.png`,
      email: contactEmail,
      telephone: businessPhone,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales and customer service",
        telephone: businessPhone,
        email: contactEmail,
        areaServed: "US",
        availableLanguage: "English",
      },
      foundingDate: "2025",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1455 SW Broadway",
        addressLocality: "Portland",
        addressRegion: "OR",
        postalCode: "97201",
        addressCountry: "US",
      },
      areaServed: [
        ...greaterPortlandSchemaAreas,
        { "@type": "City", name: "Salem, Oregon" },
        { "@type": "City", name: "Olympia, Washington" },
        { "@type": "City", name: "Boise, Idaho" },
        { "@type": "State", name: "Idaho" },
        { "@type": "AdministrativeArea", name: "Pacific Northwest" },
      ],
      knowsAbout: [
        "AI consulting",
        "AI solutions architecture",
        "AI agent deployment",
        "small business workflow automation",
        "local-first AI",
        "AI training",
      ],
      founder: [
        {
          "@type": "Person",
          "@id": `${siteUrl}/#aark-kodur`,
          name: "Aark Kodur",
          sameAs: "https://www.linkedin.com/in/aarkkodur/",
        },
        {
          "@type": "Person",
          "@id": `${siteUrl}/#shayan-jalalipour`,
          name: "Shayan Jalalipour",
          sameAs: "https://www.linkedin.com/in/shayanjalalipour/",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "Pacific AI Tech",
      url: `${siteUrl}/`,
      description: serviceDescription,
      publisher: { "@id": businessId },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: `${siteUrl}/`,
      name: "Pacific AI Tech - Portland AI Consultant & AI Solutions",
      description: serviceDescription,
      isPartOf: { "@id": websiteId },
      about: { "@id": businessId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/pacific-ai-tech/img/river.jpg`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/services#consulting`,
      name: "AI consulting and workflow audit",
      serviceType: "AI consulting",
      url: `${siteUrl}/services#consulting`,
      provider: { "@id": businessId },
      areaServed: greaterPortlandSchemaAreas,
      description:
        "On-site or remote working sessions to map the repeat work inside a small business, decide what AI should and should not touch, and scope a deployment plan.",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/services#deployment`,
      name: "AI solutions deployment",
      serviceType: "AI solutions architecture and deployment",
      url: `${siteUrl}/services#deployment`,
      provider: { "@id": businessId },
      areaServed: greaterPortlandSchemaAreas,
      description:
        "Architecture and deployment of AI agent stacks and custom automations on client-owned machines, built around the client's actual workflows.",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/services#training`,
      name: "AI training and ongoing support",
      serviceType: "AI training and support",
      url: `${siteUrl}/services#training`,
      provider: { "@id": businessId },
      areaServed: greaterPortlandSchemaAreas,
      description:
        "Hands-on training so owners and teams can run, inspect, and adjust their AI workflows, with continued support after handoff.",
    },
  ],
};

export default function Home() {
  const tickerItems = [...ticker, ...ticker];

  return (
    <main className="pat-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader bookingUrl={bookingUrl} />

      <div id="top" className="pat-wrap">
        <section className="pat-hero" aria-labelledby="hero-title">
          <div className="pat-hero-text">
            <div>
              <h1 id="hero-title">
                We build{" "}
                <span className="pat-underlined">AI solutions</span> for small
                businesses.
              </h1>
              <p className="pat-lede pat-hero-lede">
                AI consulting, hands-on: we study your workflows, design the
                right AI systems, deploy them on your machines, and teach your
                team to run them with confidence.
              </p>
              <div className="pat-hero-actions">
                <CtaButton href={bookingUrl}>Book a consultation</CtaButton>
                <Button
                  render={<Link href="/services" />}
                  nativeButton={false}
                  variant="outline"
                  className="pat-btn"
                >
                  What we actually do
                </Button>
              </div>
            </div>
            <div className="pat-hero-meta">
              <div>
                <div className="m-label">Engagements</div>
                <div className="m-val">
                  Custom <span className="m-unit">scoped</span>
                </div>
              </div>
              <div>
                <div className="m-label">Delivery</div>
                <div className="m-val">
                  On-site <span className="m-unit">+ remote</span>
                </div>
              </div>
              <div>
                <div className="m-label">First step</div>
                <div className="m-val">
                  Intro call <span className="m-unit">book online</span>
                </div>
              </div>
            </div>
          </div>
          <FramedImage
            src="/pacific-ai-tech/img/river.jpg"
            alt="Forest river under a blue sky rendered in ASCII"
            sizes="(max-width: 900px) 100vw, 50vw"
            preload
            className="pat-hero-image"
          />
        </section>
      </div>

      <div className="pat-ticker" aria-hidden="true">
        <div className="pat-ticker-track">
          {tickerItems.map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <span className="sep">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="pat-wrap">
        <section className="pat-promise" aria-labelledby="premise-title">
          <div className="col-left">
            <Badge className="pat-tag">The premise</Badge>
            <p id="premise-title">
              You did not get into your business to wrangle spreadsheets,
              copy-paste listings, write follow-up emails, or chase invoices at
              11pm.
            </p>
            <p className="pat-serif-emphasis pat-moss">
              Setup first. Confidence by the end.
            </p>
          </div>
          <div className="col-right">
            <p>
              <strong>Then we sit with you and build the workflows</strong>{" "}
              that matter most. The ones you actually do every day. The boring
              ones. As we build, we teach you how to prompt them, check their
              work, modify them, and stop them.
            </p>
            <p>
              <strong>Every engagement is custom-scoped.</strong> No
              subscription, no platform tax, no surprise line items. You get a
              proposal built around your workflows before any work begins.
            </p>
          </div>
        </section>
      </div>

      <section className="pat-case-preview" aria-labelledby="case-preview-title">
        <div className="pat-wrap">
          <SectionHeading eyebrow="Case studies">
            <div className="pat-section-title-row">
              <h2 id="case-preview-title">
                Real client stories, showing{" "}
                <span className="pat-serif-emphasis">what changed</span>.
              </h2>
              <CtaButton href="/case-studies" variant="outline">
                View case studies
              </CtaButton>
            </div>
          </SectionHeading>
          <div className="pat-case-preview-grid">
            {featuredStudies.map((study) => (
              <Link
                className="pat-case-card"
                href={`/case-studies/${study.slug}`}
                key={study.slug}
              >
                <span className="pat-case-card-meta">
                  {study.clientLabel} · {study.industry}
                </span>
                <h3>{study.title}</h3>
                <p>{study.summary}</p>
                <span className="pat-case-card-foot">
                  Read case study
                  <ArrowUpRight data-icon="inline-end" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pat-who" aria-labelledby="clients-title">
        <div className="pat-wrap">
          <SectionHeading eyebrow="Who we work with">
            <h2 id="clients-title">
              Small businesses that{" "}
              <span className="pat-serif-emphasis">own their thing</span>, and
              would like to keep owning it.
            </h2>
          </SectionHeading>
          <div className="pat-who-grid">
            {clients.map((client) => (
              <Card className="pat-who-card" key={client.id}>
                <CardHeader>
                  <Badge variant="ghost" className="pat-num">
                    {client.id}
                  </Badge>
                  <CardTitle>{client.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{client.text}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div id="what-we-do" className="pat-wrap">
        <section className="pat-showcase" aria-labelledby="what-title">
          <div className="pat-showcase-text">
            <span className="pat-eyebrow">What you get</span>
            <h2 id="what-title">
              After our visit, your computer can work, and{" "}
              <span className="pat-serif-emphasis">you can steer it</span>.
            </h2>
            <p className="pat-lede">
              Consulting, deployment, and training as one engagement. Inbox,
              listings, invoices, reviews — the example automations are on the
              services page.
            </p>
            <div className="pat-flow">
              {offerings.map((item) => (
                <div className="pat-flow-row" key={item.id}>
                  <span className="text">
                    {item.title}
                    <span className="pat-flow-detail">{item.text}</span>
                  </span>
                </div>
              ))}
            </div>
            <Link className="pat-source-link" href="/services">
              See the work we do
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <FramedImage
            src="/pacific-ai-tech/img/tulips.jpeg"
            alt="Wooden Shoe tulip fields rendered in ASCII"
            sizes="(max-width: 900px) 100vw, 50vw"
            className="pat-showcase-image"
          />
        </section>
      </div>

      <div className="pat-wrap">
        <section className="pat-region" aria-labelledby="region-title">
          <FramedImage
            src="/pacific-ai-tech/img/bridge.jpeg"
            alt="Portland's Steel Bridge with cherry blossoms in ASCII"
            sizes="(max-width: 900px) 100vw, 50vw"
            className="pat-region-image"
          />
          <div className="pat-region-text">
            <span className="pat-eyebrow">Where we work</span>
            <h2 id="region-title">
              In your kitchen, your office, your back booth.
              <br />
              <span className="pat-serif-emphasis">We come to you.</span>
            </h2>
            <p className="pat-lede">
              On-site in Greater Portland. Virtual across Oregon, Washington,
              and Idaho, including smaller cities and rural counties.
            </p>
            <div className="pat-close-inline-links">
              <Link className="pat-source-link" href="/portland-ai-consultant">
                Portland and Greater Portland
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
        </section>
      </div>

      <section id="contact" className="pat-close" aria-labelledby="contact-title">
        <div className="pat-wrap pat-close-grid">
          <div className="pat-close-copy">
            <span className="pat-eyebrow">How engagements start</span>
            <h2 id="contact-title">
              Bring one workflow. We will tell you if AI should{" "}
              <span className="pat-serif-emphasis">take it</span>.
            </h2>
            <p className="pat-lede">
              No published packages. Every engagement is scoped to the
              business in front of us. Book a call, or write first.
            </p>
            <div className="pat-close-actions">
              <CtaButton href={bookingUrl}>Book a consultation</CtaButton>
              <CtaButton href="/contact" variant="outline">
                More ways to reach us
              </CtaButton>
            </div>
          </div>
          <div className="pat-close-channels">
            <a className="pat-close-channel feature" href={bookingUrl}>
              <span className="pat-close-kicker">Intro call</span>
              <span className="pat-close-label">Book a meeting</span>
              <span className="pat-close-meta">Video or phone · pick a time</span>
            </a>
            <a className="pat-close-channel" href={`mailto:${contactEmail}`}>
              <span className="pat-close-kicker">Write first</span>
              <span className="pat-close-label">Email us</span>
              <span className="pat-close-meta">{contactEmail}</span>
            </a>
            <a className="pat-close-channel" href={businessPhoneHref}>
              <span className="pat-close-kicker">Talk now</span>
              <span className="pat-close-label">Call us</span>
              <span className="pat-close-meta">{businessPhoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      <FounderSection />

      <SiteFooter />
    </main>
  );
}
