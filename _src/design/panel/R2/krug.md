# R2 Critic: Usability (Krug)

Anchor used: Krug, Don't Make Me Think: the five-second test, the trunk test, "don't make me wonder", and the right to undo.

Observed:
- Five-second test, home (first-screen shot): in five seconds I know it is a Halloween site, there are five tools, and each is a labelled arrow. The "e.g." marks the samples as examples. Passes.
- Trunk test on split.html: site name, the current page (underlined in the nav), the page title, the tool, and "Next: Stencil" are all visible. Passes.
- Haul splitter checkbox groups: "Ada can't eat" with one tick box per candy kind is self-evident, and it beats the old text field. The legend and labels follow edits live (ui-split.js lines 39 and 43). The "Tick everything a kid can't eat" line is the only instruction needed.
- Dark o'clock: sunset, dusk and dark are all above the fold; the moon line is clear.
- New defect, verified in ui-split.js and split.html: "Add a kid" and "Add a kind of candy" exist, but no remove control (no splice, pop or Remove button). A mis-click leaves a blank "This kid" who is dealt candy and who a user cannot delete without reloading and losing all their entries.

Verdict: OBJECT (one concrete, verified defect: add-only lists with no undo).

Requested change: add a small "Remove" button per kid and per kind (min 24 px target, aria-label "Remove Ada"), keeping at least one of each.

Statement of meaning: Tick what each kid can't eat, and the pile is split fairly.

Critic question: When a kid or a candy kind is added by mistake, what is the user's one-click way back?
