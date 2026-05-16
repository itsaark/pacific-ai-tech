import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "I'm not technical. Will this work for me?",
    a: "Yes — that's actually who we're built for. We do the building; you do the watching and the steering. By the end of the day you'll know how each automation works well enough to tweak it yourself, or call us.",
  },
  {
    q: "What if I don't know which AI tool to pick?",
    a: "We start the day with a short conversation about your data, your privacy comfort, and what you already pay for. Then we pick — usually some combination of Claude Code, Hermes agent, or ChatGPT — and we explain why.",
  },
  {
    q: "Do you actually come to my office?",
    a: "Yes. We drive the I-5 corridor between Olympia and Portland, including Salem and Vancouver, WA. If you're a bit off the corridor, ask — we usually still come.",
  },
  {
    q: "What happens after the setup day?",
    a: "You own everything. When something breaks, when a tool updates, or when you want to add an eleventh automation, book a follow-up hour at $200. Most clients use 1–2 hours a month.",
  },
  {
    q: "What if ten automations isn't enough?",
    a: "Book a second setup day. The flat fee is the flat fee — $2,800 buys another ten, built the same way.",
  },
  {
    q: "Will my data leave my machine?",
    a: "We default to setups where the model calls happen on your accounts, with your data, under your control. If a cloud step is the right call, we tell you exactly what's leaving and why.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Happy to. Send yours before the consult and we'll get it back the same day.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="site-section">
      <div className="wrap">
        <div className="section-header">
          <div className="eyebrow">
            <span className="dot" />
            Questions
          </div>
          <div>
            <h2 className="text-section">
              The things
              <br />
              <em>people actually ask.</em>
            </h2>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--rule)" }}>
          <Accordion defaultValue={["item-0"]} className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-b-0"
                style={{ borderBottom: "1px solid var(--rule)" }}
              >
                <AccordionTrigger className="faq-trigger hover:no-underline py-[22px] px-0">
                  <span className="flex-1 text-left pr-4">{f.q}</span>
                  {/* Custom +/− indicator */}
                  <span
                    className="shrink-0 w-6 h-6 relative"
                    aria-hidden="true"
                    style={{ color: "var(--brand)" }}
                  >
                    {/* Horizontal bar */}
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-px bg-current" />
                    {/* Vertical bar — fades on open */}
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[18px] bg-current transition-all duration-[250ms] group-aria-expanded/accordion-trigger:opacity-0 group-aria-expanded/accordion-trigger:rotate-90" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-[22px] pt-0">
                  <p
                    style={{
                      maxWidth: "70ch",
                      color: "var(--ink-soft)",
                      fontSize: 16,
                      margin: 0,
                    }}
                  >
                    {f.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
