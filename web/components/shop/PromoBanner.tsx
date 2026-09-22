'use client';

import { IArrow } from '../icons2';
import { useLang } from '@/lib/i18n';

export default function PromoBanner() {
  const { t } = useLang();
  return (
    <section className="promo" aria-label={t.pbKicker}>
      <div className="promo-img"><img src="/uploads/products/p13.jpg" alt="" /></div>
      <div className="promo-body">
        <span className="kicker">{t.pbKicker}</span>
        <h3>{t.pbTitle1}<br />{t.pbTitle2}</h3>
        <p>{t.pbText}</p>
        <a className="btn2" href="#boutique">{t.pbCta} <IArrow /></a>
      </div>
      <div className="promo-deco" aria-hidden="true">
        <span className="heart">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.8 4.2 13a4.9 4.9 0 0 1 6.9-6.9l.9.9.9-.9A4.9 4.9 0 0 1 19.8 13Z" /></svg>
        </span>
        <span className="promo-script">Douceur<br />au quotidien</span>
      </div>
    </section>
  );
}
