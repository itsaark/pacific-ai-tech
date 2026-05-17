export function HowItWorks() {
  return (
    <section id="how" className="site-section">
      <div className="wrap">
        <div className="section-header">
          <div className="eyebrow">
            <span className="dot" />
            How it works
          </div>
          <div>
            <h2 className="text-section">
              Three steps.
              <br />
              <em>Then it just runs.</em>
            </h2>
          </div>
        </div>

        <div className="steps-grid">
          <Step
            number="01"
            title="Free consult"
            time="30 minutes"
            body="We learn your business, your pain points, and where your time goes. Then we design a plan — which automations to build, which integrations to connect, and how Claude co-work will fit your day."
          />
          <Step
            number="02"
            title="Setup session"
            time="Half day, on-site or remote"
            body="We install Claude co-work on your machine, connect your tools (email, calendar, CRM, whatever you use), build your automations, and walk you through everything. You watch, you ask questions, you try it yourself before we leave."
          />
          <Step
            number="03"
            title="30-day premium support"
            time="Included — no extra charge"
            body="After the session, we don't disappear. For 30 days, you have direct access to us for questions, tweaks, troubleshooting, and walkthroughs. Most clients message us daily for the first week — that's expected and encouraged."
          />
        </div>
      </div>
    </section>
  );
}

function Step({ number, title, time, body }: { number: string; title: string; time: string; body: string }) {
  return (
    <div className="step-card">
      <span
        style={{
          fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--muted-text)",
        }}
      >
        {number}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-display-custom), Georgia, serif",
          fontSize: "clamp(28px, 3vw, 40px)",
          fontWeight: 400,
          lineHeight: 1.1,
          marginTop: 12,
          marginBottom: 8,
        }}
      >
        {title}
      </h3>
      <div
        style={{
          fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--brand)",
          marginBottom: 14,
        }}
      >
        {time}
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>
        {body}
      </p>
    </div>
  );
}
