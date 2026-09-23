#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build preview/index.html — one self-contained copy of the homepage.

Everything is embedded so the file works with no server, no database and no
build: the stylesheets from web/app, the product rows from MySQL, every
photograph as a data: URI, and the French/Arabic dictionaries read straight out
of web/lib/i18n.tsx so the preview cannot drift from the app.

    python3 scripts/build-preview.py     (or: npm run preview:html)

Needs PHP and MySQL running, because the catalogue comes from the database.
"""
import base64, io, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT  = os.path.join(ROOT, 'preview', 'index.html')

# how many products to show, and which photo fills each slot
PRODUCT_LIMIT = 8
HERO_IMG, PROMO_IMG, STORY_IMG = 'p17', 'p13', 'p20'
TILE_IMGS   = [('p12', 'tSatin', 'tSatinS2'), ('p10', 'tCoton', 'tCotonS2'),
               ('p5',  'tBout',  'tBoutS2'),  ('p20', 'tNew',   'tNewS')]
SOCIAL_IMGS = ['p17', 'p12', 'p10', 'p5', 'p20', 'p13']


def data_uri(rel):
    with open(os.path.join(ROOT, rel), 'rb') as f:
        return 'data:image/jpeg;base64,' + base64.b64encode(f.read()).decode()


def products():
    """Read the catalogue through PHP so it reuses config/db.php."""
    php = ('require "config/db.php";'
           'echo json_encode($pdo->query("SELECT id,name,material,price,original_price,'
           'rating,sizes,tag,image_path FROM products WHERE active=1 ORDER BY id LIMIT %d")'
           '->fetchAll(), JSON_UNESCAPED_UNICODE);' % PRODUCT_LIMIT)
    out = subprocess.run(['php', '-r', php], cwd=ROOT, capture_output=True, text=True)
    if out.returncode or not out.stdout.strip().startswith('['):
        sys.exit('could not read products — is MySQL running?\n' + (out.stderr or out.stdout))
    return json.loads(out.stdout)


def dictionaries():
    """Pull the fr and ar objects out of the TypeScript source."""
    src = io.open(os.path.join(ROOT, 'web/lib/i18n.tsx'), encoding='utf-8').read()

    def block(lang):
        i = src.index(lang + ': {')
        depth, j = 0, i + len(lang) + 2
        while True:
            if src[j] == '{': depth += 1
            elif src[j] == '}':
                depth -= 1
                if depth == 0: break
            j += 1
        return src[i + len(lang) + 2:j]

    def parse(b):
        d = {}
        for m in re.finditer(r"(\w+):\s*'((?:[^'\\]|\\.)*)'", b):
            d[m.group(1)] = (m.group(2).replace("\\'", "'")
                             .replace('\\u2066', '⁦').replace('\\u2069', '⁩'))
        return d

    fr, ar = parse(block('fr')), parse(block('ar'))
    fr.update(tagNew='Nouveau', tagLow='Stock limité',
              pvNote='design de la page d’accueil, données réelles du catalogue')
    ar.update(tagNew='جديد', tagLow='كمية محدودة',
              pvNote='تصميم الصفحة الرئيسية ببيانات حقيقية من الكتالوج')
    return fr, ar


def stars(r):
    return ''.join('★' if k <= round(float(r)) else '☆' for k in range(1, 6))


def esc(s):
    return (str(s).replace('&', '&amp;').replace('<', '&lt;')
            .replace('>', '&gt;').replace('"', '&quot;'))


def icon(paths, fill=False):
    return ('<svg viewBox="0 0 24 24" fill="%s"%s stroke-linecap="round" '
            'stroke-linejoin="round">%s</svg>'
            % ('currentColor' if fill else 'none',
               '' if fill else ' stroke="currentColor" stroke-width="1.7"', paths))


IC = {
 'truck':  icon('<path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>'),
 'card':   icon('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 10h18"/>'),
 'pin':    icon('<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.4"/>'),
 'star':   icon('<path d="m12 4 2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8Z"/>'),
 'shield': icon('<path d="M12 3.5 5 6.2v5.1c0 4.4 3 8 7 9.2 4-1.2 7-4.8 7-9.2V6.2Z"/><path d="m9.2 12 2 2 3.6-3.8"/>'),
 'head':   icon('<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><path d="M4 13h2.6a1 1 0 0 1 1 1v3.4a1 1 0 0 1-1 1H5.6A1.6 1.6 0 0 1 4 16.8Z"/><path d="M20 13h-2.6a1 1 0 0 0-1 1v3.4a1 1 0 0 0 1 1h1a1.6 1.6 0 0 0 1.6-1.6Z"/>'),
 'arrow':  icon('<path d="M5 12h13m-5-6 6 6-6 6"/>'),
 'search': icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>'),
 'heart':  icon('<path d="M12 20.3 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 0 1 19.4 13Z"/>'),
 'user':   icon('<circle cx="12" cy="8" r="3.6"/><path d="M4.6 20c1.2-4 4-6 7.4-6s6.2 2 7.4 6"/>'),
 'bag':    icon('<path d="M6 8h12l-1 12H7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
 'ig':     icon('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/>'),
 'fb':     icon('<path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z', True),
}

PETAL = ('M16 5.2c2.9 0 5.1 2.3 5.1 5.2 0 2.6-1.8 4.6-3.7 5.5-.8.4-1.1.7-1.4.7s-.6-.3-1.4-.7'
         'c-1.9-.9-3.7-2.9-3.7-5.5 0-2.9 2.2-5.2 5.1-5.2Z')
MARK = ('<svg viewBox="0 0 32 32" class="mark" aria-hidden="true"><defs>'
        '<linearGradient id="sk" x1="0" y1="0" x2="1" y2="1">'
        '<stop offset="0" stop-color="#F4A6C4"/><stop offset="1" stop-color="#DE3E79"/>'
        '</linearGradient></defs><g fill="url(#sk)">'
        + ''.join('<path d="%s" transform="rotate(%d 16 16)"/>' % (PETAL, d)
                  for d in (0, 72, 144, 216, 288))
        + '</g><circle cx="16" cy="16" r="2.1" fill="#C22C64"/></svg>')


def build():
    css = (io.open(os.path.join(ROOT, 'web/app/globals.css'), encoding='utf-8').read()
           + '\n'
           + io.open(os.path.join(ROOT, 'web/app/redesign.css'), encoding='utf-8').read())
    fr, ar = dictionaries()

    cards = []
    for p in products():
        off = 0
        if p['original_price'] and float(p['original_price']) > float(p['price']):
            off = max(0, round((1 - float(p['price']) / float(p['original_price'])) * 100))
        if off:
            badge = '<span class="pcard-off">-%d%%</span>' % off
        elif p['tag'] == 'new':
            badge = '<span class="pcard-tag" data-i18n="tagNew"></span>'
        elif p['tag'] == 'low':
            badge = '<span class="pcard-tag" data-i18n="tagLow"></span>'
        else:
            badge = ''
        was = '<span class="pcard-was" data-money="%s"></span>' % p['original_price'] if off else ''
        cards.append(
            '<article class="pcard"><div class="pcard-ph">'
            '<img src="%s" alt="%s" loading="lazy">%s'
            '<button class="pcard-wish" type="button" aria-label="Favori">%s</button></div>'
            '<div class="pcard-body"><div class="pcard-top">'
            '<span class="pcard-cat">%s</span><span class="pcard-stars">%s</span></div>'
            '<h3>%s</h3><div class="pcard-price">'
            '<span class="pcard-now" data-money="%s"></span>%s</div>'
            '<div class="pcard-act"><select aria-label="Taille">'
            '<option data-i18n="pickSize"></option>%s</select>'
            '<button class="pcard-add" type="button" data-i18n="add"></button>'
            '</div></div></article>'
            % (data_uri(p['image_path']), esc(p['name']), badge, IC['heart'],
               esc(p['material'].split('·')[0].strip()), stars(p['rating']), esc(p['name']),
               p['price'], was,
               ''.join('<option>%s</option>' % esc(s) for s in p['sizes'].split(','))))

    tiles = ''.join(
        '<a class="tile3" href="#boutique"><img src="%s" alt="">'
        '<span class="tile3-shade"></span><span class="tile3-lbl">'
        '<b data-i18n="%s"></b><span data-i18n="%s"></span></span>'
        '<span class="tile3-go">%s</span></a>'
        % (data_uri('uploads/products/%s.jpg' % img), a, b, IC['arrow'])
        for img, a, b in TILE_IMGS)

    social = ''.join(
        '<a class="social-tile" href="https://www.facebook.com/sakurashop.dz/" '
        'target="_blank" rel="noopener"><img src="%s" alt="" loading="lazy"></a>'
        % data_uri('uploads/products/%s.jpg' % i) for i in SOCIAL_IMGS)

    feats = ''.join(
        '<div class="hero3-feat">%s<span><b data-i18n="%s"></b><span data-i18n="%s"></span></span></div>'
        % (IC[i], b, s) for i, b, s in
        [('truck', 'f1b', 'f1s'), ('card', 'f2b', 'f2s'),
         ('pin', 'f3b', 'f3s'), ('star', 'f4b', 'f4s')])

    whys = ''.join(
        '<div class="why-item"><span class="why-ic">%s</span>'
        '<span><b data-i18n="%s"></b><span data-i18n="%s"></span></span></div>'
        % (IC[i], b, s) for i, b, s in
        [('shield', 'w1b', 'w1s'), ('truck', 'w2b', 'w2s'),
         ('card', 'w3b', 'w3s'), ('head', 'w4b', 'w4s')])

    points = ''.join('<div class="story-point"><i>&#10003;</i> <span data-i18n="%s"></span></div>'
                     % k for k in ('stP1', 'stP2', 'stP3', 'stP4'))

    doc = TEMPLATE % dict(
        css=css, cards=''.join(cards), tiles=tiles, social=social, feats=feats,
        whys=whys, points=points, mark=MARK,
        hero=data_uri('uploads/products/%s.jpg' % HERO_IMG),
        promo=data_uri('uploads/products/%s.jpg' % PROMO_IMG),
        story=data_uri('uploads/products/%s.jpg' % STORY_IMG),
        dict=json.dumps({'fr': fr, 'ar': ar}, ensure_ascii=False),
        **{'ic_' + k: v for k, v in IC.items()})

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    io.open(OUT, 'w', encoding='utf-8').write(doc)
    print('wrote %s — %.2f MB' % (os.path.relpath(OUT, ROOT), os.path.getsize(OUT) / 1048576))


TEMPLATE = """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Sakura Shop &mdash; Aper\u00e7u</title>
<meta name="description" content="Aper\u00e7u statique de la page d'accueil Sakura Shop.">
<meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&amp;family=Cairo:wght@400;600;700&amp;display=swap">
<style>
*{box-sizing:border-box}img{max-width:100%%}
%(css)s
body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--sans);
  font-size:var(--t-body);line-height:1.65;-webkit-font-smoothing:antialiased}
