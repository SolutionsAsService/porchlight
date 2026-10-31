"""Builds site/ for porchlight.shadw.app.

Every figure the pages print comes from `node _src/figures.mjs`, which runs the same engines
the browser runs (site/js/*.js). The build fails if the engine tests fail, if a figure is
missing, or if an internal link points nowhere.
"""
import html
import json
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / '_src'
OUT = ROOT / 'site'
SITE_URL = 'https://porchlight.shadw.app/'
REPO_URL = 'https://github.com/SolutionsAsService/porchlight'
DATE = '2026-10-31'

PAGES = [('index', 'Porchlight', 'index.html'), ('dark', "Dark o'clock", 'dark.html'),
         ('candy', 'Candy math', 'candy.html'), ('split', 'Haul splitter', 'split.html'),
         ('stencil', 'Stencil', 'stencil.html'), ('safety', 'Safety', 'safety.html'),
         ('about', 'About', 'about.html')]


class BuildError(Exception):
    pass


def run(cmd):
    r = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, encoding='utf-8')
    if r.returncode:
        raise BuildError(f"{' '.join(cmd)} failed:\n{r.stdout[-2000:]}{r.stderr[-2000:]}")
    return r.stdout


def tests():
    out = run(['node', '--test', '_src/test/engines.test.mjs'])
    if not re.search(r'ℹ fail 0', out):
        raise BuildError('engine tests failed')
    return int(re.search(r'ℹ pass (\d+)', out).group(1))


FIG = {}
TIPS = json.loads((SRC / 'data/tips.json').read_text(encoding='utf-8'))


# ------------------------------------------------------------------ shapes (cut paper, M3)
def sweet_path(cx, cy, r):
    return (f'M{cx - r} {cy} a{r} {r * .8} 0 1 0 {2 * r} 0 a{r} {r * .8} 0 1 0 {-2 * r} 0Z '
            f'M{cx - r} {cy} l{-r * .9} {-r * .62} l{r * .12} {r * .62} l{-r * .12} {r * .62}Z '
            f'M{cx + r} {cy} l{r * .9} {-r * .62} l{-r * .12} {r * .62} l{r * .12} {r * .62}Z')


def pumpkin(big=True, lit=None):
    """The lantern. `lit` names the one feature that glows (a band's 'you are here', M11); None lights all."""
    m = FIG['moon']
    eye_l = m['path']  # drawn by sky.js moonPath, the same function the browser uses
    word = html.escape(' '.join(FIG['mouth']))
    cls = 'pumpkin' if big else 'pumpkin pumpkin-sm'
    on = lambda f: lit is None or lit == f
    hole = lambda f: 'hole' if on(f) else 'unlit'
    a = lambda href, label, body: (f'<a href="{href}" class="feat" aria-label="{html.escape(label)}">{body}</a>'
                                   if big else body)
    ribs = ('<path class="rib r5" d="M300 108c-120 0-232 70-232 196s104 196 232 196 232-70 232-196-112-196-232-196Z"/>'
            '<path class="rib r4" d="M300 110c-86 0-168 72-168 194s82 194 168 194 168-72 168-194-82-194-168-194Z"/>'
            '<path class="rib r3" d="M300 112c-46 0-96 74-96 192s50 192 96 192 96-74 96-192-50-192-96-192Z"/>')
    return f"""<svg class="{cls}" viewBox="40 40 520 470"{' role="img" aria-labelledby="pk-t"' if big else ' aria-hidden="true" focusable="false"'}>
{'<title id="pk-t">' if big else '<!-- '}A jack-o'-lantern. Its left eye is tonight's moon ({m['lit']}% lit), its right eye a wrapped sweet, its nose a warning triangle, its ribs equal shares, and its mouth is the word {word} in the stencil maker's type.{'</title>' if big else ' -->'}
<defs><radialGradient id="glow" cx="50%" cy="55%" r="60%"><stop offset="0" stop-color="#fff2b8"/><stop offset=".45" stop-color="#ffc24a"/><stop offset="1" stop-color="#ff7a1a"/></radialGradient>
<filter id="halo" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter></defs>
<path class="stem" d="M286 112c2-30-6-52-26-70l18-10c26 20 34 48 32 80Z"/>
{a('split.html', 'Haul splitter: the ribs, equal shares', ribs)}
{'<g class=seams aria-hidden=true><path d="M300 112c-46 0-96 74-96 192s50 192 96 192"/><path d="M300 112c46 0 96 74 96 192s-50 192-96 192"/><path d="M300 110c-86 0-168 72-168 194s82 194 168 194"/><path d="M300 110c86 0 168 72 168 194s-82 194-168 194"/></g>' if lit == 'split' else ''}
<g class="carve">
<g class="rim" aria-hidden="true"><circle cx="208" cy="236" r="50"/><path d="{sweet_path(392, 236, 34)}"/><path d="M300 270 330 322H270Z"/><text x="300" y="420" text-anchor="middle" class="mouth">{word}</text></g>
<g class="halo" filter="url(#halo)" aria-hidden="true">{f'<path d="{eye_l}"/>' if on('dark') else ''}{f'<path d="{sweet_path(392, 236, 34)}"/>' if on('candy') else ''}{'<path d="M300 270 330 322H270Z"/>' if on('safety') else ''}{f'<text x="300" y="420" text-anchor="middle" class="mouth">{word}</text>' if on('stencil') else ''}</g>
{a('dark.html', "Dark o'clock: tonight's moon", f'<circle class="unlit" cx="208" cy="236" r="50"/><path class="{hole("dark")}"{" id=eye-moon" if big else ""} d="{eye_l}"/>')}
{a('candy.html', 'Candy math: the wrapped sweet', f'<path class="{hole("candy")}" d="{sweet_path(392, 236, 34)}"/>')}
{a('safety.html', 'Safety: the warning triangle', f'<path class="{hole("safety")}" d="M300 270 330 322H270Z"/>')}
{a('stencil.html', 'Stencil: the mouth, the word BOO in stencil type', f'<text x="300" y="420" text-anchor="middle" class="{hole("stencil")} mouth">{word}</text>')}
</g></svg>"""


