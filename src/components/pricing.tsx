import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Pricing() {
  return (
    <section id="pricing" className="site-section">
      <div className="wrap">
        <div className="section-header">
          <div className="eyebrow">
            <span className="dot" />
            Pricing
          </div>
          <div>
            <h2 className="text-section">
              One investment.
              <br />
              <em>Returns forever.</em>
            </h2>
          </div>
        </div>

        <p
          className="text-lede mb-12"
          style={{
            fontFamily: "var(--font-display-custom), Georgia, serif",
            fontStyle: "italic",
            color: "var(--ink-soft)",
            maxWidth: "52ch",
          }}
        >
          Both plans include the full setup, your automations, and 30 days of
          hands-on premium support. The only difference is whether we&apos;re in the room
          or on the screen.
        </p>

        <div className="pricing-grid">
          {/* Remote plan */}
          <div
            className="pricing-card"
            style={{
              border: "1px solid var(--rule)",
              background: "color-mix(in oklab, var(--snow) 70%, var(--tint))",
            }}
          >
            <div className="pricing-card-inner">
              <div>
                <div
                  className="inline-block px-3 py-1 mb-4"
                  style={{
                    fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    background: "var(--tint)",
                    color: "var(--muted-text)",
                  }}
                >
                  Most popular
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display-custom), Georgia, serif",
                    fontSize: "clamp(28px, 3vw, 36px)",
                    fontWeight: 400,
                    marginBottom: 8,
                  }}
                >
                  Remote setup
                </h3>
                <p style={{ fontSize: 15, color: "var(--ink-soft)", margin: "0 0 24px" }}>
                  Full session over video call. Same automations, same support,
                  same results — from anywhere in the country.
                </p>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display-custom), Georgia, serif",
                    fontSize: "clamp(48px, 5vw, 64px)",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  $2,400
                  <span style={{ fontSize: 16, fontFamily: "var(--font-body), system-ui, sans-serif", color: "var(--muted-text)", marginLeft: 8 }}>
                    flat
                  </span>
                </div>

                <ul className="pricing-features">
                  <li>Claude co-work fully configured on your machine</li>
                  <li>Custom automations built to your workflow</li>
                  <li>All your tools connected (email, calendar, CRM, etc.)</li>
                  <li>Hands-on training during the session</li>
                  <li>30 days of premium support included</li>
                </ul>

                <Button
                  render={<Link href="#book" />}
                  nativeButton={false}
                  variant="outline"
                  className="w-full h-auto py-[14px] px-[16px] text-[14px] tracking-[0.02em] rounded-none mt-4 justify-center bg-[var(--ink)] text-[var(--snow)] border-[var(--ink)] hover:bg-[var(--brand)] hover:border-[var(--brand)] hover:text-[var(--brand-fg)]"
                  style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
                >
                  Book a free consult →
                </Button>
              </div>
            </div>
          </div>

          {/* On-site plan */}
          <div
            className="pricing-card pricing-card-dark visual-pricing-card"
            style={{
              border: "1px solid var(--ink)",
              backgroundColor: "var(--ink)",
              color: "var(--snow)",
            }}
          >
            <div className="visual-pricing-card__image" aria-hidden="true" />
            <div className="visual-pricing-card__scrim" aria-hidden="true" />
            <div className="pricing-card-inner">
              <div>
                <div
                  className="inline-block px-3 py-1 mb-4"
                  style={{
                    fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    background: "var(--brand)",
                    color: "var(--brand-fg)",
                  }}
                >
                  In person
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display-custom), Georgia, serif",
                    fontSize: "clamp(28px, 3vw, 36px)",
                    fontWeight: 400,
                    marginBottom: 8,
                    color: "var(--snow)",
                  }}
                >
                  On-site setup
                </h3>
                <p style={{ fontSize: 15, color: "rgba(249,250,251,0.7)", margin: "0 0 24px" }}>
                  We come to your office. Same session, but shoulder-to-shoulder.
                  Available in the Greater Portland → Olympia corridor.
                </p>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display-custom), Georgia, serif",
                    fontSize: "clamp(48px, 5vw, 64px)",
                    lineHeight: 1,
                    marginBottom: 4,
                    color: "var(--snow)",
                  }}
                >
                  $2,800
                  <span style={{ fontSize: 16, fontFamily: "var(--font-body), system-ui, sans-serif", color: "rgba(249,250,251,0.5)", marginLeft: 8 }}>
                    flat
                  </span>
                </div>

                <ul className="pricing-features" style={{ color: "rgba(249,250,251,0.75)" }}>
                  <li className="no-check" style={{ fontStyle: "italic", opacity: 0.85 }}>Everything in Remote, plus:</li>
                  <li>We set up your physical workspace for AI</li>
                  <li>Side-by-side training at your desk</li>
                  <li>Immediate troubleshooting in your environment</li>
                  <li>30 days of premium support included</li>
                </ul>

                <Button
                  render={<Link href="#book" />}
                  nativeButton={false}
                  variant="outline"
                  className="w-full h-auto py-[14px] px-[16px] text-[14px] tracking-[0.02em] rounded-none mt-4 justify-center bg-[var(--snow)] text-[var(--ink)] border-[var(--snow)] hover:bg-[var(--brand)] hover:border-[var(--brand)] hover:text-[var(--brand-fg)]"
                  style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
                >
                  Book a free consult →
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* After-support note */}
        <div
          className="support-note mt-10 p-6"
          style={{
            border: "1px solid var(--rule)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div style={{ flex: "1" }}>
              <div
                style={{
                  fontFamily: "var(--font-display-custom), Georgia, serif",
                  fontSize: 20,
                  marginBottom: 6,
                }}
              >
                Need help after 30 days?
              </div>
              <p style={{ fontSize: 15, color: "var(--ink-soft)", margin: 0 }}>
                On-demand support at $200/hour. Most clients use 1–2 hours a month
                for tweaks, new automations, or questions.
              </p>
            </div>
            <div
              style={{
                fontFamily: "var(--font-display-custom), Georgia, serif",
                fontSize: "clamp(32px, 3.5vw, 44px)",
                whiteSpace: "nowrap",
              }}
            >
              $200<span style={{ fontSize: 14, fontFamily: "var(--font-body), system-ui, sans-serif", color: "var(--muted-text)", marginLeft: 6 }}>/hr</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
