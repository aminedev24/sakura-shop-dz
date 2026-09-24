'use client';

import { useState } from 'react';
import { WILAYAS, feeFor } from '@/lib/wilayas';
import { useLang, useMoney, useDelay } from '@/lib/i18n';

export default function DeliveryCalculator() {
  const { t } = useLang();
  const money = useMoney();
  const delay = useDelay();
  const [index, setIndex] = useState(15); // Alger
  const [home, setHome] = useState(false);

  const w = WILAYAS[index];
  const fee = feeFor(w, home);
  // the carrier serves some wilayas one way only, and four not at all
  const noDesk = w.bureau === null;
  const noHome = w.domicile === null;
  const unreachable = noDesk && noHome;

  return (
    <section className="sec3 reveal" id="livraison">
      <div className="deliv">
        <div>
          <span className="section-kicker">{t.dKicker}</span>
          <h2>{t.dTitle}</h2>
        </div>

        <div className="calc">
          <label htmlFor="wil">{t.dWilaya}</label>
          <select id="wil" value={index} onChange={(e) => setIndex(Number(e.target.value))}>
            {WILAYAS.map((x, i) => (
              <option key={x.code} value={i}>{x.label}</option>
            ))}
          </select>

          <label>{t.dMode}</label>
          <div className="seg">
            <button type="button" aria-pressed={!home} disabled={noDesk}
                    title={noDesk ? t.dDeskNone : undefined}
                    onClick={() => setHome(false)}>
              {t.dOffice}
            </button>
            <button type="button" aria-pressed={home} disabled={noHome}
                    title={noHome ? t.dHomeNone : undefined}
                    onClick={() => setHome(true)}>
              {t.dHome}
            </button>
          </div>

          <div className="co">
            {unreachable ? (
              <b className="co-none">{t.dNone}</b>
            ) : fee === null ? (
              <b className="co-none">{home ? t.dHomeNone : t.dDeskNone}</b>
            ) : (
              <>
                <b>{money(fee)}</b>
                <span>
                  {t.dEta}<br />
                  <b style={{ fontFamily: 'var(--sans)', fontSize: '12.5px' }}>{delay(w.delay)}</b>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