def hero():
    b, s, m, ny = FIG['buy'], FIG['split'], FIG['moon'], FIG['newYork']
    totals = ', '.join(str(v) for v in s['totals'].values())
    pieces = sum(t['count'] for t in s['types'])
    labels = [
        ('dark', 'l1', 'moon', "Dark o'clock", f"Tonight's moon at 9 pm: {m['lit']}% lit, {m['name']}.",
         'When does it get dark where you are? Worked out on your device, never sent.', 'moon-fig'),
        ('safety', 'l2', 'tri', 'Safety', f"{len(TIPS['tips'])} tips, each from its source.",
         'FDA, the American Academy of Pediatrics, FARE.', None),
        ('split', 'l3', 'rib', 'Haul splitter', f"e.g. {pieces} pieces, {len(s['kids'])} kids: {totals}.",
         'Fair to the piece, and nobody gets what they can’t eat.', None),
        ('candy', 'r1', 'sweet', 'Candy math', f"e.g. {b['input']['visitors']} kids × {b['input']['perKid']} = {b['pieces']} pieces: {b['bags']} bags of {b['input']['perBag']}.",
         'And how many to give each kid now so the bowl lasts.', None),
        ('stencil', 'r2', 'mouth', 'Stencil', 'Any word, printed to fit your pumpkin.',
         'The pumpkin’s mouth is set in its stencil type.', None),
    ]
    li = lambda key, pos, icon, t, f, d, fid: (
        f'<li class="lab {pos}" data-feat="{icon}"><a href="{key}.html"><span class="lab-t">{html.escape(t)} <span aria-hidden="true">→</span></span>'
        f'<span class="lab-f"{f" id={fid}" if fid else ""}>{html.escape(f)}</span><span class="lab-d">{html.escape(d)}</span></a></li>')
    left = ''.join(li(*x) for x in labels if x[1].startswith('l'))
    right = ''.join(li(*x) for x in labels if x[1].startswith('r'))
    return (f'<div class="night-field"><section class="hero" aria-labelledby="hero-h"><h1 id="hero-h">Halloween night, <em>lit from inside.</em></h1>'
            f'<p class="hero-sub">Five small tools for tonight. They run on your device and keep nothing.</p>'
            f'<ul class="labs labs-l" aria-label="Tools, left">{left}</ul><div class="hero-art">{pumpkin()}</div>'
            f'<ul class="labs labs-r" aria-label="Tools, right">{right}</ul></section></div>')


