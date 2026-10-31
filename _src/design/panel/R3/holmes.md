# Critic: Inclusion (Holmes), R3
Anchor used: Kat Holmes, Mismatch: exclusion arises when a design's interaction does not fit a person's ability, situation or context (persona spectrum: permanent, temporary, situational).
Observed: Remove buttons carry aria-label "Remove <name>" that follows renames (ui-split.js 12, 17, 42, 46), min-height 44 px (style.css 101), and are omitted when one row is left. Fonts are self-hosted woff2 with font-display swap, so text shows without them. The CSP (default-src 'self'; connect-src 'none') is on every shipped page; only __harness.html lacks it. Fonts and scripts are same-origin, so nothing is blocked. No verified exclusion.
Verdict: PASS
Requested change: none
Statement of meaning: A tired parent on a phone can fix a slip with a large, clearly named button, offline, with no outside requests.
Critic question: After Remove, focus goes to s-h; is that heading focusable (tabindex -1), so a keyboard user is not dropped to the page top?
