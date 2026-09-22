'use client';

import { useState } from 'react';
import { WILAYAS } from '@/lib/wilayas';
import { useLang, useMoney, useDelay } from '@/lib/i18n';

export default function DeliveryCalculator() {
  const { t } = useLang();
  const money = useMoney();
  const delay = useDelay();
  const [index, setIndex] = useState(0);
  const [home, setHome] = useState(false);

  const w = WILAYAS[index];
  const fee = home ? w.domicile : w.bureau;

  return (
    <section className="sec reveal" id="livraison">
      <div className="deliv">
        <div>
          <span className="section-kicker">{t.dKicker}</span>
          <h2>{t.dTitle}</h2>
          <div className="dp"></div>
        </div>

        <div className="calc">
          <label htmlFor="wil">{t.dWilaya}</label>
          <select
            id="wil"
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
          >
            {WILAYAS.map((x, i) => (
              <option key={x.name} value={i}>{x.name}</option>
            ))}
          </select>

          <label>{t.dMode}</label>
          <div className="seg">
            <button type="button" aria-pressed={!home} onClick={() => setHome(false)}>
              {t.dOffice}
            </button>
            <button type="button" aria-pressed={home} onClick={() => setHome(true)}>
              {t.dHome}
            </button>
          </div>

          <div className="co">
            <b>{money(fee)}</b>
            <span>
              {t.dEta}<br />
              <b style={{ fontFamily: 'var(--sans)', fontSize: '12.5px' }}>{delay(w.hours)}</b>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
