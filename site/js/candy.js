// Candy arithmetic for the night. Whole pieces only.

/** How much to buy: visitors x pieces each, rounded up to whole bags. */
export function buyPlan({ visitors, perKid, perBag }) {
  const v = Math.max(0, Math.floor(visitors)), k = Math.max(1, Math.floor(perKid)), b = Math.max(1, Math.floor(perBag));
  const pieces = v * k;
  const bags = Math.ceil(pieces / b);
  return { pieces, bags, spare: bags * b - pieces };
}

/** Pacing the bowl: how many pieces each visitor can get from now on so the bowl lasts
 *  until the end, given how many visitors an hour you expect. */
export function pace({ piecesLeft, minutesLeft, visitorsPerHour }) {
  const left = Math.max(0, Math.floor(piecesLeft));
  const expected = Math.max(0, Math.round(visitorsPerHour * Math.max(0, minutesLeft) / 60));
  if (expected === 0) return { expected, perKid: left > 0 ? left : 0, lastsMinutes: Infinity };
  const perKid = Math.floor(left / expected);
  // if even one each runs out, say when
  const lastsMinutes = perKid >= 1 ? minutesLeft : Math.floor(left / visitorsPerHour * 60);
  return { expected, perKid, lastsMinutes };
}
