import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GradientHeroCard } from "@/components/gradient-hero-card";

export function Hero() {
  return (
    <section className="site-section" style={{ paddingTop: "clamp(48px, 7vw, 96px)" }}>
      <div className="wrap">
        <div className="hero-layout">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              Claude co-work setup for business owners
            </div>

            <h1
              className="text-hero"
              style={{ marginTop: 20, marginBottom: "0.15em" }}
            >
              Stop reading
              <br />
              about AI.
              <br />
              <em>Start using it.</em>
            </h1>

            <p
              className="text-lede"
              style={{
                fontFamily: "var(--font-display-custom), Georgia, serif",
                fontStyle: "italic",
                color: "var(--ink-soft)",
                marginTop: 28,
                maxWidth: "38ch",
                marginBottom: 0,
              }}
            >
              You know AI could transform your business. You just don&apos;t have
              time to figure out how. We set up Claude co-work on your computer,
              build your automations, and train you to use them — in a single session.
            </p>

            <div
              className="flex flex-wrap gap-x-7 gap-y-2 mt-[22px]"
              style={{
                fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
                fontSize: 12,
                color: "var(--muted-text)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              {["One session", "Runs on your laptop", "30 days of premium support", "Pays for itself in weeks"].map(
                (item) => (
                  <span key={item} className="before:content-['·'] before:mr-2 before:opacity-55 first:before:hidden">
                    {item}
                  </span>
                )
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Button
                render={<Link href="#book" />}
                nativeButton={false}
                variant="outline"
                className="h-auto py-[14px] px-[22px] text-[15px] tracking-[0.01em] rounded-none bg-[var(--ink)] text-[var(--snow)] border-[var(--ink)] hover:bg-[var(--brand)] hover:border-[var(--brand)] hover:text-[var(--brand-fg)]"
                style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
              >
                Book a free consult →
              </Button>
              <Button
                render={<Link href="#pricing" />}
                nativeButton={false}
                variant="outline"
                className="h-auto py-[14px] px-[22px] text-[15px] tracking-[0.01em] rounded-none border-[var(--rule)] text-[var(--ink)] hover:bg-[var(--tint)]"
                style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
              >
                See pricing
              </Button>
            </div>
          </div>

          <GradientHeroCard />
        </div>
      </div>
    </section>
  );
}
