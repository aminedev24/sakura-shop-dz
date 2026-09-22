'use client';

import { IArrow, ITruck, ICard, IStar, IPin } from '../icons2';
import { useLang } from '@/lib/i18n';
import Tiles from './Tiles';

export default function Hero() {
  const { t } = useLang();
  // note: no exchange/return claim here — that policy is still undecided
  const feats = [
    { icon: <ITruck />, b: t.f1b, s: t.f1s },
    { icon: <ICard />, b: t.f2b, s: t.f2s },
    { icon: <IPin />, b: t.f3b, s: t.f3s },
    { icon: <IStar />, b: t.f4b, s: t.f4s },
  ];

  return (
    <section className="wrap hero3" aria-label={t.heroKicker}>
      <div className="hero3-card">
        <div className="hero3-photo">
          <img src="/uploads/products/p17.jpg" alt="Sakura Shop" />
        </div>

        <div className="hero3-badge">
          <span className="pin"><IPin /></span>
          <span>
            <b>{t.f1b}</b>
            <span>{t.tbCod}</span>
          </span>
        </div>

        <div className="hero3-in">
          <span className="kicker">{t.heroKicker}</span>
          <h1>{t.heroTitle1}<br />{t.heroTitle2}</h1>
          <p>{t.heroText}</p>
          <div className="hero3-btns">
            <a className="btn2" href="#boutique">{t.heroCta1} <IArrow /></a>
            <a className="btn2 ghost" href="#livraison"><ITruck /> {t.heroCta2}</a>
          </div>
          <div className="hero3-feats">
            {feats.map((f) => (
              <div className="hero3-feat" key={f.b}>
                {f.icon}
                <span><b>{f.b}</b><span>{f.s}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Tiles />
    </section>
  );
}
