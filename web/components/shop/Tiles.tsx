const TILES = [
  { img: 'p5',  label: 'Pyjamas boutonnés', sub: 'Crêpe froissé',  cat: 'boutonne' },
  { img: 'p12', label: 'Satin',             sub: 'Col revers',     cat: 'satin' },
  { img: 'p10', label: 'Coton imprimé',     sub: 'Coupes amples',  cat: 'coton' },
  { img: 'p20', label: 'Nouvel arrivage',   sub: 'Cette semaine',  cat: 'all' },
];

export default function Tiles() {
  return (
    <nav className="tiles" id="tiles" aria-label="Rayons">
      {TILES.map((t) => (
        <a key={t.cat} className="tile" href="#boutique" data-tc={t.cat} aria-label={t.label}>
          <img src={`/uploads/products/${t.img}.jpg`} alt={t.label} />
          <span className="lbl">
            <b>{t.label}</b>
            <span>{t.sub}</span>
          </span>
        </a>
      ))}
    </nav>
  );
}
