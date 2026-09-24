'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mhome, Mshop, Mdelivery, Mcart } from '../icons';
import { useShop } from '@/lib/shop-context';
import { useLang } from '@/lib/i18n';

export default function ShopMobileNav({ onCart }: { onCart: () => void }) {
  const { count } = useShop();
  const { t } = useLang();
  const path = usePathname();
  const home = path === '/';
  return (
    <nav className="mobile-nav" aria-label="Navigation mobile">
      {home ? (
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {Mhome}<span>{t.navHome}</span>
        </button>
      ) : (
        <Link href="/">{Mhome}<span>{t.navHome}</span></Link>
      )}
      <Link href="/#boutique">{Mshop}<span>{t.navShop}</span></Link>
      <Link href="/#livraison">{Mdelivery}<span>{t.navDelivery}</span></Link>
      <button type="button" aria-label={t.cart} onClick={onCart}>
        <span className="mobile-cart-icon">{Mcart}<span className="count">{count}</span></span>
        <span>{t.cart}</span>
      </button>
    </nav>
  );
}
