"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { getMarketingAttribution } from "@/lib/analytics/attribution";
import { contactEmail } from "@/lib/site";

type ConsultationFormProps = {
  location: "homepage" | "portland-landing-page";
};

type SubmitState =
  | { status: "idle"; message: "" }
  | { status: "submitting"; message: "" }
  | { status: "error"; message: string };

export function ConsultationForm({ location }: ConsultationFormProps) {
  const [formStartedAt] = useState(() => Date.now());
  const [state, setState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      workflow: formData.get("workflow"),
      consent: formData.get("consent") === "on",
      website: formData.get("website"),
      formStartedAt,
      sourcePage: window.location.href,
      attribution: getMarketingAttribution(),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        setState({
          status: "error",
          message:
            result.message ||
            "We could not send this request. Please email " +
              contactEmail +
              ".",
        });
        return;
      }

      try {
        window.sessionStorage.setItem(
          "pacificaitech_pending_lead_conversion",
          JSON.stringify({ location })
        );
      } catch {
        // The successful request still redirects when browser storage is blocked.
      }
      window.location.assign("/thank-you");
    } catch {
      setState({
        status: "error",
        message:
          "We could not send this request. Please email " + contactEmail + ".",
      });
    }
  }

  const pending = state.status === "submitting";

  return (
    <form className="pat-lead-form" onSubmit={submitLead}>
      <div className="pat-lead-form-head">
        <span className="pat-eyebrow">Tell us about one workflow</span>
        <h2>Request a business AI consultation.</h2>
        <p>
          Share the repeat work that is costing your team time. Aark or Shayan
          will reply within one business day with an honest first read.
        </p>
      </div>

      <div className="pat-lead-form-grid">
        <label>
          <span>Name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
          />
        </label>
        <label>
          <span>Work email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
          />
        </label>
        <label>
          <span>Business or organization</span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            minLength={2}
            maxLength={140}
            required
          />
        </label>
        <label>
          <span>Phone (optional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
          />
        </label>
        <label className="pat-lead-form-wide">
          <span>What repeat workflow should we look at?</span>
          <textarea
            name="workflow"
            rows={6}
            minLength={20}
            maxLength={2000}
            placeholder="For example: Every Monday our operations manager copies updates from email into three spreadsheets, then prepares a client report."
            required
          />
          <small>
            Please do not include passwords, API keys, financial account
            numbers, health information, or other sensitive data.
          </small>
        </label>
      </div>

      <label className="pat-honeypot" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="pat-lead-consent">
        <input name="consent" type="checkbox" required />
        <span>
          Pacific AI Tech may use these details to respond to my request as
          described in the <Link href="/privacy">Privacy Policy</Link>.
        </span>
      </label>

      <div className="pat-lead-form-actions">
        <button
          className="pat-btn pat-btn-primary"
          type="submit"
          disabled={pending}
        >
          {pending ? "Sending…" : "Request a consultation"}
        </button>
        <p aria-live="polite">
          {state.status === "error" ? (
            <>
              {state.message}{" "}
              <a href={"mailto:" + contactEmail}>Email us directly.</a>
            </>
          ) : (
            "Business inquiries only. No consumer computer repair or account recovery."
          )}
        </p>
      </div>
    </form>
  );
}
