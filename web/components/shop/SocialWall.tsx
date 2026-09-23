'use client';

import { useLang } from '@/lib/i18n';

const PAGE = 'https://www.facebook.com/sakurashop.dz/';
/** The iframe build of the Facebook Page plugin. Unlike the JS SDK version it
 *  needs no script, so it survives a static export. Some ad blockers drop third
 *  party frames, which is why the link underneath is a real fallback. */
const EMBED =
  'https://www.facebook.com/plugins/page.php?href=' +
  encodeURIComponent(PAGE) +
  '&tabs=timeline&width=400&height=460&small_header=false' +
  '&adapt_container_width=true&hide_cover=false&show_facepile=true';

const TILES = ['p17', 'p12', 'p10', 'p5', 'p20', 'p13'];

export default function SocialWall() {
  const { t } = useLang();
  return (
    <section className="wrap social">
      <span className="kicker">{t.socKicker}</span>
      <h2>{t.socHandle}</h2>
      <p>{t.socText}</p>

      {/* full-width strip, as before — the feed sits under it */}
      <div className="social-grid">
        {TILES.map((img, i) => (
          <a className="social-tile" key={`${img}-${i}`} href={PAGE} target="_blank" rel="noopener">
            <img src={`/uploads/products/${img}.jpg`} alt="" loading="lazy" />
          </a>
        ))}
      </div>

      <div className="social-feed">
        <iframe
          src={EMBED}
          title="Facebook"
          width={400}
          height={460}
          loading="lazy"
          scrolling="no"
          allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
        <a className="social-fallback" href={PAGE} target="_blank" rel="noopener">
          {t.socFallback}
        </a>
      </div>
    </section>
  );
}
