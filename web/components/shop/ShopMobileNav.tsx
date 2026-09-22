'use client';

import { Mhome, Mshop, Mdelivery, Mcart } from '../icons';
import { useShop } from '@/lib/shop-context';
import { useLang } from '@/lib/i18n';

export default function ShopMobileNav({ onCart }: { onCart: () => void }) {
  const { count } = useShop();
  const { t } = useLang();
  return (
    <nav className="mobile-nav" aria-label="Navigation mobile">
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        {Mhome}<span>{t.navHome}</span>
      </button>
      <a href="#boutique">{Mshop}<span>{t.navShop}</span></a>
      <a href="#livraison">{Mdelivery}<span>{t.navDelivery}</span></a>
      <button type="button" aria-label={t.cart} onClick={onCart}>
        <span className="mobile-cart-icon">{Mcart}<span className="count">{count}</span></span>
        <span>{t.cart}</span>
      </button>
    </nav>
  );
}