# ------------------------------------------------------------------ page parts
def tips_html():
    src = TIPS['sources']
    out = []
    for i, t in enumerate(TIPS['tips'], 1):
        cites = ', '.join(f'<a href="{src[s][1]}">{html.escape(src[s][0].split(":")[0])}</a>' for s in t['src'])
        out.append(f'<li><span class="n" aria-hidden="true">{i:02d}</span><h2>{html.escape(t["head"])}</h2>'
                   f'<p>{html.escape(t["body"])}</p><p class="cite">Source: {cites}</p></li>')
    return '<ol class="tips">' + ''.join(out) + '</ol>'


def sources_html():
    return '<ul class="sources">' + ''.join(f'<li><a href="{u}">{html.escape(t)}</a></li>' for t, u in TIPS['sources'].values()) + '</ul>'


def expand(key, body):
    def sub(m):
        name = m.group(1).strip()
        if name == 'hero':
            return hero()
        if name == 'pumpkin-sm':
            return pumpkin(big=False)
        if name == 'tips':
            return tips_html()
        if name == 'sources':
            return sources_html()
        if name == 'tipcount':
            return str(len(TIPS['tips']))
        if name == 'tests':
            return str(FIG['tests'])
        if name == 'repo':
            return REPO_URL
        if name.startswith('fig '):
            v = FIG
            for part in name[4:].split('.'):
                v = v[part]
            return html.escape(str(v))
        raise BuildError(f'unknown placeholder {name}')
    return re.sub(r'\{\{(.+?)\}\}', sub, body)


