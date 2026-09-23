'use client';

import { useLang } from '@/lib/i18n';

const PAGE = 'https://www.facebook.com/sakurashop.dz/';

/** The iframe build of the Facebook Page plugin: no SDK script, so it survives
 *  a static export. Ad blockers and sandboxed previews drop third party frames,
 *  which is why the fallback link is real rather than decorative. */
const EMBED =
  'https://www.facebook.com/plugins/page.php?href=' +
  encodeURIComponent(PAGE) +
  '&tabs=timeline&width=560&height=500&small_header=true' +
  '&adapt_container_width=true&hide_cover=false&show_facepile=true';

export default function SocialWall() {
  const { t } = useLang();
  const points = [
    { icon: '✿', b: t.socPt1, s: t.socPt1s },
    { icon: '♡', b: t.socPt2, s: t.socPt2s },
    { icon: '✦', b: t.socPt3, s: t.socPt3s },
  ];

  return (
    <section className="social-section">
      <div className="social-inner">
        <div>
          <div className="social-feed-heading">
            <div className="social-feed-kicker">
              <span className="social-kicker-dot" />
              {t.socKicker2}
            </div>
            <h2>
              {t.socTitle1}<br />
              {t.socTitle2} <span>{t.socTitle3}</span>
            </h2>
            <p>{t.socLead}</p>
          </div>

          <div className="social-card">
            <div className="social-card-top">
              <div className="social-profile">
                <span className="social-avatar">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
                  </svg>
                </span>
                <span className="social-profile-text">
                  <b>Sakura Shop</b>
                  <small>{t.socPageMeta}</small>
                </span>
              </div>
              <a className="social-follow" href={PAGE} target="_blank" rel="noopener">{t.socFollow}</a>
            </div>

            <div className="social-frame">
              <iframe
                src={EMBED}
                title={`${t.socTitle2} ${t.socTitle3}`}
                loading="lazy"
                scrolling="no"
                allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>

            <div className="social-card-bottom">
              <span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 11.5a7.5 7.5 0 1 1-2.2-5.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M20 5v5h-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.socLive}
              </span>
              <a href={PAGE} target="_blank" rel="noopener">{t.socOpen} →</a>
            </div>
          </div>
        </div>

        <aside className="social-aside">
          <span className="social-aside-badge">✦ {t.socBadge}</span>
          <h3>{t.socAsideH}</h3>
          <p>{t.socAsideP}</p>

          <div className="social-points">
            {points.map((pt) => (
              <div className="social-point" key={pt.b}>
                <span className="social-point-icon" aria-hidden="true">{pt.icon}</span>
                <div>
                  <strong>{pt.b}</strong>
                  <small>{pt.s}</small>
                </div>
              </div>
            ))}
          </div>

          <a className="social-main-cta" href={PAGE} target="_blank" rel="noopener">
            <span>{t.socMainCta}</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h13m-5-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a className="social-fallback" href={PAGE} target="_blank" rel="noopener">
            {t.socFallbackQ}
            <span>{t.socFallbackA}</span>
          </a>

          <div className="social-decoration" aria-hidden="true">✿</div>
        </aside>
      </div>
    </section>
  );
}
