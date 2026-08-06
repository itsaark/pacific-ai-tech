import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";

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
import { caseStudies } from "@/lib/case-studies";
import {
  bookingUrl,
  businessId,
  contactEmail,
  greaterPortlandSchemaAreas,
  serviceDescription,
  siteUrl,
  websiteId,
} from "@/lib/site";

const clients = [
  {
    id: "/ 01",
    title: "Real estate agents",
    text: "Listing descriptions, comp pulls, MLS-to-flyer pipelines, follow-up sequences, weekend showings rolled into a Sunday briefing.",
  },
  {
    id: "/ 02",
    title: "Restaurant owners",
    text: "Inventory reorder, menu translation, OpenTable digest, food-cost flags, reply-to-every-review-by-Tuesday automations.",
  },
  {
    id: "/ 03",
    title: "Founders & lean teams",
    text: "Inbox triage, lead-research before calls, weekly investor updates, a meeting-notes agent that actually files things.",
  },
  {
    id: "/ 04",
    title: "Trades & small shops",
    text: "Estimate drafting from job photos, invoice chasing, supplier price-watch, scheduling, voicemail-to-CRM, end-of-day rollups.",
  },
];

const flow = [
  {
    title: "Tell it what you want. Walk away. Come back to it done.",
    text: "Describe the result: a tidy folder, a report, a draft reply to every review, and AI figures out how to get there.",
  },
  {
    title: "Do the same thing every morning, without being asked.",
    text: "“Pull yesterday's sales, summarize my inbox, and put it on my desk by 7am.” Tell it once. It just keeps doing it.",
  },
  {
    title: "Turn a pile of stuff into a finished thing.",
    text: "A folder of receipts becomes a spreadsheet. A stack of meeting notes becomes a one-page update. A messy Downloads folder gets sorted.",
  },
  {
    title: "Take orders from your phone.",
    text: "Text it from the car. It works on your laptop while you drive. You read the finished version when you sit down.",
  },
];

const automations = [
  ["auto-01", "~5 min / day", "Morning briefing", "Calendar + inbox + open tasks summarized to one screen with coffee. Knows what's urgent, what can wait."],
  ["auto-02", "~30 min / day", "Inbox triage", "Drafts replies in your voice for low-stakes mail. Flags the ones only you should answer. Never sends without you."],
  ["auto-03", "~2 hrs / listing", "Listing -> marketing pack", "MLS data and photos in. Flyer, social caption, Zillow blurb, email blast, and an open-house sign-in sheet out."],
  ["auto-04", "weekly", "Review-reply agent", "Drafts a personal response to every Google, Yelp, or OpenTable review by Tuesday. You approve and post."],
  ["auto-05", "monthly", "Invoice chaser", "Watches AR aging, drafts polite-then-firm follow-ups, attaches the original PDF. You hit send."],
  ["auto-06", "weekly", "Lead-research dossier", "Before a sales call: one page on the person, their company, recent news, and three good opening questions."],
  ["auto-07", "real-time", "Voicemail -> CRM", "Transcribes voicemails, files into your CRM, drafts a callback message, sets a follow-up date."],
  ["auto-08", "daily", "Inventory & reorder", "Reads your POS or a Google sheet. Flags low stock, drafts the reorder email to the right supplier."],
  ["auto-09", "weekly", "End-of-week digest", "Income, top customer, hours worked, what shifted. Sends to your phone Friday at 5pm so you can close the laptop."],
];

const cities = [
  "Portland",
  "Vancouver",
  "Beaverton",
  "Hillsboro",
  "Tigard",
  "Lake Oswego",
  "Gresham",
  "Oregon City",
  "Salem",
  "Olympia",
  "Tualatin",
  "McMinnville",
  "+ all points between",
];

const contactOptions = [
  {
    featured: true,
    title: "/ book a meeting",
    headline: "Book a call",
    meta: "Intro call · video or phone",
    desc: "Bring one workflow that keeps stealing the week. We will tell you honestly whether AI can take it, what deployment would look like, and what we would build first.",
    cta: "Book a meeting",
    href: bookingUrl,
  },
  {
    title: "/ contact us",
    headline: "Email us",
    meta: contactEmail,
    desc: "Prefer writing first? Tell us what your team does every day and where the information lives. We reply within one business day.",
    cta: "Send an email",
    href: `mailto:${contactEmail}`,
  },
  {
    title: "/ what happens next",
    headline: "Custom scope",
    meta: "Proposal · timeline · quote",
    desc: "After the first call we send a scoped proposal: what we will build, what it costs, and when it ships. No subscription, no platform tax, no surprise line items.",
  },
];

