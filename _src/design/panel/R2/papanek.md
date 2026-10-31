# Critic: Social (Papanek), R2

**Anchor used:** Victor Papanek, Design for the Real World: design answers a real need, and the designer answers for the harm the work enables.

**Observed in the work:**
- Grep of site\*.html and site\js\*.js: no fetch, XHR, beacon, WebSocket, localStorage, sessionStorage, cookie, share API, form, map or place list. The only http(s) strings are canonical/og tags, source links and the code link. Geolocation appears only in ui-dark.js, behind a click; coordinates stay in memory and feed a local sunset sum. about.html says so truthfully. Fonts are now self-hosted, so R1's third-party request is gone.
- safety.html matches tips.json. Phones read "while walking and crossing". The teal pumpkin is its own tip (08) cited to FARE alone. Nine tips, three sources.
- My R1 question: the "no network calls" rule is NOT written down for forkers. There is no README or CONTRIBUTING file, about.html does not mention forks, and there is no CSP (connect-src 'none') to enforce it. The footer and about page promise users, but nothing binds the code's next author.

**Verdict:** PASS. The shipped site has no verified harm. The undocumented constraint is a latent risk, not a defect now.

**Requested change (one):** Add a README with a short "Rules for changes" section: no network requests, storage, sharing, maps or place lists, because a "best spots" list can be used to find children. Optionally add a CSP meta with connect-src 'none'.

**Statement of meaning:** Porchlight hands a family the hour and the arithmetic, and hands nobody a way to find a child.

**Critic question:** Would you accept a CSP that makes the no-network rule fail in the browser rather than depending on a maintainer's memory?
