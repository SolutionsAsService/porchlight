# Evidence for panel round R3 — the final round (cap) — WHOLE artifact after M12

Repo root `D:\New folder\PrometheusIntelligence\porchlight`. Built site `site\` (ignore `site\__harness.html` and
`site\__probe.js`: temporary measuring files, deleted before commit). Decisions and R1–R2 reports: `_src\design\DESIGN-LOG.md`.
Repository rules for anyone changing the code: `.github\README.md` ("Rules for changes").

## Since R2 (move M12)
- Haul splitter: a Remove button (44 px, named "Remove <name>") on every kid and kind; at least one of each stays; labels
  follow renames. Tested in the browser: two avoided kinds respected; removing a kid and a kind recomputes the split.
- Every page carries a Content-Security-Policy meta: default-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'none';
  object-src 'none'. In the browser both a same-origin and an external fetch are refused; fonts and scripts still load; 0 console
  errors on all 7 pages.
- The band lantern is 168 px (104 on phones) with its skin at half brightness; the splitter's rib seams are drawn thicker.
- The front page's moon label reads "Tonight's moon at 9 pm: …".

## Measurements (probe `_src\design\measure.js` via the harness, all 7 pages, after the last edit)
| Check | 1280 x 800 | 375 x 812 |
|---|---|---|
| Hero (pumpkin + 5 labels) bottom / fold; overlaps | 633 / 800, complete; 0 | 790 / 812, complete; 0 |
| Text contrast minimum dark / light; failures | 9.55 / 5.58; 0 | 9.55 / 5.58; 0 |
| Overflow; targets < 24 px | 0; 0 | 0; 0 |
| Dark o'clock on a phone: sunset, dusk, dark bottoms | — | 783, 797, 783 (all on the first screen) |
| Engine tests | 8 pass, 0 fail | |
| Probe control | planted 1.92:1 text flagged | |

## Screenshots
`_src\design\shots\R3\index-first-screen-1280x800.png` (light scheme) and `<page>-1280.png` for all 7 pages.
