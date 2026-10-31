# Critic: Inclusion (Holmes), R2

**Anchor used:** Kat Holmes, "Mismatch": exclusion is a mismatch between person and design; solve for one, extend to many.

**Observed in the work (verified in code):**
- R1 splitter objection resolved: ui-split.js renders a fieldset with a legend ("<name> can't eat") and one checkbox per candy kind per kid; the legend updates when the name is edited; kinds can be renamed and the checkboxes follow. split.js skips every kid whose avoid[] includes the pile, and reports kinds nobody can eat as "the grown-ups' share". Multi-allergy children are now representable.
- R1 city objection resolved in substance: PLACES now lists 21 cities including Sao Paulo, Buenos Aires, Lagos, Johannesburg, Mumbai, Singapore, Tokyo. Residual gap: still no manual lat/lon or time-zone entry, so a place far from any listed city must use location or the nearest city. Not a verified exclusion of a person, a limit of reach.
- M7-M11: the page lantern sits in a div.band-ic with aria-hidden, but every page has an h1 and a band-line sentence stating what the page is; the lantern only duplicates "you are here". Nothing is conveyed by it alone. The dusk-bar is also aria-hidden and decorative. Pages are understandable without it.
- Self-hosted fonts and "your device" wording remove a network dependency and a phone-only assumption.

**Verdict:** PASS. I found no concrete, verified new exclusion.

**Requested change:** none (next in line, not required: manual latitude/time-zone entry on Dark o'clock).

**Statement of meaning:** Every child's list of foods to avoid can now be told to the tool in full, and the light on the page is never the only way to know where you are.

**Critic question:** Past 21 cities, who still has to guess which listed city is "nearest" to them?
