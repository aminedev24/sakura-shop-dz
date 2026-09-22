'use client';

import { useState } from 'react';
import { Product, discount, stars } from '@/lib/products';
import { fmt } from '@/lib/format';
import { useShop } from '@/lib/shop-context';

export default function ProductCard({
  p,
  wished,
  onWish,
  onOpen,
}: {
  p: Product;
  wished: boolean;
  onWish: (id: number) => void;
  onOpen: (p: Product) => void;
}) {
  const { add, showToast } = useShop();
  const [size, setSize] = useState('');
  const [needsSize, setNeedsSize] = useState(false);

  const off = discount(p);
  const extra =
    p.tag === 'new' ? <span className="tag new">Nouveau</span>
    : p.tag === 'low' ? <span className="tag low">Stock limité</span>
    : null;

  function addOne() {
    if (!size) {
      setNeedsSize(true);
      showToast('Choisissez une taille', 'Sélectionnez votre taille avant d’ajouter');
      return;
    }
    add(p.id, size, 1);
    showToast('Ajouté au panier', `« ${p.n} » · Taille ${size}`);
  }

  return (
    <article className="card" data-c={p.c} data-off={off}>
      <div
        className="ph"
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest('button')) onOpen(p);
        }}
      >
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
          onClick={(e) => { e.stopPropagation(); onWish(p.id); }}
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
          <select
            className={`size-select${size ? ' chosen' : ''}${needsSize ? ' needs-size' : ''}`}
            aria-label={`Choisir la taille pour ${p.n}`}
            value={size}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => { setSize(e.target.value); setNeedsSize(false); }}
          >
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
          <button
            className="cart-btn"
            type="button"
            aria-label={`Ajouter ${p.n} au panier`}
            onClick={(e) => { e.stopPropagation(); addOne(); }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </article>
  );
}
