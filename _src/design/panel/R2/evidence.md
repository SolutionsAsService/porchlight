# Evidence for panel round R2 (WHOLE artifact, after moves M7–M11)

Artifact: Porchlight, repo root `D:\New folder\PrometheusIntelligence\porchlight`; built site `site\`; sources `_src\`.
R1 panel report and decisions M1–M11: `_src\design\DESIGN-LOG.md`. Round cap: R3 is the last round.

## What changed since R1
- M7 (Debord, Cairo, Krug, Papanek): fonts self-hosted (site\fonts, 4 woff2); no page loads anything from another host
  (0 pages reference fonts.googleapis). "your phone" → "your device". Front-page sample figures begin "e.g."; the moon figure
  says "Tonight's moon" (computed for 9 pm local). The Stencil label: "Any word, printed to fit your pumpkin." / "The pumpkin's
  mouth is set in its stencil type." Dark o'clock states its test scope (six cities; five moon dates; moon shown for full dark).
  Candy math says it assumes a steady rate. Safety: phones "while walking and crossing"; teal pumpkin is its own tip, cited to
  FARE alone (9 tips now).
- M8 (Holmes): the Haul splitter's "can't eat" is a checkbox group per kid (fieldset + legend); engine test covers two avoided
  kinds. Dark o'clock has 21 cities, including São Paulo, Buenos Aires, Lagos, Johannesburg, Mumbai, Singapore and Tokyo.
- M9 (Arnheim): the hero and every page band are a night field in both colour schemes.
- M10 (Shklovsky, Mace): the moon eye is a full disc, the unlit part left as dark rind; focus on a pumpkin feature draws a
  14-unit white stroke under the shape (paint-order). The stencil's printed instruction sits below the dashed oval.
- M11 (S4 ambition push): every inner page's band carries the same lantern with only that page's feature lit ("you are
  here"); measured 0 → 6 pages; one feature lit per tool page; the splitter page lights the rib seams.
- Krug's R1 question measured: on a phone, all three evening times are now on Dark o'clock's first screen (783–797 of 812).

## Measurements (probe `_src\design\measure.js`, 7 pages, after the last edit)
| Check | 1280 x 800 | 375 x 812 |
|---|---|---|
| Hero (pumpkin + 5 labels) bottom / fold | 633 / 800, complete | 768 / 812, complete |
| Overlaps; sideways scroll | 0; no | 0; no |
| Text contrast minimum dark / light; failures | 9.55 / 5.58; 0 | 9.55 / 5.58; 0 |
| Carved light on its rim (computed) | 8.01:1 candle yellow, 4.93:1 orange edge | |
| Overflow; targets < 24 px; one h1 | 0; 0; yes | 0; 0; yes |
| Engine tests | 8 pass, 0 fail | |

## Screenshots
`_src\design\shots\R2\` (headless Chrome, fonts loaded): first screen 1280 x 800 and each page at 1280. If a file is missing,
the measurements above stand; `_src\design\shots\R1\` shows the state before M7–M11.
