# Critic: Social (Papanek), R1

**Anchor used:** Victor Papanek, Design for the Real World: design answers real need, and the designer answers for harm the work enables.

**Observed in the work:**
- No tracking surface. A grep of site\*.html and site\js\*.js finds no fetch, XHR, beacon, WebSocket, localStorage, share API, form or map. There is no list of homes, routes, times or children. Nothing can be used to find or follow anyone.
- site\js\ui-dark.js: geolocation is called only on a click. The coordinates sit in one in-memory variable (`here`) and feed a local sunset sum. They are never sent or persisted, and nothing is stored. dark.html and about.html state this truthfully. The only third-party request is Google Fonts (not location data), and about.html discloses it.
- Need: sunset and dusk (when to be seen), candy pacing, a fair split with allergy exclusions, and a stencil are real Halloween-night tasks. Stencil is the most decorative, but it is harmless.
- safety.html versus tips.json sources (FDA and AAP fetched):
  - Supported: meal first, wait until inspected, choking hazards, home-baked for allergic children, reflectors and flashlight, group and return time, never enter a home or car, lit streets and crosswalks, emergency medicine.
  - Small gaps: FDA says "don't accept unwrapped" and "throw away anything suspicious", while the tip says to throw away anything unwrapped. The AAP does not ban phones; it says to discuss distracted walking. The teal pumpkin is correctly attributed to FARE, not the AAP (the AAP page does not mention it, and tip 7 also cites it).

**Verdict:** PASS. I found no concrete, verified harm. The two source-wording gaps are small.

**Requested change (one):** In the "Crossing the street" tip, soften "keep phones and music away" to "put phones and music away while crossing". That is closer to the AAP wording. Optionally, cite FARE alone for the teal pumpkin.

**Statement of meaning:** A Halloween kit that gives parents the hour and the arithmetic and gives no one a way to find a child.

**Critic question:** If someone self-hosts or forks the code, which constraint (no network calls) would still stop a "best spots" feature from being bolted on, and is it written down for them?
