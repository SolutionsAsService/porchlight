Critic: Inclusion (Mace), R3. 
Anchor used: Mace et al., Principles of Universal Design, Principle 4 (Perceptible Information) and 5 (Tolerance for Error), plus 7 (Size and Space for Approach and Use); named check: focus visibility.
Observed (read from _src/style.css, site/split.html, site/js/ui-split.js; no browser run): Remove buttons sit in .wrap, outside .night-field, so they take the global :focus-visible ring: 3px solid var(--glow) with 3px offset in dark, #a33a00 in light (about 5.5:1 against the #f6ead6 tool panel). No rule removes the outline from button or .rm; only .feat does, and it supplies a replacement stroke. .rm keeps min-height 44px. The 16px page padding leaves room for the ring inside main's overflow-x clip. The accessible name "Remove <name>" contains the visible word "Remove". The h2 "The pile" has tabindex="-1" and is focused after removal, so the keyboard position survives the deletion and it takes the same ring. The lantern is aria-hidden and decorative. The CSP has no effect on focus.
Verdict: PASS
Requested change: none
Statement of meaning: Removing a kid is easy to reach, hard to hit by accident, and keyboard users never lose their place.
Critic question: Is the "at least one stays" rule announced anywhere, since the button simply disappears when one row remains?
