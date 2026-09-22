'use client';

import { IArrow } from '../icons2';
import { useLang } from '@/lib/i18n';

export default function PromoBanner() {
  const { t } = useLang();
  return (
    <section className="editorial" aria-label={t.pbKicker}>
      <div className="editorial-image">
        <img src="/uploads/products/p12.jpg" alt="" />
      </div>

      <div className="editorial-copy">
        <span className="kicker">{t.pbKicker}</span>
        <h2>{t.pbTitle1}<br />{t.pbTitle2}</h2>
        <p>{t.pbText}</p>
        <a className="primary" href="#boutique">{t.pbCta} <IArrow /></a>
      </div>

      <div className="editorial-script" aria-hidden="true">{t.promoScript}</div>
    </section>
  );
}
