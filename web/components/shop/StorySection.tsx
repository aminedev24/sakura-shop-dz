'use client';

import { useLang } from '@/lib/i18n';

export default function StorySection() {
  const { t } = useLang();
  const points = [t.stP1, t.stP2, t.stP3, t.stP4];

  return (
    <section className="wrap story" id="story">
      <div className="story-box">
        <div className="story-image">
          <img src="/uploads/products/p20.jpg" alt="" />
        </div>
        <div className="story-copy">
          <span className="kicker">{t.stKicker}</span>
          <h2>{t.stTitle}</h2>
          <p>{t.stText}</p>
          <div className="story-points">
            {points.map((x) => (
              <div className="story-point" key={x}><i aria-hidden="true">✓</i> {x}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
