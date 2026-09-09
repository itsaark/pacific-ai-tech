#!/usr/bin/env python3
"""Extract SW Washington small-fleet motor carriers from FMCSA Company Census."""

from __future__ import annotations

import csv
import io
import json
import re
import ssl
import sys
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://data.transportation.gov/resource/az4n-8mr2.csv"
OUT_DIR = Path(__file__).resolve().parent.parent / "source"

SW_WA_ZIPS = {
    # Clark County
    "98604",
    "98606",
    "98607",
    "98629",
    "98642",
    "98660",
    "98661",
    "98662",
    "98663",
    "98664",
    "98665",
    "98666",
    "98671",
    "98675",
    "98682",
    "98683",
    "98684",
    "98685",
    "98686",
    "98687",
    # Cowlitz County
    "98611",
    "98625",
    "98626",
    "98632",
    "98674",
    # Lewis County
    "98531",
    "98532",
    "98564",
    "98591",
    "98596",
    # Skamania & Wahkiakum
    "98610",
    "98612",
    "98648",
    "98651",
}

ZIP_COUNTY = {}
for z in [
    "98604",
    "98606",
    "98607",
    "98629",
    "98642",
    "98660",
    "98661",
    "98662",
    "98663",
    "98664",
    "98665",
    "98666",
    "98671",
    "98675",
    "98682",
    "98683",
    "98684",
    "98685",
    "98686",
    "98687",
]:
    ZIP_COUNTY[z] = "Clark County"
for z in ["98611", "98625", "98626", "98632", "98674"]:
    ZIP_COUNTY[z] = "Cowlitz County"
for z in ["98531", "98532", "98564", "98591", "98596"]:
    ZIP_COUNTY[z] = "Lewis County"
for z in ["98610", "98612", "98648", "98651"]:
    ZIP_COUNTY[z] = "Skamania & Wahkiakum"

CNTY_CODE = {
    "011": "Clark County",
    "015": "Cowlitz County",
    "041": "Lewis County",
    "059": "Skamania County",
    "069": "Wahkiakum County",
}

COLUMNS = [
    "dot_number",
    "legal_name",
    "dba_name",
    "email_address",
    "phone",
    "cell_phone",
    "company_officer_1",
    "phy_street",
    "phy_city",
    "phy_state",
    "phy_zip",
    "phy_cnty",
    "carrier_mailing_street",
    "carrier_mailing_city",
    "carrier_mailing_state",
    "carrier_mailing_zip",
    "status_code",
    "carrier_operation",
    "power_units",
    "truck_units",
    "bus_units",
    "total_drivers",
    "total_cdl",
    "hm_ind",
    "business_org_desc",
    "carship",
    "classdef",
    "mcs150_date",
    "mcs150_mileage",
    "docket1prefix",
    "docket1",
    "docket1_status_code",
    "crgo_genfreight",
    "crgo_household",
    "crgo_metalsheet",
    "crgo_motoveh",
    "crgo_drivetow",
    "crgo_logpole",
    "crgo_bldgmat",
    "crgo_machlrg",
    "crgo_produce",
    "crgo_oilfield",
    "crgo_intermodal",
    "crgo_passengers",
    "crgo_cargoothr",
    "crgo_cargoothr_desc",
    "safety_rating",
]

OP_LABEL = {
    "A": "Interstate",
    "B": "Intrastate Hazmat",
    "C": "Intrastate Non-Hazmat",
}

CARGO_FLAGS = [
    ("crgo_genfreight", "General Freight"),
    ("crgo_household", "Household Goods"),
    ("crgo_metalsheet", "Metal Sheet"),
    ("crgo_motoveh", "Motor Vehicles"),
    ("crgo_drivetow", "Driveaway/Towaway"),
    ("crgo_logpole", "Logs/Poles"),
    ("crgo_bldgmat", "Building Materials"),
    ("crgo_machlrg", "Machinery/Large Objects"),
    ("crgo_produce", "Produce"),
    ("crgo_oilfield", "Oilfield"),
    ("crgo_intermodal", "Intermodal"),
    ("crgo_passengers", "Passengers"),
    ("crgo_cargoothr", "Other"),
]


def clean_zip(value: str | None) -> str:
    if not value:
        return ""
    digits = re.sub(r"\D", "", value.strip())
    return digits[:5]


def is_truthy(value: str | None) -> bool:
    return str(value or "").strip().upper() in {"X", "Y", "TRUE", "1"}


def cargo_list(row: dict) -> str:
    labels = [label for field, label in CARGO_FLAGS if is_truthy(row.get(field))]
    other = (row.get("crgo_cargoothr_desc") or "").strip()
    if other and "Other" not in labels:
        labels.append(other)
    elif other:
        labels = [x if x != "Other" else f"Other ({other})" for x in labels]
    return "; ".join(labels)


