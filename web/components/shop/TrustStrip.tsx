'use client';

import { IShield, ITruck, ICard, IHeadset } from '../icons2';
import { useLang } from '@/lib/i18n';

export default function TrustStrip() {
  const { t } = useLang();
  const items = [
    { icon: <IShield />,  b: t.w1b, s: t.w1s },
    { icon: <ITruck />,   b: t.w2b, s: t.w2s },
    { icon: <ICard />,    b: t.w3b, s: t.w3s },
    { icon: <IHeadset />, b: t.w4b, s: t.w4s },
  ];
  return (
    <section className="sec3 reveal" id="pourquoi" aria-label={t.whyTitle}>
      <div className="sechead sechead-c">
        <h2>{t.whyTitle}</h2>
        <p>{t.whySub}</p>
      </div>
      <div className="why">
        {items.map((i) => (
          <div className="why-item" key={i.b}>
            <span className="why-ic">{i.icon}</span>
            <span><b>{i.b}</b><span>{i.s}</span></span>
          </div>
        ))}
      </div>
    </section>
  );
}
