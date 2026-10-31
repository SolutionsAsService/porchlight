import { stencilSVG } from './stencil.js';

const $ = id => document.getElementById(id);

function draw() {
  $('st-out').innerHTML = stencilSVG($('st-text').value || 'BOO', Number($('st-size').value));
}

$('st-text').addEventListener('input', draw);
$('st-size').addEventListener('change', draw);
$('st-print').addEventListener('click', () => window.print());
$('st-save').addEventListener('click', () => {
  const blob = new Blob([stencilSVG($('st-text').value || 'BOO', Number($('st-size').value))], { type: 'image/svg+xml' });
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'pumpkin-stencil.svg' });
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});
// the stencil font must be loaded before the first drawing, or the preview shows a fallback face
document.fonts.load("400 100px 'Saira Stencil One'").finally(draw);
