# Critic: Inclusion (Mace), R1, named check: focus visibility

**Anchor used:** Ronald Mace et al., The Principles of Universal Design: Principle 4 Perceptible Information (redundant presentation, adequate contrast), Principle 2 Flexibility in Use, Principle 5 Tolerance for Error, Principle 7 Size and Space for Approach and Use.

**Observed in the work:**
- style.css:18-19: global `:focus-visible` is a 3px outline, offset 3px, in --glow (dark) and #a33a00 (light). It covers every link, input, select and button, clears 3:1 on both grounds, and is not removed anywhere. Inputs and selects also change border colour (:80).
- Weak spot, style.css:63-64: `.feat:focus-visible` has `outline:none` and a 6-unit `--ink` stroke on the SVG shape. At phone size (viewBox 520 wide drawn at about 330 px) that is about 3.8 px, half of it hidden under the shape. In the dark scheme the focused hole turns #fff6cf, so the cream-on-cream inner half vanishes. In the light scheme --ink (#1d160f) lies on the #5a1f02 rim, so the outer half is near invisible. The ring is marginal. It is not a barrier: each feature has a twin label link (`.lab a`) to the same page with the full 3px ring, and the hole also brightens.
- Targets: inputs, selects and buttons have min-height 44px. Nav links come to about 38px, the source links have min-height 24px, and the label links are larger. 
- Reflow: `.row` and `.kid` wrap, `.times` is auto-fit minmax(170px) (one column at 375 px), and the table scrolls inside a focusable `tablewrap` region. Caveat: `main{overflow-x:clip}` would hide any overflow, so the "0 overflow" measurement cannot catch clipped content.
- Colour alone: the dusk-bar is `aria-hidden` and decorative. The times list borders are redundant, since each time has a text label and a figure.
- Motion: style.css has no animation or transition, so there is nothing to suppress. 
- Print: the stencil's @media print hides .mast, .foot, .pager, .band, .prose and every .tool child except .stencil-out. The skip link is off-screen. Only the stencil prints.

**Verdict:** PASS

**Requested change (one):** In `.feat:focus-visible .hole, .rib`, use a fixed high-contrast stroke that does not depend on the scheme, e.g. `stroke:#fff; stroke-width:12; paint-order:stroke;` with a dark inner edge, so the ring is at least 2 px visible on both schemes at 330 px.

**Statement of meaning:** Whoever navigates by keyboard should always see where they are, with the same certainty as a mouse user.

**Critic question:** If `overflow-x: clip` hid a clipped control at 375 px, which check would catch it?
