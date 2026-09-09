# Sending-agent playbook — SW WA trucking outreach

You are working a cold-email campaign for **Pacific AI Tech** (`https://www.pacificaitech.com`) to small for-hire and hot-shot carriers in Southwest Washington.

Do not invent a new process. This folder is the campaign. `tracker.csv` is the source of truth.

## Before you send anything

1. Read this file and `SEQUENCE.md`.
2. Run `python scripts/campaign.py status` from this folder (or `outreach/sw-wa-fmcsa`).
3. Open `BOARD.md`. The **Next up** batch is the only one you should start.

```bash
cd outreach/sw-wa-fmcsa
python scripts/campaign.py claim --batch B01 --agent YOUR_NAME
```

That marks the batch `claimed` under your name and refreshes `work/B01.md`. If a batch is already claimed by someone else, leave it alone.

## Where the work lives

| File | Role |
| --- | --- |
| `BOARD.md` | Dashboard. Counts, next batch, batches in play. |
| `tracker.csv` | Source of truth. Open in Excel / Numbers / Google Sheets. |
| `work/B01.md` … | One document per 20 leads. Check boxes here. |
| `SEQUENCE.md` | Approved copy, angles, and merge fields. |
| `log/events.jsonl` | Append-only history. Do not edit by hand. |
| `source/` | Raw FMCSA extracts. Do not use these to send. |

## How to mark a lead complete

**Preferred:** edit the lead in `work/BXX.md`, then sync.

- Check **Email 1 sent** when the intro goes out.
- Check **Email 2 sent** / **Email 3 sent** for follow-ups.
- Check **Replied** or **Meeting booked** when they answer.
- Check **Skip**, **Bounce**, or **Do not contact / unsubscribe** otherwise.
- Put a skip reason in **Notes**.

Then:

```bash
python scripts/campaign.py sync
```

**Or** mark one lead from the CLI (lead id, DOT number, or email all work):

```bash
python scripts/campaign.py sent --id L0001 --agent YOUR_NAME --subject "Empty miles on I-5"
python scripts/campaign.py skip --id L0001 --reason "passenger van, not freight"
python scripts/campaign.py bounce --id L0001
python scripts/campaign.py reply --id L0001 --notes "asked for a Thursday call"
python scripts/campaign.py booked --id L0001 --notes "Calendly 30 min"
python scripts/campaign.py dnc --id L0001 --notes "replied stop"
```

Never mark `sent` unless the email actually went out.

## Who you may email

Only leads in **your claimed batch** whose status is `claimed` (or `queued` if you just opened a fresh batch and claimed it).

Do **not** email if status is any of: `sent`, `followup`, `replied`, `booked`, `bounced`, `skipped`, `unsubscribed`, `do_not_contact`.

This list is the for-hire / likely-hot-shot set: 1–4 trucks, active USDOT, physical address in Clark, Cowlitz, Lewis, Skamania, or Wahkiakum. Private fleets (roofers, excavators) and passenger carriers are not in this campaign.

Skip a lead yourself if:

- It is clearly not a freight carrier (lighting service trucks, flooring companies with a box truck, school/passenger).
- The city field is garbage and you cannot confirm they are local.
- The email looks like a personal throwaway with no trucking signal **and** the legal name is not a carrier.

Write the skip reason. Do not delete rows.

## What we sell

Pacific AI Tech installs a **local AI dispatch agent** for small trucking companies. Reference case: [Frostbox Logistics](https://www.pacificaitech.com/case-studies/frostbox-logistics-ai-dispatch) — a solo-founder refrigerated carrier in Oregon. The agent watches Truckstop and DAT, drafts bids in the owner's voice, scouts return loads, and **does not dispatch until the owner approves**.

Offer, in one line: *stop living on the load board; keep the yes/no.*

We are not selling a SaaS login, a TMS, factoring, dispatch-as-a-service, or freight brokerage.

## How to write each email

Use `SEQUENCE.md`. Personalize with city, fleet size, cargo, and DBA when it is a real operating name. One ask: a 20-minute call, book at `https://www.pacificaitech.com/book`.

Every email must include:

- You are Aark at Pacific AI Tech
- `hello@pacificaitech.com` · `(971) 979-0077`
- `1455 SW Broadway, Portland, OR 97201`
- A one-line opt-out: “If this isn’t useful, reply stop and I won’t email again.”

If they reply **stop** / **unsubscribe**, run `dnc` immediately. Do not send the rest of the sequence.

## Pace

One batch (20 leads) per session unless the user asks for more. Do not blast the whole county in one sitting.

After a session:

1. `python scripts/campaign.py sync`
2. Skim `BOARD.md` and confirm the batch moved out of “queued”.
3. Report to the user: batch id, how many sent, skipped, bounced, and any replies.

## If you get stuck

```bash
python scripts/campaign.py show L0001
python scripts/campaign.py show B01
python scripts/campaign.py status
python scripts/campaign.py release --batch B01   # only if you claimed and did not send
```
