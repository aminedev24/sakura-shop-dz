'use client';

import { useMemo, useState } from 'react';
import { Product, discount } from '@/lib/products';
import { useShop } from '@/lib/shop-context';
import { useWishlist } from '@/lib/useWishlist';
import ProductCard from './ProductCard';
import { IArrow } from '../icons2';

const CHIPS = [
  { s: 'all', label: 'Tout' },
  { s: 'coton', label: 'Coton' },
  { s: 'satin', label: 'Satin' },
  { s: 'boutonne', label: 'Boutonné' },
  { s: 'promo', label: 'En promo' },
];

const LIMIT = 12;

export default function ProductGrid({
  query,
  cat,
  onCat,
  onOpen,
}: {
  query: string;
  cat: string;
  onCat: (s: string) => void;
  onOpen: (p: Product) => void;
}) {
  const { products, demo, loading, failed } = useShop();
  const wish = useWishlist();
  const [sort, setSort] = useState('def');
  const [showAll, setShowAll] = useState(false);

  const visible = useMemo(() => {
    const list = products.slice();
    if (sort === 'prix-asc') list.sort((a, b) => a.p - b.p);
    else if (sort === 'prix-desc') list.sort((a, b) => b.p - a.p);
    else if (sort === 'note') list.sort((a, b) => b.r - a.r);

    const t = query.trim().toLowerCase();
    const filtered = cat !== 'all' || t !== '';
    // the 12-item cap counts positions in the sorted list, matching the original
    const limit = !showAll && !filtered;

    return list.filter((p, i) => {
      const okCat = cat === 'all' || (cat === 'promo' ? discount(p) >= 20 : p.c === cat);
      const okQ = !t || `${p.n} ${p.m}`.toLowerCase().includes(t);
      return okCat && okQ && !(limit && i >= LIMIT);
    });
  }, [products, sort, query, cat, showAll]);

  return (
    <section className="sec3 reveal" id="boutique">
      <div className="sechead">
        <div>
          <span className="kicker">Nos coups de cœur</span>
          <h2>Nouveautés</h2>
          <p>Les modèles les plus récents, sélectionnés avec soin — {visible.length} affichés.</p>
        </div>
        <a className="seclink" href="#livraison">Voir toute la boutique <IArrow /></a>
      </div>

      <div className="chips3" role="group" aria-label="Filtrer">
        {CHIPS.map((c) => (
          <button
            key={c.s}
            className="chip3"
            type="button"
            aria-pressed={cat === c.s}
            onClick={() => onCat(c.s)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="sortbar">
        <label htmlFor="sort">Trier par</label>
        <select id="sort" aria-label="Trier les produits" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="def">Recommandés</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
          <option value="note">Mieux notés</option>
        </select>
        <div className="wish-wrap">
          <span className="wish-count">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-8-5-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 11c0 5-8 10-8 10Z" />
            </svg>{' '}
            {wish.ids.length} favori{wish.ids.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="grid3" id="grid">
        {visible.map((p) => (
          <ProductCard key={p.id} p={p} wished={wish.has(p.id)} onWish={wish.toggle} onOpen={onOpen} />
        ))}
        {!loading && !visible.length && (
          <p className="noresult">
            {failed
              ? 'Impossible de charger les produits. Vérifiez que le serveur PHP et la base de données sont bien configurés (voir README).'
              : 'Aucun modèle ne correspond.'}
          </p>
        )}
      </div>

      {demo && (
        <p className="shop-sub" style={{ marginTop: 12 }}>
          Mode démo · catalogue d’exemple, connexion et commande indisponibles ici.
        </p>
      )}

      <button className="more" type="button" onClick={() => setShowAll((v) => !v)}>
        {showAll ? 'Afficher moins' : 'Afficher tous les modèles'}
      </button>
    </section>
  );
}