def fetch_page(where: str, offset: int, limit: int = 50000) -> list[dict]:
    params = {
        "$select": ",".join(COLUMNS),
        "$where": where,
        "$order": "dot_number",
        "$limit": str(limit),
        "$offset": str(offset),
    }
    url = f"{BASE}?{urllib.parse.urlencode(params)}"
    print(f"GET offset={offset} limit={limit}", flush=True)
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "PacificAITech-FMCSA-extract/1.0 (outreach research)",
            "Accept": "text/csv",
        },
    )
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=180) as resp:
        raw = resp.read().decode("utf-8", errors="replace")
    reader = csv.DictReader(io.StringIO(raw))
    rows = list(reader)
    print(f"  received {len(rows)} rows", flush=True)
    return rows


def fetch_all(where: str) -> list[dict]:
    all_rows: list[dict] = []
    offset = 0
    limit = 50000
    while True:
        page = fetch_page(where, offset, limit)
        all_rows.extend(page)
        if len(page) < limit:
            break
        offset += limit
    return all_rows


def to_int(value: str | None) -> int | None:
    try:
        if value is None or str(value).strip() == "":
            return None
        return int(float(str(value).strip()))
    except (TypeError, ValueError):
        return None


def in_sw_wa(row: dict) -> tuple[bool, str, str, str]:
    phy_zip = clean_zip(row.get("phy_zip"))
    mail_zip = clean_zip(row.get("carrier_mailing_zip"))
    phy_match = phy_zip in SW_WA_ZIPS
    mail_match = mail_zip in SW_WA_ZIPS
    if not phy_match and not mail_match:
        return False, "", "", ""
    match_zip = phy_zip if phy_match else mail_zip
    county = ZIP_COUNTY.get(match_zip, "")
    if phy_match and mail_match:
        loc = "physical+mailing"
    elif phy_match:
        loc = "physical"
    else:
        loc = "mailing"
    return True, match_zip, county, loc


def valid_email(value: str | None) -> bool:
    email = (value or "").strip()
    if "@" not in email or "." not in email.split("@")[-1]:
        return False
    if email.upper() in {"NONE@", "N/A@", "NA@", "TEST@TEST.COM"}:
        return False
    return True


def classify_hotshot(row: dict, power_units: int | None) -> str:
    classdef = (row.get("classdef") or "").upper()
    cargos = cargo_list(row).upper()
    passengers = is_truthy(row.get("crgo_passengers"))
    if passengers and "GENERAL FREIGHT" not in cargos and "MACHINERY" not in cargos:
        return "passenger"
    for_hire = "AUTHORIZED FOR HIRE" in classdef
    hotshot_cargo = any(
        token in cargos
        for token in (
            "GENERAL FREIGHT",
            "MACHINERY",
            "METAL",
            "BUILDING MATERIALS",
            "LOGS",
            "OILFIELD",
            "INTERMODAL",
        )
    )
    if for_hire and power_units is not None and 1 <= power_units <= 3 and hotshot_cargo:
        return "likely_hotshot"
    if for_hire:
        return "for_hire"
    if "PRIVATE" in classdef:
        return "private_fleet"
    return "other"


