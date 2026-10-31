// Fair haul splitting. Each piece goes to the kid who has the fewest pieces so far
// among those who can eat it; types are dealt largest pile first, and ties rotate so
// no one is always first.

/**
 * @param {{name: string, count: number}[]} types
 * @param {{name: string, avoid?: string[]}[]} kids
 * @returns {{shares: Record<string, Record<string, number>>, totals: Record<string, number>, unassigned: Record<string, number>}}
 */
export function splitHaul(types, kids) {
  const shares = Object.fromEntries(kids.map(k => [k.name, {}]));
  const totals = Object.fromEntries(kids.map(k => [k.name, 0]));
  const unassigned = {};
  let turn = 0;
  const piles = types.filter(t => t.count > 0).map(t => ({ ...t, count: Math.floor(t.count) }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  for (const pile of piles) {
    const able = kids.filter(k => !(k.avoid || []).includes(pile.name));
    if (!able.length) { unassigned[pile.name] = pile.count; continue; }
    for (let i = 0; i < pile.count; i++) {
      let best = null;
      for (let j = 0; j < able.length; j++) {
        const k = able[(turn + j) % able.length];
        if (best === null || totals[k.name] < totals[best.name]) best = k;
      }
      shares[best.name][pile.name] = (shares[best.name][pile.name] || 0) + 1;
      totals[best.name] += 1;
      turn += 1;
    }
  }
  return { shares, totals, unassigned };
}
