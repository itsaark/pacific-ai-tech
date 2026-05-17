"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  email: string;
  preference: string;
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
    email: "",
    preference: "Remote",
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
              Get started
            </div>
            <h2 className="text-section mt-[18px]">
              Thirty minutes.
              <br />
              <em>No cost. No pitch.</em>
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
              Tell us about your business. We&apos;ll show you exactly what
              Claude co-work can automate for you — and you decide if it&apos;s
              worth your time.
            </p>
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
              <Button
                type="button"
                variant="outline"
                onClick={() => setSent(false)}
                className="self-start h-auto px-[22px] py-[14px] text-[14px] tracking-[0.02em] rounded-none border-[var(--rule)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--snow)] hover:border-[var(--ink)]"
                style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
              >
                Send another →
              </Button>
            </div>
          ) : (
            <form className="flex flex-col gap-[18px]" onSubmit={onSubmit}>
              <div className="field-row">
                <div className="flex flex-col gap-[6px]">
                  <Label htmlFor="book-name" style={LABEL_STYLE}>Your name</Label>
                  <Input
                    id="book-name"
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Jane Cooper"
                    style={FIELD_STYLE}
                    className="rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-b-[var(--ink)] px-0"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <Label htmlFor="book-email" style={LABEL_STYLE}>Email</Label>
                  <Input
                    id="book-email"
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="jane@cooper.co"
                    style={FIELD_STYLE}
                    className="rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-b-[var(--ink)] px-0"
                  />
                </div>
              </div>

              {/* Preference */}
              <div className="flex flex-col gap-[6px]">
                <Label htmlFor="book-preference" style={LABEL_STYLE}>Remote or on-site?</Label>
                <Select
                  value={form.preference}
                  onValueChange={(v) => setForm((p) => ({ ...p, preference: v ?? p.preference }))}
                >
                  <SelectTrigger
                    className="rounded-none border-0 border-b px-0 focus:ring-0 focus:border-b-[var(--ink)] h-auto py-[10px]"
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
                    {["Remote (anywhere)", "On-site (Portland → Olympia corridor)", "Not sure yet"].map(
                      (opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Focus textarea */}
              <div className="flex flex-col gap-[6px]">
                <Label htmlFor="book-focus" style={LABEL_STYLE}>What takes up most of your time?</Label>
                <Textarea
                  id="book-focus"
                  value={form.focus}
                  onChange={set("focus")}
                  placeholder="Emails. Following up with leads. Writing proposals. Keeping track of everything."
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

              <Button
                type="submit"
                className="self-start h-auto px-[22px] py-[14px] text-[14px] tracking-[0.02em] rounded-none mt-2 hover:bg-[var(--brand)] hover:border-[var(--brand)]"
                style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
              >
                Book my free consult →
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
