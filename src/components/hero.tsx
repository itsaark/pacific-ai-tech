import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="site-section" style={{ paddingTop: "clamp(48px, 7vw, 96px)" }}>
      <div className="wrap">
        <div className="eyebrow">
          <span className="dot" />
          In-person AI setup · Greater Portland → Olympia
        </div>

        <div className="hero-grid">
          {/* Left: headline + lede + meta */}
          <div>
            <h1
              className="text-hero"
              style={{ marginBottom: "0.2em" }}
            >
              We come over,
              <br />
              <em>set up your AI,</em>
              <br />
              and don&apos;t leave
              <br />
              until it works.
            </h1>

            <p
              className="text-lede"
              style={{
                fontFamily: "var(--font-display-custom), Georgia, serif",
                fontStyle: "italic",
                color: "var(--ink-soft)",
                marginTop: 28,
                maxWidth: "32ch",
                marginBottom: 0,
              }}
            >
              In-person setup days for solo founders and small business owners
              who&apos;d rather pay once and have it done than read another
              newsletter about AI.
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
              {["One flat fee", "Ten automations", "Your tools, your data", "Built in a single day"].map(
                (item) => (
                  <span key={item} className="before:content-['·'] before:mr-2 before:opacity-55 first:before:hidden">
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right: pricing card */}
          <aside
            id="what"
            className="relative border p-7"
            style={{
              borderColor: "var(--rule)",
              background: "color-mix(in oklab, var(--snow) 70%, var(--tint))",
            }}
          >
            {/* Ribbon */}
            <div
              className="absolute top-[-1px] right-[-1px] px-[10px] py-[6px]"
              style={{
                background: "var(--brand)",
                color: "var(--brand-fg)",
                fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Setup day · flat fee
            </div>

            {/* Price rows */}
            <div>
              <PriceRow
                label="Setup day"
                copy="10 automations, in person, with the AI of your choice."
                price="$2,800"
                unit="flat"
              />
              <PriceRow
                label="Follow-up"
                copy="On-demand visits when something needs a tweak or a walkthrough."
                price="$200"
                unit="/ hour"
                last
              />
            </div>

            <Button
              render={<Link href="#book" />}
              variant="outline"
              className="w-full h-auto py-[14px] px-[16px] text-[14px] tracking-[0.02em] rounded-none mt-[18px] justify-center bg-[var(--ink)] text-[var(--snow)] border-[var(--ink)] hover:bg-[var(--brand)] hover:border-[var(--brand)] hover:text-[var(--brand-fg)]"
              style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
            >
              Book a free consult →
            </Button>
          </aside>
        </div>

        {/* 3-step bullet strip */}
        <div className="hero-bullets">
          {[
            { n: "01 Consult",   strong: "30-minute call, free.", body: "We map your week and find the ten things that hurt." },
            { n: "02 Setup day", strong: "One day at your office.", body: "We build, you watch, we hand you the keys." },
            { n: "03 Aftercare", strong: "Call us when it breaks.", body: "On-demand follow-up at $200/hr — only when you need it." },
          ].map((b) => (
            <div key={b.n} style={{ fontSize: 14 }}>
              <span
                className="block mb-[6px]"
                style={{
                  fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
                  fontSize: 11,
                  color: "var(--muted-text)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {b.n}
              </span>
              <strong
                className="block mb-1"
                style={{
                  fontFamily: "var(--font-display-custom), Georgia, serif",
                  fontWeight: 400,
                  fontSize: 20,
                }}
              >
                {b.strong}
              </strong>
              {b.body}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceRow({
  label,
  copy,
  price,
  unit,
  last = false,
}: {
  label: string;
  copy: string;
  price: string;
  unit: string;
  last?: boolean;
}) {
  return (
    <div
      className="flex justify-between items-baseline py-[18px]"
      style={{ borderBottom: last ? "none" : "1px solid var(--rule-soft)" }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted-text)",
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 6 }}>{copy}</div>
      </div>
      <div
        className="shrink-0 ml-4 whitespace-nowrap"
        style={{
          fontFamily: "var(--font-display-custom), Georgia, serif",
          fontSize: "clamp(40px, 4.6vw, 60px)",
          lineHeight: 1,
        }}
      >
        {price}
        <small
          style={{
            fontSize: 14,
            fontFamily: "var(--font-body), system-ui, sans-serif",
            color: "var(--muted-text)",
            marginLeft: 6,
            whiteSpace: "nowrap",
          }}
        >
          {unit}
        </small>
      </div>
    </div>
  );
}
