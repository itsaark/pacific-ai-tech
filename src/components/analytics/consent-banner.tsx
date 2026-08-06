"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getGoogleConsentPreferences,
  updateGoogleConsent,
  type GoogleConsentPreferences,
} from "@/lib/analytics/google";

const rejectedConsent: GoogleConsentPreferences = {
  analytics: false,
  advertising: false,
  adPersonalization: false,
};

const acceptedConsent: GoogleConsentPreferences = {
  analytics: true,
  advertising: true,
  adPersonalization: true,
};

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [preferences, setPreferences] = useState<GoogleConsentPreferences>({
    analytics: true,
    advertising: false,
    adPersonalization: false,
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = getGoogleConsentPreferences();
      if (stored) {
        setPreferences(stored);
      } else {
        setVisible(true);
      }
    });

    const openPreferences = () => {
      const current = getGoogleConsentPreferences();
      if (current) setPreferences(current);
      setCustomizing(true);
      setVisible(true);
    };

    window.addEventListener("pacificaitech:open-consent", openPreferences);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pacificaitech:open-consent", openPreferences);
    };
  }, []);

  function save(nextPreferences: GoogleConsentPreferences) {
    updateGoogleConsent(nextPreferences);
    setPreferences(nextPreferences);
    setVisible(false);
    setCustomizing(false);
  }

  if (!visible) return null;

  return (
    <aside
      className="pat-consent"
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-description"
    >
      <div>
        <h2 id="consent-title">Your privacy choices</h2>
        <p id="consent-description">
          We use optional Google measurement to understand which campaigns lead
          to useful conversations. You can accept, decline, or choose what is
          allowed. Essential site functions do not depend on these choices.{" "}
          <Link href="/privacy">Privacy details</Link>
        </p>
      </div>

      {customizing ? (
        <fieldset className="pat-consent-options">
          <legend>Choose optional measurement</legend>
          <label>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(event) =>
                setPreferences((current) => ({
                  ...current,
                  analytics: event.target.checked,
                }))
              }
            />
            Analytics
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.advertising}
              onChange={(event) => {
                const advertising = event.target.checked;
                setPreferences((current) => ({
                  ...current,
                  advertising,
                  adPersonalization: advertising
                    ? current.adPersonalization
                    : false,
                }));
              }}
            />
            Advertising measurement
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.adPersonalization}
              disabled={!preferences.advertising}
              onChange={(event) =>
                setPreferences((current) => ({
                  ...current,
                  adPersonalization: event.target.checked,
                }))
              }
            />
            Ad personalization
          </label>
        </fieldset>
      ) : null}

      <div className="pat-consent-actions">
        {customizing ? (
          <button type="button" onClick={() => save(preferences)}>
            Save choices
          </button>
        ) : (
          <button type="button" onClick={() => setCustomizing(true)}>
            Choose
          </button>
        )}
        <button type="button" onClick={() => save(rejectedConsent)}>
          Decline
        </button>
        <button
          className="primary"
          type="button"
          onClick={() => save(acceptedConsent)}
        >
          Accept all
        </button>
      </div>
    </aside>
  );
}

export function PrivacyChoicesButton() {
  if (!process.env.NEXT_PUBLIC_GOOGLE_TAG_ID) return null;

  return (
    <button
      className="pat-privacy-choices"
      type="button"
      onClick={() => window.dispatchEvent(new Event("pacificaitech:open-consent"))}
    >
      Privacy choices
    </button>
  );
}
