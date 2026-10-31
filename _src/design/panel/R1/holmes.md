# Critic: Inclusion (Holmes), R1

**Anchor used:** Kat Holmes, "Mismatch": exclusion is a mismatch between a person and the design; solve for one, extend to many.

**Observed in the work (verified in code):**
- Pumpkin: carved features are real `<a>` with aria-labels, `role=img` + `<title>`; the same five tools are also an HTML list beside it, plus a nav. Every tool is reachable without seeing the pumpkin. Good.
- Results are announced: `aria-live="polite"` on candy (b-out, p-out), dark (where, times), split (out), stencil (st-out). Stencil SVG has an aria-label. Time/number inputs are labelled, `inputmode` set.
- Dark o'clock: the choices are a fixed list of 14 cities (`sky.js` PLACES: N. America, London, Dublin, Berlin, Sydney; nothing in Asia, Africa or South America) plus "Use my location". There is no latitude/longitude or time-zone entry. Someone who declines location (the page itself says "Pick the nearest city") and lives in, say, Lagos, Mumbai or Sao Paulo gets another city's sunset, shown in that city's time zone (`tz` = the city's), so the printed time is wrong for them by hours. Times use `Intl` with `undefined` locale (local format) for "here"; fine.
- Haul splitter: "Can't eat" is one `<select>` per kid (ui-split.js). A child allergic to peanut and milk, or egg and tree nut, cannot be represented, and the tool would hand them one of the foods.
- Stencil: print or "Save as SVG" only; the font is Latin-only (text is upper-cased), so non-Latin names fall back. Sizes are cm only (acceptable, but US users get no inches). No printer means saving a file to a phone, which is hard.
- Contrast figures in evidence are strong (minimum 5.58); targets 24 px+.

**Verdict:** OBJECT. Concrete, verified exclusion: a family with a child who has more than one food allergy cannot use the Haul splitter safely, and that is the product's stated purpose (FARE, nobody gets what they can't eat).

**Requested change (one):** Make "Can't eat" multi-select per kid (checkbox group inside a fieldset/legend with the kid's name), and have the engine skip every selected kind. (Next in line, not requested: manual lat/lon or time-zone entry on Dark o'clock.)

**Statement of meaning:** A kit for everyone's Halloween has to keep the allergic child safe first, and tell the person without a listed city the truth about their own dark.

**Critic question:** If a tool's promise is "nobody gets what they can't eat", who is the one family it quietly breaks that promise for?
