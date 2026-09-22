'use client';

import { useLang } from '@/lib/i18n';

const ROWS = [
  ['S',   '84 – 88',   '64 – 68', '90 – 94'],
  ['M',   '88 – 94',   '68 – 74', '94 – 100'],
  ['L',   '94 – 100',  '74 – 80', '100 – 106'],
  ['XL',  '100 – 108', '80 – 88', '106 – 114'],
  ['XXL', '108 – 116', '88 – 96', '114 – 122'],
];

export default function SizeGuide() {
  const { t } = useLang();
  return (
    <section className="sec reveal" id="guide">
      <details>
        <summary>{t.sgTitle}</summary>
        <div className="scrollx">
          <table>
            <thead>
              <tr><th>{t.sgSize}</th><th>{t.sgBust}</th><th>{t.sgWaist}</th><th>{t.sgHips}</th></tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
