'use client';

import Link from 'next/link';
import Logo from '../Logo';
import { Search, Phone, Account, Bag } from '../icons';
import { fmt } from '@/lib/format';
import { useShop } from '@/lib/shop-context';

export default function ShopHeader({
  query,
  onQuery,
  bagOpen,
  onBagToggle,
  cart,
}: {
  query: string;
  onQuery: (v: string) => void;
  bagOpen: boolean;
  onBagToggle: () => void;
  cart: React.ReactNode;
}) {
  const { count, subtotal } = useShop();
  return (
    <header>
      <div className="wrap hd">
        <Link className="logo" href="/">
          <Logo />
          <span>
            <b>Sakura Shop</b>
            <small>VÊTEMENTS D&apos;INTÉRIEUR</small>
          </span>
        </Link>

        <form
          className="search"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            placeholder="Chercher un modèle, une matière…"
            aria-label="Rechercher"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
          />
          <button type="submit" aria-label="Rechercher">{Search}</button>
        </form>

        <div className="hd-r">
          <a className="tel" href="tel:+213560000000">
            {Phone}
            <span>
              <b>05 60 00 00 00</b>
              <span>Appel &amp; WhatsApp</span>
            </span>
          </a>

          {/* account and cart panels are phases 4–5; the controls render so the
              header matches the HTML build, but do not open anything yet */}
          <div className="acctwrap">
            <button className="bag acct" type="button" aria-haspopup="true" aria-expanded="false">
              {Account}
              <span>Connexion</span>
            </button>
          </div>

          <div className="bagwrap">
            <button
              className="bag"
              type="button"
              aria-haspopup="true"
              aria-expanded={bagOpen}
              onClick={onBagToggle}
            >
              {Bag}
              <span className="count">{count}</span>
              <span className="t">
                <span>Panier</span>
                <b>{fmt(subtotal)}</b>
              </span>
            </button>
            {cart}
          </div>
        </div>
      </div>
    </header>
  );
}
