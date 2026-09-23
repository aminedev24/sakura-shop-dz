'use client';

import { useLang } from '@/lib/i18n';

/** A visual wall of shop photography. Not a live feed: an actual Instagram or
 *  Facebook embed needs an API token or a third-party widget script, neither of
 *  which a static export can carry. These are our own images. */
const TILES = ['p17', 'p12', 'p10', 'p5', 'p20', 'p13'];

export default function SocialWall() {
  const { t } = useLang();
  return (
    <section className="wrap social">
      <span className="kicker">{t.socKicker}</span>
      <h2>{t.socHandle}</h2>
      <p>{t.socText}</p>
      <div className="social-grid">
        {TILES.map((img, i) => (
          <a className="social-tile" key={`${img}-${i}`}
             href="https://www.facebook.com/sakurashop.dz/" target="_blank" rel="noopener">
            <img src={`/uploads/products/${img}.jpg`} alt="" loading="lazy" />
          </a>
        ))}
      </div>
      <a className="btn2 ghost social-cta" href="https://www.facebook.com/sakurashop.dz/"
         target="_blank" rel="noopener">{t.socCta}</a>
    </section>
  );
}
