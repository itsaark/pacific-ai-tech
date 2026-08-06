import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { bookingUrl, contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website and Consulting Terms",
  description:
    "Terms for using the Pacific AI Tech website and for custom AI consulting engagements, proposals, deliverables, and third-party tools.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Website and Consulting Terms",
    description:
      "Terms for using the Pacific AI Tech website and for custom AI consulting engagements.",
    url: "/terms",
    siteName: "Pacific AI Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pacific AI Tech Website and Consulting Terms",
    description:
      "Terms for using the Pacific AI Tech website and for custom AI consulting engagements.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <main className="pat-site">
      <SiteHeader bookingUrl={bookingUrl} />

      <section className="pat-subpage-hero" aria-labelledby="terms-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <span className="pat-eyebrow">Terms</span>
              <h1 id="terms-title">
                Straightforward terms for{" "}
                <span className="pat-serif-emphasis">custom work.</span>
              </h1>
            </div>
            <div>
              <p className="pat-lede">
                These terms cover this website and the basic rules for working
                with Pacific AI Tech LLC. A signed proposal or services
                agreement controls the details of a client engagement.
              </p>
              <p>Effective August 6, 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pat-case-detail" aria-label="Terms and conditions">
        <div className="pat-wrap">
          <div className="pat-case-narrative">
            <section>
              <h2>Website use</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  This site provides general information about business AI
                  consulting and our services. You may use it for lawful
                  business purposes. You may not interfere with the site,
                  attempt unauthorized access, misuse its forms, or copy its
                  content in a way that violates applicable law or our rights.
                </p>
                <p>
                  Our services are intended for businesses. We do not provide
                  consumer computer repair, account recovery, or general
                  personal technical support.
                </p>
              </div>
            </section>

            <section>
              <h2>Estimates and custom proposals</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  Introductory calls, website descriptions, timelines, and early
                  estimates are informational. They are not a promise to perform
                  work at a particular price or by a particular date.
                </p>
                <p>
                  Each engagement is custom-scoped. Work begins only after both
                  sides accept a written proposal or services agreement. That
                  document will describe the deliverables, assumptions, fees,
                  payment schedule, timing, and any support period. If it
                  conflicts with these website terms, the signed document wins.
                </p>
              </div>
            </section>

            <section>
              <h2>Client responsibilities</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  Clients are responsible for providing timely access,
                  information, decisions, and feedback; maintaining appropriate
                  accounts and licenses; backing up important data; and making
                  sure they have the right to give us the materials and system
                  access needed for the work.
                </p>
                <p>
                  AI output can be incomplete, inaccurate, or unsuitable for a
                  particular decision. Unless a signed agreement says otherwise,
                  the client remains responsible for reviewing outputs and
                  approving consequential actions before they are sent,
                  published, or used in the business.
                </p>
              </div>
            </section>

            <section>
              <h2>Changes, delays, and payment</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  Requests outside the accepted scope may require a written
                  change, additional fees, or a revised timeline. Dates can also
                  move when access, feedback, approvals, or third-party services
                  are delayed.
                </p>
                <p>
                  Payment terms are stated in the proposal. Clients are
                  responsible for approved fees and applicable taxes. We may
                  pause work on overdue invoices after reasonable notice.
                </p>
              </div>
            </section>

            <section>
              <h2>Ownership and licenses</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  Each side keeps ownership of the materials, methods, code,
                  data, and intellectual property it had before the engagement.
                  Ownership or license rights for custom deliverables will be
                  stated in the accepted proposal. Unless it says otherwise,
                  Pacific AI Tech may retain and reuse general knowledge,
                  non-client-specific methods, and reusable tools that do not
                  disclose confidential information.
                </p>
                <p>
                  Open-source software, AI models, integrations, and other
                  third-party materials remain subject to their own licenses and
                  terms. The client retains responsibility for its business data
                  and the rights it grants us to use that data for the project.
                </p>
              </div>
            </section>

            <section>
              <h2>Confidentiality</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  We treat non-public client information as confidential and use
                  it only to perform the engagement, operate the relationship,
                  or meet legal obligations. More detailed confidentiality,
                  security, or data-handling requirements should be included in
                  the signed agreement before sensitive access is provided.
                </p>
              </div>
            </section>

            <section>
              <h2>Third-party tools</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  AI projects often depend on third-party hardware, software,
                  models, APIs, hosting, or online services. Those providers may
                  change prices, features, limits, availability, or terms. We do
                  not control them and cannot guarantee their continued
                  operation. Any recurring third-party costs and account
                  responsibilities should be identified in the proposal.
                </p>
              </div>
            </section>

            <section>
              <h2>No guaranteed outcome</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  We aim to deliver the work described in the accepted scope,
                  but we do not guarantee a particular revenue result, time
                  saving, search ranking, advertising outcome, model behavior,
                  or uninterrupted operation. Examples and case studies describe
                  particular projects and are not promises that another business
                  will receive the same result.
                </p>
              </div>
            </section>

            <section>
              <h2>Liability</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  To the fullest extent permitted by law, neither side will be
                  liable to the other for indirect, incidental, special,
                  punitive, or consequential losses, including lost profits or
                  lost data. Pacific AI Tech&apos;s total liability connected with an
                  engagement will not exceed the fees the client paid us for the
                  work giving rise to the claim, unless a signed agreement says
                  otherwise or the law does not allow that limitation.
                </p>
              </div>
            </section>

            <section>
              <h2>Ending an engagement</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  Termination rights, transition steps, and amounts due are
                  governed by the signed proposal or services agreement. Either
                  side may stop discussing a potential project before an
                  agreement is accepted.
                </p>
              </div>
            </section>

            <section>
              <h2>Law, updates, and contact</h2>
              <div className="pat-case-narrative-copy">
                <p>
                  These website terms are governed by Oregon law, without regard
                  to conflict-of-law principles. We may update them as our
                  website or services change; the effective date above will show
                  the latest revision. Changes do not rewrite an already signed
                  client agreement unless both sides agree in writing.
                </p>
                <p>
                  Questions can be sent to{" "}
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Our
                  handling of website and inquiry information is described in
                  the <Link href="/privacy">Privacy Policy</Link>.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
