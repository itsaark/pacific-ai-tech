const TESTIMONIALS = [
  {
    q: "I spent six months reading about AI and built nothing. They showed up, set up Claude co-work, and by the end of the day my follow-ups were writing themselves. I got that six months back in a week.",
    name: "M. Alarcón",
    role: "Tax practice · Salem",
  },
  {
    q: "I was skeptical — I'm not a computer person. But they sat next to me, explained everything in plain English, and now I use Claude every morning before I even open my email. It's like having a second brain.",
    name: "J. Tran",
    role: "Solo design studio · Portland",
  },
  {
    q: "The 30-day support is what sold me. I had questions every day for the first two weeks, and they answered every single one. Now I'm adding new automations on my own.",
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
            From clients
          </div>
          <div>
            <h2 className="text-section">
              They were where
              <br />
              <em>you are now.</em>
            </h2>
          </div>
        </div>

        <div className="testi-grid">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="testi-item p-8"
            >
              <blockquote
                className="mb-6 mt-0 mx-0"
                style={{
                  fontFamily: "var(--font-display-custom), Georgia, serif",
                  fontSize: "clamp(18px, 1.8vw, 24px)",
                  lineHeight: 1.4,
                }}
              >
                <span
                  aria-hidden="true"
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
              </blockquote>
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
