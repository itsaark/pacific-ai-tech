# Email sequence — SW WA for-hire / hot shot

Fill this in before sending at volume. The sending agent uses these as the default. Personalize the first two sentences; do not rewrite the offer every time.

Merge fields from each lead in `work/BXX.md`:

`{{first_name}}` `{{company}}` `{{dba}}` `{{city}}` `{{power_units}}` `{{cargo}}` `{{operation}}`

If `first_name` is missing, use the company name. If `dba` is present and different from `legal_name`, you may say “doing business as {{dba}}”.

---

## Angle (keep this)

Owner-operators and 1–4 truck fleets in SW Washington spend the day on Truckstop/DAT, bidding, and hunting a backhaul so the truck does not come home empty. Pacific AI Tech put a local agent on a Mac mini for Frostbox Logistics (refrigerated, Oregon) that does that board work and still waits for the owner to approve before dispatch.

Proof page: https://www.pacificaitech.com/case-studies/frostbox-logistics-ai-dispatch  
Book: https://www.pacificaitech.com/book

---

## Email 1 — intro (day 0)

**Subject options** (pick one, do not A/B in the same inbox):

1. {{city}} trucks / empty miles
2. Quick question for {{company}}
3. Load board time at {{company}}

**Body draft** — sending agent should tighten per lead, keep under 120 words:

> {{first_name}},
>
> I’m Aark at Pacific AI Tech in Portland. I work with small fleets around Vancouver, Longview, and Chehalis that are tired of sitting on Truckstop and DAT between loads.
>
> We set up a local agent for a one-truck refrigerated carrier in Oregon. It watches the boards, drafts bids in the owner’s voice, looks for a return load, and does not dispatch until he says yes. Case study: https://www.pacificaitech.com/case-studies/frostbox-logistics-ai-dispatch
>
> If {{company}} is still running {{power_units}} truck(s) out of {{city}}, worth a 20-minute call to see if the same setup would save you the board time?
>
> Book here: https://www.pacificaitech.com/book
>
> Aark  
> Pacific AI Tech  
> hello@pacificaitech.com · (971) 979-0077  
> 1455 SW Broadway, Portland, OR 97201  
> If this isn’t useful, reply stop and I won’t email again.

---

## Email 2 — follow-up (day 3–4)

**Subject:** Re: {{previous subject}} (same thread)

> {{first_name}}, bumping this once. The useful part for a {{city}} {{cargo}} outfit is the return-load search — the agent starts looking before the truck is empty, owner still approves.
>
> 20 minutes: https://www.pacificaitech.com/book
>
> Aark · Pacific AI Tech · (971) 979-0077  
> Reply stop if you want off the list.

---

## Email 3 — close (day 8–10)

**Subject:** Re: {{previous subject}} (same thread)

> {{first_name}}, I’ll close this out so I’m not another email in the pile.
>
> If you want the load-board work handled without giving up the yes/no on dispatch, I’m around: https://www.pacificaitech.com/book
>
> Otherwise, good miles.
>
> Aark · Pacific AI Tech

---

## After they reply

- Interested / “tell me more” → send the Frostbox link, offer times, or point at Calendly. Mark `replied`.
- Booked → mark `booked` and put the time in Notes.
- Not now / we have a dispatcher → polite thanks, mark `skipped` with the reason. Do not keep pitching.
- Stop / unsubscribe / “take me off” → mark `do_not_contact` the same day. No extra email.
- Bounce → mark `bounced`. Do not try a guessed second address.

---

## Do not

- Mention buying their freight, brokering loads, or factoring.
- Claim we “run dispatch” or replace the owner.
- Attach files or include more than two links.
- Copy the same first line to every lead in a batch.
- Email a second lead at the same domain in the same day if you already mailed one (check `tracker.csv`).
