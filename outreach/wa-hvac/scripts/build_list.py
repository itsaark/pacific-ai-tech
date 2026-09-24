#!/usr/bin/env python3
"""Active Washington HVAC registrants that publish an email.

The L&I contractor roster has no email column. Emails here come from
public-works intent and affidavit filings, matched on the contractor
license number. Only licenses that are ACTIVE with a Washington
mailing address and specialty SM, 6A, 6B, or AB are kept.
"""

from __future__ import annotations

import csv
import json
import re
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "source" / "WA_HVAC_Active_With_Email.csv"
NOTES = ROOT / "NOTES.md"

FIELDS = [
    "email",
    "company",
    "dba",
    "first_name",
    "phone",
    "city",
    "state",
    "zip",
    "county",
    "segment",
    "source",
    "source_id",
    "detail",
]
SPECIALTIES = ("SM", "6A", "6B", "AB")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
JUNK_LOCAL = {
    "n/a",
    "na",
    "none",
    "noemail",
    "no-email",
    "noreply",
    "no-reply",
    "test",
    "email",
    "null",
    "unknown",
    "nobody",
}
def get(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": "pacificaitech-hvac-list/1.0"})
    with urllib.request.urlopen(req, timeout=90) as response:
        return json.load(response)


def clean(value) -> str:
    return re.sub(r"\s+", " ", str(value or "").replace("\x00", "")).strip()


def usable_email(value: str) -> str:
    email = clean(value).lower().strip(".,;<>\"'`")
    if not EMAIL_RE.match(email):
        return ""
    local, _, domain = email.partition("@")
    if local in JUNK_LOCAL or domain in {"example.com", "test.com", "email.com"}:
        return ""
    if domain.endswith(".gov") or domain.endswith(".mil"):
        return ""
    return email


def zip_code(value) -> str:
    digits = re.sub(r"\D", "", clean(value))
    if len(digits) == 9:
        return f"{digits[:5]}-{digits[5:]}"
    if len(digits) == 5:
        return digits
    return clean(value)


def phone(value) -> str:
    digits = re.sub(r"\D", "", clean(value).split(".")[0])
    if len(digits) == 11 and digits.startswith("1"):
        digits = digits[1:]
    if len(digits) != 10 or digits == "0000000000":
        return ""
    return f"{digits[:3]}-{digits[3:6]}-{digits[6:]}"


def pages(base: str) -> list[dict]:
    rows = []
    offset = 0
    while True:
        chunk = get(f"{base}&$limit=1000&$offset={offset}")
        rows.extend(chunk)
        if len(chunk) < 1000:
            return rows
        offset += 1000


def batched(dataset: str, licenses: list[str], select: str) -> list[dict]:
    found = []
    for start in range(0, len(licenses), 40):
        chunk = licenses[start : start + 40]
        quoted = ",".join("'" + value.replace("'", "''") + "'" for value in chunk)
        where = f"license in({quoted}) AND email IS NOT NULL"
        url = (
            f"https://data.wa.gov/resource/{dataset}.json?$select={urllib.parse.quote(select)}"
            f"&$where={urllib.parse.quote(where)}&$limit=50000"
        )
        rows = get(url)
        if len(rows) >= 50000:
            raise SystemExit(f"{dataset} chunk hit the row cap")
        found.extend(rows)
    return found


def filled(row: dict) -> int:
    return sum(1 for field in FIELDS if row.get(field))


def main() -> None:
    where = (
        "contractorlicensestatus='ACTIVE' AND state='WA' AND specialtycode1 in("
        + ",".join(f"'{code}'" for code in SPECIALTIES)
        + ")"
    )
    select = (
        "contractorlicensenumber,businessname,phonenumber,"
        "address1,city,state,zip,specialtycode1,specialtycode1desc,"
        "contractorlicensetypecodedesc"
    )
    base = (
        "https://data.wa.gov/resource/m8qx-ubtq.json?$select="
        + urllib.parse.quote(select)
        + "&$where="
        + urllib.parse.quote(where)
    )
    licenses = pages(base)
    by_license = {row["contractorlicensenumber"]: row for row in licenses}
    numbers = sorted(by_license)

    filings = batched("t9je-9qwa", numbers, "license,companyname,email,phone")
    filings += batched("9ncw-tqjn", numbers, "license,name,email,phone")

    candidates = []
    skipped = Counter()
    licenses_with_email = set()
    for filing in filings:
        license_no = clean(filing.get("license"))
        record = by_license.get(license_no)
        if record is None:
            skipped["filing_license_not_in_active_set"] += 1
            continue
        email = usable_email(filing.get("email") or "")
        if not email:
            skipped["unusable_email"] += 1
            continue
        licenses_with_email.add(license_no)
        specialty = clean(record.get("specialtycode1desc")) or clean(record.get("specialtycode1"))
        kind = clean(record.get("contractorlicensetypecodedesc"))
        detail = f"{kind.title() if kind.isupper() else kind}, {specialty}. Email from an L&I public-works wage filing."
        filing_name = clean(filing.get("companyname") or filing.get("name"))
        company = clean(record.get("businessname"))
        if filing_name and filing_name.upper() != company.upper() and len(detail) + len(filing_name) < 160:
            detail = f"{detail[:-1]}; filing name {filing_name}."
        candidates.append(
            {
                "email": email,
                "company": company,
                "dba": "",
                "first_name": "",
                "phone": phone(record.get("phonenumber")) or phone(filing.get("phone")),
                "city": clean(record.get("city")),
                "state": "WA",
                "zip": zip_code(record.get("zip")),
                "county": "",
                "segment": "hvac",
                "source": "lni_public_works",
                "source_id": license_no,
                "detail": detail[:180],
            }
        )

    kept: dict[str, dict] = {}
    dropped_dupes = 0
    for row in candidates:
        current = kept.get(row["email"])
        if current is None:
            kept[row["email"]] = row
            continue
        dropped_dupes += 1
        if filled(row) > filled(current) or (
            filled(row) == filled(current) and len(row["company"]) > len(current["company"])
        ):
            kept[row["email"]] = row

    rows = sorted(kept.values(), key=lambda row: (row["email"], row["company"]))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows(rows)

    by_specialty = Counter(by_license[row["source_id"]]["specialtycode1"] for row in rows)
    summary = {
        "active_wa_hvac_licenses": len(by_license),
        "licenses_with_usable_email": len(licenses_with_email),
        "filing_rows_with_usable_email": len(candidates),
        "unique_emails_written": len(rows),
        "duplicate_email_rows_dropped": dropped_dupes,
        "skipped": dict(skipped),
        "written_by_specialty_of_kept_license": dict(by_specialty),
        "written_with_phone": sum(1 for row in rows if row["phone"]),
    }
    print(json.dumps(summary, indent=2))
    (ROOT / "source" / "summary.json").write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
