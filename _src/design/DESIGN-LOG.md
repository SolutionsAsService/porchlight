# DESIGN-LOG: Porchlight (porchlight.shadw.app)

## Traversal Plan

**Brief, restated:** a useful Halloween-night website for today, built with DADA. Constraint from the person: no "best spots" or anything that maps houses, routes or where children are, nothing a predator could use. Answer: a kit of tools that run entirely on the visitor's device, store nothing and locate no one but the visitor, for the visitor's own eyes.

**Mode: Adaptive** (a public, practical tool on a family night; MAYA governs). **Run type: Full** with the Landing steps inside. R0: not required (nothing exists). **Round cap: 3 WHOLE rounds** (the person's standing rule: bound critic rounds).
Read before Step 1: `dada-lessons/GRADES.md` and lessons 40–42, 57 (the A-grade landing is one composed graphic summarising every page, each with a computed figure, complete on the first screen, made from the product's own work), and the two carry-forward files from this session (SmartCOBOL, Esoteric Languages).

### Step 0: Tooling inventory
| Job | Tool used |
|---|---|
| Graph | none available (no renderer); Mermaid text here |
| Frontier | by hand from `references/anchor-graph.md` (grep) |
| Workflow state | the app's task list plus the Frontier table |
| Panel | the Agent tool, one agent per reference, at most three at a time, filing to `_src/design/panel/R<n>/` |
| Collect | `scripts/collect_panel.py` |
| Measure | in-app browser probe (`_src/design/measure.js`, with failing controls) at 1280 x 800 and 375 x 812; headless Chrome shots with `--virtual-time-budget` |
| Engines | `site/js/*.js` ES modules, tested with `node --test` against independent references (Python `astral` and `ephem` for the sky) |

### Inventory (Landing step 1)
| Page | What it does tonight | Figure for the hero |
|---|---|---|
| Dark o'clock | sunset, civil and nautical dusk for the visitor's location, computed on the device; tonight's moon | the moon's lit fraction tonight (same everywhere), and dusk once the visitor shares a location with their own browser |
| Candy math | how much to buy; how many pieces per kid to give now so the bowl lasts | a worked example computed by the engine |
| Haul splitter | split a pile of candy fairly between kids, respecting what each can't eat | the guarantee its tests prove (totals within one piece) |
| Stencil | turn a name or word into a printable carving stencil sized to the pumpkin | the hero's own mouth, carved by it |
| Safety | a short list of tips, each from a named source | the number of sourced tips |
| About | what the site does not do: no tracking, no maps, nothing leaves the device | — |

### Seed (labels verbatim)
- **Stance:** `Design as Art (Bruno Munari)` --method for--> `Fantasia (Bruno Munari)`
- **Rules:** `Gestalt Principles of Perception (Wertheimer, Koffka, Köhler)` --grounds--> `Art and Visual Perception (Rudolf Arnheim)`; `Interaction of Color (Josef Albers)`
- **Breaker:** `Saul Bass: A Life in Film and Design (Jennifer Bass, Pat Kirkham)`
- **Counterpoint (dotted):** `WCAG 2.2 Contrast and Perceivability (W3C)` -.contrast floor constrains.-> `Interaction of Color (Josef Albers)`
- **Dotted edges leaving seed nodes (S5):** `Saul Bass…` -.peer of.-> `A Designer's Art (Paul Rand)`; `Interaction of Color (Josef Albers)` -.experiential counterpoint to.-> `The Art of Color (Johannes Itten)`; `WCAG 2.2…` -.accessibility floor under.-> `The End of Print (David Carson, Lewis Blackwell)`.

**Why these.** Munari: design is making useful things playfully, exactly a night kit. Gestalt: a jack-o'-lantern is a face made of holes (closure); the hero can be a face whose features are the tools. Albers: the whole night is one colour interaction, warm light through a dark skin; the glow must be designed, not filled. Bass: cut-paper horror titles, a few bold shapes doing all the work. WCAG: glowing orange text on black fails easily; the floor constrains the glow.

### Initial Frontier
| Candidate | Reached via | From | Status |
|---|---|---|---|
| The pumpkin face as the site map: each carved feature is a tool | grounds (closure) | Gestalt | OPEN |
| The glow: light from inside, orange through black | stance of colour | Albers | OPEN |
| Cut-paper hero shapes, one strong silhouette | breaker | Bass | OPEN |
| Contrast floor for every glowing text | contrast floor constrains (dotted) | WCAG | OPEN |
| Useful first: every tool works in one screen, no sign-up | method | Munari | OPEN |
| Privacy as a design constraint (nothing leaves the device) | brief | — | OPEN |
| Rand's restraint as Bass's peer | peer of (dotted) | Bass | OPEN |
| Itten's colour wheel as Albers's counterpoint | experiential counterpoint (dotted) | Albers | OPEN |
| Carson's rule-breaking under the accessibility floor | accessibility floor under (dotted) | WCAG | OPEN |

### Panel (Adaptive)
One agent per reference: Debord, Shklovsky (Provocateur); Holmes, Mace (Inclusion); Cairo (Evidence, measuring); Krug (Usability); Arnheim (Formalist); Papanek (Social: design for real need and real harm, the person's safety worry). Dotted pair: Krug ↔ Debord.

## Decision Records (written in a batch before building; recorded as a deviation)

## Move M1: The pumpkin is the site map  (KEEP-THE-RULE)
Depends on: none
Anchors: Rule Gestalt Principles of Perception (Wertheimer, Koffka, Köhler) | Rule Art and Visual Perception (Rudolf Arnheim) | Stance Design as Art (Bruno Munari)
Intent: the landing's first screen is one jack-o'-lantern. Each carved feature is a tool and a link: the left eye is the moon (Dark o'clock), the right eye a wrapped sweet (Candy math), the nose a warning triangle (Safety), the mouth's evenly spaced teeth (Haul splitter), and the mouth itself carved with the word BOO by the stencil engine (Stencil). Each feature carries a label with its figure.
Formal argument: closure makes holes into a face (Gestalt); one figure with a strong centre holds five topics without a grid of cards (Arnheim); lessons 41–42: one composed graphic that summarises the site.
Alternatives rejected: (1) five cards: "six cards in a row is not a form"; (2) a map of a street: the one image the person ruled out.
Consequence: labels must not crowd the face on a phone; measure the bottom edge at 375 x 812.
Frontier effect: hero measurement; the stencil engine must exist before the hero.
Mode field: Advanced: a face whose features are tools. Acceptable: every feature labelled in words.

## Move M2: Light from inside  (KEEP-THE-RULE)
Depends on: M1
Anchors: Rule Interaction of Color (Josef Albers) | Counterpoint WCAG 2.2 Contrast and Perceivability (W3C) (dotted)
Intent: the page is night (near-black, cool); the only warm light comes through carved shapes, as a gradient from candle-yellow at the centre to orange at the edges. Text is never set in glowing orange on black unless it passes 4.5:1; small text is warm white.
Formal argument: Albers: a colour is read by its neighbour, so the orange reads as light only against cold dark; WCAG sets the floor the glow must clear.
Alternatives rejected: (1) orange and purple party palette: decoration, not light; (2) light mode by default: the night is the subject. A light scheme is still provided for daytime and print.
Consequence: two schemes; contrast measured in both.
Frontier effect: contrast probe with worst gradient stop.
Mode field: Acceptable: contrast floor.

## Move M3: Cut paper  (BREAK)
Depends on: M1, M2
Anchors: Breaker Saul Bass: A Life in Film and Design (Jennifer Bass, Pat Kirkham)
Intent: the pumpkin and every page band are drawn as a few flat, slightly irregular cut shapes (no gradients on the skin, no outlines), the way Bass cut a title; inner pages take one cut shape each (a moon, a sweet, a triangle, teeth, a knife's cut letter).
Formal argument: Bass: one strong silhouette carries a whole film; a Halloween night is remembered as shapes in the dark.
Alternatives rejected: (1) photographic pumpkins: stock, and heavy; (2) a cartoon illustration: costume, not design.
Consequence: hand-tuned SVG paths in the build.
Fence: the grid exists so the reader can find things; the break is in the shapes, not the reading order.
Frontier effect: S4 push of this move later.
Mode field: Advanced pole.

## Move M4: Nothing leaves the device  (KEEP-THE-RULE; the person's constraint)
Depends on: none
Anchors: Stance Design as Art (Bruno Munari) | the brief
Intent: every tool is a small ES module that runs in the browser. Location comes only from the visitor's own browser prompt or a typed city, is used once to compute dusk, and is never sent, stored or shown to anyone. No analytics, no cookies, no storage, no map, no list of places. The About page says so and the code is linked. Engines are tested with `node --test` against independent references.
Formal argument: the useful tonight is about time, quantity and fairness, not places; refusing the map removes the harm by design rather than by policy.
Alternatives rejected: (1) a "best streets" map: ruled out by the person; (2) a server API for sunset: sends location away.
Consequence: no backend; works offline once loaded.
Frontier effect: the Papanek seat tests the claim.
Mode field: Acceptable: trust.

## Move M5: Every tool in one screen  (KEEP-THE-RULE)
Depends on: M4
Anchors: Stance Design as Art (Bruno Munari) | Fantasia (Bruno Munari)
Intent: each tool page opens with the tool itself (inputs and answer) above the fold, explanation below; inputs have sensible defaults so the answer shows before anyone types.
Formal argument: on the night, a parent has one hand free; Munari: the object should explain itself in use.
Alternatives rejected: an explanation-first article: wrong order for tonight.
Consequence: forms must fit 375 x 812 with their answer.
Mode field: Acceptable pole.

### Render notes for M1–M5 (measured)
- First render: labels for Safety and Haul splitter overlapped on the left (absolute row offsets); rebuilt as two flex columns spaced evenly: 0 overlaps measured between labels and pumpkin.
- First screen rule: hero bottom 631 / 800 at 1280 x 800, 768 / 812 at 375 x 812, complete, no sideways scroll; control (hero pushed down 400 px) reports 1157 / 812, incomplete, so the check can fail.
- Tools: all six pages run with no script errors; Dark o'clock shows New York sunset 5:53 PM, civil 6:21 PM, nautical 6:54 PM on 31 Oct 2026 (reference 17:53:09, 18:22:03, 18:54:10). Candy pacing in the afternoon counted the wait until evening as handing-out time; added a "porch light on at" time and count from the later of now and that.
- Instrument fix: the probe read CSS `color` for SVG text, so the stencil (black `fill` on white, 21:1) was reported as 1.2:1. It now reads `fill` for SVG text.
- Contrast: dark scheme minimum 9.55:1, no failures. Light scheme flags the pumpkin's BOO: its fill is a gradient the probe cannot read, but measured by hand the candle yellow (#ffc24a) against the skin (#f07a1c) is about 1.7:1. The carving reads by hue, not by lightness. → M6.

## Move M6: The cut edge  (KEEP-THE-RULE; Albers under the WCAG floor)
Depends on: M2, M3
Anchors: Rule Interaction of Color (Josef Albers) | Counterpoint WCAG 2.2 Contrast and Perceivability (W3C) (dotted)
Intent: every carved hole gets the dark wall a real jack-o'-lantern shows where the knife went through: a rim of #5a1f02 around each shape, under the glow. The light then meets a dark neighbour instead of orange skin.
Formal argument: Albers: the same yellow reads as light only next to dark; WCAG 1.4.11 asks 3:1 for graphics needed to understand the page (the features are the links).
Alternatives rejected: (1) darken the whole skin: kills the orange that says pumpkin; (2) outline the shapes in black: a cartoon line, not cut paper.
Consequence: one more layer per feature.
Measured after: see M6 result.
Mode field: Advanced: the carving made real. Acceptable: contrast.

## Move M6 result
Candle yellow (#ffc24a) on the rim (#5a1f02): 8.01:1; orange edge of the glow (#ff7a1a) on the rim: 4.93:1; without the rim the glow met the skin (#f07a1c) at 1.74:1. The probe now skips gradient-filled shapes as graphics (measured by hand above) and the blurred halo is `aria-hidden`. Light scheme minimum text contrast after M6: 5.58:1, no failures; dark 9.55:1.
Also: the front page's moon now means 9 pm local tonight (it had meant "this minute").

## Panel Reports

### Panel, WHOLE, round R1  (artifact: site/ after M1–M6; evidence `_src/design/panel/R1/evidence.md`; shots `_src/design/shots/R1/`)
Eight seats, one agent per reference, at most three at a time; 8 of 8 filed.

| Critic | Anchor used | Observed in the work | Verdict | Requested change |
|---|---|---|---|---|
| Critic: Social (Papanek) | Design for the Real World: real need, responsibility for harm | grep of every page and script: no fetch, XHR, beacon, socket, storage, share, form or map; geolocation only on click, held in one variable, never sent; each tool a real need; tips match FDA and AAP except two wordings (phones; teal pumpkin attributed beside AAP) | PASS | soften the phones wording; FARE alone for teal |
| Critic: Provocateur (Debord) | Society of the Spectacle, thesis 1 | engines real and local; but the front page prints sample inputs (75 kids…, 47 pieces…) as bold fact; "the mouth was cut by it" is the same typeface, not the stencil tool's output; "nothing leaves your phone" while Google Fonts loads (IP disclosed) | OBJECT | mark examples as examples; honest mouth line |
| Critic: Evidence (Cairo) | How Charts Lie | 8/8 tests; every printed figure reproduces; New York errors 15, 18, 9 s; moon checked at 5 dates, not every night; "tonight" means 9 pm on home, nautical dusk on Dark o'clock; pacing assumes a steady rate | PASS | scope the check sentences; say "assumes a steady rate" |
| Critic: Inclusion (Holmes) | Mismatch | every tool reachable without the pumpkin; results announced; but "Can't eat" is one choice per kid, so a child with two allergies can be handed one; no cities in Asia, Africa or South America | OBJECT | multi-select allergies |
| Critic: Inclusion (Mace) | Principles of Universal Design; focus check | global ring 3 px, 3:1 in both schemes; the pumpkin features' focus is a thin stroke that nearly vanishes; targets, reflow, print all fine | PASS | a fixed high-contrast focus stroke on the features |
| Critic: Usability (Krug) | Don't Make Me Think | five-second and trunk tests pass; features carry no visible link cue but the labels do; "The mouth above" is wrong where the label sits beside or below | PASS | reword the Stencil label |
| Critic: Formalist (Arnheim) | Art and Visual Perception: light against dark | balance holds (three left against two right at greater leverage); but in the light scheme the glow has a cream ground, so it reads as pale fill, not flame; inner pages hold no figure | OBJECT | a night field behind the hero and on every page band, in both schemes |
| Critic: Provocateur (Shklovsky) | Art as Technique | the pumpkin body is automatized; the carving estranges it into an inventory; the moon eye reads as a "D" until the caption explains it; the stencil preview's instruction line is struck by the dashed oval | PASS | draw the moon eye as a full disc, unlit part dark |

Statements of meaning: gives parents the hour and the arithmetic and no one a way to find a child (Papanek); a light is only a light against a dark (Arnheim); the carving turns a worn coin over (Shklovsky); a kit must mark its demonstrations as demonstrations (Debord).
Andon pulled: no. **Premises tested:** Debord: the three front-page figures come from fixed inputs in `_src/figures.mjs` (true); the mouth is a `<text>` in build.py set in the stencil face, not `stencilSVG()` output (true); Google Fonts is fetched from fonts.googleapis.com (true). Holmes: `ui-split.js` renders one `<select>` per kid (true). Arnheim: the R1 first-screen shot was taken in the light scheme, which is the default when a device prefers light (true; the defect holds for every light-scheme visitor).

## Move M7: Say exactly what it is  (KEEP-THE-RULE; resolves Debord; answers Cairo, Krug, Papanek)
Depends on: M1, M4
Anchors: The Society of the Spectacle (Debord) | How Charts Lie (Cairo) | Don't Make Me Think (Krug) | Design for the Real World (Papanek)
Intent: front-page sample figures begin "e.g." and the moon figure says "tonight"; the Stencil label says "Any word, sized to your pumpkin, in the face of the mouth above" is dropped for "The mouth is set in its stencil type"; the fonts are self-hosted (four woff2 files, OFL) so no request leaves the site and "nothing leaves your device" becomes literally true, and "phone" becomes "device"; Dark o'clock's method sentence names its scope (six cities, five moon dates); Candy math says it assumes a steady rate; the Safety tips follow their sources' wording (phones "while crossing", teal pumpkin cited to FARE alone).
Formal argument: a claim the code contradicts is spectacle (Debord); scope belongs beside the figure (Cairo).
Alternatives rejected: remove the example figures: the summary rule needs a figure per topic.
Fence: n/a. Mode field: Acceptable pole (trust).

## Move M8: Every allergy, not one  (KEEP-THE-RULE; resolves Holmes)
Depends on: M4
Anchors: Mismatch: How Inclusion Shapes Design (Kat Holmes)
Intent: each kid gets a fieldset of checkboxes (legend: the kid's name) listing every kind of candy; the engine already skips every listed kind. A test covers two avoided kinds. Dark o'clock adds cities in South America, Africa and Asia (São Paulo, Buenos Aires, Lagos, Johannesburg, Mumbai, Singapore, Tokyo).
Formal argument: the tool promises "nobody gets what they can't eat"; it must keep that promise for the child it most matters to.
Alternatives rejected: a free-text "can't eat" field: typos break the match.
Mode field: Acceptable pole.

## Move M9: The night field  (ADAPT of M2; resolves Arnheim)
Depends on: M2, M6
Anchors: Art and Visual Perception (Rudolf Arnheim) | Interaction of Color (Josef Albers)
Intent: the hero and every inner page's band are night in both schemes (the reading areas below follow the device's scheme). The pumpkin is the one lit shape on a dark field; each band's icon glows the same way.
Formal argument: light reads only against dark (Arnheim, Albers); the light scheme is for reading, not for the lantern.
Alternatives rejected: force the whole site dark: ignores a reader's preference for long text.
Mode field: Advanced: the lantern always lit.

## Move M10: The moon eye as a moon; a focus ring that shows  (KEEP-THE-RULE; Shklovsky, Mace)
Depends on: M1, M6
Anchors: Art as Technique (Viktor Shklovsky) | The Principles of Universal Design (Ronald Mace et al.)
Intent: the left eye is carved as a full disc: the unlit part stays dark rind inside the cut edge, the lit part glows in tonight's phase, so it reads as a moon without a caption. Focus on a pumpkin feature draws a fixed white stroke with a dark edge (paint-order) at least 2 px visible in both schemes. The stencil's instruction line moves below the dashed oval.
Mode field: Advanced: the moon is seen, not labelled. Acceptable: focus.

### Render notes for M7–M10 (measured)
- M7: no page loads anything from another host (grep for fonts.googleapis: 0 pages); four woff2 files served from site/fonts. Front-page sample figures begin "e.g."; the moon figure says "Tonight's moon".
- M8: two-allergy case added to the engine test (8/8 pass); the splitter renders a fieldset of checkboxes per kid; 21 cities now (7 added in South America, Africa and Asia), all with an evening on 31 Oct 2026 (tested).
- M9: in the light scheme the hero and bands sit on #0b0d14; the glow now meets night on every side.
- M10: the moon eye is a full disc: dark rind (#2a0e02) with the lit part in tonight's phase.

## Move M11: The lantern is on every page, lit where you are  (BREAK; S4 ambition push of M1/M3)
Depends on: M1, M3, M9, M10
Anchors: Breaker Saul Bass: A Life in Film and Design (Jennifer Bass, Pat Kirkham) | Rule Gestalt Principles of Perception (Wertheimer, Koffka, Köhler)
Intent: each tool page's band carries the same cut-paper lantern, small, with only that page's feature lit (the moon on Dark o'clock, the sweet on Candy math, the triangle on Safety, the mouth on Stencil, the ribs' seams on Haul splitter) and the rest left as dark rind; About shows it fully lit. The face that was the site map on the front page becomes the "you are here" on every page.
Formal argument: Bass carried one silhouette through a whole title sequence; the push is the seeded breaker carried further, not a new device (field note 3). It answers Arnheim's "the inner pages hold no figure".
Alternatives rejected: (1) a bigger front-page lantern: bigger, not further; (2) a different illustration per page: five devices instead of one.
Consequence: one SVG per band; the band's icon is retired.
Measured delta (target): inner pages whose band shows the lantern: 0 → 6; exactly one feature lit per tool page.
Mode field: Advanced: the map lit from inside. Acceptable: the page title still names the page.
Measured after M11: inner pages whose band shows the lantern: 0 → 6; Dark o'clock, Candy math, Safety, Stencil: exactly 1 lit feature each; Haul splitter: 0 holes lit, rib seams lit; About: all lit. Probe after M11: contrast light 5.58 / dark 9.55, 0 failures; first screen 633/800 and 768/812, 0 overlaps; overflow 0; targets 0.
Krug R1 question answered by measurement: on a phone Dark o'clock's sunset was on the first screen (751/812) but full dark was not (927). The three times now sit in one row on phones: bottoms 783, 797, 783 of 812.

### Panel, WHOLE, round R2  (artifact: site/ after M7–M11; evidence `_src/design/panel/R2/evidence.md`; shots `_src/design/shots/R2/`)
Eight seats, one agent per reference, at most three at a time; 8 of 8 filed.

| Critic | Anchor used | Observed in the work | Verdict | Requested change |
|---|---|---|---|---|
| Critic: Social (Papanek) | Design for the Real World | grep: no network, storage, sharing, map or place list; location stays in memory; fonts self-hosted; tips match sources; but the no-network rule is not written down for anyone who forks the code | PASS | write the rules down; a CSP with connect-src 'none' |
| Critic: Provocateur (Debord) | Society of the Spectacle | all three R1 defects closed (e.g. labels; "set in its stencil type"; no external host); test-scope wording honest | PASS | none |
| Critic: Evidence (Cairo) | How Charts Lie | 8/8 tests; every printed figure recomputed and matching; scope wording landed | PASS | none (asks: say "9 pm" beside the front-page moon) |
| Critic: Inclusion (Holmes) | Mismatch | multi-allergy fieldset works and follows renames; 21 cities; band lantern aria-hidden but the h1 says the same | PASS | none (next: manual latitude) |
| Critic: Inclusion (Mace) | Universal Design 3, 4, 7 | white focus stroke on features; night-field outline pairs with its ground; native checkboxes, 32 px rows | PASS | none |
| Critic: Formalist (Arnheim) | Art and Visual Perception | night field resolves R1; inner pages hold a figure; but at ~90 px the band's one lit feature barely separates from its dark neighbours and the splitter's seams are not visible | PASS | raise the lit feature's value contrast or scale the lantern ~1.4x |
| Critic: Usability (Krug) | Don't Make Me Think | five-second and trunk tests pass; checkbox groups self-evident; but kids and kinds can be added and never removed | OBJECT | a Remove button per kid and per kind |
| Critic: Provocateur (Shklovsky) | Art as Technique | the moon eye reads as a moon without the caption; the band lantern lights a different part per page but at that size reads as a logo after two pages | PASS | none |

Andon: no. **Premise tested:** Krug: `ui-split.js` has push only (no splice/pop/remove) — holds. Arnheim/Shklovsky: the band lantern renders at 120 px wide at 1280 and 76 px on phones, and its skin is as bright as the front page's — holds.

## Move M12: Undo, a lantern you can read, and the rule in the browser  (KEEP-THE-RULE; resolves Krug; answers Arnheim, Shklovsky, Papanek, Cairo)
Depends on: M8, M11, M4
Anchors: Don't Make Me Think (Steve Krug) | Art and Visual Perception (Rudolf Arnheim) | Design for the Real World (Victor Papanek) | How Charts Lie (Alberto Cairo)
Intent: (1) a Remove button (24 px+, named "Remove Ada" / "Remove gummies") on every kid and every kind, keeping at least one of each; (2) the band lantern 1.4x larger (168 px; 104 px on phones) with its skin dimmed to half brightness, so the one lit feature is the only bright thing in it, and the splitter's rib seams drawn thicker; (3) every page carries a Content-Security-Policy meta: `default-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'`, so a request added to a script later is refused by the browser, and the rules are written in the repository README (`.github/README.md`, "Rules for changes"); (4) the front page's moon says "at 9 pm".
Formal argument: undo is part of self-evidence (Krug); the lit feature must outrank its ground to say "you are here" (Arnheim); a rule that depends on a maintainer's memory is not a design (Papanek).
Alternatives rejected: (1) a "reset" button only: loses everything to undo one mistake; (2) remove the band lantern: Arnheim's R1 objection returns.
Measured after: see M12 result.
Mode field: Acceptable pole.
## Move M12 result (measured)
- Remove: 44 px buttons named "Remove <name>"; in the browser, Ada with two avoided kinds got 0 and 0 of them and 12 lollipops; removing Cy and the gummies left 2 kids, 2 kinds, totals recomputed, Ada's remaining avoided kind still respected. Labels follow renames.
- CSP on all 7 pages; in the browser both a same-origin and an external `fetch` are refused ("Failed to fetch"); fonts still load (Atkinson 400/700, Saira Stencil One); 0 console errors on every page.
- Band lantern 120 → 168 px (104 on phones); skin at half brightness; seams 16 units.
- Instrument change forced by the CSP: the probe's `eval` and `fetch` are now forbidden on the site's own pages, so the probe became `measurePage(win)`, called from a temporary harness page (`site/__harness.html`, deleted before commit). Its control still flags a planted 1.92:1 text.
- Probe after M12, all 7 pages, both schemes: hero 633/800 and 790/812 (the moon label grew a line on phones), complete, 0 overlaps; contrast dark 9.55 / light 5.58, 0 failures; overflow 0; targets under 24 px 0.

### Panel, WHOLE, round R3 — the capped final round  (artifact: site/ after M12; evidence `_src/design/panel/R3/evidence.md`; shots `_src/design/shots/R3/`)
Eight seats plus one re-check, one agent per reference, at most three at a time; 9 of 9 filed.

| Critic | Anchor used | Observed in the work | Verdict | Requested change |
|---|---|---|---|---|
| Critic: Usability (Krug) | Don't Make Me Think | Remove on every kid and kind, named, follows renames; five-second test passes | PASS | none |
| Critic: Formalist (Arnheim) | Art and Visual Perception, ch. 1–2, 5 | the band lantern's one lit feature now reads as a bright figure on a dim skin; the seams show; the whole holds | PASS | none |
| Critic: Social (Papanek) | Design for the Real World | README rules for forks; CSP on all 7 pages; no network, storage, map or place list; geolocation only behind the prompt | PASS | none |
| Critic: Provocateur (Debord) | Society of the Spectacle, theses 1, 18 | "nothing is loaded from anywhere else" holds; CSP present; "9 pm" matches home.js; e.g. figures labelled | PASS | none |
| Critic: Inclusion (Holmes) | Mismatch | Remove buttons named and large; fonts swap; nothing blocked by the CSP | PASS | none |
| Critic: Inclusion (Mace) | Universal Design 4, 5, 7; focus | Remove buttons take the global ring (≈5.5:1); focus moves to the "The pile" heading after a removal | PASS | none |
| Critic: Provocateur (Shklovsky) | Art as Technique | one lantern, one lit part: the page you are on is the part that glows; no longer a logo | PASS | none |
| Critic: Evidence (Cairo) | How Charts Lie | every figure reproduces, except candy.html's "tries every bowl size 0–120": the test stepped by 7 (18 of 121) | OBJECT → re-check PASS after M13 | make the claim true or reword |

Andon: no. Premise tested (Cairo): the loop read `left += 7` — holds.

## Move M13: Make the claim true  (ADAPT; resolves Cairo R3)
Depends on: M4, M7
Anchors: How Charts Lie (Alberto Cairo)
Intent: the pacing test now tries every bowl size 0–120, every 5 minutes up to 3 hours, and rates 0–120 kids an hour in steps of 5 (≈112,000 cases, 108 ms); candy.html and about.html describe exactly that.
Alternatives rejected: soften the wording to the old sample: the stronger test is cheap.
Measured after: 8/8 tests pass; Cairo's re-check: PASS.

## Step 2f: Deletion review and residual diff
Nothing predates this run. Reviewed what the run added: the dusk-bar (kept: it is the only picture of the three times, aria-hidden), the band icons (deleted in M11, replaced by the lantern; the ICON table in build.py is now unused and is removed with this step), Google Fonts links (deleted in M7), the absolute-position label layout (deleted for flex columns), the "cut by it" claim (deleted in M7). Residual diff for removing the unused ICON table: built HTML identical (it was referenced by nothing).

## Step 2g: Every figure the site displays, re-measured at the final state (after M13)
| Figure shown | Where | Procedure | Value now |
|---|---|---|---|
| New York sunset 5:53 PM, dusk 6:21 PM, dark 6:54 PM (default) | Dark o'clock | `sky.js evening()`; reference `_src/test/sky-reference.json` (astral) | same; within 60 s of reference (test) |
| Moon 60% lit, waning gibbous | Dark o'clock (at full dark), front page (at 9 pm local: 59–60% by time zone) | `sky.js moon()`; reference Skyfield/DE421 | 60.41 vs 60.22 at 23:00 UTC; within 1 point at 5 dates (test) |
| e.g. 75 × 2 = 150 pieces: 4 bags of 40 (10 spare) | front page, Candy math | `candy.js buyPlan` via `_src/figures.mjs` | same |
| e.g. 90 left, 90 min, 40/h → 1 each, 60 kids | Candy math (static fallback) | `candy.js pace` | same |
| e.g. 47 pieces, 3 kids: 16, 16, 15 | front page, Haul splitter | `split.js splitHaul` | same |
| 9 tips, 3 sources | front page, Safety | `_src/data/tips.json` | 9, 3 |
| 8 tests | Dark o'clock, About | `node --test _src/test/engines.test.mjs` | 8 pass, 0 fail |
| 21 cities | Dark o'clock list | `sky.js PLACES` | 21; each has an evening on 31 Oct 2026 (test) |
| First screen complete | (log) | probe via harness, both schemes | 633/800 and 790/812, 0 overlaps |
| Contrast, overflow, targets | (log) | probe via harness, 7 pages, both schemes, both sizes | min 9.55 dark / 5.58 light, 0 fails; 0; 0 |
The build fails if the tests fail or if the moon, the buy plan or the split totals it prints change.

## Frontier at close
| Candidate | Status |
|---|---|
| Pumpkin as site map | TAKEN (M1), carried to every page (M11) |
| Light from inside | TAKEN (M2), cut edge (M6), night field (M9) |
| Cut paper | TAKEN (M3), pushed (M11) |
| Contrast floor (WCAG, dotted) | TAKEN (M2, M6) |
| Useful first, one screen | TAKEN (M5); phone times in one row (R1 Krug) |
| Nothing leaves the device | TAKEN (M4), fonts (M7), CSP and README (M12) |
| Rand's restraint (dotted from Bass, "peer of") | DECLINED: Bass's single silhouette already carries the identity; a separate logo system would add a second device |
| Itten's colour wheel (dotted from Albers, "experiential counterpoint to") | DECLINED: the design is one interaction, warm against dark; a wheel of contrasts would add hue, not light |
| Carson's rule-breaking under the WCAG floor (dotted from WCAG) | DECLINED: the break lives in the shapes, not in the type; legibility on a dark night is the brief |
| Manual latitude/longitude on Dark o'clock (Holmes R2) | DEFERRED: 21 cities plus the device's own location cover the night; logged as next |
| A disabled Remove with a hint instead of a vanishing one (Krug, Mace R3 questions) | DEFERRED: open question, not a defect |

## Anchor Ledger
| Anchor | Role | Status | Evidence | Strongest objection survived |
|---|---|---|---|---|
| Design as Art (Bruno Munari) | Stance | KEEP | M4, M5: tools that explain themselves in use | Papanek R1: "stencil the most decorative" — kept as harmless and useful |
| Gestalt Principles of Perception | Rule | KEEP | M1: a face of holes as the site map | Krug R1: features carry no visible link cue — labels carry it |
| Art and Visual Perception (Arnheim) | Rule / panel | KEEP | M9, M11, M12 | OBJECT R1 (cream ground) → PASS R2, R3 |
| Interaction of Color (Josef Albers) | Rule | KEEP | M2, M6, M9: light read against its neighbour | WCAG floor (the glow on skin was 1.74:1) — answered by the cut edge (8.01:1) |
| Saul Bass: A Life in Film and Design | Breaker | KEEP, pushed | M3, M11 | Shklovsky R1: "the most automatized image there is" — answered by the moon eye and the lit-feature lantern |
| WCAG 2.2 Contrast and Perceivability | Counterpoint (dotted) | KEEP | M2, M6; 5.58 / 9.55 minimum | — |
| Design for the Real World (Papanek) | Panel (added for the brief) | KEEP | M4, M7, M12 | PASS R1–R3 |
| Society of the Spectacle (Debord) | Panel | KEEP | M7 | OBJECT R1 → PASS R2, R3 |
| How Charts Lie (Cairo) | Panel | KEEP | M7, M13 | OBJECT R3 → PASS on re-check |
| Mismatch (Holmes) | Panel | KEEP | M8 | OBJECT R1 → PASS R2, R3 |
| Principles of Universal Design (Mace) | Panel | KEEP | M10, M12 | PASS R1–R3 |
| Don't Make Me Think (Krug) | Panel | KEEP | M7, M12 | OBJECT R2 → PASS R3 |
| Art as Technique (Shklovsky) | Panel | KEEP | M10, M11 | PASS R1–R3 |

## Stop conditions
- **S1** (no OPEN Frontier item): met (table above).
- **S2** (a WHOLE round with PASS from every required critic, no Andon): met in R3, with Cairo's PASS on re-check after M13.
- **S3** (two consecutive quiet WHOLE rounds): **not met.** R1 had 3 OBJECTs, R2 had 1, R3 had 1 (each a different, measured defect, each fixed and re-checked). The run stopped at the round cap of 3 set at the start under the person's rule to bound critic rounds.
- **S4** (ambition push with a measured delta): met. M11 carried the Breaker's lantern to every page with one lit feature: 0 → 6 pages; then M12 made it legible (120 → 168 px, skin at half brightness), confirmed by Arnheim and Shklovsky in R3.
- **S5** (dotted edges from used anchors applied or declined): met. WCAG → Albers applied (M2, M6); Bass → Rand, Albers → Itten, WCAG → Carson declined with reasons (Frontier).

## Double loop
The panel was right to include Papanek: the person's fear was not a style question, and the seat that tested it with grep was the one that turned a promise ("nothing leaves your device") into an enforced rule (the CSP) and a written one (the README). The instrument failed twice in this run, and both times it flattered the work: it read CSS `color` instead of SVG `fill` (a 21:1 stencil reported as 1.2:1, the unflattering direction this once), and it could not see a gradient fill (the BOO glow on the skin, 1.74:1). The second failure was the important one: it took a hand calculation to find that the carving read by hue, not light, which became the cut edge (M6). **Graph amendment:** seat `Critic: Social (Papanek)` by default on any brief that names a possible harm, and give the evidence seat a standing check that every shape or text drawn with a gradient is measured by hand against its neighbour.

## Compliance Check
- [x] Tooling inventory — Traversal Plan, Step 0.
- [x] Mode stated with reason — Adaptive (Traversal Plan).
- [x] Seed with exact labels, one dotted counterpoint, living Frontier — Traversal Plan; Frontier at close.
- [x] Run type stated — Full with the Landing steps; nothing frozen.
- [x] Website landing: one bold graphic (the lantern) summarizing every topic (five features, each a tool, each labelled with a figure: moon computed, three e.g. figures computed by the engines, the tip count), complete at 1280 x 800 (633/800) and 375 x 812 (790/812), no sideways scroll, 0 overlaps — Step 2g.
- [x] At least one BREAK taken — M3, pushed in M11.
- [x] Decision Records before each move, with dependencies — M1–M13. **Deviation:** records written in batches (M1–M5; M7–M10) before each group, not one at a time.
- [x] A Panel Report per round, composition rule met — R1–R3, eight seats each, one agent per reference (Debord, Shklovsky, Holmes, Mace, Cairo, Krug, Arnheim, Papanek); dotted pair Krug ↔ Debord. R0 not run (nothing existed).
- [x] Every OBJECT resolved — R1: ADAPT (M7, M8, M9); R2: ADAPT (M12); R3: ADAPT (M13), each re-checked or re-measured.
- [x] WHOLE rounds run; S1–S5 shown — S3 not met (round cap), stated.
- [x] Every displayed figure re-measured at the final state — Step 2g.
- [x] Anchor Ledger and graph updated — above (Mermaid text only; no renderer).
- [x] Double loop; carry-forward file — above; `_src/design/CARRY-FORWARD.md`.
- [x] Final reply states mode, tools, stop conditions and skips.
