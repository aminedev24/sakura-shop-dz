'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mark, ISearch, IHeart, IUser, IBag } from '../icons2';
import { useShop } from '@/lib/shop-context';

type NavItem = { label: string } & ({ anchor: string } | { page: string });

const NAV: NavItem[] = [
  { label: 'Accueil', anchor: '#' },
  { label: 'Boutique', anchor: '#boutique' },
  { label: 'Livraison', anchor: '#livraison' },
  { label: 'Guide des tailles', anchor: '#guide' },
  { label: 'Pourquoi nous', anchor: '#pourquoi' },
  { label: 'À propos', page: '/about' },
  { label: 'Conditions', page: '/conditions' },
];

export default function ShopHeader({
  query,
  onQuery,
  wishCount,
  bagOpen,
  onBagToggle,
  cart,
  acctLabel,
  acctOpen,
  onAcctClick,
  account,
}: {
  query: string;
  onQuery: (v: string) => void;
  wishCount: number;
  bagOpen: boolean;
  onBagToggle: () => void;
  cart: React.ReactNode;
  acctLabel: string;
  acctOpen: boolean;
  onAcctClick: () => void;
  account: React.ReactNode;
}) {
  const { count } = useShop();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Link className="brand" href="/">
          <Mark />
          <span>
            <b>Sakura Shop</b>
            <small>VÊTEMENTS D&apos;INTÉRIEUR</small>
          </span>
        </Link>

        {searchOpen ? (
          <form
            className="hdr-searchbar"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById('boutique')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <input
              autoFocus
              type="search"
              placeholder="Chercher un modèle, une matière…"
              aria-label="Rechercher"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
            />
            <button type="button" aria-label="Fermer la recherche"
                    onClick={() => { onQuery(''); setSearchOpen(false); }}>×</button>
          </form>
        ) : (
        <nav className="mainnav" aria-label="Navigation principale">
          {NAV.map((n) =>
            'page' in n ? (
              <Link key={n.label} href={n.page}>{n.label}</Link>
            ) : (
              <a
                key={n.label}
                href={n.anchor}
                aria-current={n.anchor === '#' ? 'page' : undefined}
              >
                {n.label}
              </a>
            ),
          )}
        </nav>
        )}

        <div className="hdr-actions">
          <button className="iconbtn" type="button" aria-label="Rechercher"
                  aria-expanded={searchOpen}
                  onClick={() => setSearchOpen((v) => !v)}>
            <ISearch />
          </button>
          <button className="iconbtn" type="button" aria-label="Favoris">
            <IHeart />
            {wishCount > 0 && <span className="badge">{wishCount}</span>}
          </button>
          <div className="acctwrap">
            <button
              className="iconbtn"
              type="button"
              aria-haspopup="true"
              aria-expanded={acctOpen}
              aria-label={acctLabel}
              onClick={onAcctClick}
            >
              <IUser />
            </button>
            {account}
          </div>
          <div className="bagwrap">
            <button
              className="iconbtn"
              type="button"
              aria-haspopup="true"
              aria-expanded={bagOpen}
              aria-label="Panier"
              onClick={onBagToggle}
            >
              <IBag />
              <span className="badge">{count}</span>
            </button>
            {cart}
          </div>
        </div>
      </div>
    </header>
  );
}
