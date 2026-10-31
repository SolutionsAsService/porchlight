// Sunset, dusk and the moon, computed on the visitor's device.
// Sun: NOAA solar calculator equations (Meeus), iterated once at the event time.
// Moon: mean synodic month from a known new moon; lit fraction from the phase angle.

const RAD = Math.PI / 180;

function julianDay(ms) { return ms / 86400000 + 2440587.5; }

function sunAt(jd) {
  const t = (jd - 2451545) / 36525;
  const l0 = (280.46646 + t * (36000.76983 + 0.0003032 * t)) % 360;
  const m = 357.52911 + t * (35999.05029 - 0.0001537 * t);
  const e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
  const c = Math.sin(m * RAD) * (1.914602 - t * (0.004817 + 0.000014 * t))
    + Math.sin(2 * m * RAD) * (0.019993 - 0.000101 * t) + Math.sin(3 * m * RAD) * 0.000289;
  const omega = 125.04 - 1934.136 * t;
  const lambda = l0 + c - 0.00569 - 0.00478 * Math.sin(omega * RAD);
  const eps0 = 23 + (26 + (21.448 - t * (46.815 + t * (0.00059 - t * 0.001813))) / 60) / 60;
  const eps = eps0 + 0.00256 * Math.cos(omega * RAD);
  const decl = Math.asin(Math.sin(eps * RAD) * Math.sin(lambda * RAD)) / RAD;
  const y = Math.tan(eps / 2 * RAD) ** 2;
  const eqTime = 4 / RAD * (y * Math.sin(2 * l0 * RAD) - 2 * e * Math.sin(m * RAD)
    + 4 * e * y * Math.sin(m * RAD) * Math.cos(2 * l0 * RAD)
    - 0.5 * y * y * Math.sin(4 * l0 * RAD) - 1.25 * e * e * Math.sin(2 * m * RAD));
  return { decl, eqTime };
}

// The moment (UTC ms) after local solar noon on the given calendar day when the sun's
// centre reaches `zenith` degrees; null if it never does (polar day or night).
function eveningEvent(year, month, day, lat, lon, zenith) {
  const midnight = Date.UTC(year, month - 1, day);
  let minutes = 720 - 4 * lon; // first guess: solar noon, in UTC minutes
  for (let i = 0; i < 3; i++) {
    const { decl, eqTime } = sunAt(julianDay(midnight + minutes * 60000));
    const cosH = Math.cos(zenith * RAD) / (Math.cos(lat * RAD) * Math.cos(decl * RAD))
      - Math.tan(lat * RAD) * Math.tan(decl * RAD);
    if (cosH < -1 || cosH > 1) return null;
    const h = Math.acos(cosH) / RAD;
    minutes = 720 - 4 * (lon - h) - eqTime;
  }
  return midnight + minutes * 60000;
}

export const ZENITH = { sunset: 90.833, civil: 96, nautical: 102 };

/** Evening times for a local calendar date at a place (east longitudes positive).
 *  Solar noon is taken from that date at 12:00 minus longitude/15 hours, which falls on the
 *  same local date at every longitude, so the evening that follows is that date's evening. */
export function evening(year, month, day, lat, lon) {
  const out = {};
  for (const [name, z] of Object.entries(ZENITH)) {
    const t = eveningEvent(year, month, day, lat, lon, z);
    out[name] = t === null ? null : new Date(t);
  }
  return out;
}

const SYNODIC = 29.530588853;
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

/** Moon at a moment: age in days since new moon, lit fraction 0–1, and whether waxing.
 *  The lit fraction uses Meeus's phase angle (Astronomical Algorithms, ch. 48), which
 *  includes the largest perturbations; the mean month alone is off by several points. */
export function moon(ms) {
  const age = (((ms - KNOWN_NEW_MOON) / 86400000) % SYNODIC + SYNODIC) % SYNODIC;
  const t = (julianDay(ms) - 2451545) / 36525;
  const d = 297.8501921 + 445267.1114034 * t;   // mean elongation
  const m = 357.5291092 + 35999.0502909 * t;    // sun's mean anomaly
  const mp = 134.9633964 + 477198.8675055 * t;  // moon's mean anomaly
  const i = 180 - d - 6.289 * Math.sin(mp * RAD) + 2.1 * Math.sin(m * RAD) - 1.274 * Math.sin((2 * d - mp) * RAD)
    - 0.658 * Math.sin(2 * d * RAD) - 0.214 * Math.sin(2 * mp * RAD) - 0.11 * Math.sin(d * RAD);
  const lit = (1 + Math.cos(i * RAD)) / 2;
  // the name follows the lit fraction, not the mean age, so it agrees with the number shown
  const waxing = Math.sin((180 - i) * RAD) > 0;
  const name = lit < 0.02 ? 'new moon' : lit > 0.98 ? 'full moon'
    : Math.abs(lit - 0.5) < 0.04 ? (waxing ? 'first quarter' : 'last quarter')
    : `${waxing ? 'waxing' : 'waning'} ${lit < 0.5 ? 'crescent' : 'gibbous'}`;
  return { age, lit, waxing, name };
}

/** A few places to pick from without sharing a location. */
export const PLACES = [
  ['New York', 40.7128, -74.006, 'America/New_York'],
  ['Chicago', 41.8781, -87.6298, 'America/Chicago'],
  ['Denver', 39.7392, -104.9903, 'America/Denver'],
  ['Phoenix', 33.4484, -112.074, 'America/Phoenix'],
  ['Los Angeles', 34.0522, -118.2437, 'America/Los_Angeles'],
  ['Seattle', 47.6062, -122.3321, 'America/Los_Angeles'],
  ['Anchorage', 61.2181, -149.9003, 'America/Anchorage'],
  ['Honolulu', 21.3069, -157.8583, 'Pacific/Honolulu'],
  ['Toronto', 43.6532, -79.3832, 'America/Toronto'],
  ['Mexico City', 19.4326, -99.1332, 'America/Mexico_City'],
  ['London', 51.5074, -0.1278, 'Europe/London'],
  ['Dublin', 53.3498, -6.2603, 'Europe/Dublin'],
  ['Berlin', 52.52, 13.405, 'Europe/Berlin'],
  ['Sydney', -33.8688, 151.2093, 'Australia/Sydney'],
  ['São Paulo', -23.5505, -46.6333, 'America/Sao_Paulo'],
  ['Buenos Aires', -34.6037, -58.3816, 'America/Argentina/Buenos_Aires'],
  ['Lagos', 6.5244, 3.3792, 'Africa/Lagos'],
  ['Johannesburg', -26.2041, 28.0473, 'Africa/Johannesburg'],
  ['Mumbai', 19.076, 72.8777, 'Asia/Kolkata'],
  ['Singapore', 1.3521, 103.8198, 'Asia/Singapore'],
  ['Tokyo', 35.6762, 139.6503, 'Asia/Tokyo'],
];

/** The lit part of the moon as an SVG path (northern view: waxing is lit on the right),
 *  a semicircle plus an elliptical terminator. Used for the pumpkin's left eye. */
export function moonPath(cx, cy, r, lit, waxing) {
  const k = 2 * Math.min(1, Math.max(0.04, lit)) - 1;
  const rx = Math.abs(k) * r;
  const outer = waxing ? 1 : 0;
  const inner = k > 0 ? outer : 1 - outer;
  return `M${cx} ${cy - r} A${r} ${r} 0 0 ${outer} ${cx} ${cy + r} A${rx.toFixed(2)} ${r} 0 0 ${inner} ${cx} ${cy - r}Z`;
}
