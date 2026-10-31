# Carry-forward: facts this run established by measurement

1. **A CSP with `connect-src 'none'` also blocks your own instrument.** The probe used `fetch` and `eval`; both are refused on a page with this policy. Measure from a harness page without the policy that calls `measurePage(iframe.contentWindow)`; delete the harness before commit. (M12)
2. **SVG text is painted by `fill`, not `color`.** A probe that reads `color` reports black-on-white stencil text as 1.2:1. Read `fill` for SVG elements. (R1 instrument fix)
3. **A gradient fill cannot be read by a contrast probe.** Measure gradient-filled shapes by hand against their actual neighbour: candle yellow on orange skin was 1.74:1, invisible to the probe; a dark cut edge made it 8.01:1. (M6)
4. **A glow needs a dark neighbour in every colour scheme.** In the light scheme the lantern on cream read as pale fill; a night field behind the hero and bands fixed it in both schemes. (M9)
5. **A small "you are here" mark must dim everything else.** At 90–120 px a single lit feature on a full-brightness skin is lost; at 168 px with the skin at half brightness it reads. (M11, M12)
6. **Headless Chrome via `Start-Process` splits arguments at spaces in paths** ("New folder"): quote the whole `--screenshot=` argument, and give each capture a timeout; a bare `& chrome` call can hang the shell for minutes. (R2)
7. **Python `write_text` on Windows writes CRLF** unless `newline='\n'` is passed; on an LF file that rewrites every line in the diff. (portfolio update, same session)
8. **A mean synodic month is off by up to ~6 points of moon illumination;** Meeus's phase angle with the six largest terms is within 0.3 points of a JPL ephemeris. Name the phase from the lit fraction, not the mean age. (engines)
9. **The NOAA solar equations, iterated three times at the event, match astral within 60 s** for sunset, civil and nautical dusk at six cities including Sydney and Honolulu; computing from UTC midnight of the local date lands on the right evening at every longitude. (engines)
