# Google Ads launch checklist

The website code is prepared for measurement and lead attribution without hard-coded account IDs or secrets. Complete the account-owned steps below before meaningful ad spend.

## 1. Activate consultation-form delivery

1. Create a Resend account owned by Pacific AI Tech.
2. Verify `pacificaitech.com` or a dedicated sending subdomain in Resend by adding the DNS records it provides.
3. In the Vercel project, add these Production environment variables:
   - `RESEND_API_KEY` — secret Resend API key.
   - `LEAD_FROM_EMAIL` — verified sender, for example `Pacific AI Tech Website <leads@pacificaitech.com>`.
   - `LEAD_NOTIFICATION_EMAIL` — `hello@pacificaitech.com` unless the lead inbox changes.
4. Redeploy Production. The consultation form appears only when the required server-side delivery variables exist.
5. Submit a real test lead and verify delivery, reply-to behavior, mobile layout, and the `/thank-you` redirect.

Do not commit a Resend API key or paste it into a public issue. Enter it directly in Vercel.

## 2. Create the Google measurement source

After the Google Ads account exists:

1. Create the website data source / Google tag in Google Ads.
2. Add `NEXT_PUBLIC_GOOGLE_TAG_ID` in Vercel. It may be the Google tag or GA4 measurement ID shown by Google.
3. If Google provides a separate Ads destination, add `NEXT_PUBLIC_GOOGLE_ADS_ID` in the `AW-...` format.
4. Redeploy and verify the tag with Google Tag Assistant.

The site initializes Consent Mode v2 as denied before loading Google measurement. Visitors can accept, decline, customize, or later reopen Privacy choices from the footer.

## 3. Configure conversion actions

Create these website conversion actions and copy each full `send_to` value from Google into Vercel:

| Website event | Google Ads role | Environment variable |
| --- | --- | --- |
| `lead_form_submit` | Primary | `NEXT_PUBLIC_GOOGLE_ADS_LEAD_FORM_SEND_TO` |
| `book_call_click` | Secondary | `NEXT_PUBLIC_GOOGLE_ADS_BOOK_CALL_SEND_TO` |
| `email_click` | Secondary | `NEXT_PUBLIC_GOOGLE_ADS_EMAIL_SEND_TO` |
| `phone_click` | Secondary | `NEXT_PUBLIC_GOOGLE_ADS_PHONE_CLICK_SEND_TO` |

Do not optimize bidding around booking-button clicks. The external Google Calendar page does not return a completed-booking event to this website. Treat booking, email, and phone clicks as secondary intent signals until confirmed lead outcomes are available.

## 4. Preserve and qualify paid leads

The website stores the most recent non-direct campaign attribution for 90 days and includes available `gclid`, `gbraid`, `wbraid`, UTM values, landing page, and referrer in the consultation email.

After a lead becomes qualified or a signed client, record that outcome with its click ID and import it into Google Ads as an offline qualified-lead conversion. This gives bidding a stronger signal than raw form submissions alone.

## 5. Finish identity and trust setup

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
