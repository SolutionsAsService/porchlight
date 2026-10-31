// Measurement probe (DADA evidence seat). measurePage(win) measures the page in `win` (an iframe's window
// from a harness page), so it works under the site's Content-Security-Policy, which forbids eval and fetch.
window.measurePage = (win) => {
  const document = win.document, getComputedStyle = win.getComputedStyle.bind(win), innerHeight = win.innerHeight,
    scrollY = win.scrollY, matchMedia = win.matchMedia.bind(win), location = win.location, NodeFilter = win.NodeFilter,
    SVGElement = win.SVGElement;

  const parse = c => { const m = c.match(/[\d.]+/g); return m ? m.slice(0, 4).map(Number) : null; };
  const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const bgsOf = el => { for (let e = el; e; e = e.parentElement) { const s = getComputedStyle(e); if (s.backgroundImage && s.backgroundImage.includes('gradient')) { const m = s.backgroundImage.match(/rgba?\([^)]+\)/g); if (m) return m.map(parse).filter(c => c.length < 4 || c[3] > 0.5); } const c = parse(s.backgroundColor); if (c && (c.length < 4 || c[3] > 0.5)) return [c]; } return [[255, 255, 255]]; };
  const vw = document.documentElement.clientWidth, vh = innerHeight;
  let res_graphics = 0;
  const fails = []; let min = 99, checked = 0, smallest = 99, smallestText = '';
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const seen = new Set();
  while (walker.nextNode()) {
    const t = walker.currentNode; if (!t.textContent.trim()) continue;
    const el = t.parentElement; if (seen.has(el)) continue; seen.add(el);
    if (el.closest('[aria-hidden="true"]') || el.closest('.skip')) continue;
    const s = getComputedStyle(el); if (s.visibility === 'hidden' || s.display === 'none') continue;
    const r = el.getBoundingClientRect(); if (!r.width) continue;
    const fs = parseFloat(s.fontSize); if (fs < smallest) { smallest = fs; smallestText = t.textContent.trim().slice(0, 30); }
    // SVG text is painted by fill, not color (Porchlight R1 instrument fix)
    // a gradient-filled SVG shape is a graphic: its contrast is measured against its rim by hand, not here
    if (el instanceof SVGElement && s.fill && s.fill.startsWith('url')) { res_graphics = (res_graphics || 0) + 1; continue; }
    const ink = el instanceof SVGElement && s.fill && s.fill.startsWith('rgb') ? s.fill : s.color;
    const cr = Math.min(...bgsOf(el).map(b => ratio(parse(ink), b))); checked++;
    const large = fs >= 24 || (fs >= 18.66 && +s.fontWeight >= 700);
    if (cr < min) min = cr;
    if (cr < (large ? 3 : 4.5)) fails.push({ text: t.textContent.trim().slice(0, 30), ratio: +cr.toFixed(2) });
  }
  const small = [];
  for (const a of document.querySelectorAll('a, button, [tabindex]')) {
    const r = a.getBoundingClientRect();
    if (r.width && r.height < 24 && !a.closest('.skip') && getComputedStyle(a).display !== 'inline') small.push({ text: a.textContent.trim().slice(0, 24), h: +r.height.toFixed(1) });
  }
  const res = { page: location.pathname, scheme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light', vw, vh,
    docOverflowX: document.documentElement.scrollWidth - vw, textNodes: checked, minContrast: +min.toFixed(2), contrastFails: fails,
    smallTargets: small, smallestFontPx: smallest, smallestText, gradientGraphicsSkipped: res_graphics, h1: document.querySelectorAll('h1').length };
  // First screen rule: the whole hero graphic (pumpkin and every labelled tool) above the fold
  const hero = document.querySelector('.hero');
  if (hero) {
    const parts = [...hero.querySelectorAll('.pumpkin, .lab')];
    const bottom = Math.max(...parts.map(e => e.getBoundingClientRect().bottom + scrollY));
    res.firstScreen = { heroTop: Math.round(hero.getBoundingClientRect().top + scrollY), bottom: Math.round(bottom), fold: vh,
      completeAboveFold: bottom <= vh, sideways: hero.scrollWidth > hero.clientWidth + 1,
      labels: hero.querySelectorAll('.lab').length,
      overlaps: (() => { const r = [...hero.querySelectorAll('.lab, .pumpkin')].map(e => e.getBoundingClientRect()); let n = 0;
        for (let i = 0; i < r.length; i++) for (let j = i + 1; j < r.length; j++) if (!(r[i].right <= r[j].left || r[j].right <= r[i].left || r[i].bottom <= r[j].top || r[j].bottom <= r[i].top)) n++; return n; })() };
  }
  return res;
};