.preview-note{background:var(--ink);color:var(--footer-text);font-size:12px;
  padding:9px 16px;text-align:center}
.preview-note b{color:#fff}
/* the scroll reveal is JS-driven in the app; show everything at rest here */
.reveal{opacity:1;transform:none}
</style>
</head>
<body>

<div class="preview-note"><b>Aper\u00e7u statique</b> &mdash; <span data-i18n="pvNote"></span></div>

<aside class="topbar"><div class="wrap topbar-in"><div class="topbar-items">
  <span class="topbar-item"><i>%(ic_truck)s</i><span data-i18n="tbDelivery"></span></span>
  <span class="topbar-item"><span class="topbar-sep">&middot;</span><i>%(ic_card)s</i><span data-i18n="tbCod"></span></span>
  <span class="topbar-item"><span class="topbar-sep">&middot;</span><i>%(ic_pin)s</i><span data-i18n="tbFree"></span></span>
</div><div class="topbar-soc"><span data-i18n="follow"></span></div></div></aside>

<header class="hdr"><div class="wrap hdr-in">
  <a class="brand" href="#">%(mark)s<span><b>Sakura Shop</b><small data-i18n="tagline"></small></span></a>
  <nav class="mainnav">
    <a href="#" aria-current="page" data-i18n="navHome"></a>
    <a href="#boutique" data-i18n="navShop"></a>
    <a href="#livraison" data-i18n="navDelivery"></a>
    <a href="#pourquoi" data-i18n="navWhy"></a>
    <a href="#story" data-i18n="navAbout"></a>
  </nav>
  <div class="hdr-actions">
    <button class="langbtn" id="langBtn" type="button"><span class="lang-full"></span><span class="lang-short"></span></button>
    <button class="iconbtn ib-search" type="button" aria-label="Rechercher">%(ic_search)s</button>
    <button class="iconbtn ib-wish" type="button" aria-label="Favoris">%(ic_heart)s</button>
    <button class="iconbtn" type="button" aria-label="Compte">%(ic_user)s</button>
    <button class="iconbtn" type="button" aria-label="Panier">%(ic_bag)s<span class="badge">0</span></button>
  </div>
</div></header>

<main>
<section class="wrap hero3"><div class="hero3-card">
  <div class="hero3-photo"><img src="%(hero)s" alt=""></div>
  <div class="hero3-badge"><span class="pin">%(ic_pin)s</span><span><b data-i18n="f1b"></b><span data-i18n="tbCod"></span></span></div>
  <div class="hero3-in">
    <span class="kicker" data-i18n="heroKicker"></span>
    <h1><span data-i18n="heroTitle1"></span><br><span data-i18n="heroTitle2"></span></h1>
    <p data-i18n="heroText"></p>
    <div class="hero3-btns">
      <a class="btn2" href="#boutique"><span data-i18n="heroCta1"></span> %(ic_arrow)s</a>
      <a class="btn2 ghost" href="#livraison">%(ic_truck)s <span data-i18n="heroCta2"></span></a>
    </div>
    <div class="hero3-feats">%(feats)s</div>
  </div>
</div><nav class="tiles3">%(tiles)s</nav></section>

<section class="wrap story" id="story"><div class="story-box">
  <div class="story-image"><img src="%(story)s" alt=""></div>
  <div class="story-copy">
    <span class="kicker" data-i18n="stKicker"></span>
    <h2 data-i18n="stTitle"></h2>
    <p data-i18n="stText"></p>
    <div class="story-points">%(points)s</div>
  </div>
</div></section>

<div class="wrap">
  <section class="sec3 reveal" id="pourquoi">
    <div class="sechead sechead-c"><h2 data-i18n="whyTitle"></h2><p data-i18n="whySub"></p></div>
    <div class="why">%(whys)s</div>
  </section>
  <section class="sec3 reveal" id="boutique">
    <div class="sechead">
      <div><span class="kicker" data-i18n="shopKicker"></span><h2 data-i18n="shopTitle"></h2><p data-i18n="shopSub"></p></div>
      <a class="seclink" href="#"><span data-i18n="shopAll"></span> %(ic_arrow)s</a>
    </div>
    <div class="chips3">
      <button class="chip3" aria-pressed="true" data-i18n="fAll"></button>
      <button class="chip3" aria-pressed="false" data-i18n="fCoton"></button>
      <button class="chip3" aria-pressed="false" data-i18n="fSatin"></button>
      <button class="chip3" aria-pressed="false" data-i18n="fBout"></button>
      <button class="chip3" aria-pressed="false" data-i18n="fPromo"></button>
    </div>
    <div class="grid3">%(cards)s</div>
  </section>
</div>

<section class="editorial">
  <div class="editorial-image"><img src="%(promo)s" alt=""></div>
  <div class="editorial-copy">
    <span class="kicker" data-i18n="pbKicker"></span>
    <h2><span data-i18n="pbTitle1"></span><br><span data-i18n="pbTitle2"></span></h2>
    <p data-i18n="pbText"></p>
    <a class="primary" href="#boutique"><span data-i18n="pbCta"></span> %(ic_arrow)s</a>
  </div>
  <div class="editorial-script" data-i18n="promoScript"></div>
</section>

<div class="wrap"><section class="sec3 reveal" id="livraison"><div class="deliv">
  <div><span class="section-kicker" data-i18n="dKicker"></span><h2 data-i18n="dTitle"></h2></div>
  <div class="calc">
    <label data-i18n="dWilaya"></label>
    <select><option>16 &mdash; Alger</option><option>31 &mdash; Oran</option><option>25 &mdash; Constantine</option></select>
    <label data-i18n="dMode"></label>
    <div class="seg"><button aria-pressed="true" data-i18n="dOffice"></button><button aria-pressed="false" data-i18n="dHome"></button></div>
    <div class="co"><b data-money="400"></b><span><span data-i18n="dEta"></span><br><b style="font-family:var(--sans);font-size:12.5px" data-i18n="d24"></b></span></div>
  </div>
</div></section></div>

<section class="wrap social">
  <span class="kicker" data-i18n="socKicker"></span>
  <h2 data-i18n="socHandle"></h2>
  <p data-i18n="socText"></p>
  <div class="social-grid">%(social)s</div>
  <a class="btn2 ghost social-cta" href="https://www.facebook.com/sakurashop.dz/" target="_blank" rel="noopener" data-i18n="socCta"></a>
</section>
</main>

<footer class="ftr">
  <div class="wrap ftr-in">
    <div class="ftr-brand">%(mark)s<span><b>Sakura Shop</b><small data-i18n="tagline"></small></span></div>
    <div class="ftr-soc"><h5 data-i18n="follow"></h5><div class="ftr-soc-row">
      <a href="https://www.facebook.com/sakurashop.dz/">%(ic_fb)s</a><a href="#">%(ic_ig)s</a></div></div>
    <div class="ftr-thanks"><span class="script">Merci</span></div>
  </div>
  <div class="wrap ftr-bot"><span data-i18n="rights"></span></div>
</footer>

<script>
const DICT = %(dict)s;
let lang = 'fr';
function money(n, cur){
  const digits = String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ' ');
  // isolate the digits in RTL: the thousands space is bidi-neutral and flips
  return lang === 'ar' ? '\\u2066' + digits + '\\u2069 ' + cur : digits + ' ' + cur;
}
function apply(){
  const t = DICT[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-money]').forEach(el => {
    el.textContent = money(el.dataset.money, t.currency);
  });
  document.querySelector('.lang-full').textContent = t.langLabel;
  document.querySelector('.lang-short').textContent = t.langShort;
}
document.getElementById('langBtn').addEventListener('click', () => {
  lang = lang === 'fr' ? 'ar' : 'fr';
  apply();
});
apply();
</script>
</body>
</html>
"""


if __name__ == '__main__':
    build()
