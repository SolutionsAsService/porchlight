# Porchlight

A Halloween-night kit: when it gets dark where you are, how much candy to buy and how fast to give it, a fair split of the haul, a printable carving stencil, and sourced safety tips. Everything runs in the visitor's browser and keeps nothing.

- Live address: https://porchlight.shadw.app/
- Built site: `site/` (committed). Generator: `python _src/build.py` (needs Python 3 and Node 18+).
- Engines: `site/js/*.js`, tested with `node --test _src/test/engines.test.mjs` against independent references (`_src/test/make_reference.py`).
- Design record: `_src/design/DESIGN-LOG.md`.

## Rules for changes

This site exists partly because of what it refuses to be. Keep these rules; a change that breaks one should not be merged.

1. **No maps, no places.** No lists of houses, streets, neighbourhoods or "best spots", and no feature that records or shares where anyone is going. A list like that is useful to people who want to find children.
2. **Nothing leaves the device.** No network requests from page scripts (no fetch, XHR, beacons, sockets), no analytics, no cookies, no storage. Fonts and scripts are served from this site. The pages carry a Content-Security-Policy (`connect-src 'none'`) so the browser itself refuses a request if one is ever added.
3. **Location is used once.** The only location the site touches is the visitor's own, from their browser's prompt, used in memory to compute dusk and then dropped.
4. **Every number is computed and tested.** A figure printed on a page comes from `_src/figures.mjs` (the same engines the browser runs); the build fails if the tests fail or a printed figure changes.
5. **Safety advice is sourced.** Each tip in `_src/data/tips.json` paraphrases a named source and links to it.

By SolutionsAsService.
