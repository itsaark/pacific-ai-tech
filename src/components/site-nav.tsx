import Link from "next/link";

export function SiteNav() {
  return (
    <nav
      className="sticky top-0 z-30 border-b"
      style={{
        background: "color-mix(in oklab, var(--snow) 88%, transparent)",
        backdropFilter: "saturate(140%) blur(8px)",
        WebkitBackdropFilter: "saturate(140%) blur(8px)",
        borderColor: "var(--rule-soft)",
      }}
    >
      <div className="wrap">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            href="#top"
            className="flex items-center gap-[10px] no-underline"
            style={{ fontFamily: "var(--font-display-custom), Georgia, serif", fontSize: 22 }}
          >
            <span
              className="w-[22px] h-[22px] rounded-full border shrink-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, var(--brand) 0 35%, transparent 36%), conic-gradient(from 180deg, var(--ink) 0 50%, transparent 50% 100%)",
                borderColor: "var(--ink)",
              }}
            />
            <span>
              Pacific <em style={{ fontStyle: "italic" }}>AI</em> Tech
            </span>
          </Link>

          {/* Links — hidden on mobile */}
          <nav
            className="hidden md:flex gap-7"
            style={{ fontSize: 14 }}
            aria-label="Site navigation"
          >
            {["What we do|#what", "Automations|#automations", "Voices|#voices", "FAQ|#faq"].map(
              (item) => {
                const [label, href] = item.split("|");
                return (
                  <Link key={href} href={href!} className="nav-link">
                    {label}
                  </Link>
                );
              }
            )}
          </nav>

          {/* CTA */}
          <Link
            href="#book"
            className="nav-cta rounded-full inline-block"
            style={{
              fontSize: 13,
              letterSpacing: "0.01em",
              padding: "10px 16px",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              textDecoration: "none",
            }}
          >
            Book a free consult →
          </Link>
        </div>
      </div>
    </nav>
  );
}
