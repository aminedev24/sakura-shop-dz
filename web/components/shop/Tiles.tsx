'use client';

import { IArrow } from '../icons2';
import { useLang } from '@/lib/i18n';

export default function Tiles({ onFilter }: { onFilter?: (slug: string) => void }) {
  const { t } = useLang();
  const tiles = [
    { img: 'p12', label: t.tSatin, sub: t.tSatinS2, cat: 'satin' },
    { img: 'p10', label: t.tCoton, sub: t.tCotonS2, cat: 'coton' },
    { img: 'p5',  label: t.tBout,  sub: t.tBoutS2,  cat: 'boutonne' },
    { img: 'p20', label: t.tNew,   sub: t.tNewS,    cat: 'all' },
  ];
  return (
    <nav className="tiles3" aria-label={t.navShop}>
      {tiles.map((x) => (
        <a key={x.cat} className="tile3" href="#boutique" aria-label={x.label}
           onClick={() => onFilter?.(x.cat)}>
          <img src={`/uploads/products/${x.img}.jpg`} alt={x.label} />
          <span className="tile3-shade" aria-hidden="true" />
          <span className="tile3-lbl"><b>{x.label}</b><span>{x.sub}</span></span>
          <span className="tile3-go"><IArrow /></span>
        </a>
      ))}
    </nav>
  );
}
