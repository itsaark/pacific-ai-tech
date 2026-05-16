import { MessageCircle, Star, FileText, Palette, Share2, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ── Brand logo marks ── */

function BrandMark({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: bg }}>
      {children}
    </div>
  );
}

function GmailLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect width="40" height="40" fill="#EA4335" />
      <path d="M8 28V14l12 9 12-9v14" fill="rgba(255,255,255,0.08)" />
      <path d="M8 14l12 9 12-9" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="8" y1="14" x2="8" y2="28" stroke="white" strokeWidth="2" />
      <line x1="32" y1="14" x2="32" y2="28" stroke="white" strokeWidth="2" />
    </svg>
  );
}

function GCalLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect width="40" height="40" fill="#4285F4" />
      <rect x="9" y="14" width="22" height="17" rx="1" fill="white" fillOpacity="0.92" />
      <line x1="9" y1="20" x2="31" y2="20" stroke="#4285F4" strokeWidth="1.5" />
      <rect x="13" y="9" width="2.5" height="7" rx="1" fill="white" />
      <rect x="24.5" y="9" width="2.5" height="7" rx="1" fill="white" />
      <text x="20" y="30" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Arial,sans-serif" fill="#4285F4">31</text>
    </svg>
  );
}

function QBLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect width="40" height="40" fill="#2CA01C" />
      <text x="20" y="26" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif" fill="white">QB</text>
    </svg>
  );
}

function GSheetsLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect width="40" height="40" fill="#34A853" />
      <rect x="10" y="10" width="20" height="20" rx="1" fill="white" fillOpacity="0.9" />
      <line x1="10" y1="17" x2="30" y2="17" stroke="#34A853" strokeWidth="1.2" />
      <line x1="10" y1="23" x2="30" y2="23" stroke="#34A853" strokeWidth="1.2" />
      <line x1="16" y1="10" x2="16" y2="30" stroke="#34A853" strokeWidth="1.2" />
      <line x1="23" y1="10" x2="23" y2="30" stroke="#34A853" strokeWidth="1.2" />
    </svg>
  );
}

/* ── Automation data ── */

const AUTOMATIONS = [
  {
    logo: <GmailLogo />,
    name: "Morning brief",
    desc: "Email, calendar, and new leads — summarized and waiting by 7 a.m.",
  },
  {
    logo: <BrandMark bg="#007AFF"><MessageCircle className="w-5 h-5 text-white" /></BrandMark>,
    name: "Client outreach",
    desc: "Personalized follow-ups via text or email, sent while you're on the job.",
  },
  {
    logo: <BrandMark bg="#EA4335"><Star className="w-5 h-5 text-white" /></BrandMark>,
    name: "Review requests",
    desc: "After every job, asks for a Google review — worded just right.",
  },
  {
    logo: <GCalLogo />,
    name: "Booking & reminders",
    desc: "Handles appointment requests, confirmations, and day-before reminders.",
  },
  {
    logo: <QBLogo />,
    name: "Auto-invoicing",
    desc: "Job closes → invoice goes out. Follows up automatically if it goes unpaid.",
  },
  {
    logo: <BrandMark bg="#191919"><FileText className="w-5 h-5 text-white" /></BrandMark>,
    name: "Proposals & contracts",
    desc: "Describe the job; get a branded proposal with your terms pre-filled.",
  },
  {
    logo: <BrandMark bg="#7C3AED"><Palette className="w-5 h-5 text-white" /></BrandMark>,
    name: "Content from your work",
    desc: "Job photos and updates turned into polished posts, ready to approve.",
  },
  {
    logo: <BrandMark bg="#E1306C"><Share2 className="w-5 h-5 text-white" /></BrandMark>,
    name: "Social scheduling",
    desc: "A full week of posts in your voice, queued and ready.",
  },
  {
    logo: <BrandMark bg="#059669"><Search className="w-5 h-5 text-white" /></BrandMark>,
    name: "Daily search & report",
    desc: "Scans for new listings, loads, or leads every morning. Sends what matters.",
  },
  {
    logo: <GSheetsLogo />,
    name: "Weekly numbers",
    desc: "Revenue, bookings, and what slipped — one clean Monday morning email.",
  },
];

/* ── Component ── */

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
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {AUTOMATIONS.map((a) => (
            <Card
              key={a.name}
              className="rounded-none ring-0 border border-[var(--rule)] gap-0 py-0"
            >
              <div className="p-4 flex flex-col gap-3 h-full">
                {a.logo}
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display-custom), Georgia, serif",
                      fontSize: 15,
                      lineHeight: 1.2,
                      marginBottom: 5,
                    }}
                  >
                    {a.name}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--muted-text)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {a.desc}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tools strip */}
        <div
          className="flex flex-wrap items-center gap-3 mt-8 pt-6"
          style={{ borderTop: "1px solid var(--rule)" }}
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
          {["Claude", "OpenAI", "Hermes agent"].map((tool) => (
            <Badge
              key={tool}
              variant="outline"
              className="rounded-none border-[var(--rule)]"
              style={{
                fontFamily: "var(--font-display-custom), Georgia, serif",
                fontStyle: "italic",
                fontSize: 14,
                color: "var(--ink-soft)",
                padding: "2px 10px",
              }}
            >
              {tool}
            </Badge>
          ))}
          <span
            className="ml-auto hidden sm:block"
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
