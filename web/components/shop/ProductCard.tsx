'use client';

import { useState } from 'react';
import { Product, discount, stars } from '@/lib/products';
import { fmt } from '@/lib/format';
import { useShop } from '@/lib/shop-context';
import { IHeart, IHeartFill } from '../icons2';

export default function ProductCard({
  p, wished, onWish, onOpen,
}: {
  p: Product;
  wished: boolean;
  onWish: (id: number) => void;
  onOpen: (p: Product) => void;
}) {
  const { add, showToast } = useShop();
  const [size, setSize] = useState('');
  const [needs, setNeeds] = useState(false);
  const off = discount(p);

  function addOne() {
    if (!size) {
      setNeeds(true);
      showToast('Choisissez une taille', 'Sélectionnez votre taille avant d’ajouter');
      return;
    }
    add(p.id, size, 1);
    showToast('Ajouté au panier', `« ${p.n} » · Taille ${size}`);
  }

  return (
    <article className="pcard" data-c={p.c} data-off={off}>
      <div className="pcard-ph" onClick={(e) => {
        if (!(e.target as HTMLElement).closest('button')) onOpen(p);
      }}>
        <img src={`/${p.img}`} alt={p.n} loading="lazy" />
        {off > 0 ? <span className="pcard-off">-{off}%</span>
          : p.tag === 'new' ? <span className="pcard-tag">Nouveau</span>
          : p.tag === 'low' ? <span className="pcard-tag">Stock limité</span> : null}
        <button
          className={wished ? 'pcard-wish on' : 'pcard-wish'}
          type="button"
          aria-label="Favori"
          aria-pressed={wished}
          onClick={(e) => { e.stopPropagation(); onWish(p.id); }}
        >
          {wished ? <IHeartFill /> : <IHeart />}
        </button>
      </div>

      <div className="pcard-body">
        <div className="pcard-top">
          <span className="pcard-cat">{p.m.split('·')[0].trim()}</span>
          <span className="pcard-stars">{stars(p.r)}</span>
        </div>
        <h3>{p.n}</h3>
        <div className="pcard-price">
          <span className="pcard-now">{fmt(p.p)}</span>
          {p.o > p.p && <span className="pcard-was">{fmt(p.o)}</span>}
        </div>
        <div className="pcard-act">
          <select
            className={needs ? 'needs' : undefined}
            aria-label={`Choisir la taille pour ${p.n}`}
            value={size}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => { setSize(e.target.value); setNeeds(false); }}
          >
            <option value="">Choisir la taille</option>
            {p.sz.map((t) => {
              const gone = p.out.includes(t);
              return <option key={t} value={t} disabled={gone}>{gone ? `${t} — épuisé` : t}</option>;
            })}
          </select>
          <button className="pcard-add" type="button"
                  aria-label={`Ajouter ${p.n} au panier`}
                  onClick={(e) => { e.stopPropagation(); addOne(); }}>
            Ajouter
          </button>
        </div>
      </div>
    </article>
  );
}
