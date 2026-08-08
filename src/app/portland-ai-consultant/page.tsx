import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Phone } from "lucide-react";

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
import { ConsultationForm } from "@/components/consultation-form";
import { caseStudies } from "@/lib/case-studies";
import {
  bookingUrl,
  businessPhone,
  businessPhoneDisplay,
  businessPhoneHref,
  businessId,
  contactEmail,
  greaterPortlandSchemaAreas,
  greaterPortlandServiceAreas,
  serviceDescription,
  siteUrl,
  websiteId,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Portland AI Consultant for Small Businesses",
  description:
    "Business-only AI consulting, workflow implementation, and team training for small businesses across Portland, Vancouver, Beaverton, and Greater Portland.",
  alternates: {
    canonical: "/portland-ai-consultant",
  },
  keywords: [
    "Portland AI consultant",
    "AI consultant Portland Oregon",
    "AI consulting Portland",
    "business AI consulting Portland",
    "AI workflow implementation Portland",
    "business AI training Portland",
    "Greater Portland AI consultant",
    "small business AI consultant Portland",
    "AI automation consultant Portland",
    "Vancouver WA AI consultant",
    "Beaverton AI consultant",
  ],
  openGraph: {
    title: "Portland AI Consultant for Small Businesses",
    description:
      "Business-only AI consulting, workflow implementation, and team training across Greater Portland, Vancouver, Beaverton, Hillsboro, and nearby cities.",
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
    title: "Portland AI Consultant for Small Businesses",
    description:
      "Business-only AI consulting, workflow implementation, and team training for Greater Portland small businesses.",
    images: ["/pacific-ai-tech/img/bridge.jpeg"],
  },
};

const services = [
  {
    number: "/ 01",
    title: "AI workflow implementation",
    description:
      "We configure the agent stack that fits your company's approved computers, accounts, data, and operating workflow.",
  },
  {
    number: "/ 02",
    title: "Small business AI consulting",
    description:
      "We turn vague AI ideas into concrete workflows for inboxes, files, spreadsheets, listings, reviews, invoices, and reports.",
  },
  {
    number: "/ 03",
    title: "Owner and team training",
    description:
      "Hands-on training teaches owners and teams how to prompt, approve, inspect, adjust, and stop business automations.",
  },
];

const requestPatterns = [
  "Which repetitive business workflow is worth improving first?",
  "Can an AI agent draft this work while our team keeps final approval?",
  "How do we implement AI inside the tools and accounts our company already uses?",
  "Can you train our team on a working system instead of giving a generic presentation?",
];

const differentiators = [
  {
    title: "Implementation fits your operating environment",
    description:
      "We work with the company-approved computers, files, inboxes, browser tools, and accounts you already use instead of handing over a generic AI strategy deck.",
  },
  {
    title: "Coaching is part of the implementation",
    description:
      "A useful AI engagement should end with the owner knowing how to prompt, approve, inspect, adjust, and stop the workflows without waiting on a developer.",
  },
  {
    title: "The first deliverable is concrete",
    description:
      "Your proposal names the first workflows, guardrails, training, handoff, support plan, timeline, and quote. The scope matches your business instead of forcing every client into the same package.",
  },
];

const featuredProof = caseStudies.slice(0, 2).map((study) => ({
  title: study.clientLabel,
  description: study.summary,
  href: `/case-studies/${study.slug}`,
  label: `Read the ${study.clientLabel} case study`,
}));

const introCallSteps = [
  {
    title: "Choose an available time",
    description:
      "Our booking page shows current appointment availability immediately. You choose the time that works for your business.",
  },
  {
    title: "Meet with a co-founder",
    description:
      "Aark or Shayan will ask about the repeat work, the tools involved, what must stay human-approved, and what a useful outcome looks like.",
  },
  {
    title: "Leave with a clear next step",
    description:
      "We will tell you whether the workflow looks suitable for an engagement. If it does, the next step is a custom scope, timeline, and quote—not a surprise subscription.",
  },
];

const evidence = [
  {
    title: "Small businesses get better results by starting with one useful task.",
    description:
      "The U.S. Small Business Administration recommends beginning with a small, low-risk AI use case and keeping human review in the process.",
    href: "https://www.sba.gov/business-guide/manage-your-business/ai-small-business",
    source: "U.S. Small Business Administration",
  },
  {
    title: "AI adoption is growing, but it is not universal.",
    description:
      "U.S. Census Bureau data published in 2026 puts business AI use near one in five firms, which is why our work starts with the workflow rather than assuming every tool is a fit.",
    href: "https://www.census.gov/library/stories/2026/05/ai-use-businesses.html",
    source: "U.S. Census Bureau",
  },
  {
    title: "Risk controls belong inside the workflow.",
    description:
      "The NIST AI Risk Management Framework emphasizes practical governance and measurement. We translate that into approvals, inspectable outputs, and clear stop points.",
    href: "https://airc.nist.gov/airmf-resources/airmf/",
    source: "National Institute of Standards and Technology",
  },
];

