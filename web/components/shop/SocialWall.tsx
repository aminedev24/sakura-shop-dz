'use client';

import { useLang } from '@/lib/i18n';

const PAGE = 'https://www.facebook.com/sakurashop.dz/';

/** The iframe build of the Facebook Page plugin. Unlike the JS SDK version it
 *  needs no script, so it survives a static export. Some ad blockers drop third
 *  party frames, which is why the link underneath is a real fallback. */
const EMBED =
  'https://www.facebook.com/plugins/page.php?href=' +
  encodeURIComponent(PAGE) +
  '&tabs=timeline&width=440&height=460&small_header=true' +
  '&adapt_container_width=true&hide_cover=false&show_facepile=true';

const TILES = ['p12', 'p10', 'p5', 'p20', 'p13'];

export default function SocialWall() {
  const { t } = useLang();

  return (
    <section className="wrap social">
      <span className="kicker">{t.socKicker}</span>
      <h2>{t.socHandle}</h2>
      <p>{t.socText}</p>

      {/* full-bleed strip: one row, however many tiles TILES lists */}
      <div className="social-grid">
        {TILES.map((img) => (
          <a className="social-tile" key={img} href={PAGE} target="_blank" rel="noopener">
            <img src={`/uploads/products/${img}.jpg`} alt="" loading="lazy" />
            <span className="heart" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20.3 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 0 1 19.4 13Z" />
              </svg>
            </span>
          </a>
        ))}
      </div>

      <div className="social-feed">
        <div className="social-card">
          <div className="social-card-head">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
            </svg>
            <b>Sakura Shop</b>
            <span>facebook.com</span>
          </div>
          <iframe
            src={EMBED}
            title="Facebook"
            width={440}
            height={460}
            loading="lazy"
            scrolling="no"
            allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>

        <a className="btn2 ghost social-cta" href={PAGE} target="_blank" rel="noopener">
          {t.socCta}
        </a>
        <a className="social-fallback" href={PAGE} target="_blank" rel="noopener">
          {t.socFallback}
        </a>
      </div>
    </section>
  );
}
