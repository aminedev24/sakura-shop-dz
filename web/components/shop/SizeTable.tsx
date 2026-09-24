'use client';

import { useLang } from '@/lib/i18n';

/** Body measurements in centimetres.
 *
 *  These came from the original sakura-shop.html and are a conventional EU
 *  women's chart, not measurements taken from the garments we actually stock.
 *  Turkish and Chinese pyjamas often run a size small against it. Measure a few
 *  pieces flat and correct the rows below — this table is the only place the
 *  numbers live, so the homepage and the product page both follow it.
 */
const ROWS = [
  { sz: 'S',   eu: '36 – 38', bust: '84 – 88',   waist: '64 – 68', hips: '90 – 94' },
  { sz: 'M',   eu: '38 – 40', bust: '88 – 94',   waist: '68 – 74', hips: '94 – 100' },
  { sz: 'L',   eu: '40 – 42', bust: '94 – 100',  waist: '74 – 80', hips: '100 – 106' },
  { sz: 'XL',  eu: '42 – 44', bust: '100 – 108', waist: '80 – 88', hips: '106 – 114' },
  { sz: 'XXL', eu: '44 – 46', bust: '108 – 116', waist: '88 – 96', hips: '114 – 122' },
];

export default function SizeTable({
  highlight,
  compact = false,
}: {
  highlight?: string;
  compact?: boolean;
}) {
  const { t } = useLang();

  return (
    <div className="sizetable">
      <div className="scrollx">
        <table>
          <thead>
            <tr>
              <th>{t.sgSize}</th>
              <th>{t.sgEu}</th>
              <th>{t.sgBust}</th>
              <th>{t.sgWaist}</th>
              <th>{t.sgHips}</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.sz} className={highlight === r.sz ? 'on' : undefined}>
                <td><b>{r.sz}</b></td>
                <td>{r.eu}</td>
                <td>{r.bust}</td>
                <td>{r.waist}</td>
                <td>{r.hips}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!compact && (
        <div className="sizetable-how">
          <h4>{t.sgHow}</h4>
          <ul>
            <li>{t.sgHow1}</li>
            <li>{t.sgHow2}</li>
            <li>{t.sgHow3}</li>
          </ul>
        </div>
      )}

      <p className="sizetable-note">{t.sgNote}</p>
      <a className="sizetable-ask" href="https://wa.me/213560000000" target="_blank" rel="noopener">
        {t.sgAsk}
      </a>
    </div>
  );
}
