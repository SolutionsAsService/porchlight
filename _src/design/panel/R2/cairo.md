Critic: Evidence (Cairo), R2

Anchor used: Alberto Cairo, "How Charts Lie": a figure must be reproducible and framed so the reader knows what it stands for.

Observed (recomputed):
- Engine tests: 8/8 pass, including "every listed place has an evening" (covers the new cities). figures.mjs 2026-10-31: moon 60% waning gibbous; 75x2 = 150 pieces, 4 bags of 40, 10 spare; 47-piece split 16/16/15; pace 90 left, 90 min, 40/h gives 60 expected, 1 each. build.py: 7 pages, 8 tests passed.
- index.html: "Tonight's moon: 60% lit, waning gibbous", "e.g. 75 kids x 2 = 150 pieces: 4 bags of 40", "e.g. 47 pieces, 3 kids: 16, 16, 15" all match. tips.json holds 9 tips from 3 sources, matching "9 tips" and the three named sources.
- R1 requests landed. dark.html says sun "within a minute at six test cities on 31 October 2026", moon "at five dates, within one percentage point", shown "for full dark (the front page uses 9 pm)". candy.html says "assumes kids arrive at a steady rate, which real nights rarely do".
- Evidence-file claims reproduce except the layout measurements (hero bottom, contrast ratios, 0 to 6 lit pages), which come from the measure.js probe; I did not rerun them and they are outside my seat.
- Residual: the 15 added cities are tested for having an evening, not for minute accuracy. The page's "six test cities" wording is honest about this.

Verdict: PASS. No verified defect; no figure is unreproducible.

Requested change: none.

Statement of meaning: Every printed number reproduces, and the wording now claims only what the tests sampled.

Critic question: should the front page's "Tonight's moon" say "at 9 pm" beside the figure, as dark.html now does?
