'use client';

import { IArrow } from '../icons2';

const TILES = [
  { img: 'p12', label: 'Satin',       sub: 'Col revers',        cat: 'satin' },
  { img: 'p10', label: 'Coton',       sub: 'Respirant & doux',  cat: 'coton' },
  { img: 'p5',  label: 'Boutonné',    sub: 'Classique & élégant', cat: 'boutonne' },
  { img: 'p20', label: 'Nouveautés',  sub: 'Cette semaine',     cat: 'all' },
];

export default function Tiles({ onFilter }: { onFilter?: (slug: string) => void }) {
  return (
    <nav className="tiles3" aria-label="Rayons">
      {TILES.map((t) => (
        <a
          key={t.cat}
          className="tile3"
          href="#boutique"
          aria-label={t.label}
          onClick={() => onFilter?.(t.cat)}
        >
          <img src={`/uploads/products/${t.img}.jpg`} alt={t.label} />
          <span className="tile3-lbl">
            <b>{t.label}</b>
            <span>{t.sub}</span>
          </span>
          <span className="tile3-go"><IArrow /></span>
        </a>
      ))}
    </nav>
  );
}
