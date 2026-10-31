import { buyPlan, pace } from './candy.js';

const $ = id => document.getElementById(id);
const num = id => Number($(id).value) || 0;

function buy() {
  const r = buyPlan({ visitors: num('b-v'), perKid: num('b-k') || 1, perBag: num('b-b') || 1 });
  $('b-out').innerHTML = `Buy <b>${r.bags} ${r.bags === 1 ? 'bag' : 'bags'}</b>: ${r.pieces} pieces, ${r.spare} to spare.`;
}

function now() {
  // count from the later of now and the porch light going on, so it works in the afternoon too
  const at = (v, dflt) => { const [h, m] = (v || dflt).split(':').map(Number); const t = new Date(); t.setHours(h, m, 0, 0); return t; };
  const start = at($('p-start').value, '17:30'), end = at($('p-end').value, '20:30');
  const from = new Date(Math.max(Date.now(), start.getTime()));
  const mins = Math.max(0, Math.round((end - from) / 60000));
  const r = pace({ piecesLeft: num('p-l'), minutesLeft: mins, visitorsPerHour: num('p-r') });
  let text;
  if (mins === 0) text = 'Porch light time is up: everything left is a bonus.';
  else if (r.expected === 0) text = `No more kids expected in the next ${mins} minutes at that rate.`;
  else if (r.perKid >= 1) text = `Give <b>${r.perKid} each</b>: about ${r.expected} more kids in the next ${mins} minutes.`;
  else text = `Give <b>1 each</b> and you’ll run out in about ${r.lastsMinutes} minutes, before ${$('p-end').value}.`;
  $('p-out').innerHTML = text;
}

for (const id of ['b-v', 'b-k', 'b-b']) $(id).addEventListener('input', buy);
for (const id of ['p-l', 'p-start', 'p-end', 'p-r']) $(id).addEventListener('input', now);
buy();
now();
