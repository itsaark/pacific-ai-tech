import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { bookingUrl, contactEmail, serviceDescription, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portland AI Consultant for AI Setup & Training",
  description:
    "Portland AI consultant for small business AI setup, coaching, training, and practical AI help across Portland, Vancouver, and Beaverton.",
  alternates: {
    canonical: "/portland-ai-consultant",
  },
  keywords: [
    "Portland AI consultant",
    "AI consultant Portland Oregon",
    "AI consulting Portland",
    "AI setup Portland",
    "AI help Portland",
    "AI coaching Portland",
    "AI classes Portland",
    "AI training Portland",
    "private AI setup classes Portland",
    "AI tech Portland",
    "Greater Portland AI help",
    "small business AI setup Portland",
    "AI automation consultant Portland",
    "Vancouver WA AI consultant",
    "Beaverton AI consultant",
  ],
  openGraph: {
    title: "Portland AI Consultant for AI Setup & Training",
    description:
      "Local AI setup, coaching, and consulting for small businesses across greater Portland, Vancouver, Beaverton, Hillsboro, Tigard, Lake Oswego, and nearby cities.",
    url: "/portland-ai-consultant",
    siteName: "Pacific AI Tech",
    type: "website",
    images: [
      {
        url: "/pacific-ai-tech/img/bridge.jpeg",
        width: 1200,
        height: 800,
        alt: "Portland bridge representing Pacific AI Tech's Greater Portland AI consulting service area",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portland AI Consultant for AI Setup & Training",
    description:
      "Greater Portland AI help for small businesses: setup, coaching, training, automations, and practical support.",
    images: ["/pacific-ai-tech/img/bridge.jpeg"],
  },
};

const serviceAreas = [
  "Portland",
  "Vancouver",
  "Beaverton",
  "Hillsboro",
  "Tigard",
  "Lake Oswego",
  "Gresham",
  "Oregon City",
  "Tualatin",
  "McMinnville",
  "Salem",
  "Olympia",
];

const services = [
  {
    number: "/ 01",
    title: "AI setup on your computer",
    description:
      "We install and configure Claude Cowork, Hermes Agent, or the agent stack that fits your Portland-area machine and workflow.",
  },
  {
    number: "/ 02",
    title: "Small business AI consulting",
    description:
      "We turn vague AI ideas into concrete workflows for inboxes, files, spreadsheets, listings, reviews, invoices, and reports.",
  },
  {
    number: "/ 03",
    title: "Hands-on AI coaching and training",
    description:
      "Private AI coaching and setup classes teach Portland-area owners how to prompt, approve, inspect, adjust, and stop automations.",
  },
];

const requestPatterns = [
  "I need AI help for my Portland business, but I do not know what to install.",
  "Can someone set up AI on my laptop and coach our team through the first workflows?",
  "I want an AI consultant who can automate repeat work, not just give advice.",
  "Are there AI classes in Portland that teach our actual tools, files, and tasks?",
];

const differentiators = [
  {
    title: "Setup happens on your actual machine",
    description:
      "We work inside the laptop, desktop, files, inboxes, browser tools, and accounts you already use instead of sending you home with a generic AI strategy deck.",
  },
  {
    title: "Coaching is part of the implementation",
    description:
      "A useful Portland AI setup should end with the owner knowing how to prompt, approve, inspect, adjust, and stop the workflows without waiting on a developer.",
  },
  {
    title: "The first deliverable is concrete",
    description:
      "The standard setup includes ten practical automations, a handoff cheat sheet, and 30 days of remote AI coaching after the initial installation.",
  },
];

const faqs = [
  {
    question: "Do you provide AI consulting in the Greater Portland area?",
    answer:
      "Yes. Pacific AI Tech works across Portland and nearby Oregon and Washington cities, including Vancouver, Beaverton, Hillsboro, Tigard, Lake Oswego, Gresham, Oregon City, Tualatin, Salem, and Olympia.",
  },
  {
    question: "Is this AI consulting or AI implementation?",
    answer:
      "Both. We help decide what should be automated, then install the tools, build the first workflows, train the owner, and provide follow-up support when something needs adjustment.",
  },
  {
    question: "Can you set up AI tools on my own computer?",
    answer:
      "Yes. The core service is local-first AI setup on client-owned computers where practical, using tools such as Claude Cowork or Hermes Agent depending on the workflow and machine. For Portland owners, the goal is a working system you understand before we leave.",
  },
  {
    question: "Do you offer private AI classes or AI coaching in Portland?",
    answer:
      "Yes. We provide practical AI coaching, AI training, and private AI setup classes for Portland-area owners and teams. Sessions are built around your real inboxes, documents, spreadsheets, listings, reviews, invoices, or reports instead of generic demos.",
  },
  {
    question: "Who is the best fit for this service?",
    answer:
      "The strongest fit is a small operator with repeat computer work: real estate agents, restaurant owners, solo founders, trades, local shops, and service businesses that need practical AI help without managing technical infrastructure.",
  },
  {
    question: "What makes Pacific AI Tech different from a general AI consultant?",
    answer:
      "Pacific AI Tech focuses on implementation and coaching for Greater Portland small businesses. The work is not just advice: we install the tools, build the first workflows, teach the owner how to run them, and stay available for follow-up support.",
  },
  {
    question: "Can you help if I am searching for AI classes but really need setup?",
    answer:
      "Yes. Many Portland-area owners search for AI classes when they actually need hands-on setup plus coaching. Pacific AI Tech teaches through the client's real tools, files, workflows, and approval habits instead of a generic classroom demo.",
  },
  {
    question: "Do you work with non-technical owners?",
    answer:
      "Yes. The service is designed for non-technical operators who want AI help for repeat computer work without managing infrastructure, terminal commands, or complex agent configuration alone.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/portland-ai-consultant#webpage`,
      url: `${siteUrl}/portland-ai-consultant`,
      name: "Portland AI Consultant for AI Setup & Training",
      description: metadata.description,
      isPartOf: {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Pacific AI Tech",
        url: siteUrl,
      },
      about: {
        "@id": `${siteUrl}/portland-ai-consultant#service`,
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/portland-ai-consultant#service`,
      name: "Pacific AI Tech Portland AI Consulting and Setup",
      url: `${siteUrl}/portland-ai-consultant`,
      description: serviceDescription,
      email: contactEmail,
      image: `${siteUrl}/pacific-ai-tech/img/bridge.jpeg`,
      areaServed: serviceAreas.map((name) => ({
        "@type": "City",
        name,
      })),
      serviceType: [
        "AI consulting",
        "AI setup",
        "AI coaching",
        "Private AI classes",
        "AI training",
        "Private AI setup classes",
        "AI automation consulting",
        "AI agent training",
        "AI tech support",
        "Small business automation",
      ],
      knowsAbout: [
        "AI consultant Portland",
        "AI setup Portland",
        "AI help Portland",
        "AI training Portland",
        "AI classes Portland",
        "AI tech Portland",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Pacific AI Tech AI setup services",
        itemListElement: [
          {
            "@type": "Offer",
            name: "In-person AI setup",
            price: "2800",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: bookingUrl,
          },
          {
            "@type": "Offer",
            name: "Remote AI setup",
            price: "2000",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: bookingUrl,
          },
          {
            "@type": "Offer",
            name: "Private AI coaching and setup class",
            availability: "https://schema.org/InStock",
            url: bookingUrl,
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/portland-ai-consultant#faq`,
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
      "@id": `${siteUrl}/portland-ai-consultant#breadcrumb`,
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
          name: "Portland AI Consultant",
          item: `${siteUrl}/portland-ai-consultant`,
        },
      ],
    },
  ],
};

export default function PortlandAiConsultantPage() {
  return (
    <main className="pat-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader bookingUrl={bookingUrl} />

      <section className="pat-subpage-hero pat-local-hero" aria-labelledby="local-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <span className="pat-eyebrow">Greater Portland AI help</span>
              <h1 id="local-title">
                Portland AI consultant for practical AI setup and training.
              </h1>
            </div>
            <div>
              <p className="pat-lede">
                We help small businesses in Portland, Vancouver, Beaverton,
                Hillsboro, Tigard, Lake Oswego, and nearby cities set up AI
                tools, learn the workflow, and get practical AI tech help on
                their own computers.
              </p>
              <div className="pat-local-actions">
                <Button
                  render={<a href={bookingUrl} target="_blank" rel="noopener noreferrer" />}
                  nativeButton={false}
                  className="pat-btn pat-btn-primary"
                >
                  <CalendarDays data-icon="inline-start" />
                  Book AI setup help
                </Button>
                <Button
                  render={<Link href="/#pricing" />}
                  nativeButton={false}
                  variant="outline"
                  className="pat-btn"
                >
                  See pricing
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pat-local-section" aria-labelledby="services-title">
        <div className="pat-wrap">
          <div className="pat-section-head">
            <div>
              <span className="pat-eyebrow">AI setup, not just advice</span>
            </div>
            <h2 id="services-title">
              The useful kind of AI consulting ends with something running.
            </h2>
          </div>
          <div className="pat-who-grid pat-local-service-grid">
            {services.map((service) => (
              <Card className="pat-who-card" key={service.title}>
                <CardHeader>
                  <Badge variant="ghost" className="pat-num">
                    {service.number}
                  </Badge>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pat-local-section pat-local-section-alt" aria-labelledby="requests-title">
        <div className="pat-wrap">
          <div className="pat-section-head">
            <div>
              <span className="pat-eyebrow">What people ask for</span>
            </div>
            <h2 id="requests-title">
              Local AI help usually starts with a practical workflow.
            </h2>
          </div>
          <div className="pat-local-request-list">
            {requestPatterns.map((request) => (
              <p key={request}>{request}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="pat-local-section" aria-labelledby="difference-title">
        <div className="pat-wrap">
          <div className="pat-section-head">
            <div>
              <span className="pat-eyebrow">How to choose AI help</span>
            </div>
            <h2 id="difference-title">
              For Portland owners, the right AI consultant should leave working
              systems behind.
            </h2>
          </div>
          <div className="pat-who-grid pat-local-service-grid">
            {differentiators.map((item) => (
              <Card className="pat-who-card" key={item.title}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pat-local-section" aria-labelledby="area-title">
        <div className="pat-wrap">
          <div className="pat-local-area">
            <div>
              <span className="pat-eyebrow">Service area</span>
              <h2 id="area-title">
                AI setup and AI training for Greater Portland and nearby cities.
              </h2>
              <p>
                We provide on-site AI setup when the drive makes sense, and
                remote AI consulting, coaching, and private setup classes when
                screen-share is the better fit.
              </p>
            </div>
            <div className="pat-cities" aria-label="AI consulting service area cities">
              {serviceAreas.map((city, index) => (
                <Badge
                  key={city}
                  variant={index < 4 ? "default" : "outline"}
                  className="pat-city"
                >
                  {index < 4 ? <MapPin aria-hidden="true" /> : null}
                  {city}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pat-local-section pat-local-section-alt" aria-labelledby="faq-title">
        <div className="pat-wrap">
          <div className="pat-section-head">
            <div>
              <span className="pat-eyebrow">FAQ</span>
            </div>
            <h2 id="faq-title">Questions about Portland AI consulting.</h2>
          </div>
          <div className="pat-local-faq">
            {faqs.map((faq) => (
              <section key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </section>
            ))}
          </div>
          <div className="pat-case-submit">
            <div>
              <span className="pat-eyebrow">Start with one workflow</span>
              <h2>Bring the repeat task. We will map the AI setup.</h2>
              <p>
                A good first call is simple: what you do every week, where the
                information lives, what you would trust an AI agent to draft
                before you approve it, and whether you need setup, coaching, or
                a short class for your team.
              </p>
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
      </section>

      <SiteFooter />
    </main>
  );
}