def page_html(key, title, file, meta, body):
    url = SITE_URL + ('' if file == 'index.html' else file.removesuffix('.html'))
    full = meta['title'] if key == 'index' else f"{meta['title']} · Porchlight"
    nav = ''.join(f'<li><a href="{f}"{" aria-current=page" if k == key else ""}>{html.escape(t)}</a></li>'
                  for k, t, f in PAGES[1:])
    band = ''
    if key != 'index':
        band = (f'<div class="night-field"><header class="band"><div class="band-ic" aria-hidden="true">{pumpkin(big=False, lit=None if key == "about" else key)}</div>'
                f'<div><h1 id="top">{html.escape(meta["h1"])}</h1><p class="band-line">{html.escape(meta["line"])}</p></div></header></div>')
    i = [p[0] for p in PAGES].index(key)
    nxt = PAGES[(i + 1) % len(PAGES)]
    nxt = nxt if nxt[0] != 'index' else PAGES[1]
    pager = '' if key == 'index' else (f'<nav class="pager" aria-label="Next tool"><a href="{nxt[2]}"><span>Next</span>{html.escape(nxt[1])} →</a></nav>')
    scripts = ''.join(f'<script type="module" src="js/{s}"></script>' for s in meta.get('scripts', []))
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(full)}</title>
<meta name="description" content="{html.escape(meta['description'])}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:title" content="{html.escape(full)}">
<meta property="og:description" content="{html.escape(meta['description'])}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE_URL}og.svg">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'">
<meta name="theme-color" content="#0b0d14">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="style.css">
</head>
<body class="p-{key}">
<a class="skip" href="#main">Skip to content</a>
<header class="mast"><a class="brand" href="index.html"><svg viewBox="0 0 40 40" aria-hidden="true" focusable="false"><path class="b-lamp" d="M12 6h16l4 12H8Z"/><path class="b-light" d="M10 18h20l-4 14H14Z"/></svg>Porchlight</a>
<nav aria-label="Tools"><ul>{nav}</ul></nav></header>
<main id="main">
{band}
{body}
</main>
{pager}
<footer class="foot"><p>Porchlight runs on your device. No accounts, no cookies, no tracking, no maps; nothing you type or share leaves your device, and nothing is loaded from anywhere else. <a href="about.html">How</a>.</p>
<p>By SolutionsAsService. Safety tips link to their sources.</p></footer>
{scripts}
</body>
</html>
"""


def favicon():
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><style>.b{fill:#e8620c}.g{fill:#ffc24a}.k{fill:#0b0d14}'
            '@media (prefers-color-scheme: light){.k{fill:#fff7ea}}</style><rect class="k" width="32" height="32" rx="6"/>'
            '<path fill="#3b5d2a" d="M15 8c0-3-1-5-3-6l2-1c3 2 4 4 3 7Z"/><ellipse class="b" cx="16" cy="19" rx="13" ry="11"/>'
            '<path class="g" d="M8 16h5l-2.5 4ZM19 16h5l-2.5 4ZM9 23h14l-2 3h-10Z"/></svg>\n')


def og():
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">'
            '<rect width="1200" height="630" fill="#0b0d14"/>'
            '<text x="70" y="250" font-family="Saira Stencil One, Arial Black, sans-serif" font-size="120" fill="#ffc24a">PORCHLIGHT</text>'
            '<text x="70" y="330" font-family="Arial, sans-serif" font-size="40" fill="#f3ead8">Halloween night, lit from inside.</text>'
            '<text x="70" y="400" font-family="Arial, sans-serif" font-size="30" fill="#c8bfb0">When it gets dark · candy math · fair haul split · carving stencils · safety</text>'
            '<ellipse cx="1000" cy="470" rx="170" ry="140" fill="#e8620c"/><path d="M930 440h50l-25 40ZM1020 440h50l-25 40ZM940 530h120l-15 25h-90Z" fill="#ffc24a"/></svg>\n')


def check_links(out):
    files = {p.name for p in out.iterdir() if p.is_file()} | {f'js/{p.name}' for p in (out / 'js').iterdir()}
    bad = []
    for page in out.glob('*.html'):
        text = page.read_text(encoding='utf-8')
        ids = set(re.findall(r'\sid="?([^"\s>]+)', text))
        for ref in re.findall(r'(?:href|src)="([^"]+)"', text):
            if re.match(r'(https?:|mailto:|data:)', ref):
                continue
            target, _, frag = ref.partition('#')
            if target and target not in files:
                bad.append(f'{page.name}: {ref}')
            if frag and not target and frag not in ids:
                bad.append(f'{page.name}: #{frag}')
    if bad:
        raise BuildError('broken links:\n  ' + '\n  '.join(bad))


def build():
    FIG['tests'] = tests()
    FIG.update(json.loads(run(['node', '_src/figures.mjs', DATE])))
    if FIG['moon']['lit'] != 60 or FIG['buy']['pieces'] != 150 or list(FIG['split']['totals'].values()) != [16, 16, 15]:
        raise BuildError(f'a figure the pages print has changed: {FIG["moon"]}, {FIG["buy"]}, {FIG["split"]["totals"]}')
    # fonts are served from this site (M7): nothing is fetched from anywhere else
    (OUT / 'style.css').write_text((SRC / 'fonts.css').read_text(encoding='utf-8') + (SRC / 'style.css').read_text(encoding='utf-8'),
                                   encoding='utf-8', newline='\n')
    (OUT / 'favicon.svg').write_text(favicon(), encoding='utf-8', newline='\n')
    (OUT / 'og.svg').write_text(og(), encoding='utf-8', newline='\n')
    for key, title, file in PAGES:
        raw = (SRC / 'pages' / f'{key}.html').read_text(encoding='utf-8')
        head, _, body = raw.partition('\n---\n')
        meta = json.loads(expand(key, head))
        (OUT / file).write_text(page_html(key, title, file, meta, expand(key, body)), encoding='utf-8', newline='\n')
    urls = ''.join(f"<url><loc>{SITE_URL}{'' if f == 'index.html' else f.removesuffix('.html')}</loc></url>" for _, _, f in PAGES)
    (OUT / 'sitemap.xml').write_text(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>\n', encoding='utf-8', newline='\n')
    (OUT / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {SITE_URL}sitemap.xml\n', encoding='utf-8', newline='\n')
    (OUT / 'vercel.json').write_text(json.dumps({'framework': None, 'installCommand': '', 'buildCommand': '', 'outputDirectory': '.',
                                                 'cleanUrls': True, 'fluid': True}, indent=2) + '\n', encoding='utf-8', newline='\n')
    check_links(OUT)
    print(f"built {len(PAGES)} pages; {FIG['tests']} engine tests passed")


if __name__ == '__main__':
    try:
        build()
    except BuildError as e:
        sys.exit(f'build failed: {e}')
