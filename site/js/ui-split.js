import { splitHaul } from './split.js';

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let types = [['chocolate bars', 19], ['gummies', 16], ['lollipops', 12]];
let kids = [['Ada', []], ['Ben', []], ['Cy', []]];  // name, kinds they can't eat

function render() {
  $('types').innerHTML = types.map(([n, c], i) => `<div class="kid">
    <label>Kind <input data-t="${i}" data-f="0" value="${esc(n)}"></label>
    <label>How many <input data-t="${i}" data-f="1" type="number" min="0" inputmode="numeric" value="${c}"></label>
    ${types.length > 1 ? `<button type="button" class="ghost rm" data-rm-t="${i}" aria-label="Remove ${esc(n)}">Remove</button>` : ''}</div>`).join('');
  $('kids').innerHTML = kids.map(([n, a], i) => `<div class="kid">
    <label>Name <input data-k="${i}" data-f="0" value="${esc(n)}"></label>
    <fieldset class="avoid"><legend>${esc(n || 'This kid')} can’t eat</legend>${types.map(([t], j) =>
      `<label class="chk"><input type="checkbox" data-k="${i}" data-avoid="${j}"${a.includes(t) ? ' checked' : ''}> ${esc(t)}</label>`).join('')}</fieldset>
    ${kids.length > 1 ? `<button type="button" class="ghost rm" data-rm-k="${i}" aria-label="Remove ${esc(n || 'this kid')}">Remove</button>` : ''}</div>`).join('');
  compute();
}

function compute() {
  const r = splitHaul(types.map(([name, count]) => ({ name, count: Number(count) || 0 })),
    kids.map(([name, avoid]) => ({ name: name || '?', avoid })));
  const head = `<tr><th>Kid</th>${types.map(([t]) => `<th>${esc(t)}</th>`).join('')}<th>Total</th></tr>`;
  const rows = kids.map(([n]) => `<tr><td>${esc(n || '?')}</td>${types.map(([t]) => `<td>${r.shares[n || '?']?.[t] || 0}</td>`).join('')}<td><b>${r.totals[n || '?']}</b></td></tr>`).join('');
  const left = Object.entries(r.unassigned).map(([t, c]) => `${c} ${esc(t)}`).join(', ');
  $('out').innerHTML = `<table><thead>${head}</thead><tbody>${rows}</tbody></table>`
    + (left ? `<p class="note">Nobody here can eat: ${left}. That's the grown-ups’ share.</p>` : '');
}

document.addEventListener('input', e => {
  const el = e.target;
  if (el.dataset.avoid !== undefined) {
    const k = kids[+el.dataset.k], t = types[+el.dataset.avoid][0];
    k[1] = el.checked ? [...new Set([...k[1], t])] : k[1].filter(x => x !== t);
  }
  else if (el.dataset.t !== undefined) {
    if (el.dataset.f === '0') {
      const old = types[+el.dataset.t][0];
      for (const k of kids) k[1] = k[1].map(x => x === old ? el.value : x);
      document.querySelectorAll(`input[data-avoid="${el.dataset.t}"]`).forEach(c => { c.nextSibling.textContent = ' ' + el.value; });
      el.closest('.kid').querySelector('button.rm')?.setAttribute('aria-label', `Remove ${el.value}`);
    }
    types[+el.dataset.t][+el.dataset.f] = el.value;
  }
  else if (el.dataset.k !== undefined) { kids[+el.dataset.k][0] = el.value; const lg = el.closest('.kid').querySelector('legend'); if (lg) lg.textContent = `${el.value || 'This kid'} can’t eat`; el.closest('.kid').querySelector('button.rm')?.setAttribute('aria-label', `Remove ${el.value || 'this kid'}`); }
  else return;
  compute();
});
// remove a kid or a kind (at least one of each stays), so a mis-click can be undone (M12)
document.addEventListener('click', e => {
  const b = e.target.closest('button.rm');
  if (!b) return;
  if (b.dataset.rmT !== undefined) {
    const [gone] = types.splice(+b.dataset.rmT, 1);
    for (const k of kids) k[1] = k[1].filter(x => x !== gone[0]);
  } else kids.splice(+b.dataset.rmK, 1);
  render();
  $('s-h').focus?.();
});
$('add-type').addEventListener('click', () => { types.push(['sweets', 0]); render(); });
$('add-kid').addEventListener('click', () => { kids.push([`Kid ${kids.length + 1}`, []]); render(); });
render();
