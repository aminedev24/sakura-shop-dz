'use client';

import { useState } from 'react';
import { WILAYAS, delay } from '@/lib/wilayas';
import { fmt } from '@/lib/format';

export default function DeliveryCalculator() {
  const [index, setIndex] = useState(0);
  const [home, setHome] = useState(false);

  const w = WILAYAS[index];
  const fee = home ? w.domicile : w.bureau;

  return (
    <section className="sec reveal" id="livraison">
      <div className="deliv">
        <div>
          <span className="section-kicker">🚚 Livraison simple &amp; transparente</span>
          <h2>Combien coûte la livraison chez vous ?</h2>
          <div className="dp"></div>
        </div>

        <div className="calc">
          <label htmlFor="wil">Votre wilaya</label>
          <select
            id="wil"
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
          >
            {WILAYAS.map((x, i) => (
              <option key={x.name} value={i}>{x.name}</option>
            ))}
          </select>

          <label>Mode de livraison</label>
          <div className="seg">
            <button type="button" aria-pressed={!home} onClick={() => setHome(false)}>
              Au bureau
            </button>
            <button type="button" aria-pressed={home} onClick={() => setHome(true)}>
              À domicile
            </button>
          </div>

          <div className="co">
            <b>{fmt(fee)}</b>
            <span>
              Délai estimé<br />
              <b style={{ fontFamily: 'var(--sans)', fontSize: '12.5px' }}>{delay(w.hours)}</b>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
