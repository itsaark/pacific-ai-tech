import Image from "next/image";
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
import { Separator } from "@/components/ui/separator";

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
    title: "Solo founders",
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
    text: "Describe the result: a tidy folder, a report, a draft reply to every review, and Claude figures out how to get there.",
  },
  {
    title: "Do the same thing every morning, without being asked.",
    text: '"Pull yesterday\'s sales, summarize my inbox, and put it on my desk by 7am." Tell it once. It just keeps doing it.',
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

const prices = [
  {
    featured: true,
    title: "/ in-person setup",
    price: "$2,800",
    unit: "One day · ten automations · on-site",
    desc: "We drive to you. Install on your machine. Build the ten you want. Teach you how to run, judge, and improve them. Leave a cheat sheet. Includes 30-day premium support.",
  },
  {
    title: "/ remote setup",
    price: "$2,000",
    unit: "Same ten automations · over screen-share",
    desc: "Two half-day screen-share sessions. Same ten automations, same hands-on coaching, same cheat sheet, and 30-day premium support.",
  },
  {
    title: "/ follow-up",
    price: "$100",
    unit: "Remote · billed in 15-min increments",
    desc: "Something broke. You want a new automation. You hired someone and need them onboarded. Call us when you need us.",
  },
];

const ticker = [
  "Claude Cowork",
  "Hermes Agent",
  "Local-first setup + coaching",
  "Realtors · Restaurants · Solo founders",
  "Portland · Salem · Vancouver · Olympia",
  "10 automations / install + teach",
];

const siteUrl = "https://www.pacificai.tech";
const bookingUrl = "https://calendar.app.google/4ye2LLZjAwpgNNxNA";
const contactEmail = "hello@pacificaitech.com";
const serviceDescription =
  "Pacific AI Tech installs Claude Cowork, Hermes Agent, and practical AI automations on client-owned computers, then teaches small operators how to use them confidently across greater Portland and the Pacific Northwest.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "Pacific AI Tech",
      url: `${siteUrl}/`,
      description: serviceDescription,
      image: `${siteUrl}/pacific-ai-tech/img/roses.jpeg`,
      email: contactEmail,
      foundingDate: "2025",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Portland",
        addressRegion: "OR",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "City", name: "Portland" },
        { "@type": "City", name: "Vancouver" },
        { "@type": "City", name: "Beaverton" },
        { "@type": "City", name: "Hillsboro" },
        { "@type": "City", name: "Tigard" },
        { "@type": "City", name: "Lake Oswego" },
        { "@type": "City", name: "Gresham" },
        { "@type": "City", name: "Oregon City" },
        { "@type": "City", name: "Salem" },
        { "@type": "City", name: "Olympia" },
        { "@type": "State", name: "Oregon" },
        { "@type": "State", name: "Washington" },
      ],
      founder: {
        "@type": "Person",
        name: "Aark",
        sameAs: "https://www.linkedin.com/in/aarkkodur/",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#professionalservice`,
      name: "Pacific AI Tech AI Agent Setup",
      url: `${siteUrl}/`,
      provider: { "@id": `${siteUrl}/#localbusiness` },
      serviceType: "AI agent setup, training, and local automation consulting",
      areaServed: [
        { "@type": "State", name: "Oregon" },
        { "@type": "State", name: "Washington" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Pacific AI Tech Setup Plans",
        itemListElement: [
          {
            "@type": "Offer",
            "@id": `${siteUrl}/#offer-onsite`,
            name: "In-person setup",
            price: "2800",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: bookingUrl,
            itemOffered: { "@id": `${siteUrl}/#service-onsite` },
          },
          {
            "@type": "Offer",
            "@id": `${siteUrl}/#offer-remote`,
            name: "Remote setup",
            price: "2000",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: bookingUrl,
            itemOffered: { "@id": `${siteUrl}/#service-remote` },
          },
          {
            "@type": "Offer",
            "@id": `${siteUrl}/#offer-follow-up`,
            name: "Follow-up support",
            price: "100",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "100",
              priceCurrency: "USD",
              unitText: "hour",
            },
            availability: "https://schema.org/InStock",
            url: bookingUrl,
            itemOffered: { "@id": `${siteUrl}/#service-follow-up` },
          },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-onsite`,
      name: "In-person AI agent setup",
      serviceType: "On-site AI automation setup and training",
      provider: { "@id": `${siteUrl}/#localbusiness` },
      description:
        "One-day on-site installation of Claude Cowork or Hermes Agent, ten client-selected automations, hands-on training, a handoff cheat sheet, and 30-day premium support.",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-remote`,
      name: "Remote AI agent setup",
      serviceType: "Remote AI automation setup and training",
      provider: { "@id": `${siteUrl}/#localbusiness` },
      description:
        "Two half-day screen-share sessions to install the agent stack, build ten automations, teach the client how to operate and improve them, and provide 30-day premium support.",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-follow-up`,
      name: "AI automation follow-up support",
      serviceType: "Remote AI automation support",
      provider: { "@id": `${siteUrl}/#localbusiness` },
      description:
        "Hourly support for broken automations, new workflows, team onboarding, and adjustments after the initial setup.",
    },
  ],
};

