# Evidence for panel round R1 (WHOLE artifact, after moves M1–M6)

Artifact: Porchlight, a Halloween-night kit, 7 pages. Repo root `D:\New folder\PrometheusIntelligence\porchlight`.
Built site: `site\` (pages `site\*.html`, scripts `site\js\*.js`). Sources: `_src\pages\*.html`, `_src\style.css`, `_src\build.py`,
`_src\data\tips.json`. Decision records: `_src\design\DESIGN-LOG.md`.

## The brief and its constraint
A useful Halloween website for today. The person asked explicitly for nothing like a "best spots" app — nothing a predator
could use. Porchlight has no maps, no lists of places, no sharing; every tool runs in the browser and keeps nothing.

## Pages
Home (a jack-o'-lantern whose carved features are the five tools, each labelled with a figure) · Dark o'clock (sunset, civil
and nautical dusk for a city or the visitor's own location, plus tonight's moon) · Candy math (bags to buy; pieces per kid now
so the bowl lasts) · Haul splitter (fair split among kids, respecting what each can't eat) · Stencil (a word to a printable
carving stencil in a stencil typeface, sized in cm) · Safety (8 tips, each paraphrasing a named source: FDA, American Academy of
Pediatrics, FARE) · About (what it doesn't do; privacy; how the numbers are checked).

## How the numbers are checked (run `node --test _src/test/engines.test.mjs` from the repo root; 8 tests)
- Sun: NOAA equations vs the astral library at 6 cities on 31 Oct 2026, within 60 s (New York sunset 17:53:09 reference;
  the page shows 5:53 PM).
- Moon: Meeus phase angle vs Skyfield + JPL DE421 at 5 dates, within 1 point (tonight 60.4 vs 60.22); phase names checked
  against Skyfield's waxing/waning.
- Candy pacing: never promises more than the bowl holds, across bowl sizes 0–120. Haul split: totals within one piece on
  500 random hauls; nothing given to a kid who avoids it. Stencil: text is escaped; size is in cm.
- The build re-runs the tests and fails if a figure the pages print changes (moon 60%, 150 pieces/4 bags, 16/16/15).

## Measurements (in-browser probe `_src\design\measure.js`, 7 pages, after the last edit)
| Check | 1280 x 800 | 375 x 812 |
|---|---|---|
| First screen (whole hero: pumpkin and all 5 labels): bottom / fold | 631 / 800, complete | 768 / 812, complete |
| Overlaps between labels and pumpkin; sideways scroll | 0; no | 0; no |
| Text contrast minimum, dark / light; failures | 9.55 / 5.58; 0 | 9.55 / 5.58; 0 |
| Carved features (graphics): candle yellow on the cut-edge rim | 8.01:1 (computed); without the rim it was 1.74:1 against the skin | |
| Page overflow; targets under 24 px; one h1 per page | 0; 0; yes | 0; 0; yes |
| Smallest text | 13 px | 13 px |
| Script errors on any page | 0 | 0 |
| Probe controls | hero pushed down → reported incomplete (1157 / 812) | |
Instrument notes: the probe now reads SVG `fill` (it had read CSS `color` and misreported the stencil); gradient-filled carved
shapes are measured by hand against their rim, and the blurred halo is decorative (`aria-hidden`).

## Screenshots (headless Chrome, fonts loaded)
`_src\design\shots\R1\index-first-screen-1280x800.png` (dark scheme, the first screen exactly) and `<page>-1280.png` for all 7.
Phone layout is given by the measurements (headless Chrome cannot render a true phone width).
