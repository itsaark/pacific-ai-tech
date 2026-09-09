# SW Washington trucking outreach

Campaign workspace for Pacific AI Tech cold email to small for-hire / hot-shot carriers (FMCSA census, Clark / Cowlitz / Lewis / Skamania / Wahkiakum).

| If you are… | Open this |
| --- | --- |
| The agent writing or sending mail | [`AGENT.md`](AGENT.md) |
| Looking at progress | [`BOARD.md`](BOARD.md) |
| Editing copy | [`SEQUENCE.md`](SEQUENCE.md) |
| Spreadsheet tracking | [`tracker.csv`](tracker.csv) |
| Working a batch of 20 leads | [`work/B01.md`](work/B01.md) |

```bash
cd outreach/sw-wa-fmcsa
python scripts/campaign.py status
python scripts/campaign.py claim --batch B01 --agent YOUR_NAME
# edit work/B01.md, then:
python scripts/campaign.py sync
```
