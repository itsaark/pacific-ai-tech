# Google Ads launch checklist

The website code is prepared for measurement and lead attribution without hard-coded account IDs or secrets. Complete the account-owned steps below before meaningful ad spend.

## 1. Activate the completed-booking flow

The website now sends every booking CTA to `/book`, where the configured
Calendly event is embedded. Calendly checks the connected Google Calendar for
conflicts and adds confirmed consultations to it.

The completed-appointment flow is active:

1. The public event is `https://calendly.com/aark-pacificaitech/30min`.
2. The embedded Calendly widget emits `calendly.event_scheduled` after a real
   booking. Only that verified event creates the short-lived conversion marker.
3. The website then sends the invitee to `/booking-confirmed`, which emits
   `appointment_booked` once and consumes the marker.
4. After the Google measurement IDs are configured, make a real test booking.
   Confirm that the browser reaches
   `/booking-confirmed`, the event appears in Google Calendar, and the invitee
   receives the confirmation.

Calendly Free is sufficient for this embedded event flow; its paid external
redirect is not required. `NEXT_PUBLIC_SCHEDULER_URL` and
`NEXT_PUBLIC_SCHEDULER_EMBED_URL` remain optional overrides for a future
scheduling-provider change.

The `/book` page is indexable and appears in the XML sitemap. The
`/booking-confirmed` page is `noindex` and intentionally absent from the sitemap.

## 2. Optional: activate consultation-form delivery

1. Create a Resend account owned by Pacific AI Tech.
2. Verify `pacificaitech.com` or a dedicated sending subdomain in Resend by adding the DNS records it provides.
3. In the Vercel project, add these Production environment variables:
   - `RESEND_API_KEY` — secret Resend API key.
   - `LEAD_FROM_EMAIL` — verified sender, for example `Pacific AI Tech Website <leads@pacificaitech.com>`.
   - `LEAD_NOTIFICATION_EMAIL` — `hello@pacificaitech.com` unless the lead inbox changes.
4. Redeploy Production. The consultation form appears only when the required server-side delivery variables exist.
5. Submit a real test lead and verify delivery, reply-to behavior, mobile layout, and the `/thank-you` redirect.

Do not commit a Resend API key or paste it into a public issue. Enter it directly in Vercel.

## 3. Create the Google measurement source

After the Google Ads account exists:

1. Create the website data source / Google tag in Google Ads.
2. Add `NEXT_PUBLIC_GOOGLE_TAG_ID` in Vercel. It may be the Google tag or GA4 measurement ID shown by Google.
3. If Google provides a separate Ads destination, add `NEXT_PUBLIC_GOOGLE_ADS_ID` in the `AW-...` format.
4. Redeploy and verify the tag with Google Tag Assistant.

The site initializes Consent Mode v2 as denied before loading Google measurement. Visitors can accept, decline, customize, or later reopen Privacy choices from the footer.

## 4. Configure conversion actions

Create these website conversion actions and copy each full `send_to` value from Google into Vercel:

| Website event | Google Ads role | Environment variable |
| --- | --- | --- |
| `appointment_booked` | Primary | `NEXT_PUBLIC_GOOGLE_ADS_APPOINTMENT_BOOKED_SEND_TO` |
| `lead_form_submit` | Primary | `NEXT_PUBLIC_GOOGLE_ADS_LEAD_FORM_SEND_TO` |
| `book_call_click` | Secondary | `NEXT_PUBLIC_GOOGLE_ADS_BOOK_CALL_SEND_TO` |
| `email_click` | Secondary | `NEXT_PUBLIC_GOOGLE_ADS_EMAIL_SEND_TO` |
| `phone_click` | Secondary | `NEXT_PUBLIC_GOOGLE_ADS_PHONE_CLICK_SEND_TO` |

Do not optimize bidding around booking-button clicks. `book_call_click` measures
interest; `appointment_booked` measures a scheduling success. Keep the former
secondary and the latter primary after a real end-to-end test.

## 5. Preserve and qualify paid leads

The website stores the most recent non-direct campaign attribution for 90 days and includes available `gclid`, `gbraid`, `wbraid`, UTM values, landing page, and referrer in the consultation email.

After a lead becomes qualified or a signed client, record that outcome with its click ID and import it into Google Ads as an offline qualified-lead conversion. This gives bidding a stronger signal than raw form submissions alone.

## 6. Finish identity and trust setup

1. Do not create or link a Google Business Profile. Pacific AI Tech does not want a Google review presence or Business Profile location assets.
2. Use Greater Portland campaign location targeting without a Business Profile or location asset.
3. Use the exact legal/domain business name during Google Ads advertiser verification.
4. Use the public business number `(971) 979-0077` for Google Ads call assets. The site publishes the same number and can measure click-to-call intent with `phone_click`.
5. Have an Oregon attorney review the working Privacy Policy and Terms before relying on them as bespoke legal documents.

## First campaign guardrails

- Send Portland business-intent searches to `/portland-ai-consultant`.
- Start with Search, exact/phrase match, and a narrow Greater Portland location setting.
- Use business terms such as `small business AI consultant Portland` and `AI workflow consultant Portland`.
- Exclude consumer-support terms such as repair, password, account recovery, virus, laptop help, download, and free installation.
- Keep ads explicit that the service is business-only consulting and workflow implementation.
