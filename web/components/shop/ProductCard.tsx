'use client';

import { Product, discount, stars } from '@/lib/products';
import { fmt } from '@/lib/format';

export default function ProductCard({
  p,
  wished,
  onWish,
}: {
  p: Product;
  wished: boolean;
  onWish: (id: number) => void;
}) {
  const off = discount(p);
  const extra =
    p.tag === 'new' ? <span className="tag new">Nouveau</span>
    : p.tag === 'low' ? <span className="tag low">Stock limité</span>
    : null;

  return (
    <article className="card" data-c={p.c} data-off={off}>
      <div className="ph">
        <img src={`/${p.img}`} alt={p.n} loading="lazy" />
        <div className="tags">
          {off > 0 && <span className="tag off">−{off}%</span>}
          {extra}
        </div>
        <button
          className={wished ? 'wish on' : 'wish'}
          type="button"
          aria-label="Favori"
          aria-pressed={wished}
          onClick={() => onWish(p.id)}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21s-8-5-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 11c0 5-8 10-8 10Z" />
          </svg>
        </button>
      </div>

      <div className="info">
        <div className="meta-row">
          <span className="mat">{p.m}</span>
          <div className="rate"><span className="st">{stars(p.r)}</span></div>
        </div>
        <h3>{p.n}</h3>
        <div className="price-row">
          <span className="now">{fmt(p.p)}</span>
          {p.o > p.p && <span className="was">{fmt(p.o)}</span>}
        </div>
        <div className="product-action">
          <select className="size-select" aria-label={`Choisir la taille pour ${p.n}`} defaultValue="">
            <option value="">Choisir la taille</option>
            {p.sz.map((t) => {
              const gone = p.out.includes(t);
              return (
                <option key={t} value={t} disabled={gone}>
                  {gone ? `${t} — épuisé` : t}
                </option>
              );
            })}
          </select>
          {/* wired to the cart in phase 4 */}
          <button className="cart-btn" type="button" aria-label={`Ajouter ${p.n} au panier`}>
            Ajouter
          </button>
        </div>
      </div>
    </article>
  );
}
