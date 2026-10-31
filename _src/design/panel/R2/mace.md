# R2 Critic: Inclusion (Mace) - focus visibility

Anchor used: Principle 4, Perceptible Information (adequate contrast, redundant modes), with Principle 3 (Simple and Intuitive Use) and Principle 7 (Size and Space for Approach and Use).

Observed (static read of style.css, site/split.html, js/ui-split.js; no browser run):
- .feat:focus-visible draws a white 14-unit stroke, paint-order stroke, on .hole/.rib/.unlit. My R1 request is met in both schemes.
- .night-field :focus-visible sets outline #ffc24a (pumpkin hero and band) on #0b0d14. The mast sits outside the field, so it keeps #a33a00 in light and var(--glow) in dark. Each focus colour is paired with its own background; no light-scheme field inherits the dark-on-light outline.
- Checkboxes are native inputs inside label.chk (flex, min-height 32 px; the whole label is the click target, 22 px box) inside fieldset.avoid with a legend naming the kid. Tab, Space and arrow-free native behaviour work; the handler listens to "input", which Space fires; the group is not re-rendered on toggle, so focus is kept. They take the global 3 px outline on the light page body.
- Band lantern is aria-hidden; lit vs unlit is colour/brightness only, but it repeats what the h1 and nav aria-current="page" already state, so nothing is lost without it.

Verdict: PASS

Requested change: none

Statement of meaning: A keyboard or switch user can always see where they are, including on the night band, and operate every per-kid food exclusion.

Critic question: Has the focus ring on the pumpkin features and the night-field outline been seen once in a real browser at 375 px in forced-colors mode, where SVG strokes and outline-color may be overridden?
