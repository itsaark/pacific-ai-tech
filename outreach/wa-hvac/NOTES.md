# Washington HVAC emails from public-works filings

Built 2026-09-24. Oregon publishes no contractor email, so this file is Washington only.

The L&I contractor roster ([data.wa.gov `m8qx-ubtq`](https://data.wa.gov/Labor/L-I-Contractor-License-Data-General/m8qx-ubtq)) has phone and specialty, and no email. Emails are the filing-company address on [Intent Project Details](https://data.wa.gov/Labor/L-I-Intent-Project-Details/t9je-9qwa) (`t9je-9qwa`) and [Affidavit Project Details](https://data.wa.gov/Labor/L-I-Affidavit-Project-Details/9ncw-tqjn) (`9ncw-tqjn`), matched on contractor license number.

Kept licenses that are ACTIVE, have a Washington mailing address, and use specialty `SM` (HVAC/R construction), `6A` (HVAC/refrigeration electrical), `6B` (restricted), or `AB` (commercial/industrial refrigeration). Company, phone, city, and ZIP come from that license. `first_name` is blank: the filing address is often a staff inbox, and the registered principal is a different person. `county` is blank because this roster does not publish one. Nine-digit ZIPs are written as ZIP+4.

Emails were lowercased. A stray backtick was removed from one address. Blank values, placeholders, and `.gov` / `.mil` domains were dropped; none of the matched filings needed those drops. Repeated filings of the same address collapse to one row. One address used by two licenses stays on the row with more filled fields.

Active Washington HVAC-labeled licenses: 1,062

Licenses with a usable filing email: 228

Filing rows with a usable email: 20,793

Unique emails written: 354

Licenses represented after email dedupe: 222 (6 licenses only repeated an address already kept for another license)

Companies: 215. 66 of those have more than one email, because different people filed wage paperwork for the same contractor.

| Specialty on the kept license | Emails |
| --- | ---: |
| SM HVAC/R construction | 264 |
| 6A HVAC/refrigeration electrical | 71 |
| AB commercial/industrial refrigeration | 17 |
| 6B HVAC/refrigeration restricted | 2 |

Every written row has a phone. State is WA on every row. Rebuild with `python3 outreach/wa-hvac/scripts/build_list.py`.
