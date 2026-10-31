// node --test _src/test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evening, moon, PLACES } from '../../site/js/sky.js';
import { buyPlan, pace } from '../../site/js/candy.js';
import { splitHaul } from '../../site/js/split.js';
import { lines, stencilSVG } from '../../site/js/stencil.js';
import { readFileSync } from 'node:fs';

const ref = JSON.parse(readFileSync(new URL('./sky-reference.json', import.meta.url)));
const local = (date, tz) => new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(date);
const secs = s => { const [h, m, x] = s.split(':').map(Number); return h * 3600 + m * 60 + x; };

test('sunset and dusk match an independent reference (astral) within 60 s, 31 Oct 2026', () => {
  for (const r of ref.sun) {
    const e = evening(2026, 10, 31, r.lat, r.lon);
    for (const k of ['sunset', 'civil', 'nautical']) {
      const got = secs(local(e[k], r.tz)), want = secs(r[k]);
      assert.ok(Math.abs(got - want) <= 60, `${r.name} ${k}: ${local(e[k], r.tz)} vs ${r[k]}`);
    }
  }
});

test('every listed place has an evening on 31 Oct 2026', () => {
  for (const [name, lat, lon] of PLACES) {
    const e = evening(2026, 10, 31, lat, lon);
    assert.ok(e.sunset instanceof Date, name);
  }
});

test('moon lit fraction matches an independent reference (Skyfield, DE421) within 1 point', () => {
  for (const r of ref.moon) {
    const m = moon(Date.parse(r.utc));
    assert.ok(Math.abs(m.lit * 100 - r.lit) <= 1, `${r.utc}: ${(m.lit * 100).toFixed(1)} vs ${r.lit}`);
  }
});

test('moon names agree with the lit fraction', () => {
  assert.equal(moon(Date.parse('2026-10-31T23:00:00Z')).name, 'waning gibbous');
  assert.equal(moon(Date.parse('2026-10-26T12:00:00Z')).name, 'full moon');
  assert.equal(moon(Date.parse('2025-10-31T23:00:00Z')).name, 'waxing gibbous');
  assert.equal(moon(Date.parse('2027-10-31T23:00:00Z')).name, 'waxing crescent');
});

test('buy plan rounds up to whole bags', () => {
  assert.deepEqual(buyPlan({ visitors: 75, perKid: 2, perBag: 40 }), { pieces: 150, bags: 4, spare: 10 });
  assert.deepEqual(buyPlan({ visitors: 0, perKid: 2, perBag: 40 }), { pieces: 0, bags: 0, spare: 0 });
});

test('pacing never promises more than the bowl holds', () => {
  // every bowl size 0-120, every 5 minutes up to 3 hours, rates 0-120 kids an hour in steps of 5 (R3, Cairo)
  for (let left = 0; left <= 120; left++) for (let mins = 0; mins <= 180; mins += 5) for (let rate = 0; rate <= 120; rate += 5) {
    const p = pace({ piecesLeft: left, minutesLeft: mins, visitorsPerHour: rate });
    if (p.expected > 0) assert.ok(p.perKid * p.expected <= left, JSON.stringify({ left, mins, rate, p }));
  }
  assert.deepEqual(pace({ piecesLeft: 100, minutesLeft: 120, visitorsPerHour: 20 }), { expected: 40, perKid: 2, lastsMinutes: 120 });
  assert.equal(pace({ piecesLeft: 10, minutesLeft: 120, visitorsPerHour: 30 }).lastsMinutes, 20);
});

test('haul split: totals within one piece, every piece dealt, nothing to a kid who avoids it', () => {
  let rng = 7; const rnd = n => (rng = (rng * 1103515245 + 12345) % 2147483648) % n;
  for (let trial = 0; trial < 500; trial++) {
    const types = Array.from({ length: 1 + rnd(8) }, (_, i) => ({ name: 'c' + i, count: rnd(30) }));
    const kids = Array.from({ length: 1 + rnd(5) }, (_, i) => ({ name: 'k' + i }));
    const { totals, shares } = splitHaul(types, kids);
    const vals = Object.values(totals);
    assert.ok(Math.max(...vals) - Math.min(...vals) <= 1, `trial ${trial}`);
    assert.equal(vals.reduce((a, b) => a + b, 0), types.reduce((a, t) => a + t.count, 0));
    for (const k of kids) for (const t of types) assert.ok((shares[k.name][t.name] || 0) >= 0);
  }
  const r = splitHaul([{ name: 'peanut cups', count: 6 }, { name: 'gummies', count: 6 }],
    [{ name: 'Ada', avoid: ['peanut cups'] }, { name: 'Ben' }]);
  assert.equal(r.shares.Ada['peanut cups'] || 0, 0);
  assert.equal(r.totals.Ada + r.totals.Ben, 12);
  const two = splitHaul([{ name: 'peanut cups', count: 5 }, { name: 'milk chocolate', count: 5 }, { name: 'gummies', count: 8 }],
    [{ name: 'Ada', avoid: ['peanut cups', 'milk chocolate'] }, { name: 'Ben' }]);
  assert.equal((two.shares.Ada['peanut cups'] || 0) + (two.shares.Ada['milk chocolate'] || 0), 0);
  assert.equal(two.totals.Ada + two.totals.Ben, 18);
  const none = splitHaul([{ name: 'x', count: 3 }], [{ name: 'A', avoid: ['x'] }]);
  assert.deepEqual(none.unassigned, { x: 3 });
});

test('stencil: lines fit, text is escaped, size is in centimetres', () => {
  assert.deepEqual(lines('happy halloween'), ['HAPPY', 'HALLOWEEN']);
  assert.deepEqual(lines('boo'), ['BOO']);
  assert.ok(lines('a b c d e f g h i j k l m n o p q r s t u v w x y z').length <= 3);
  const svg = stencilSVG('<script>', 20);
  assert.ok(!svg.includes('<script>') && svg.includes('&lt;SCRIPT&gt;'));
  assert.ok(svg.includes('width="20cm"'));
});
