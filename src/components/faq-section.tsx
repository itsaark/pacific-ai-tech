import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What exactly is Claude co-work?",
    a: "Claude co-work is an AI assistant made by Anthropic that runs on your computer and connects to your everyday tools — email, calendar, documents, CRM, and more. It's like having a sharp assistant who reads everything, drafts everything, and never forgets. You talk to it in plain English and it does the work.",
  },
  {
    q: "I'm really not technical. Will this work for me?",
    a: "That's exactly who we built this for. If you can send an email and have a conversation, you can use Claude co-work. We handle all the technical setup — you just learn how to ask it for what you need. Most clients are fully independent within a week.",
  },
  {
    q: "How is this different from just signing up for ChatGPT?",
    a: "ChatGPT is a chatbot. Claude co-work is a connected assistant that's wired into your actual business tools — it can read your emails, check your calendar, draft documents, and take actions. It's the difference between Googling a recipe and having a chef in your kitchen.",
  },
  {
    q: "What happens during the setup session?",
    a: "We install Claude co-work, connect it to your tools, build automations specific to your workflow, and train you to use everything. By the end you'll be using it confidently on your own. The session is typically 3–4 hours.",
  },
  {
    q: "What does the 30-day premium support include?",
    a: "Direct access to us — text, email, or call. Ask questions, request tweaks, get help when you're stuck, or learn new things to try. There's no limit on messages. Most clients message daily for the first week, then taper off as they build confidence.",
  },
  {
    q: "Do I need to buy anything else?",
    a: "You'll need a Claude subscription ($20/month). We'll help you set that up during the session. Beyond that, everything runs on your existing computer and tools — no special hardware, no enterprise contracts.",
  },
  {
    q: "Can you do this remotely?",
    a: "Yes — most clients prefer remote. We share your screen, do the setup, and train you over video call. It works just as well as in-person, and it's $400 less. On-site is available in the Greater Portland to Olympia corridor.",
  },
  {
    q: "What's Hermes?",
    a: "Hermes is our advanced agent framework for users who are already comfortable with AI and want to push further — custom agents, API integrations, and fully autonomous workflows. It's a separate conversation from the Claude co-work setup. Ask us about it if you're curious.",
  },
  {
    q: "Will my data be safe?",
    a: "Claude co-work runs on your machine, with your accounts. We don't store your data, we don't have ongoing access to your systems, and we set everything up under your own credentials. You own and control everything.",
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
              You&apos;re probably
              <br />
              <em>wondering.</em>
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
                  <span
                    className="shrink-0 w-6 h-6 relative"
                    aria-hidden="true"
                    style={{ color: "var(--brand)" }}
                  >
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-px bg-current" />
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
