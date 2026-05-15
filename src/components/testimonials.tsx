const TESTIMONIALS = [
  {
    q: "It felt like hiring a calm friend who happens to know every AI tool. By 5 p.m. my inbox was answering itself.",
    name: "M. Alarcón",
    role: "Tax practice · Salem",
  },
  {
    q: "I'd read about agents for a year and built nothing. They sat next to me, we shipped ten, and I finally stopped feeling behind.",
    name: "J. Tran",
    role: "Solo design studio · Portland",
  },
  {
    q: "The follow-up hour is the part I didn't know I needed. We tune one thing a month and the whole shop runs lighter.",
    name: "K. Reidel",
    role: "HVAC contractor · Vancouver, WA",
  },
];

export function Testimonials() {
  return (
    <section id="voices" className="site-section">
      <div className="wrap">
        <div className="section-header">
          <div className="eyebrow">
            <span className="dot" />
            § 03 / Voices
          </div>
          <div>
            <h2
              className="text-section"
              style={{ fontFamily: "var(--font-display-custom), Georgia, serif" }}
            >
              What people say
              <br />
              <em style={{ fontStyle: "italic" }}>after the setup day.</em>
            </h2>
          </div>
        </div>

        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="p-8"
              style={{
                borderRight: i < TESTIMONIALS.length - 1 ? "1px solid var(--rule)" : "none",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              <div
                className="mb-6"
                style={{
                  fontFamily: "var(--font-display-custom), Georgia, serif",
                  fontSize: "clamp(22px, 2.1vw, 28px)",
                  lineHeight: 1.35,
                }}
              >
                <span
                  style={{
                    fontSize: "1.6em",
                    lineHeight: 0,
                    verticalAlign: "-0.3em",
                    marginRight: "0.05em",
                    color: "var(--brand)",
                  }}
                >
                  &#8220;
                </span>
                {t.q}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--muted-text)",
                }}
              >
                <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{t.name}</strong>{" "}
                · {t.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
