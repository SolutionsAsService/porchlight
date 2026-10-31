Critic: Evidence (Cairo), R1

Anchor used: Alberto Cairo, "How Charts Lie": is a figure true, reproducible, and framed so the reader knows what it stands for (the "what is the claim, and what was actually measured" test).

Observed in the work (recomputed):
- `node --test _src/test/engines.test.mjs`: 8/8 pass. `node _src/figures.mjs 2026-10-31`: moon 60% waning gibbous; 75x2 = 150 pieces, 4 bags, 10 spare; split 16/16/15; pace 90 left, 90 min, 40/h gives 60 expected, 1 each. All match index.html, dark.html and candy.html defaults.
- New York 31 Oct: engine 17:53:24 / 18:21:45 / 18:54:01 against reference (astral) 17:53:09 / 18:22:03 / 18:54:10. Errors 15, 18, 9 s. The test asserts <=60 s for sunset, civil and nautical dusk at all six cities, so "within a minute at six test cities" is what is asserted.
- Reference is independent (astral for sun, Skyfield/DE421 for moon, make_reference.py reproducible). Moon test: 5 dates, <=1 point, so "within one percentage point" is true at five sampled instants, not proven for every night. The wording "the moon agrees" reads broader than the sample.
- "Tonight" has two meanings. home.js uses 9 pm local; ui-dark.js uses that city's nautical dusk. Both give 60% today, but the instants differ, and the reference instant (23:00 UTC) is neither.
- Candy pacing: the test checks perKid x expected <= bowl on a coarse grid (rates 10/30/60 only; the page default is 40). The assumptions (steady arrival rate, the user's own rate guess) are visible as inputs and "about", and the page names the formula. It does not say that real arrivals peak early, so "can't run out early" holds only if the rate guess does.

Verdict: PASS. No verified defect; every printed figure reproduces.

Requested change (one): on dark.html, add scope to the check sentence: "agrees at five sampled dates" and "moon shown for nautical dusk; the front page uses 9 pm local", and add "assumes a steady rate of kids" to the candy method paragraph.

Statement of meaning: The numbers are real and checked against outside sources; the wording just promises slightly more than the five-date, steady-rate checks cover.

Critic question: if a visitor's evening differs from the sampled 9 pm or dusk instant by hours, does the page ever tell them which moment its "tonight" figure belongs to?
