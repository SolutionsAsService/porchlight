Anchor used: Cairo, How Charts Lie: a stated claim must match what was actually measured/done.
Observed: engines.test.mjs loops left 0-120 (step 1), mins 0-180 step 5, rate 0-120 step 5, asserting perKid*expected <= left whenever expected > 0. Run: 8 of 8 pass. candy.html says "every bowl size from 0 to 120, every 5 minutes up to three hours and rates from 0 to 120 kids an hour"; about.html says "every bowl size from 0 to 120 at every 5 minutes and rate". Both match the loop. "Never promises more than the bowl holds" matches the assertion (applied where kids are expected).
Verdict: PASS
Requested change: none
Statement of meaning: The pacing claim now says exactly what the test checks.
