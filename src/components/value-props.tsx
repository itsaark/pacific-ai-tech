import { ShaderBackdrop } from "@/components/shader-backdrop";

export function ValueProps() {
  return (
    <section className="site-section value-props-shader" style={{ background: "var(--ink)", color: "var(--snow)" }}>
      <ShaderBackdrop className="section-shader-backdrop" />
      <div className="section-shader-scrim" aria-hidden="true" />
      <div className="wrap section-shader-content">
        <div className="eyebrow" style={{ color: "rgba(249,250,251,0.5)" }}>
          <span className="dot" style={{ background: "var(--snow)" }} />
          Why now
        </div>

        <h2
          className="text-section mt-5"
          style={{ color: "var(--snow)", maxWidth: "18ch" }}
        >
          Every week you wait
          <br />
          <em>costs you hours.</em>
        </h2>

        <div className="value-grid mt-12">
          <ValueCard
            number="01"
            headline="This isn't a subscription. It's an investment."
            body="One setup session. Then Claude co-work runs on your laptop, handling tasks that used to eat your mornings. The time you get back compounds every single day."
          />
          <ValueCard
            number="02"
            headline="Your competitors are already using this."
            body="AI isn't coming — it's here. Business owners who adopt now build advantages that widen every month. The gap between 'using AI' and 'thinking about AI' grows daily."
          />
          <ValueCard
            number="03"
            headline="You don't need to be technical."
            body="Claude co-work is designed for conversation, not code. You talk to it like an assistant. We set it up, show you how it works, and stay available for 30 days while you build confidence."
          />
        </div>
      </div>
    </section>
  );
}

function ValueCard({ number, headline, body }: { number: string; headline: string; body: string }) {
  return (
    <div className="value-card">
      <span
        style={{
          fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(249,250,251,0.4)",
        }}
      >
        {number}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-display-custom), Georgia, serif",
          fontSize: "clamp(22px, 2.2vw, 30px)",
          fontWeight: 400,
          lineHeight: 1.2,
          marginTop: 12,
          marginBottom: 12,
          color: "var(--snow)",
        }}
      >
        {headline}
      </h3>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: "rgba(249,250,251,0.7)",
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}
