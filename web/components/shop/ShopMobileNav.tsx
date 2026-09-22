'use client';

import { Mhome, Mshop, Mdelivery, Mcart } from '../icons';

export default function ShopMobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Navigation mobile">
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        {Mhome}<span>Accueil</span>
      </button>
      <a href="#boutique">{Mshop}<span>Boutique</span></a>
      <a href="#livraison">{Mdelivery}<span>Livraison</span></a>
      {/* opens the cart panel in phase 4 */}
      <button type="button" aria-label="Ouvrir le panier">
        <span className="mobile-cart-icon">{Mcart}<span className="count">0</span></span>
        <span>Panier</span>
      </button>
    </nav>
  );
}