const faqs = [
  {
    question: "Do you provide AI consulting in the Greater Portland area?",
    answer:
      "Yes. Pacific AI Tech serves the Greater Portland metro across Oregon and southwest Washington, including Portland, Vancouver, Beaverton, Hillsboro, Tigard, Lake Oswego, Gresham, Oregon City, Tualatin, Milwaukie, Happy Valley, and Camas. Wider Pacific Northwest work is available when practical.",
  },
  {
    question: "Is this AI consulting or AI implementation?",
    answer:
      "Both. We help decide what should be automated, configure the business tools, build the first workflows, train the owner or team, and provide follow-up support when something needs adjustment.",
  },
  {
    question: "Can you implement AI on company-owned computers?",
    answer:
      "Yes. We can implement local-first AI on client-owned business computers when practical, using tools such as Claude Cowork or Hermes Agent depending on the workflow and approved machine. The goal is a working business system the owner or team understands.",
  },
  {
    question: "Do you offer business AI training in Portland?",
    answer:
      "Yes. We provide practical AI workflow training for Portland-area owners and teams. Sessions are built around the business's real inboxes, documents, spreadsheets, listings, reviews, invoices, or reports instead of generic demos.",
  },
  {
    question: "Who is the best fit for this service?",
    answer:
      "The strongest fit is a small operator with repeat computer work: real estate agents, restaurant owners, solo founders, trades, local shops, and service businesses that need practical AI implementation without managing technical infrastructure.",
  },
  {
    question: "What makes Pacific AI Tech different from a general AI consultant?",
    answer:
      "Pacific AI Tech focuses on implementation and coaching for Greater Portland small businesses. The work is not just advice: we configure the chosen tools, build the first workflows, teach the owner how to run them, and stay available for follow-up support.",
  },
  {
    question: "Do you provide consumer computer repair or general tech support?",
    answer:
      "No. Pacific AI Tech works exclusively with businesses on AI consulting, workflow implementation, and team training. We do not provide consumer computer repair, account recovery, device troubleshooting, or general-purpose technical support.",
  },
  {
    question: "Do you work with non-technical owners?",
    answer:
      "Yes. The service is designed for non-technical operators who want practical AI workflows without managing infrastructure, terminal commands, or complex agent configuration alone.",
  },
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
      telephone: businessPhone,
      email: contactEmail,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Portland",
        addressRegion: "OR",
        addressCountry: "US",
      },
      areaServed: greaterPortlandSchemaAreas,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales and customer service",
        telephone: businessPhone,
        email: contactEmail,
        areaServed: "US",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/portland-ai-consultant#webpage`,
      url: `${siteUrl}/portland-ai-consultant`,
      name: "Portland AI Consultant for Small Businesses",
      description: metadata.description,
      isPartOf: { "@id": websiteId },
      about: {
        "@id": `${siteUrl}/portland-ai-consultant#service`,
      },
      breadcrumb: {
        "@id": `${siteUrl}/portland-ai-consultant#breadcrumb`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/pacific-ai-tech/img/bridge.jpeg`,
      },
      dateModified: "2026-08-07",
      inLanguage: "en-US",
      citation: evidence.map((item) => item.href),
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/portland-ai-consultant#service`,
      name: "Greater Portland Business AI Consulting and Workflow Implementation",
      url: `${siteUrl}/portland-ai-consultant`,
      description: serviceDescription,
      image: `${siteUrl}/pacific-ai-tech/img/bridge.jpeg`,
      provider: { "@id": businessId },
      areaServed: greaterPortlandSchemaAreas,
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Small businesses and local operators",
      },
      serviceType: [
        "Business AI consulting",
        "AI workflow implementation",
        "Business AI training",
        "AI automation consulting",
        "AI agent training",
        "Small business automation",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Pacific AI Tech AI consulting services",
        itemListElement: [
          {
            "@type": "Offer",
            name: "AI consulting engagement (custom scope)",
            availability: "https://schema.org/InStock",
            url: bookingUrl,
          },
          {
            "@type": "Offer",
            name: "AI solutions deployment (custom scope)",
            availability: "https://schema.org/InStock",
            url: bookingUrl,
          },
          {
            "@type": "Offer",
            name: "Business AI workflow coaching and team training",
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

      <section className="pat-subpage-hero pat-local-hero" aria-labelledby="local-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <span className="pat-eyebrow">
                Business-only AI consulting · Greater Portland
              </span>
              <h1 id="local-title">
                Portland AI consultant for small-business workflows.
              </h1>
            </div>
            <div>
              <p className="pat-lede">
                We help small businesses in Portland, Vancouver, Beaverton,
                Hillsboro, Tigard, Lake Oswego, and nearby cities design AI
                workflows, implement the right tools, and train the people who
                will use them. We do not provide consumer computer repair,
                account recovery, or general technical support.
              </p>
              <div className="pat-local-actions">
                <Button
                  render={<a href={bookingUrl} target="_blank" rel="noopener noreferrer" />}
                  nativeButton={false}
                  className="pat-btn pat-btn-primary"
                >
                  <CalendarDays data-icon="inline-start" />
                  Book a business AI consultation
                </Button>
                <Button
                  render={<a href={businessPhoneHref} />}
                  nativeButton={false}
                  variant="outline"
                  className="pat-btn"
                >
                  <Phone data-icon="inline-start" />
                  Call {businessPhoneDisplay}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="pat-local-section pat-local-section-alt"
        aria-labelledby="proof-title"
      >
        <div className="pat-wrap">
          <div className="pat-section-head">
            <div>
              <span className="pat-eyebrow">Real work, visible proof</span>
            </div>
            <h2 id="proof-title">
              Oregon client workflows, built and documented by the people you
              will meet.
            </h2>
          </div>
          <div className="pat-who-grid pat-local-service-grid">
            {featuredProof.map((item) => (
              <Card className="pat-who-card" key={item.href}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                  <Link className="pat-source-link" href={item.href}>
                    {item.label}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            ))}
            <Card className="pat-who-card">
              <CardHeader>
                <CardTitle>Work directly with the co-founders</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Aark Kodur and Shayan Jalalipour combine software engineering
                  experience from Amazon with AI and machine-learning research
                  from Portland State University.
                </CardDescription>
                <Link className="pat-source-link" href="/#founders">
                  Meet Aark and Shayan
                  <ArrowRight aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pat-local-section" aria-labelledby="services-title">
        <div className="pat-wrap">
          <div className="pat-section-head">
            <div>
              <span className="pat-eyebrow">Implementation, not just advice</span>
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
              <span className="pat-eyebrow">What owners bring to the call</span>
            </div>
            <h2 id="requests-title">
              A useful business AI engagement starts with a practical workflow.
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
              <span className="pat-eyebrow">How to choose an AI consultant</span>
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
                Business AI consulting and team training across Greater Portland.
              </h2>
              <p>
                We provide on-site workflow implementation when the drive makes
                sense, and remote AI consulting and team training when
                screen-share is the better fit.
              </p>
            </div>
            <div className="pat-cities" aria-label="AI consulting service area cities">
              {greaterPortlandServiceAreas.map((area, index) => (
                <Badge
                  key={`${area.city}-${area.region}`}
                  variant={index < 4 ? "default" : "outline"}
                  className="pat-city"
                >
                  {index < 4 ? <MapPin aria-hidden="true" /> : null}
                  {area.displayName}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pat-local-section pat-local-section-alt" aria-labelledby="evidence-title">
        <div className="pat-wrap">
          <div className="pat-section-head">
            <div>
              <span className="pat-eyebrow">How we make AI practical</span>
            </div>
            <h2 id="evidence-title">
              Start small, keep a person in control, and measure what changes.
            </h2>
          </div>
          <div className="pat-who-grid pat-local-service-grid">
            {evidence.map((item) => (
              <Card className="pat-who-card" key={item.href}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                  <a
                    className="pat-source-link"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source: {item.source}
                    <ArrowRight aria-hidden="true" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pat-local-section" aria-labelledby="consultation-title">
        <div className="pat-wrap">
          <div className="pat-section-head">
            <div>
              <span className="pat-eyebrow">Your introductory consultation</span>
            </div>
            <h2 id="consultation-title">
              Know who you will meet, what we will discuss, and what comes next.
            </h2>
          </div>
          <div className="pat-who-grid pat-local-service-grid">
            {introCallSteps.map((step, index) => (
              <Card className="pat-who-card" key={step.title}>
                <CardHeader>
                  <Badge variant="ghost" className="pat-num">
                    / {String(index + 1).padStart(2, "0")}
                  </Badge>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {leadFormEnabled ? (
        <section
          className="pat-local-section pat-local-section-alt"
          aria-label="Request a business AI consultation"
        >
          <div className="pat-wrap">
            <ConsultationForm location="portland-landing-page" />
          </div>
        </section>
      ) : null}

      <section className="pat-local-section" aria-labelledby="faq-title">
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
              <span className="pat-eyebrow">Start with one business workflow</span>
              <h2>Bring the repeat task. We will map the first useful workflow.</h2>
              <p>
                Tell us what your team repeats, where the information lives,
                and what must remain human-approved. The booking calendar shows
                current appointment availability immediately. If you prefer
                phone, call <a href={businessPhoneHref}>{businessPhoneDisplay}</a>.
                If you prefer email, include your business and workflow so a
                co-founder can review the fit; the calendar is the clearest view
                of current availability.
              </p>
            </div>
            <Button
              render={<a href={bookingUrl} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              className="pat-btn pat-btn-primary"
            >
              Schedule a business consultation
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
