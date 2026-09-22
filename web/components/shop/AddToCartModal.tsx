'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/products';
import { fmt } from '@/lib/format';
import { useShop } from '@/lib/shop-context';

export default function AddToCartModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { add, showToast } = useShop();
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!product) return;
    setSize(product.sz.find((s) => !product.out.includes(s)) ?? '');
    setQty(1);
  }, [product]);

  // Escape closes, matching the scrim click
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  const open = !!product;

  return (
    <>
      <div className={open ? 'scrim on' : 'scrim'} onClick={onClose} />
      <div
        className={open ? 'modal on' : 'modal'}
        role="dialog"
        aria-modal="true"
        aria-label="Ajouter au panier"
        aria-hidden={!open}
      >
        {product && (
          <>
            <div className="mh">
              <b>{product.n}</b>
              <button className="mx" type="button" aria-label="Fermer" onClick={onClose}>×</button>
            </div>
            <div className="mb">
              <div className="mimg"><img src={`/${product.img}`} alt={product.n} /></div>
              <div>
                <div className="mprice">
                  <span className="now">{fmt(product.p)}</span>
                  {product.o > product.p && <span className="was">{fmt(product.o)}</span>}
                </div>
                <p className="mdesc">{product.d}</p>
                <div className="frm">
                  <div className="fl">
                    <label htmlFor="mS">Taille</label>
                    <select id="mS" value={size} onChange={(e) => setSize(e.target.value)}>
                      {product.sz.map((s) => (
                        <option key={s} value={s} disabled={product.out.includes(s)}>
                          {product.out.includes(s) ? `${s} — épuisé` : s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="fl">
                    <label htmlFor="mQ">Quantité</label>
                    <select id="mQ" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                      {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <div className="recap">
                  <div className="rl tot">
                    <span>Article ×{qty}</span>
                    <span>{fmt(product.p * qty)}</span>
                  </div>
                </div>
                <button
                  className="ok"
                  type="button"
                  disabled={!size}
                  onClick={() => {
                    add(product.id, size, qty);
                    showToast('Ajouté au panier', `${product.n} — Taille ${size} × ${qty}`);
                    onClose();
                  }}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