def write_csv(path: Path, rows: list[dict], fieldnames: list[str]) -> None:
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    print("Downloading active WA physical-address carriers...", flush=True)
    phy_rows = fetch_all("status_code='A' AND phy_state='WA'")
    print("Downloading active mailing-WA / physical-not-WA carriers...", flush=True)
    mail_rows = fetch_all(
        "status_code='A' AND carrier_mailing_state='WA' AND phy_state != 'WA'"
    )

    by_dot: dict[str, dict] = {}
    for row in phy_rows + mail_rows:
        dot = (row.get("dot_number") or "").strip()
        if dot:
            by_dot[dot] = row
    print(f"Unique active WA-linked records: {len(by_dot)}", flush=True)

    complete: list[dict] = []
    small: list[dict] = []
    small_no_op_filter: list[dict] = []

    for row in by_dot.values():
        matched, match_zip, county, loc = in_sw_wa(row)
        if not matched:
            continue
        email = (row.get("email_address") or "").strip()
        if not valid_email(email):
            continue
        units = to_int(row.get("power_units"))
        op = (row.get("carrier_operation") or "").strip().upper()
        segment = classify_hotshot(row, units)
        out = {
            "DOT_NUMBER": row.get("dot_number", "").strip(),
            "LEGAL_NAME": (row.get("legal_name") or "").strip(),
            "DBA_NAME": (row.get("dba_name") or "").strip(),
            "EMAIL_ADDRESS": email,
            "TELEPHONE_NO": (row.get("phone") or "").strip(),
            "CELL_PHONE": (row.get("cell_phone") or "").strip(),
            "COMPANY_OFFICER": (row.get("company_officer_1") or "").strip(),
            "PHY_STREET": (row.get("phy_street") or "").strip(),
            "PHY_CITY": (row.get("phy_city") or "").strip(),
            "PHY_STATE": (row.get("phy_state") or "").strip(),
            "CLEAN_ZIP": match_zip,
            "PHY_ZIP": (row.get("phy_zip") or "").strip(),
            "MAILING_CITY": (row.get("carrier_mailing_city") or "").strip(),
            "MAILING_ZIP": (row.get("carrier_mailing_zip") or "").strip(),
            "COUNTY": county,
            "LOCATION_MATCH": loc,
            "NBR_POWER_UNIT": "" if units is None else str(units),
            "TRUCK_UNITS": (row.get("truck_units") or "").strip(),
            "BUS_UNITS": (row.get("bus_units") or "").strip(),
            "TOTAL_DRIVERS": (row.get("total_drivers") or "").strip(),
            "CARRIER_OPERATION": op,
            "CARRIER_OPERATION_LABEL": OP_LABEL.get(op, op),
            "CLASSDEF": (row.get("classdef") or "").strip(),
            "BUSINESS_ORG": (row.get("business_org_desc") or "").strip(),
            "CARGO": cargo_list(row),
            "SEGMENT": segment,
            "MC_NUMBER": " ".join(
                x
                for x in (
                    (row.get("docket1prefix") or "").strip(),
                    (row.get("docket1") or "").strip(),
                )
                if x
            ).strip(),
            "MC_STATUS": (row.get("docket1_status_code") or "").strip(),
            "HM_FLAG": (row.get("hm_ind") or "").strip(),
            "MCS150_DATE": (row.get("mcs150_date") or "").strip(),
            "MCS150_MILEAGE": (row.get("mcs150_mileage") or "").strip(),
            "SAFETY_RATING": (row.get("safety_rating") or "").strip(),
        }
        complete.append(out)
        if units is not None and 1 <= units <= 4:
            small_no_op_filter.append(out)
            if op in {"A", "C"}:
                small.append(out)

    def sort_key(r: dict) -> tuple:
        try:
            units = int(r["NBR_POWER_UNIT"]) if r["NBR_POWER_UNIT"] else 9999
        except ValueError:
            units = 9999
        return (r["COUNTY"], units, r["PHY_CITY"], r["LEGAL_NAME"])

    complete.sort(key=sort_key)
    small.sort(key=sort_key)
    small_no_op_filter.sort(key=sort_key)

    fieldnames = [
        "DOT_NUMBER",
        "LEGAL_NAME",
        "DBA_NAME",
        "EMAIL_ADDRESS",
        "TELEPHONE_NO",
        "CELL_PHONE",
        "COMPANY_OFFICER",
        "PHY_STREET",
        "PHY_CITY",
        "PHY_STATE",
        "CLEAN_ZIP",
        "COUNTY",
        "LOCATION_MATCH",
        "NBR_POWER_UNIT",
        "TRUCK_UNITS",
        "TOTAL_DRIVERS",
        "CARRIER_OPERATION",
        "CARRIER_OPERATION_LABEL",
        "CLASSDEF",
        "BUSINESS_ORG",
        "CARGO",
        "SEGMENT",
        "MC_NUMBER",
        "MC_STATUS",
        "HM_FLAG",
        "MCS150_DATE",
        "MCS150_MILEAGE",
        "SAFETY_RATING",
        "PHY_ZIP",
        "MAILING_CITY",
        "MAILING_ZIP",
        "BUS_UNITS",
    ]

    small_path = OUT_DIR / "SW_WA_Small_Carriers.csv"
    complete_path = OUT_DIR / "SW_WA_All_Active_With_Email.csv"
    hotshot_path = OUT_DIR / "SW_WA_Likely_Hotshot.csv"
    summary_path = OUT_DIR / "summary.json"

    hotshot = [r for r in small if r["SEGMENT"] == "likely_hotshot"]
    write_csv(small_path, small, fieldnames)
    write_csv(complete_path, complete, fieldnames)
    write_csv(hotshot_path, hotshot, fieldnames)

    def count_by(rows: list[dict], key: str) -> dict[str, int]:
        out: dict[str, int] = {}
        for r in rows:
            out[r.get(key) or ""] = out.get(r.get(key) or "", 0) + 1
        return dict(sorted(out.items(), key=lambda kv: (-kv[1], kv[0])))

    unique_emails_small = len({r["EMAIL_ADDRESS"].lower() for r in small})
    summary = {
        "source": "FMCSA Company Census File (data.transportation.gov/az4n-8mr2)",
        "active_wa_linked_downloaded": len(by_dot),
        "sw_wa_active_with_email": len(complete),
        "small_fleet_1_to_4_any_operation": len(small_no_op_filter),
        "small_fleet_1_to_4_operation_A_or_C": len(small),
        "unique_emails_small_A_or_C": unique_emails_small,
        "likely_hotshot_in_small_list": len(hotshot),
        "small_by_county": count_by(small, "COUNTY"),
        "small_by_city": count_by(small, "PHY_CITY"),
        "small_by_operation": count_by(small, "CARRIER_OPERATION_LABEL"),
        "small_by_segment": count_by(small, "SEGMENT"),
        "small_by_units": count_by(small, "NBR_POWER_UNIT"),
        "complete_by_county": count_by(complete, "COUNTY"),
        "files": {
            "campaign_list": str(small_path.name),
            "complete_with_email": str(complete_path.name),
            "likely_hotshot": str(hotshot_path.name),
        },
    }
    summary_path.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summary, indent=2))
    print(f"\nWrote {small_path}")
    print(f"Wrote {complete_path}")
    print(f"Wrote {hotshot_path}")
    print(f"Wrote {summary_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
