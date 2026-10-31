// A printable carving stencil: the word set in a stencil typeface (every letter is
// already bridged, so the middles of O, A and B stay attached to the pumpkin), inside the
// outline of the pumpkin's face, at real print size.

export const STENCIL_FONT = "'Saira Stencil One', 'Stardos Stencil', 'Arial Black', sans-serif";

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Lines of text that fit the face: at most 3 lines, up to 10 characters each, words kept whole where possible. */
export function lines(text, max = 10) {
  const words = String(text).toUpperCase().replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  const out = [];
  for (const w of words) {
    const last = out[out.length - 1];
    if (last !== undefined && (last + ' ' + w).length <= max) out[out.length - 1] = last + ' ' + w;
    else for (let i = 0; i < w.length; i += max) out.push(w.slice(i, i + max));
  }
  return out.slice(0, 3);
}

/**
 * SVG stencil. `faceCm` is the width of the carving area on the pumpkin; the SVG is sized
 * in centimetres so it prints at that size.
 */
export function stencilSVG(text, faceCm = 18) {
  const ls = lines(text);
  const w = 1000, h = 760;
  const longest = Math.max(1, ...ls.map(l => l.length));
  const size = Math.min(260, Math.floor(1500 / longest), Math.floor(560 / Math.max(1, ls.length)));
  const gap = size * 1.02;
  const top = 350 - (gap * (ls.length - 1)) / 2;  // centred on the face oval; the caption sits below it
  const words = ls.map((l, i) => `<text x="500" y="${(top + i * gap).toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-family="${esc(STENCIL_FONT)}" font-size="${size}" fill="#000">${esc(l)}</text>`).join('');
  const hCm = (faceCm * h / w).toFixed(1);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${faceCm}cm" height="${hCm}cm" role="img" aria-label="Stencil: ${esc(ls.join(' '))}">`
    + `<ellipse cx="500" cy="350" rx="490" ry="340" fill="none" stroke="#000" stroke-width="3" stroke-dasharray="14 10"/>`
    + `<g>${words}</g>`
    + `<text x="500" y="745" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#000">Tape to the pumpkin, trace with a pin, cut out the black. Dashed line: the face, ${faceCm} cm wide.</text></svg>`;
}