const ticker = [
  "AI consulting",
  "Solutions architecture + deployment",
  "Local-first setup + coaching",
  "Realtors · Restaurants · Founders · Trades",
  "Portland · Salem · Vancouver · Olympia",
  "Custom engagements / scoped per business",
];

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
      image: `${siteUrl}/pacific-ai-tech/img/roses.jpeg`,
      logo: `${siteUrl}/pacific-ai-tech/img/logo-pine-icon.png`,
      email: contactEmail,
      foundingDate: "2025",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Portland",
        addressRegion: "OR",
        addressCountry: "US",
      },
      areaServed: [
        ...greaterPortlandSchemaAreas,
        { "@type": "City", name: "Salem, Oregon" },
        { "@type": "City", name: "Olympia, Washington" },
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
        url: `${siteUrl}/pacific-ai-tech/img/roses.jpeg`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-consulting`,
      name: "AI consulting and workflow audit",
      serviceType: "AI consulting",
      provider: { "@id": businessId },
      areaServed: greaterPortlandSchemaAreas,
      description:
        "On-site or remote working sessions to map the repeat work inside a small business, decide what AI should and should not touch, and scope a deployment plan.",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-deployment`,
      name: "AI solutions deployment",
      serviceType: "AI solutions architecture and deployment",
      provider: { "@id": businessId },
      areaServed: greaterPortlandSchemaAreas,
      description:
        "Architecture and deployment of AI agent stacks and custom automations on client-owned machines, built around the client's actual workflows.",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-training`,
      name: "AI training and ongoing support",
      serviceType: "AI training and support",
      provider: { "@id": businessId },
      areaServed: greaterPortlandSchemaAreas,
      description:
        "Hands-on training so owners and teams can run, inspect, and adjust their AI workflows, with continued support after handoff.",
    },
  ],
};

function FramedImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`pat-ascii-frame ${className}`}>
      {/* Native img keeps the local ASCII assets visible in browser full-page captures. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="eager" decoding="async" />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pat-section-head">
      <span className="pat-eyebrow">{eyebrow}</span>
      <div>{children}</div>
    </div>
  );
}

function CtaButton({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
}) {
  const isExternal = href.startsWith("http");

  return (
    <Button
      render={
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        />
      }
      nativeButton={false}
      variant={variant === "outline" ? "outline" : "default"}
      className={variant === "outline" ? "pat-btn" : "pat-btn pat-btn-primary"}
    >
      {children}
      <ArrowRight data-icon="inline-end" />
    </Button>
  );
}

function FounderSection() {
  return (
    <div className="pat-wrap pat-founder-shell">
      <section
        id="founders"
        className="pat-founder"
        aria-labelledby="founder-title"
      >
        <div className="pat-founder-main">
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
                  sizes="(max-width: 620px) calc((100vw - 76px) / 2), 132px"
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
                  sizes="(max-width: 620px) calc((100vw - 76px) / 2), 132px"
                />
              </span>
              <span className="pat-founder-photo-name">Shayan Jalalipour</span>
            </a>
          </div>
          <div className="pat-founder-copy">
            <span className="pat-founder-label">Co-founders</span>
            <a
              className="pat-founder-title"
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 id="founder-title">Talk to Aark &amp; Shayan</h2>
              <ArrowUpRight data-icon="inline-end" />
            </a>
            <p>
              Software engineering from Amazon meets AI/ML research from
              Portland State. We help Pacific Northwest operators put AI agents
              to work on their own machines and understand how to use them well.
            </p>
          </div>
        </div>
        <div className="pat-founder-actions" aria-label="Co-founder links">
          <a
            href="https://www.linkedin.com/in/aarkkodur/"
            target="_blank"
            rel="noopener noreferrer"
            className="pat-founder-action"
          >
            <span>Aark LinkedIn</span>
            <ArrowUpRight data-icon="inline-end" />
          </a>
          <a
            href="https://www.linkedin.com/in/shayanjalalipour/"
            target="_blank"
            rel="noopener noreferrer"
            className="pat-founder-action"
          >
            <span>Shayan LinkedIn</span>
            <ArrowUpRight data-icon="inline-end" />
          </a>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pat-founder-action primary"
          >
            <CalendarDays data-icon="inline-start" />
            <span>Book a call</span>
          </a>
        </div>
      </section>
    </div>
  );
}

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
                We architect &amp; deploy{" "}
                <span className="pat-underlined">AI solutions</span> for small
                businesses.
                <br />
                You get your <span className="pat-serif-emphasis">evenings</span>{" "}
                back.
              </h1>
              <p className="pat-lede pat-hero-lede">
                AI consulting, hands-on: we study your workflows, design the
                right AI systems, deploy them on your machines, and teach your
                team to run them with confidence.
              </p>
              <div className="pat-hero-actions">
                <CtaButton href={bookingUrl}>Book a consultation</CtaButton>
                <Button
                  render={<a href="#what-we-do" />}
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
            src="/pacific-ai-tech/img/roses.jpeg"
            alt="Washington Park rose garden rendered in ASCII"
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
            <p>
              An AI agent on your laptop can do most of that if someone shows
              up, sets it up, teaches you how to steer it, and stays on the
              phone when something breaks.
            </p>
            <p className="pat-serif-emphasis pat-moss">
              Setup first. Confidence by the end.
            </p>
          </div>
          <div className="col-right">
            <p>
              <strong>
                We come to your shop, kitchen, office, or kitchen table.
              </strong>{" "}
              We install AI tools directly on your computer: no
              cloud middleman, no $99/month SaaS to forget about.
            </p>
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

      <section className="pat-who" aria-labelledby="clients-title">
        <div className="pat-wrap">
          <SectionHeading eyebrow="Who we work with">
            <h2 id="clients-title">
              Small businesses that <span className="pat-serif-emphasis">own their thing</span>,
              and would like to keep owning it.
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
              We install AI on your laptop. Then we teach it to do the
              things you do every day, while teaching you what to ask, what to
              approve, and what to keep an eye on.
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
            className="pat-showcase-image"
          />
        </section>
      </div>

      <section className="pat-autos" aria-labelledby="autos-title">
        <div className="pat-wrap">
          <SectionHeading eyebrow="Automations · examples">
            <h2 id="autos-title">
              Every engagement is different. These are the ones most of our
              clients <span className="pat-serif-emphasis">end up keeping</span>.
            </h2>
          </SectionHeading>
          <div className="pat-autos-grid">
            {automations.map(([id, cadence, title, text]) => (
              <Card className="pat-auto-card" key={id}>
                <CardHeader>
                  <div className="pat-auto-id">
                    <Badge variant="ghost">{id}</Badge>
                    <Badge variant="outline">{cadence}</Badge>
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{text}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
            {caseStudies.map((study) => (
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

      <div className="pat-wrap">
        <section className="pat-region" aria-labelledby="region-title">
          <FramedImage
            src="/pacific-ai-tech/img/bridge.jpeg"
            alt="Portland's Steel Bridge with cherry blossoms in ASCII"
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
              We drive. We don&apos;t fly. Anywhere between Olympia and Salem,
              the coast and the Cascades.
            </p>
            <div className="pat-cities">
              {cities.map((city, index) => (
                <Badge
                  key={city}
                  variant={index < 2 ? "default" : "outline"}
                  className="pat-city"
                >
                  {city}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section id="contact" className="pat-contact" aria-labelledby="contact-title">
        <div className="pat-wrap">
          <SectionHeading eyebrow="How engagements start">
            <h2 id="contact-title">
              No published packages. Every engagement is{" "}
              <span className="pat-serif-emphasis">scoped to your business</span>.
            </h2>
          </SectionHeading>
          <div className="pat-contact-row">
            {contactOptions.map((option) => (
              <Card
                className={option.featured ? "pat-contact-card feature" : "pat-contact-card"}
                key={option.title}
              >
                <CardHeader>
                  <CardTitle>{option.title}</CardTitle>
                  <div className="headline">{option.headline}</div>
                  <CardDescription className="meta">{option.meta}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDescription>{option.desc}</CardDescription>
                  {option.href ? (
                    <div className="mt-5">
                      <CtaButton
                        href={option.href}
                        variant={option.featured ? "outline" : "default"}
                      >
                        {option.cta}
                      </CtaButton>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FounderSection />

      <SiteFooter />

    </main>
  );
}
