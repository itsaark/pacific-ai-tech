#!/usr/bin/env python3
"""SW Washington trucking outreach campaign tracker.

Source of truth: tracker.csv
Agent worklists: work/BXX.md
Dashboard: BOARD.md
Event log: log/events.jsonl

Usage:
  python scripts/campaign.py init
  python scripts/campaign.py status
  python scripts/campaign.py claim --agent NAME [--batch B01]
  python scripts/campaign.py sync
  python scripts/campaign.py sent --id L0001 --subject "..." --agent NAME
  python scripts/campaign.py skip --id L0001 --reason "not a carrier"
  python scripts/campaign.py bounce --id L0001
  python scripts/campaign.py reply --id L0001 --notes "wants a call"
  python scripts/campaign.py booked --id L0001 --notes "Calendly booked"
  python scripts/campaign.py release --batch B01
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import shutil
import sys
from collections import Counter
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "source"
WORK_DIR = ROOT / "work"
LOG_DIR = ROOT / "log"
TRACKER = ROOT / "tracker.csv"
BOARD = ROOT / "BOARD.md"
EVENTS = LOG_DIR / "events.jsonl"
SEED = SOURCE_DIR / "SW_WA_ForHire_MailingTool.csv"

BATCH_SIZE = 20
TZ = timezone(timedelta(hours=-7))  # Pacific, no DST dance needed for stamps
STATUSES = {
    "queued",
    "claimed",
    "sent",
    "followup",
    "replied",
    "bounced",
    "skipped",
    "unsubscribed",
    "booked",
    "do_not_contact",
}
DONE_STATUSES = {
    "sent",
    "followup",
    "replied",
    "bounced",
    "skipped",
    "unsubscribed",
    "booked",
    "do_not_contact",
}
CONTACTED_STATUSES = {"sent", "followup", "replied", "booked"}
DO_NOT_EMAIL = {
    "sent",
    "followup",
    "replied",
    "bounced",
    "skipped",
    "unsubscribed",
    "booked",
    "do_not_contact",
}

LEAD_FIELDS = [
    "email",
    "company",
    "dba",
    "first_name",
    "phone",
    "city",
    "zip",
    "county",
    "dot_number",
    "power_units",
    "operation",
    "segment",
    "cargo",
    "mc_number",
]
TRACK_FIELDS = [
    "lead_id",
    "batch_id",
    "priority",
    "status",
    "sequence_step",
    "claimed_by",
    "claimed_at",
    "sent_at",
    "followup_due",
    "replied_at",
    "subject",
    "notes",
    "skip_reason",
]
FIELDNAMES = TRACK_FIELDS + LEAD_FIELDS

COUNTY_RANK = {
    "Clark County": 0,
    "Cowlitz County": 1,
    "Lewis County": 2,
    "Skamania & Wahkiakum": 3,
}


def now_iso() -> str:
    return datetime.now(TZ).strftime("%Y-%m-%d %H:%M")


def today() -> str:
    return datetime.now(TZ).strftime("%Y-%m-%d")


def ensure_dirs() -> None:
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)
    WORK_DIR.mkdir(parents=True, exist_ok=True)
    LOG_DIR.mkdir(parents=True, exist_ok=True)


def log_event(action: str, **payload) -> None:
    ensure_dirs()
    record = {"at": now_iso(), "action": action, **payload}
    with EVENTS.open("a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\n")


def write_csv(path: Path, rows: list[dict], fieldnames: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    with tmp.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)
    tmp.replace(path)


def load_tracker() -> list[dict]:
    if not TRACKER.exists():
        raise SystemExit("tracker.csv missing. Run: python scripts/campaign.py init")
    with TRACKER.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def save_tracker(rows: list[dict]) -> None:
    write_csv(TRACKER, rows, FIELDNAMES)
    write_board(rows)


def move_raw_extracts() -> None:
    ensure_dirs()
    for path in ROOT.glob("SW_WA_*.csv"):
        dest = SOURCE_DIR / path.name
        if not dest.exists():
            shutil.move(str(path), str(dest))
    for name in ("summary.json",):
        src = ROOT / name
        if src.exists() and not (SOURCE_DIR / name).exists():
            shutil.move(str(src), str(SOURCE_DIR / name))
    extract = ROOT / "extract_sw_wa_carriers.py"
    if extract.exists():
        dest = ROOT / "scripts" / "extract_sw_wa_carriers.py"
        if not dest.exists():
            shutil.move(str(extract), str(dest))


def sort_key(row: dict) -> tuple:
    segment = 0 if row.get("segment") == "likely_hotshot" else 1
    county = COUNTY_RANK.get(row.get("county") or "", 9)
    try:
        units = int(row.get("power_units") or 99)
    except ValueError:
        units = 99
    op = 0 if (row.get("operation") or "").lower().startswith("interstate") else 1
    city = (row.get("city") or "").upper()
    company = (row.get("company") or "").upper()
    return (segment, county, units, op, city, company)


def init_tracker(force: bool = False) -> list[dict]:
    move_raw_extracts()
    if TRACKER.exists() and not force:
        rows = load_tracker()
        write_board(rows)
        print(f"tracker.csv already exists ({len(rows)} leads). Use --force to rebuild.")
        return rows
    if not SEED.exists():
        raise SystemExit(f"Seed list missing: {SEED}")
    with SEED.open(newline="", encoding="utf-8") as f:
        leads = list(csv.DictReader(f))
    leads.sort(key=sort_key)
    rows = []
    for i, lead in enumerate(leads, start=1):
        batch_num = ((i - 1) // BATCH_SIZE) + 1
        row = {k: "" for k in FIELDNAMES}
        row.update(
            {
                "lead_id": f"L{i:04d}",
                "batch_id": f"B{batch_num:02d}",
                "priority": str(i),
                "status": "queued",
                "sequence_step": "0",
            }
        )
        for field in LEAD_FIELDS:
            row[field] = (lead.get(field) or "").strip()
        rows.append(row)
    save_tracker(rows)
    write_all_worklists(rows, overwrite=force)
    log_event("init", leads=len(rows), batches=batch_count(rows))
    print(f"Initialized {len(rows)} leads in {batch_count(rows)} batches of {BATCH_SIZE}.")
    return rows


def batch_count(rows: list[dict]) -> int:
    return len({r["batch_id"] for r in rows})


def batch_rows(rows: list[dict], batch_id: str) -> list[dict]:
    return [r for r in rows if r["batch_id"] == batch_id]


def find_lead(rows: list[dict], ident: str) -> dict:
    ident = ident.strip()
    ident_l = ident.lower()
    for row in rows:
        if row["lead_id"].lower() == ident_l:
            return row
        if row["dot_number"] == ident:
            return row
        if row["email"].lower() == ident_l:
            return row
    raise SystemExit(f"No lead matching {ident!r} (use lead_id, DOT number, or email)")


def batch_summary(rows: list[dict]) -> list[dict]:
    batches: dict[str, list[dict]] = {}
    for row in rows:
        batches.setdefault(row["batch_id"], []).append(row)
    out = []
    for batch_id, items in sorted(batches.items()):
        statuses = Counter(r["status"] for r in items)
        counties = Counter(r["county"] for r in items)
        segments = Counter(r["segment"] for r in items)
        claimed_by = next((r["claimed_by"] for r in items if r["claimed_by"]), "")
        if statuses.get("booked") or statuses.get("replied"):
            state = "active replies"
        elif statuses.get("claimed"):
            state = f"claimed by {claimed_by or 'agent'}"
        elif all(r["status"] in DONE_STATUSES for r in items):
            state = "done"
        elif any(r["status"] in CONTACTED_STATUSES for r in items):
            state = "in progress"
        else:
            state = "queued"
        out.append(
            {
                "batch_id": batch_id,
                "count": len(items),
                "county": counties.most_common(1)[0][0] if counties else "",
                "segment": segments.most_common(1)[0][0] if segments else "",
                "queued": statuses.get("queued", 0) + statuses.get("claimed", 0),
                "sent": statuses.get("sent", 0)
                + statuses.get("followup", 0)
                + statuses.get("replied", 0)
                + statuses.get("booked", 0),
                "open": statuses.get("queued", 0),
                "claimed": statuses.get("claimed", 0),
                "replied": statuses.get("replied", 0) + statuses.get("booked", 0),
                "skipped": statuses.get("skipped", 0)
                + statuses.get("bounced", 0)
                + statuses.get("do_not_contact", 0)
                + statuses.get("unsubscribed", 0),
                "state": state,
                "claimed_by": claimed_by,
            }
        )
    return out


def display_name(row: dict) -> str:
    dba = (row.get("dba") or "").strip()
    company = (row.get("company") or "").strip()
    if dba and dba.upper() != company.upper():
        return f"{company} ({dba})"
    return company


def work_path(batch_id: str) -> Path:
    return WORK_DIR / f"{batch_id}.md"


def render_lead(row: dict) -> str:
    name = display_name(row)
    contact = row["first_name"] or "(no first name on MCS-150)"
    mc = row["mc_number"] or "none on file"
    cargo = row["cargo"] or "unspecified"
    notes = row["notes"] or ""
    subject = row["subject"] or ""
    skip = row["skip_reason"] or ""
    extra = []
    if subject:
        extra.append(f"- **Last subject:** {subject}")
    if notes:
        extra.append(f"- **Notes:** {notes}")
    if skip:
        extra.append(f"- **Skip reason:** {skip}")
    extra_block = ("\n" + "\n".join(extra)) if extra else ""
    checked = {
        "e1": "x" if int(row.get("sequence_step") or 0) >= 1 or row["status"] in CONTACTED_STATUSES else " ",
        "e2": "x" if int(row.get("sequence_step") or 0) >= 2 else " ",
        "e3": "x" if int(row.get("sequence_step") or 0) >= 3 else " ",
        "replied": "x" if row["status"] in {"replied", "booked"} else " ",
        "booked": "x" if row["status"] == "booked" else " ",
        "skip": "x" if row["status"] == "skipped" else " ",
        "bounce": "x" if row["status"] == "bounced" else " ",
        "dnc": "x" if row["status"] in {"do_not_contact", "unsubscribed"} else " ",
    }
    return f"""## {row['lead_id']} · {name}

