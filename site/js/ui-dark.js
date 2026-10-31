// Dark o'clock. Location never leaves this page: the browser hands us a position,
// we compute three times from it, and it is dropped.
import { evening, moon, PLACES } from './sky.js';

const $ = id => document.getElementById(id);
const place = $('place'), date = $('date'), where = $('where');
let here = null; // { lat, lon } from the browser, kept only in this variable

for (const [name] of PLACES) place.add(new Option(name, name));
place.add(new Option('My location', 'here'));
const today = new Date();
date.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

function fmt(t, tz) {
  return t ? new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', timeZone: tz }).format(t) : 'no dusk';
}

function show() {
  const [y, m, d] = date.value.split('-').map(Number);
  let lat, lon, tz, label;
  if (place.value === 'here' && here) {
    ({ lat, lon } = here); tz = undefined; label = 'Showing your location (not stored).';
  } else {
    const p = PLACES.find(x => x[0] === place.value) || PLACES[0];
    [label, lat, lon, tz] = p; label = `Showing ${label}, in its own time zone.`;
  }
  const e = evening(y, m, d, lat, lon);
  $('t-sunset').textContent = fmt(e.sunset, tz);
  $('t-civil').textContent = fmt(e.civil, tz);
  $('t-nautical').textContent = fmt(e.nautical, tz);
  where.textContent = label;
  const mn = moon((e.nautical || e.sunset || new Date(Date.UTC(y, m - 1, d, 23))).getTime()); // at full dark that evening
  $('moon-line').innerHTML = `Moon tonight: <b>${Math.round(mn.lit * 100)}% lit</b>, ${mn.name}.`;
}

$('locate').addEventListener('click', () => {
  if (!navigator.geolocation) { where.textContent = 'This browser cannot share a location; pick a city instead.'; return; }
  where.textContent = 'Asking your browser…';
  navigator.geolocation.getCurrentPosition(
    pos => { here = { lat: pos.coords.latitude, lon: pos.coords.longitude }; place.value = 'here'; show(); },
    () => { where.textContent = 'No location shared. Pick the nearest city instead.'; },
    { maximumAge: 600000, timeout: 10000 });
});
place.addEventListener('change', () => { if (place.value === 'here' && !here) $('locate').click(); else show(); });
date.addEventListener('change', show);
show();
