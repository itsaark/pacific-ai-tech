const PINS = ["Portland", "Beaverton", "Hillsboro", "Vancouver, WA", "Salem", "Olympia"];

export function MapBand() {
  return (
    <div
      className="py-7 overflow-hidden"
      style={{
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="wrap">
        <div
          className="flex items-center gap-[18px] flex-wrap"
          style={{
            fontFamily: "var(--font-display-custom), Georgia, serif",
            fontSize: "clamp(20px, 2.6vw, 32px)",
            fontStyle: "italic",
            color: "var(--ink-soft)",
          }}
        >
          <span className="eyebrow" style={{ fontStyle: "normal" }}>
            <span className="dot" />
            Service area
          </span>

          {PINS.map((pin, i) => (
            <span key={pin} className="contents">
              <span
                className="inline-flex items-center gap-2 border px-3 py-[6px] rounded-full"
                style={{
                  fontStyle: "normal",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: 13,
                  letterSpacing: "0.02em",
                  borderColor: "var(--rule)",
                  color: "var(--ink)",
                  backgroundColor: "transparent",
                }}
              >
                <span
                  className="inline-block w-[6px] h-[6px] rounded-full shrink-0"
                  style={{ background: "var(--brand)" }}
                />
                {pin}
              </span>
              {i < PINS.length - 1 && (
                <span
                  style={{
                    fontStyle: "normal",
                    fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
                    fontSize: 14,
                    color: "var(--muted-text)",
                  }}
                >
                  ——
                </span>
              )}
            </span>
          ))}

          <span
            className="ml-auto"
            style={{
              fontStyle: "normal",
              fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
              fontSize: 12,
              color: "var(--muted-text)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            I-5 corridor · we drive to you
          </span>
        </div>
      </div>
    </div>
  );
}
