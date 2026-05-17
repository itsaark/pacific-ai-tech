import Link from "next/link";
import { Button } from "@/components/ui/button";

const CAPABILITIES = [
  {
    category: "Communication",
    items: [
      "Draft and send emails in your voice",
      "Follow up with leads automatically",
      "Respond to client inquiries while you sleep",
      "Summarize long email threads in seconds",
    ],
  },
  {
    category: "Operations",
    items: [
      "Generate proposals, bids, and quotes",
      "Schedule and confirm appointments",
      "Track expenses and categorize receipts",
      "Create invoices when jobs close",
    ],
  },
  {
    category: "Marketing",
    items: [
      "Write social posts in your brand voice",
      "Research competitors and market trends",
      "Draft blog content and newsletters",
      "Personalize outreach at scale",
    ],
  },
  {
    category: "Intelligence",
    items: [
      "Morning briefing: what happened, what's next",
      "Analyze documents and contracts",
      "Research anything in seconds, not hours",
      "Summarize meetings and extract action items",
    ],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="site-section" style={{ background: "var(--tint)" }}>
      <div className="wrap">
        <div className="section-header">
          <div className="eyebrow">
            <span className="dot" />
            What Claude co-work does
          </div>
          <div>
            <h2 className="text-section">
              An employee that
              <br />
              <em>never clocks out.</em>
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
          Claude co-work connects to the tools you already use — Gmail, Google Calendar,
          Slack, your CRM, Stripe, and dozens more. Here&apos;s what becomes possible:
        </p>

        <div className="capabilities-grid">
          {CAPABILITIES.map((cap) => (
            <div key={cap.category} className="capability-block">
              <div
                style={{
                  fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--brand)",
                  marginBottom: 16,
                }}
              >
                {cap.category}
              </div>
              <ul className="capability-list">
                {cap.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Hermes agent callout */}
        <div
          className="mt-12 p-6"
          style={{
            border: "1px solid var(--rule)",
            background: "var(--snow)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--muted-text)",
                  marginBottom: 8,
                }}
              >
                For technical users
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display-custom), Georgia, serif",
                  fontSize: "clamp(22px, 2.2vw, 28px)",
                  marginBottom: 8,
                }}
              >
                Already comfortable with AI? Meet Hermes.
              </div>
              <p style={{ fontSize: 15, color: "var(--ink-soft)", margin: 0 }}>
                Hermes is our advanced agent framework for technically-capable users
                who want to go deeper — custom agents, API integrations, and autonomous
                workflows that run without supervision. Same setup, higher ceiling.
              </p>
            </div>
            <Button
              render={<Link href="#book" />}
              nativeButton={false}
              variant="outline"
              className="shrink-0 h-auto py-[12px] px-[18px] text-[13px] tracking-[0.02em] rounded-none border-[var(--rule)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--snow)] hover:border-[var(--ink)]"
              style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
            >
              Ask about Hermes →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
