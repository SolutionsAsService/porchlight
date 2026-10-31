# Critic: Provocateur (Debord), R1

**Anchor used:** Debord, The Society of the Spectacle: "everything that was directly lived has moved away into a representation." Does the page show the thing, or a picture of the thing?

**Observed in the work (verified in code):**
- Largely honest. Sun, moon, candy, split and stencil engines are real and local (js/sky.js, candy.js, split.js, stencil.js); no fetch, storage or cookies in site/js. Safety tips: 8, each with named source links (tips.json, safety.html). The moon figure is live (home.js recomputes it for 9 pm local); the screenshot reads 59% against 60% in the evidence file, which is fine.
- Defect 1: the front-page labels "75 kids x 2 = 150 pieces, 4 bags of 40" and "47 pieces, 3 kids: 16, 16, 15" are fixed sample inputs (figures.mjs, build.py), printed as bold fact beside the live moon figure with no word "example". A visitor reads them as results for them: a number standing in for a computation that has not been done.
- Defect 2 (smaller): "The mouth above was cut by it" - the mouth is hand-placed SVG text in build.py, styled with the same font via CSS; it is not stencil.js output (stencil.js emits its own SVG). The stencil page says "is this tool's output for BOO", which is only true of the typeface and text.
- Defect 3 (smaller): "nothing leaves your phone" and "keeps nothing" sit in the hero and every footer while the page loads Google Fonts (a third-party request that discloses the visitor's IP). The about page admits it; the hero and footer do not. "Your phone" is also said to desktop visitors.

**Verdict:** OBJECT

**Requested change (one):** Label the three fixed front-page figures as examples ("Example: 75 kids x 2 = 150 pieces...") so only the live moon figure reads as tonight's fact; if cheap, also soften the mouth line to "set in the same stencil type".

**Statement of meaning:** A kit should hand over working tools and mark its own demonstrations as demonstrations, so the front page shows what it does rather than advertising an outcome.

**Critic question:** Which figure on the front page could a visitor type their own numbers into without leaving it, and if none, why is a sample presented as a result?
