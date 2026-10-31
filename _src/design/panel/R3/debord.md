Anchor: Debord, Society of the Spectacle, thesis 1/18 (the image replacing the thing; the claim as appearance).
Observed: "Nothing is loaded from anywhere else" holds: no external src/stylesheet/script in any page; only same-origin fonts; external URLs are canonical and outbound links. CSP meta present on all 7 pages (default-src 'self'; connect-src 'none'; form-action 'none'). "Tonight's moon at 9 pm" matches home.js (setHours(21), local). Safety list has 9 <li> tips. Engine tests 8 pass, 0 fail. e.g. figures labelled as examples, not claims. The 47/3 split (16,16,15) is arithmetically right. Minor: "keep nothing" is true (no storage/fetch in js; geolocation used once).
Verdict: PASS
Requested change: none
Statement of meaning: The site says it shows only what it computes, and the code lets it say so.
Critic question: Does a page that disclaims every spectacle become one by advertising its own purity?
