'use client';

import { useLang } from '@/lib/i18n';
import { waLink } from '@/lib/shop';

/** Body measurements in centimetres, supplied by the shop.
 *
 *  Only S to XXL are stocked today; the rest are kept so the chart stays
 *  complete if the range widens. `stocked` marks what the catalogue actually
 *  sells. This is the only place these numbers live — the homepage section and
 *  the product page both read them from here.
 *
 *  Note the French column jumps 42 → 46 between XL and XXL, as supplied.
 */
const ROWS = [
  { sz: 'XS',  fr: '34', waist: '60 – 64',  hips: '88 – 92',   stocked: false },
  { sz: 'S',   fr: '36', waist: '64 – 68',  hips: '92 – 96',   stocked: true },
  { sz: 'M',   fr: '38', waist: '68 – 72',  hips: '96 – 100',  stocked: true },
  { sz: 'L',   fr: '40', waist: '72 – 76',  hips: '100 – 104', stocked: true },
  { sz: 'XL',  fr: '42', waist: '76 – 80',  hips: '104 – 108', stocked: true },
  { sz: 'XXL', fr: '46', waist: '80 – 84',  hips: '108 – 112', stocked: true },
  { sz: '3XL', fr: '48', waist: '84 – 88',  hips: '112 – 116', stocked: false },
  { sz: '4XL', fr: '50', waist: '88 – 95',  hips: '116 – 120', stocked: false },
  { sz: '5XL', fr: '52', waist: '95 – 102', hips: '120 – 124', stocked: false },
];

export default function SizeTable({
  highlight,
  compact = false,
}: {
  highlight?: string;
  /** on a product page, show only what is stocked and drop the measuring notes */
  compact?: boolean;
}) {
  const { t } = useLang();
  const rows = compact ? ROWS.filter((r) => r.stocked) : ROWS;

  return (
    <div className="sizetable">
      <div className="scrollx">
        <table>
          <thead>
            <tr>
              <th>{t.sgIntl}</th>
              <th>{t.sgFr}</th>
              <th>{t.sgWaist}</th>
              <th>{t.sgHips}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.sz}
                className={
                  [highlight === r.sz ? 'on' : '', !r.stocked ? 'off' : ''].filter(Boolean).join(' ') || undefined
                }
              >
                <td><b>{r.sz}</b></td>
                <td>{r.fr}</td>
                <td>{r.waist}</td>
                <td>{r.hips}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!compact && (
        <>
          <p className="sizetable-stocked">{t.sgStocked} : S · M · L · XL · XXL</p>
          <div className="sizetable-how">
            <h4>{t.sgHow}</h4>
            <ul>
              <li>{t.sgHow2}</li>
              <li>{t.sgHow3}</li>
            </ul>
          </div>
        </>
      )}

      <p className="sizetable-note">{t.sgNote}</p>
      <a className="sizetable-ask" href={waLink()} target="_blank" rel="noopener">
        {t.sgAsk}
      </a>
    </div>
  );
}
