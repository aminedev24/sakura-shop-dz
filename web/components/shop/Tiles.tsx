'use client';

import { IArrow } from '../icons2';
import { useLang } from '@/lib/i18n';
import { bundled } from '@/lib/asset';

export default function Tiles({ onFilter }: { onFilter?: (slug: string) => void }) {
  const { t } = useLang();
  // whole filenames, extension included: the artwork in web/public/brand is
  // whatever the photographer sent, so one tile is .jpeg and the rest .jpg
  const tiles = [
    { img: 'satin4.jpeg',    label: t.tSatin, sub: t.tSatinS2, cat: 'satin' },
    { img: 'coton.jpg',      label: t.tCoton, sub: t.tCotonS2, cat: 'coton' },
    { img: 'boutonne.jpg',   label: t.tBout,  sub: t.tBoutS2,  cat: 'boutonne' },
    { img: 'nouveautes.jpg', label: t.tNew,   sub: t.tNewS,    cat: 'all' },
  ];
  return (
    <nav className="tiles3" aria-label={t.navShop}>
      {tiles.map((x) => (
        <a key={x.cat} className="tile3" href="#boutique" aria-label={x.label}
           onClick={() => onFilter?.(x.cat)}>
          <img src={bundled(`brand/${x.img}`)} alt={x.label} />
          <span className="tile3-shade" aria-hidden="true" />
          <span className="tile3-lbl"><b>{x.label}</b><span>{x.sub}</span></span>
          <span className="tile3-go"><IArrow /></span>
        </a>
      ))}
    </nav>
  );
}