- **Status:** {row['status']}
- **Email:** {row['email']}
- **Phone:** {row['phone'] or '—'}
- **Contact:** {contact}
- **City:** {row['city']}, {row['zip']} · {row['county']}
- **DOT:** {row['dot_number']} · **MC:** {mc}
- **Fleet:** {row['power_units']} power unit(s) · {row['operation']} · {row['segment']}
- **Cargo:** {cargo}{extra_block}

- [{checked['e1']}] Email 1 sent
- [{checked['e2']}] Email 2 sent
- [{checked['e3']}] Email 3 sent
- [{checked['replied']}] Replied
- [{checked['booked']}] Meeting booked
- [{checked['skip']}] Skip (put reason in Notes)
- [{checked['bounce']}] Bounce
- [{checked['dnc']}] Do not contact / unsubscribe
"""


def render_worklist(rows: list[dict], batch_id: str) -> str:
    items = batch_rows(rows, batch_id)
    if not items:
        raise SystemExit(f"Unknown batch {batch_id}")
    summary = next(s for s in batch_summary(items) if s["batch_id"] == batch_id)
    claimed_by = summary["claimed_by"] or "unclaimed"
    sent = summary["sent"]
    open_n = sum(1 for r in items if r["status"] in {"queued", "claimed"})
    leads = "\n---\n\n".join(render_lead(r) for r in items)
    return f"""---
