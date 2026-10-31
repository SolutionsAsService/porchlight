// Prints, as JSON, every figure the build bakes into the pages, computed by the same
// engines the browser runs. Usage: node _src/figures.mjs 2026-10-31
import { moon, evening, moonPath } from '../site/js/sky.js';
import { buyPlan, pace } from '../site/js/candy.js';
import { splitHaul } from '../site/js/split.js';
import { lines } from '../site/js/stencil.js';

const date = process.argv[2] || new Date().toISOString().slice(0, 10);
const [y, m, d] = date.split('-').map(Number);
// "tonight" for the build's fallback: 23:00 UTC on the date (evening in the Americas, night in Europe)
const sky = moon(Date.UTC(y, m - 1, d, 23));
const ny = evening(y, m, d, 40.7128, -74.006);

const buy = { visitors: 75, perKid: 2, perBag: 40 };
const paceIn = { piecesLeft: 90, minutesLeft: 90, visitorsPerHour: 40 };
const splitTypes = [{ name: 'chocolate bars', count: 19 }, { name: 'gummies', count: 16 }, { name: 'lollipops', count: 12 }];
const splitKids = [{ name: 'Ada' }, { name: 'Ben' }, { name: 'Cy' }];

console.log(JSON.stringify({
  date,
  moon: { lit: Math.round(sky.lit * 100), name: sky.name, waxing: sky.waxing, path: moonPath(208, 236, 50, sky.lit, sky.waxing) },
  newYork: { sunset: ny.sunset.toISOString(), civil: ny.civil.toISOString(), nautical: ny.nautical.toISOString() },
  buy: { input: buy, ...buyPlan(buy) },
  pace: { input: paceIn, ...pace(paceIn) },
  split: { types: splitTypes, kids: splitKids.map(k => k.name), ...splitHaul(splitTypes, splitKids) },
  mouth: lines('BOO'),
}));
