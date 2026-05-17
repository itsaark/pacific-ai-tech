import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteNav() {
  return (
    <header
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
              Pacific <em>AI</em> Tech
            </span>
          </Link>

          <nav
            className="hidden md:flex gap-7"
            style={{ fontSize: 14 }}
            aria-label="Site navigation"
          >
            {["How it works|#how", "Pricing|#pricing", "Capabilities|#capabilities", "FAQ|#faq"].map(
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

          <Button
            render={<Link href="#book" />}
            nativeButton={false}
            variant="outline"
            className="rounded-full h-auto py-[10px] px-[16px] text-[13px] tracking-[0.01em] bg-[var(--ink)] text-[var(--snow)] border-[var(--ink)] hover:bg-[var(--brand)] hover:border-[var(--brand)] hover:text-[var(--brand-fg)]"
            style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
          >
            Free consult →
          </Button>
        </div>
      </div>
    </header>
  );
}
