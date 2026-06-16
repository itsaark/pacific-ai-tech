import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { caseStudies } from "@/lib/case-studies";
import { bookingUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Client stories from Pacific AI Tech showing how local AI agent setup changes day-to-day operations for small businesses.",
  alternates: {
    canonical: "/case-studies",
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="pat-site">
      <SiteHeader bookingUrl={bookingUrl} />

      <section className="pat-subpage-hero" aria-labelledby="case-studies-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <span className="pat-eyebrow">Case studies</span>
              <h1 id="case-studies-title">
                Proof from client work, not just{" "}
                <span className="pat-serif-italic">promises</span>.
              </h1>
            </div>
            <p className="pat-lede">
              These stories show the starting problem, the setup we built, the
              handoff, and the operational change clients approved us to share.
            </p>
          </div>
        </div>
      </section>

      <section className="pat-case-index" aria-label="Published case studies">
        <div className="pat-wrap">
          <div className="pat-case-index-grid">
            {caseStudies.map((study) => (
              <Link
                className="pat-case-index-card"
                href={`/case-studies/${study.slug}`}
                key={study.slug}
              >
                <div>
                  <div className="pat-case-index-meta">
                    <Badge variant="ghost" className="pat-num">
                      {study.eyebrow}
                    </Badge>
                    <span>{study.status}</span>
                  </div>
                  {study.heroImage ? (
                    <div className="pat-case-index-thumb" aria-hidden="true">
                      <Image
                        src={study.heroImage.src}
                        alt=""
                        width={study.heroImage.width}
                        height={study.heroImage.height}
                        sizes="(max-width: 620px) calc(100vw - 40px), (max-width: 1080px) calc(50vw - 62px), 540px"
                      />
                    </div>
                  ) : null}
                  <h2>{study.title}</h2>
                  <p>{study.summary}</p>
                </div>
                <div className="pat-case-index-details">
                  <span>{study.clientLabel}</span>
                  <span>{study.industry}</span>
                  <span>{study.location}</span>
                </div>
                <span className="pat-case-card-foot">
                  Open story
                  <ArrowUpRight data-icon="inline-end" />
                </span>
              </Link>
            ))}
          </div>

          <div className="pat-case-submit">
            <div>
              <span className="pat-eyebrow">Build the next one</span>
              <h2>Have a workflow that keeps stealing the day?</h2>
              <p>
                We help small operators turn repeat work into local AI systems:
                research, reminders, files, follow-ups, approvals, and the
                handoff back to the person in charge.
              </p>
            </div>
            <Button
              render={<a href={bookingUrl} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              className="pat-btn pat-btn-primary"
            >
              Talk through a workflow
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
