"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormState = {
  name: string;
  business: string;
  email: string;
  phone: string;
  location: string;
  date: string;
  focus: string;
};

const FIELD_STYLE = {
  fontFamily: "var(--font-body), system-ui, sans-serif",
  fontSize: 16,
  color: "var(--ink)",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--rule)",
  borderRadius: 0,
  padding: "8px 0 10px",
  outline: "none",
  boxShadow: "none",
  width: "100%",
};

const LABEL_STYLE = {
  fontFamily: "var(--font-mono-custom), ui-monospace, monospace",
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "var(--muted-text)",
  marginBottom: 6,
  display: "block",
};

export function BookingForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    business: "",
    email: "",
    phone: "",
    location: "Portland",
    date: "",
    focus: "",
  });

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="book" className="site-section">
      <div className="wrap">
        <div className="book-grid">
          {/* Left column */}
          <div>
            <div className="eyebrow">
              <span className="dot" />
              § 05 / Book a consult
            </div>
            <h2
              className="text-section mt-[18px]"
              style={{ fontFamily: "var(--font-display-custom), Georgia, serif" }}
            >
              Thirty minutes,
              <br />
              <em style={{ fontStyle: "italic" }}>on us.</em>
            </h2>
            <p
              className="text-lede mt-6"
              style={{
                fontFamily: "var(--font-display-custom), Georgia, serif",
                fontStyle: "italic",
                color: "var(--ink-soft)",
                marginBottom: 0,
              }}
            >
              Tell us a little about the business. We&apos;ll write back the same
              day with a couple of times that work.
            </p>

            {/* Meta grid */}
            <div
              className="grid grid-cols-2 gap-x-7 gap-y-[18px] mt-6"
            >
              {[
                { k: "Service area", v: "Olympia → Portland" },
                { k: "Setup day",    v: "$2,800 flat" },
                { k: "Follow-up",    v: "$200 / hour" },
                { k: "Response",     v: "Same business day" },
              ].map(({ k, v }) => (
                <div key={k}>
                  <div style={LABEL_STYLE}>{k}</div>
                  <div
                    style={{
                      fontFamily: "var(--font-display-custom), Georgia, serif",
                      fontSize: 22,
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          {sent ? (
            <div className="flex flex-col gap-[18px]">
              <div
                className="p-[18px]"
                style={{
                  border: "1px solid var(--brand)",
                  background: "color-mix(in oklab, var(--brand) 10%, var(--snow))",
                  fontFamily: "var(--font-display-custom), Georgia, serif",
                  fontSize: 22,
                }}
              >
                Thanks, {form.name || "friend"}. We&apos;ll be in touch within the
                day at{" "}
                <em style={{ fontStyle: "italic" }}>
                  {form.email || "your email"}
                </em>{" "}
                with a couple of times to talk.
              </div>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="self-start transition-colors"
                style={{
                  padding: "14px 22px",
                  fontSize: 14,
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                  background: "transparent",
                  color: "var(--ink)",
                  border: "1px solid var(--rule)",
                  borderRadius: 0,
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                }}
              >
                Send another →
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-[18px]" onSubmit={onSubmit}>
              {/* Name + Business */}
              <div className="field-row">
                <div className="flex flex-col gap-[6px]">
                  <Label style={LABEL_STYLE}>Your name</Label>
                  <Input
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Jane Cooper"
                    style={FIELD_STYLE}
                    className="rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-b-[var(--ink)] px-0"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <Label style={LABEL_STYLE}>Business</Label>
                  <Input
                    value={form.business}
                    onChange={set("business")}
                    placeholder="Cooper & Co."
                    style={FIELD_STYLE}
                    className="rounded-none border-0 border-b focus-visible:ring-0 px-0"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="field-row">
                <div className="flex flex-col gap-[6px]">
                  <Label style={LABEL_STYLE}>Email</Label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="jane@cooper.co"
                    style={FIELD_STYLE}
                    className="rounded-none border-0 border-b focus-visible:ring-0 px-0"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <Label style={LABEL_STYLE}>Phone (optional)</Label>
                  <Input
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="(503) 555-0142"
                    style={FIELD_STYLE}
                    className="rounded-none border-0 border-b focus-visible:ring-0 px-0"
                  />
                </div>
              </div>

              {/* Location + Date */}
              <div className="field-row">
                <div className="flex flex-col gap-[6px]">
                  <Label style={LABEL_STYLE}>Closest city</Label>
                  <Select
                    value={form.location}
                    onValueChange={(v) => setForm((p) => ({ ...p, location: v ?? p.location }))}
                  >
                    <SelectTrigger
                      className="rounded-none border-0 border-b px-0 focus:ring-0 h-auto py-[10px]"
                      style={{
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                        fontSize: 16,
                        color: "var(--ink)",
                        background: "transparent",
                        borderBottom: "1px solid var(--rule)",
                        boxShadow: "none",
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Portland", "Beaverton / Hillsboro", "Vancouver, WA", "Salem", "Olympia", "Other (tell us)"].map(
                        (city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <Label style={LABEL_STYLE}>Preferred setup-day window</Label>
                  <Input
                    value={form.date}
                    onChange={set("date")}
                    placeholder="Late June, weekdays"
                    style={FIELD_STYLE}
                    className="rounded-none border-0 border-b focus-visible:ring-0 px-0"
                  />
                </div>
              </div>

              {/* Focus textarea */}
              <div className="flex flex-col gap-[6px]">
                <Label style={LABEL_STYLE}>What&apos;s eating your week?</Label>
                <Textarea
                  value={form.focus}
                  onChange={set("focus")}
                  placeholder="Quotes take me three hours each. My inbox is a mess. Bookkeeping is on a sticky note."
                  className="rounded-none focus-visible:ring-0 min-h-[80px] resize-y"
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: 16,
                    color: "var(--ink)",
                    background: "transparent",
                    border: "1px solid var(--rule)",
                    padding: 12,
                  }}
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
              >
                Send it →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
