# Critic: Usability (Krug), R1

Anchor used: Steve Krug, Don't Make Me Think: five-second test, trunk test, self-evident labels.

Observed in the work
- Five-second test (index-first-screen-1280x800.png): the h1 "Halloween night, lit from inside." plus the sub "Five small tools for tonight. They run on your device and keep nothing." says what it is. Five labelled tools sit in view with arrows and a one-line figure each (Dark o'clock, Candy math, Haul splitter, Stencil, Safety), and the nav repeats them. A newcomer can name three and knows to click a label.
- Pumpkin features are real links (a.feat with aria-labels), but nothing visible says so: no cursor cue, no leader line to a label, no hover state in the shot. The labels carry the affordance; the carved shapes are decoration to a sighted first-timer. Acceptable, because the labels are self-sufficient.
- Label copy leads with a figure, not the task: "Stencil: The mouth above was cut by it." is cute, and "above" is wrong on the right column and on the stacked phone order (markup: labs-l, pumpkin, labs-r, so Stencil lands below the pumpkin).
- Shot says "Moon 59% lit" while the markup and dark.html say 60%: a small trust leak.
- Trunk test: candy.html and dark.html both show site name, six-item nav with aria-current, an h1 that names the page, a one-sentence purpose and a "Next" pager. Section headings are plain ("Before: how much to buy", "Tonight"). Pass.
- Phone order: band, then inputs, then .answer, with the explanation prose after. Candy's answer should sit near 500-550 px of 812, in view. Dark has a long band sentence, three controls, a note, then times, so the sunset likely lands near the fold. Not measured.

Verdict: PASS

Requested change (one): change the Stencil label's figure to a self-evident line such as "Any word, printed to size for your pumpkin", dropping "above".

Statement of meaning: a newcomer reads a kit of five Halloween-night tools and clicks the labelled one they want.

One critic question: on a 375 px phone, is dark.html's sunset time visible without scrolling, or does the long band sentence push it below the fold?