batch_id: {batch_id}
county: {summary['county']}
segment: {summary['segment']}
claimed_by: {claimed_by}
updated: {now_iso()}
---

# Batch {batch_id} — {summary['county']}

{len(items)} leads · {sent} contacted · {open_n} still open · {summary['state']}

How to mark work: check a box **or** change `**Status:**`. Then run:

`python scripts/campaign.py sync`

Valid statuses: `queued` · `claimed` · `sent` · `followup` · `replied` · `booked` · `skipped` · `bounced` · `unsubscribed` · `do_not_contact`

Do not email anyone whose status is already `sent`, `replied`, `booked`, `bounced`, `skipped`, `unsubscribed`, or `do_not_contact`.

---

{leads}
"""


def write_worklist(rows: list[dict], batch_id: str) -> Path:
    ensure_dirs()
    path = work_path(batch_id)
    path.write_text(render_worklist(rows, batch_id), encoding="utf-8")
    return path


def write_all_worklists(rows: list[dict], overwrite: bool = False) -> None:
    ensure_dirs()
    for batch_id in sorted({r["batch_id"] for r in rows}):
        path = work_path(batch_id)
        if path.exists() and not overwrite:
            continue
        write_worklist(rows, batch_id)


def write_board(rows: list[dict]) -> None:
    counts = Counter(r["status"] for r in rows)
    contacted = sum(counts[s] for s in CONTACTED_STATUSES)
    remaining = counts["queued"] + counts["claimed"]
    pct = (contacted / len(rows) * 100) if rows else 0
    batches = batch_summary(rows)
    active = [b for b in batches if b["state"] not in {"queued", "done"}]
    next_queued = next((b for b in batches if b["open"] == b["count"]), None)
    lines = [
        f"# SW WA trucking outreach",
        "",
        f"Updated {now_iso()} PT · **{contacted} / {len(rows)}** contacted ({pct:.1f}%) · **{remaining}** still open",
        "",
        "## Status",
        "",
        "| Status | Count | Meaning |",
        "| --- | ---: | --- |",
        f"| queued | {counts['queued']} | Not touched |",
        f"| claimed | {counts['claimed']} | An agent is working this lead |",
        f"| sent | {counts['sent']} | Intro email sent |",
        f"| followup | {counts['followup']} | Follow-up in the sequence |",
        f"| replied | {counts['replied']} | They wrote back |",
        f"| booked | {counts['booked']} | Call on the calendar |",
        f"| bounced | {counts['bounced']} | Bad address |",
        f"| skipped | {counts['skipped']} | Not a fit |",
        f"| unsubscribed / DNC | {counts['unsubscribed'] + counts['do_not_contact']} | Stop |",
        "",
        "## Next up",
        "",
    ]
    if next_queued:
        lines.append(
            f"Open `{work_path(next_queued['batch_id']).relative_to(ROOT)}` "
            f"({next_queued['county']}, {next_queued['count']} leads) and run:"
        )
        lines.append("")
        lines.append("```bash")
        lines.append(f"python scripts/campaign.py claim --batch {next_queued['batch_id']} --agent YOUR_NAME")
        lines.append("```")
    else:
        lines.append("No untouched batches left.")
    lines += ["", "## Batches in play", ""]
    if active:
        lines += [
            "| Batch | File | Focus | Open | Contacted | State |",
            "| --- | --- | --- | ---: | ---: | --- |",
        ]
        for b in active:
            lines.append(
                f"| {b['batch_id']} | `work/{b['batch_id']}.md` | {b['county']} | "
                f"{b['open'] + b['claimed']} | {b['sent']} | {b['state']} |"
            )
    else:
        lines.append("_None claimed right now._")
    lines += [
        "",
        "## All batches",
        "",
        "| Batch | File | County | Open | Contacted | Skipped | State |",
        "| --- | --- | --- | ---: | ---: | ---: | --- |",
    ]
    for b in batches:
        lines.append(
            f"| {b['batch_id']} | `work/{b['batch_id']}.md` | {b['county']} | "
            f"{b['open'] + b['claimed']} | {b['sent']} | {b['skipped']} | {b['state']} |"
        )
    by_county = Counter(r["county"] for r in rows if r["status"] in {"queued", "claimed"})
    lines += ["", "## Remaining by county", ""]
    for county, n in by_county.most_common():
        lines.append(f"- {county}: {n}")
    recent = recent_events(12)
    lines += ["", "## Recent activity", ""]
    if recent:
        for ev in recent:
            detail = ev.get("lead_id") or ev.get("batch_id") or ""
            extra = ev.get("status") or ev.get("reason") or ev.get("subject") or ""
            bits = " · ".join(x for x in (ev.get("action"), detail, extra, ev.get("agent")) if x)
            lines.append(f"- {ev.get('at')}: {bits}")
    else:
        lines.append("_No events yet._")
    lines += [
        "",
        "## Rules for the sending agent",
        "",
        "Read `AGENT.md` before touching a lead. Tracker.csv is the source of truth; `python scripts/campaign.py sync` copies checkbox changes from `work/*.md` back into it.",
        "",
    ]
    BOARD.write_text("\n".join(lines) + "\n", encoding="utf-8")


def recent_events(limit: int) -> list[dict]:
    if not EVENTS.exists():
        return []
    lines = EVENTS.read_text(encoding="utf-8").splitlines()
    out = []
    for line in lines[-limit:]:
        try:
            out.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    return list(reversed(out))


LEAD_HEADER = re.compile(r"^##\s+(L\d{4})\s+·")
STATUS_LINE = re.compile(r"^\- \*\*Status:\*\*\s+(\S+)", re.I)
NOTES_LINE = re.compile(r"^\- \*\*Notes:\*\*\s+(.*)$")
SUBJECT_LINE = re.compile(r"^\- \*\*Last subject:\*\*\s+(.*)$")
CHECK = re.compile(r"^\- \[([ xX])\]\s+(.*)$")


def parse_worklist(path: Path) -> list[dict]:
    text = path.read_text(encoding="utf-8")
    chunks = re.split(r"^## ", text, flags=re.M)
    found = []
    for chunk in chunks:
        header = LEAD_HEADER.match("## " + chunk)
        if not header:
            continue
        lead_id = header.group(1)
        status = None
        notes = None
        subject = None
        checks: dict[str, bool] = {}
        for line in chunk.splitlines():
            m = STATUS_LINE.match(line)
            if m:
                status = m.group(1).strip().lower()
            m = NOTES_LINE.match(line)
            if m:
                notes = m.group(1).strip()
            m = SUBJECT_LINE.match(line)
            if m:
                subject = m.group(1).strip()
            m = CHECK.match(line)
            if m:
                checks[m.group(2).strip().lower()] = m.group(1).lower() == "x"
        derived = None
        step = None
        if checks.get("do not contact / unsubscribe"):
            derived = "do_not_contact"
        elif checks.get("bounce"):
            derived = "bounced"
        elif checks.get("skip (put reason in notes)"):
            derived = "skipped"
        elif checks.get("meeting booked"):
            derived = "booked"
            step = max(1, step or 1)
        elif checks.get("replied"):
            derived = "replied"
            step = max(1, step or 1)
        elif checks.get("email 3 sent"):
            derived = "followup"
            step = 3
        elif checks.get("email 2 sent"):
            derived = "followup"
            step = 2
        elif checks.get("email 1 sent"):
            derived = "sent"
            step = 1
        # Checkboxes win over a stale queued/claimed status line so agents can
        # mark sent without also editing **Status:**.
        if derived in {
            "do_not_contact",
            "bounced",
            "skipped",
            "booked",
            "replied",
            "sent",
            "followup",
        }:
            final = derived
        elif status in STATUSES:
            final = status
        else:
            final = None
        found.append(
            {
                "lead_id": lead_id,
                "status": final,
                "notes": notes,
                "subject": subject,
                "sequence_step": step,
            }
        )
    return found


def apply_update(
    row: dict,
    *,
    status: str | None = None,
    agent: str = "",
    subject: str = "",
    notes: str = "",
    skip_reason: str = "",
    sequence_step: int | None = None,
) -> None:
    if status:
        if status not in STATUSES:
            raise SystemExit(f"Invalid status {status!r}. Use one of: {', '.join(sorted(STATUSES))}")
        row["status"] = status
        if status == "claimed":
            row["claimed_by"] = agent or row["claimed_by"]
            row["claimed_at"] = row["claimed_at"] or now_iso()
        if status in CONTACTED_STATUSES and not row["sent_at"]:
            row["sent_at"] = now_iso()
        if status in {"replied", "booked"}:
            row["replied_at"] = now_iso()
        if status == "queued":
            row["claimed_by"] = ""
            row["claimed_at"] = ""
        if sequence_step is None:
            if status == "sent":
                sequence_step = max(1, int(row["sequence_step"] or 0))
            elif status == "followup":
                sequence_step = max(2, int(row["sequence_step"] or 0))
            elif status in {"replied", "booked"}:
                sequence_step = max(1, int(row["sequence_step"] or 0))
    if sequence_step is not None:
        row["sequence_step"] = str(sequence_step)
    if agent and row["status"] == "claimed":
        row["claimed_by"] = agent
        row["claimed_at"] = row["claimed_at"] or now_iso()
    if subject:
        row["subject"] = subject
    if notes:
        row["notes"] = notes
    if skip_reason:
        row["skip_reason"] = skip_reason
        if not row["notes"]:
            row["notes"] = skip_reason


def cmd_status(rows: list[dict]) -> None:
    counts = Counter(r["status"] for r in rows)
    print(f"{len(rows)} leads · {batch_count(rows)} batches")
    for status in [
        "queued",
        "claimed",
        "sent",
        "followup",
        "replied",
        "booked",
        "bounced",
        "skipped",
        "unsubscribed",
        "do_not_contact",
    ]:
        print(f"  {status:16s} {counts[status]}")
    nxt = next((b for b in batch_summary(rows) if b["open"] == b["count"]), None)
    if nxt:
        print(f"next batch: {nxt['batch_id']}  work/{nxt['batch_id']}.md  {nxt['county']}")


def cmd_claim(rows: list[dict], batch_id: str | None, agent: str) -> None:
    if not agent:
        raise SystemExit("--agent is required so two people don't send the same lead")
    if not batch_id:
        summaries = batch_summary(rows)
        pick = next((b for b in summaries if b["open"] == b["count"]), None)
        if not pick:
            pick = next((b for b in summaries if b["open"] > 0), None)
        if not pick:
            raise SystemExit("No queued leads left.")
        batch_id = pick["batch_id"]
    items = batch_rows(rows, batch_id)
    if not items:
        raise SystemExit(f"Unknown batch {batch_id}")
    claimed = 0
    blocked = []
    for row in items:
        if row["status"] == "queued":
            apply_update(row, status="claimed", agent=agent)
            claimed += 1
        elif row["status"] == "claimed" and row["claimed_by"] and row["claimed_by"] != agent:
            blocked.append(f"{row['lead_id']} claimed by {row['claimed_by']}")
        elif row["status"] in DO_NOT_EMAIL:
            continue
        elif row["status"] == "claimed":
            apply_update(row, status="claimed", agent=agent)
            claimed += 1
    if blocked and claimed == 0:
        raise SystemExit("Batch already claimed:\n  " + "\n  ".join(blocked))
    path = write_worklist(rows, batch_id)
    save_tracker(rows)
    log_event("claim", batch_id=batch_id, agent=agent, claimed=claimed)
    print(f"Claimed {claimed} leads in {batch_id} → {path.relative_to(ROOT)}")
    print("Edit that file, then run: python scripts/campaign.py sync")


def cmd_release(rows: list[dict], batch_id: str) -> None:
    items = batch_rows(rows, batch_id)
    if not items:
        raise SystemExit(f"Unknown batch {batch_id}")
    n = 0
    for row in items:
        if row["status"] == "claimed":
            apply_update(row, status="queued")
            n += 1
    write_worklist(rows, batch_id)
    save_tracker(rows)
    log_event("release", batch_id=batch_id, released=n)
    print(f"Released {n} claimed leads in {batch_id} back to queued.")


def cmd_mark(
    rows: list[dict],
    ident: str,
    status: str,
    agent: str,
    subject: str,
    notes: str,
    reason: str,
) -> None:
    row = find_lead(rows, ident)
    if row["status"] in {"unsubscribed", "do_not_contact"} and status not in {
        "unsubscribed",
        "do_not_contact",
    }:
        raise SystemExit(f"{row['lead_id']} is {row['status']}. Do not email.")
    apply_update(
        row,
        status=status,
        agent=agent,
        subject=subject,
        notes=notes,
        skip_reason=reason,
    )
    write_worklist(rows, row["batch_id"])
    save_tracker(rows)
    log_event(
        status,
        lead_id=row["lead_id"],
        batch_id=row["batch_id"],
        email=row["email"],
        company=row["company"],
        agent=agent,
        subject=subject,
        reason=reason,
        notes=notes,
    )
    print(f"{row['lead_id']} {row['company']} → {row['status']}")


def cmd_sync(rows: list[dict]) -> None:
    by_id = {r["lead_id"]: r for r in rows}
    changed = 0
    for path in sorted(WORK_DIR.glob("B*.md")):
        for update in parse_worklist(path):
            row = by_id.get(update["lead_id"])
            if not row:
                continue
            before = (row["status"], row["sequence_step"], row["notes"], row["subject"])
            if update["status"]:
                apply_update(row, status=update["status"], sequence_step=update["sequence_step"])
            elif update["sequence_step"]:
                apply_update(row, sequence_step=update["sequence_step"])
            if update["notes"]:
                row["notes"] = update["notes"]
            if update["subject"]:
                row["subject"] = update["subject"]
            after = (row["status"], row["sequence_step"], row["notes"], row["subject"])
            if before != after:
                changed += 1
                log_event(
                    "sync",
                    lead_id=row["lead_id"],
                    batch_id=row["batch_id"],
                    status=row["status"],
                    sequence_step=row["sequence_step"],
                )
    for batch_id in sorted({r["batch_id"] for r in rows}):
        write_worklist(rows, batch_id)
    save_tracker(rows)
    print(f"Synced {changed} lead updates from work/*.md")


def cmd_show(rows: list[dict], ident: str) -> None:
    if ident.upper().startswith("B"):
        items = batch_rows(rows, ident.upper() if len(ident) > 1 else ident)
        if not items:
            raise SystemExit(f"Unknown batch {ident}")
        print(render_worklist(rows, items[0]["batch_id"]))
        return
    row = find_lead(rows, ident)
    print(render_lead(row))


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="SW WA trucking outreach tracker")
    sub = p.add_subparsers(dest="cmd", required=True)
    init = sub.add_parser("init", help="Build tracker and batch docs from the seed list")
    init.add_argument("--force", action="store_true")
    sub.add_parser("status", help="Print counts")
    sub.add_parser("board", help="Rebuild BOARD.md")
    claim = sub.add_parser("claim", help="Claim the next (or a given) batch")
    claim.add_argument("--batch")
    claim.add_argument("--agent", required=True)
    rel = sub.add_parser("release", help="Return a claimed batch to queued")
    rel.add_argument("--batch", required=True)
    sub.add_parser("sync", help="Read checkboxes in work/*.md into tracker.csv")
    show = sub.add_parser("show", help="Print a lead or batch")
    show.add_argument("id")

    def add_mark(name: str, help_text: str) -> argparse.ArgumentParser:
        m = sub.add_parser(name, help=help_text)
        m.add_argument("--id", required=True, help="lead_id, DOT number, or email")
        m.add_argument("--agent", default="")
        m.add_argument("--subject", default="")
        m.add_argument("--notes", default="")
        m.add_argument("--reason", default="")
        return m

    add_mark("sent", "Mark intro email sent")
    add_mark("followup", "Mark a follow-up sent")
    add_mark("reply", "They replied")
    add_mark("booked", "Meeting booked")
    add_mark("skip", "Not a fit")
    add_mark("bounce", "Email bounced")
    add_mark("dnc", "Do not contact / unsubscribe")
    return p


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    ensure_dirs()
    if args.cmd == "init":
        init_tracker(force=args.force)
        return 0
    rows = load_tracker()
    if args.cmd == "status":
        cmd_status(rows)
        write_board(rows)
    elif args.cmd == "board":
        write_board(rows)
        print(f"Wrote {BOARD.relative_to(ROOT)}")
    elif args.cmd == "claim":
        cmd_claim(rows, args.batch, args.agent)
    elif args.cmd == "release":
        cmd_release(rows, args.batch)
    elif args.cmd == "sync":
        cmd_sync(rows)
    elif args.cmd == "show":
        cmd_show(rows, args.id)
    elif args.cmd in {"sent", "followup", "reply", "booked", "skip", "bounce", "dnc"}:
        status = {
            "sent": "sent",
            "followup": "followup",
            "reply": "replied",
            "booked": "booked",
            "skip": "skipped",
            "bounce": "bounced",
            "dnc": "do_not_contact",
        }[args.cmd]
        cmd_mark(rows, args.id, status, args.agent, args.subject, args.notes, args.reason)
    else:
        raise SystemExit(f"unknown command {args.cmd}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
