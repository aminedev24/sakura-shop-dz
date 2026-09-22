'use client';

import { Mhome, Mshop, Mdelivery, Mcart } from '../icons';
import { useShop } from '@/lib/shop-context';

export default function ShopMobileNav({ onCart }: { onCart: () => void }) {
  const { count } = useShop();
  return (
    <nav className="mobile-nav" aria-label="Navigation mobile">
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        {Mhome}<span>Accueil</span>
      </button>
      <a href="#boutique">{Mshop}<span>Boutique</span></a>
      <a href="#livraison">{Mdelivery}<span>Livraison</span></a>
      <button type="button" aria-label="Ouvrir le panier" onClick={onCart}>
        <span className="mobile-cart-icon">{Mcart}<span className="count">{count}</span></span>
        <span>Panier</span>
      </button>
    </nav>
  );
}
