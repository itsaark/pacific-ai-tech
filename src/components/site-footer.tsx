export function SiteFooter() {
  return (
    <footer
      className="py-9 pb-[60px]"
      style={{
        borderTop: "1px solid var(--rule)",
        color: "var(--muted-text)",
        fontSize: 13,
      }}
    >
      <div className="wrap">
        <div className="flex justify-between items-center flex-wrap gap-5">
          {/* Brand */}
          <div
            className="flex items-center gap-[10px]"
            style={{
              color: "var(--ink)",
              fontFamily: "var(--font-display-custom), Georgia, serif",
              fontSize: 20,
            }}
          >
            <span
              className="w-[18px] h-[18px] rounded-full border shrink-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, var(--brand) 0 35%, transparent 36%), conic-gradient(from 180deg, var(--ink) 0 50%, transparent 50% 100%)",
                borderColor: "var(--ink)",
              }}
            />
            Pacific AI Tech
          </div>

          <div>Greater Portland · Salem · Vancouver, WA · Olympia</div>

          <div>
            hello@pacificai.tech&nbsp;·&nbsp;(503) 555-0142
          </div>

          <div
            style={{
              fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            © MMXXVI
          </div>
        </div>
      </div>
    </footer>
  );
}