function FramedImage({
  src,
  alt,
  top,
  left,
  right,
  className = "",
}: {
  src: string;
  alt: string;
  top: string;
  left: string;
  right: string;
  className?: string;
}) {
  return (
    <div className={`pat-ascii-frame ${className}`}>
      <span className="pat-overlay-top">{top}</span>
      {/* Native img keeps the local ASCII assets visible in browser full-page captures. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="eager" decoding="async" />
      <div className="pat-overlay-caption">
        <span>{left}</span>
        <span>{right}</span>
      </div>
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
      <div>
        <span className="pat-eyebrow">{eyebrow}</span>
      </div>
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
      <section className="pat-founder" aria-labelledby="founder-title">
        <div className="pat-founder-main">
          <a
            className="pat-founder-photo"
            href="https://www.linkedin.com/in/aarkkodur/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Aark on LinkedIn"
          >
            <Image
              src="/pacific-ai-tech/img/founder.jpg"
              alt="Aark"
              width={462}
              height={482}
              sizes="104px"
            />
          </a>
          <div className="pat-founder-copy">
            <span className="pat-founder-label">Founder</span>
            <a
              className="pat-founder-title"
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 id="founder-title">Talk to Aark</h2>
              <ArrowUpRight data-icon="inline-end" />
            </a>
            <p>
              6+ years as a software engineer at Amazon. Now helping Pacific
              Northwest operators put AI agents to work on their own machines
              and understand how to use them well.
            </p>
          </div>
        </div>
        <div className="pat-founder-actions" aria-label="Founder links">
          <a
            href="https://www.linkedin.com/in/aarkkodur/"
            target="_blank"
            rel="noopener noreferrer"
            className="pat-founder-action"
          >
            <span>View LinkedIn</span>
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
      <header className="pat-site-head">
        <div className="pat-wrap pat-header-inner">
          <a className="pat-brand" href="#top" aria-label="Pacific AI Tech home">
            <span className="pat-brand-mark" aria-hidden="true">
              <Image
                src="/pacific-ai-tech/img/logo-pine.png"
                alt=""
                width={225}
                height={512}
                priority
              />
            </span>
            Pacific&nbsp;AI&nbsp;Tech
          </a>
          <nav className="pat-primary" aria-label="Primary navigation">
            <a href="#top" className="active">
              Index
            </a>
            <a href="#what-we-do">What we do</a>
            <a href="#pricing">Pricing</a>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta"
            >
              Book a call
            </a>
          </nav>
        </div>
      </header>

      <div id="top" className="pat-wrap">
        <section className="pat-hero" aria-labelledby="hero-title">
          <div className="pat-hero-text">
            <div>
              <h1 id="hero-title">
                We set up <span className="pat-underlined">AI agents</span> on
                your computer.
                <br />
                Then teach you how to{" "}
                <span className="pat-serif-italic">use them</span>.
                <br />
                You get your <span className="pat-serif-italic">evenings</span>{" "}
                back.
              </h1>
              <p className="pat-lede pat-hero-lede">
                Pacific AI Tech installs Claude Cowork and other agent stacks on
                the machines of solo founders, real-estate agents,
                restaurateurs, and small-shop owners across greater Portland,
                then teaches them how to run, review, and improve automations
                every day. Locally. In person. Quietly.
              </p>
              <div className="pat-hero-actions">
                <CtaButton href={bookingUrl}>Book a setup</CtaButton>
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
                <div className="m-label">In-person setup</div>
                <div className="m-val">
                  $2,800 <em>flat</em>
                </div>
              </div>
              <div>
                <div className="m-label">Remote setup</div>
                <div className="m-val">
                  $2,000 <em>flat</em>
                </div>
              </div>
              <div>
                <div className="m-label">Follow-up</div>
                <div className="m-val">
                  $100 <em>/hr</em>
                </div>
              </div>
            </div>
          </div>
          <FramedImage
            src="/pacific-ai-tech/img/roses.jpeg"
            alt="Washington Park rose garden rendered in ASCII"
            top="/img/01 - washington_park.rose_garden.jpeg"
            left="N 45.51° · W 122.71°"
            right="RGB -> ASCII · 0.86 density"
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
            <p className="pat-serif-italic pat-moss">
              Setup first. Confidence by the end.
            </p>
          </div>
          <div className="col-right">
            <p>
              <strong>
                We come to your shop, kitchen, office, or kitchen table.
              </strong>{" "}
              We install Claude Cowork or Hermes directly on your computer: no
              cloud middleman, no $99/month SaaS to forget about.
            </p>
            <p>
              <strong>Then we sit with you and build ten automations</strong>{" "}
              of your choosing. The ones you actually do every day. The boring
              ones. As we build, we teach you how to prompt them, check their
              work, modify them, and stop them.
            </p>
            <p>
              <strong>That&apos;s the flat fee.</strong> No retainer, no
              platform tax. If you need us again next month, we charge by the
              hour, like a plumber.
            </p>
          </div>
        </section>
      </div>

      <section className="pat-who" aria-labelledby="clients-title">
        <div className="pat-wrap">
          <SectionHeading eyebrow="Who we work with">
            <h2 id="clients-title">
              People who own their <span className="pat-serif-italic">own thing</span>,
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
              <span className="pat-serif-italic">you can steer it</span>.
            </h2>
            <p className="pat-lede">
              We install Claude on your laptop. Then we teach it to do the
              things you do every day, while teaching you what to ask, what to
              approve, and what to keep an eye on.
            </p>
            <div className="pat-flow">
              {flow.map((item) => (
                <div className="pat-flow-row" key={item.title}>
                  <span className="text">
                    {item.title}
                    <em>{item.text}</em>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <FramedImage
            src="/pacific-ai-tech/img/tulips.jpeg"
            alt="Wooden Shoe tulip fields rendered in ASCII"
            top="/img/02 - wooden_shoe.tulip_festival.jpeg"
            left="Woodburn, OR"
            right="palette · bloom + slate"
            className="pat-showcase-image"
          />
        </section>
      </div>

      <section className="pat-autos" aria-labelledby="autos-title">
        <div className="pat-wrap">
          <SectionHeading eyebrow="Ten automations · examples">
            <h2 id="autos-title">
              You pick the ten. Here are the ones most of our clients{" "}
              <span className="pat-serif-italic">end up keeping</span>.
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

      <div className="pat-wrap">
        <section className="pat-region" aria-labelledby="region-title">
          <FramedImage
            src="/pacific-ai-tech/img/bridge.jpeg"
            alt="Portland's Steel Bridge with cherry blossoms in ASCII"
            top="/img/03 - steel_bridge.april.jpeg"
            left="Willamette River · downtown"
            right="service radius · 95 mi"
            className="pat-region-image"
          />
          <div className="pat-region-text">
            <span className="pat-eyebrow">Where we work</span>
            <h2 id="region-title">
              In your kitchen, your office, your back booth.
              <br />
              <span className="pat-serif-italic">We come to you.</span>
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

      <section id="pricing" className="pat-pricing" aria-labelledby="pricing-title">
        <div className="pat-wrap">
          <SectionHeading eyebrow="The whole pricing page on one row">
            <h2 id="pricing-title">
              Flat fees for setup and teaching.{" "}
              <span className="pat-serif-italic">No subscription.</span> No
              surprise line items.
            </h2>
          </SectionHeading>
          <div className="pat-price-row">
            {prices.map((price) => (
              <Card
                className={price.featured ? "pat-price-card feature" : "pat-price-card"}
                key={price.title}
              >
                <CardHeader>
                  <CardTitle>{price.title}</CardTitle>
                  <div className="price">
                    {price.price}
                    <small>{price.title === "/ follow-up" ? "/hr" : "flat"}</small>
                  </div>
                  <CardDescription className="unit">{price.unit}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDescription>{price.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FounderSection />

      <footer className="pat-site-foot">
        <div className="pat-wrap">
          <div className="pat-foot-display">
            Free your <em>evenings.</em>
            <br />
            Free your <em>weekends.</em>
          </div>
          <Separator className="pat-foot-rule" />
          <div className="pat-foot-grid">
            <div>
              <h4>Pacific AI Tech</h4>
              <p>
                A two-person consultancy helping the Pacific Northwest&apos;s
                small operators put AI to work quietly, locally, on their own
                machines, then feel confident using it without us in the room.
              </p>
            </div>
            <div>
              <h4>Pages</h4>
              <ul>
                <li>
                  <a href="#top">Index</a>
                </li>
                <li>
                  <a href="#what-we-do">What we do</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="/sitemap.xml">Sitemap</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Region</h4>
              <ul>
                <li>Portland, OR</li>
                <li>Vancouver</li>
                <li>Salem, OR</li>
                <li>Olympia, WA</li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pat-foot-bottom">
            <span>© 2025 Pacific AI Tech LLC · Portland, OR</span>
            <span>v 26.05 · built on a porch</span>
          </div>
        </div>
      </footer>

    </main>
  );
}
