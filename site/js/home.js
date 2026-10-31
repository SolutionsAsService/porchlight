// Front page: redraw the pumpkin's moon eye for tonight, on this device.
import { moon, moonPath } from './sky.js';

// tonight, not this minute: 9 pm local time today
const tonight = new Date(); tonight.setHours(21, 0, 0, 0);
const m = moon(tonight.getTime());
const d = moonPath(208, 236, 50, m.lit, m.waxing);
document.querySelectorAll('#eye-moon, .halo path:first-child').forEach(p => p.setAttribute('d', d));
const fig = document.getElementById('moon-fig');
if (fig) fig.textContent = `Tonight's moon at 9 pm: ${Math.round(m.lit * 100)}% lit, ${m.name}.`;
const title = document.getElementById('pk-t');
if (title) title.textContent = title.textContent.replace(/\(\d+% lit\)/, `(${Math.round(m.lit * 100)}% lit)`);
