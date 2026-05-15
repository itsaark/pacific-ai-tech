import { Badge } from "@/components/ui/badge";

const AUTOMATIONS = [
  { t: "Inbox triage",           d: "Smart labels, draft replies in your voice, and a daily 9 a.m. brief of what actually needs you.",                    tag: "Email" },
  { t: "Voicemail → tasks",      d: "Transcribe every voicemail, summarize, and drop the right next step in your task list.",                             tag: "Phone" },
  { t: "Invoice from timesheets",d: "Turn raw hours and notes into a clean invoice draft, ready to send on Friday.",                                      tag: "Billing" },
  { t: "Lead intake & scoring",  d: "Form fills get enriched, scored, and pinged to your phone when one looks like a real buyer.",                        tag: "Sales" },
  { t: "Meeting prep briefings", d: "Every morning, a one-page brief on each meeting — who they are, what was last said.",                               tag: "Calendar" },
  { t: "Receipts from photos",   d: "Snap a receipt; it lands in your books with category, vendor, and tax already filled in.",                           tag: "Bookkeeping" },
  { t: "Client onboarding kits", d: "Personalized intake docs, contracts, and welcome emails generated from a single intake form.",                       tag: "Ops" },
  { t: "Weekly business review", d: "Numbers, wins, and what slipped — assembled from your tools into one short Monday email.",                           tag: "Reporting" },
  { t: "Social drafts from your work", d: "Long-form posts, podcasts, or blogs spun into a week of social drafts in your voice.",                       tag: "Marketing" },
  { t: "Quote / proposal builder",    d: "Describe the job; get a clean, branded proposal with your terms and pricing pre-filled.",                      tag: "Sales" },
];

export function Automations() {
  return (
    <section id="automations" className="site-section">
      <div className="wrap">
        <div className="section-header">
          <div className="eyebrow">
            <span className="dot" />
            The ten
          </div>
          <div>
            <h2
              className="text-section"
              style={{ fontFamily: "var(--font-display-custom), Georgia, serif" }}
            >
              What ten automations
              <br />
              <em style={{ fontStyle: "italic" }}>actually looks like.</em>
            </h2>
            <p
              className="text-lede"
              style={{
                fontFamily: "var(--font-display-custom), Georgia, serif",
                fontStyle: "italic",
                color: "var(--ink-soft)",
                marginTop: 18,
                maxWidth: "56ch",
                marginBottom: 0,
              }}
            >
              We don&apos;t pick from a menu. We watch your week, find the ten
              that pay back fastest, and build them with you in the room. Here
              are the usual suspects.
            </p>
          </div>
        </div>

        <div className="auto-grid">
          {AUTOMATIONS.map((a, i) => (
            <div className="auto-item" key={a.t}>
              <div
                style={{
                  fontFamily: "var(--font-display-custom), Georgia, serif",
                  fontStyle: "italic",
                  fontSize: 44,
                  lineHeight: 0.9,
                  color: "var(--brand)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display-custom), Georgia, serif",
                    fontSize: 24,
                    marginBottom: 6,
                    fontWeight: 400,
                  }}
                >
                  {a.t}
                </h3>
                <p style={{ color: "var(--ink-soft)", fontSize: 15, margin: 0 }}>{a.d}</p>
                <Badge
                  variant="outline"
                  className="mt-[10px] border-0 p-0 text-inherit bg-transparent rounded-none"
                  style={{
                    fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--muted-text)",
                  }}
                >
                  — {a.tag}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Tools strip */}
        <div
          className="flex flex-wrap items-center gap-9 mt-9 py-6"
          style={{
            borderTop: "1px solid var(--rule)",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted-text)",
            }}
          >
            Built with
          </span>
          {["Claude Code", "Hermes agent", "ChatGPT / OpenAI"].map((tool) => (
            <span
              key={tool}
              className="before:content-['·'] before:mr-[18px] before:opacity-50"
              style={{
                fontFamily: "var(--font-display-custom), Georgia, serif",
                fontSize: "clamp(22px, 2.4vw, 30px)",
                fontStyle: "italic",
              }}
            >
              {tool}
            </span>
          ))}
          <span
            className="ml-auto"
            style={{
              fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
              fontSize: 11,
              color: "var(--muted-text)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Your data stays on your machine.
          </span>
        </div>
      </div>
    </section>
  );
}
