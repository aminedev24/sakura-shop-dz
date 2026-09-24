'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product, discount, stars } from '@/lib/products';
import { useLang, useMoney } from '@/lib/i18n';
import { useShop } from '@/lib/shop-context';
import { IHeart, IHeartFill } from '../icons2';
import { asset, route } from '@/lib/asset';

export default function ProductCard({
  p, wished, onWish,
}: {
  p: Product;
  wished: boolean;
  onWish: (id: number) => void;
}) {
  const { add, showToast } = useShop();
  const { t } = useLang();
  const money = useMoney();
  const [size, setSize] = useState('');
  const [needs, setNeeds] = useState(false);
  const off = discount(p);

  function addOne() {
    if (!size) {
      setNeeds(true);
      showToast(t.tSizeT, t.tSizeS);
      return;
    }
    add(p.id, size, 1);
    showToast(t.tAddT, `« ${p.n} » · ${t.size} ${size}`);
  }

  return (
    <article className="pcard" data-c={p.c} data-off={off}>
      <div className="pcard-ph" onClick={(e) => {
        if (!(e.target as HTMLElement).closest('button')) {
          window.location.href = route(`/produit/?id=${p.id}`);
        }
      }}>
        <img src={asset(p.img)} alt={p.n} loading="lazy" />
        {off > 0 ? <span className="pcard-off">-{off}%</span>
          : p.tag === 'new' ? <span className="pcard-tag">Nouveau</span>
          : p.tag === 'low' ? <span className="pcard-tag">Stock limité</span> : null}
        <button
          className={wished ? 'pcard-wish on' : 'pcard-wish'}
          type="button"
          aria-label={t.favourites}
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
        <h3><Link href={`/produit/?id=${p.id}`}>{p.n}</Link></h3>
        <div className="pcard-price">
          <span className="pcard-now">{money(p.p)}</span>
          {p.o > p.p && <span className="pcard-was">{money(p.o)}</span>}
        </div>
        <div className="pcard-act">
          <select
            className={needs ? 'needs' : undefined}
            aria-label={`${t.pickSize} — ${p.n}`}
            value={size}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => { setSize(e.target.value); setNeeds(false); }}
          >
            <option value="">{t.pickSize}</option>
            {p.sz.map((sz) => {
              const gone = p.out.includes(sz);
              return <option key={sz} value={sz} disabled={gone}>{gone ? `${sz} — ${t.soldOut}` : sz}</option>;
            })}
          </select>
          <button className="pcard-add" type="button"
                  aria-label={`${t.add} — ${p.n}`}
                  onClick={(e) => { e.stopPropagation(); addOne(); }}>
            {t.add}
          </button>
        </div>
      </div>
    </article>
  );
}
