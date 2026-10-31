Critic: Social (Papanek), R3

Anchor used: Papanek, Design for the Real World, the designer's social and moral responsibility. A tool for children's night must not become a tool against them.

Observed:
- .github\README.md rule 2 says nothing leaves the device (no fetch, XHR, beacons, sockets, analytics, cookies, storage) and names the CSP (`connect-src 'none'`) as the browser-level enforcement. Rule 1 bans maps, places and shared routes. My R2 request is met.
- All 7 site pages (index, dark, candy, split, stencil, safety, about) carry the same CSP meta: default-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'. Only the ignored harness/probe differ.
- Grep of site (excluding temporary files) found no fetch, XMLHttpRequest, sendBeacon, WebSocket, localStorage, sessionStorage, cookie or indexedDB. The one geolocation call is in js\ui-dark.js, behind the browser prompt, per rule 3. The only external URLs are canonical/OG/sitemap metadata and plain links to GitHub.

Verdict: PASS

Requested change: none

Statement of meaning: Nothing on this site can locate, list or follow a child, and a fork that tries to send data out is refused by the browser itself.

One critic question: Should the README also say a fork must not loosen the CSP to add analytics, so that the next maintainer meets the rule before the temptation?
