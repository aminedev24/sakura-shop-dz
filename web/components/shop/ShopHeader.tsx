'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mark, ISearch, IHeart, IUser, IBag, IMenu } from '../icons2';
import NavDrawer from './NavDrawer';
import { useShop } from '@/lib/shop-context';
import { useLang } from '@/lib/i18n';

export default function ShopHeader({
  query, onQuery, wishCount, bagOpen, onBagToggle, cart,
  acctLabel, acctOpen, onAcctClick, account,
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
  const { t, lang, setLang } = useLang();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV: ({ label: string } & ({ anchor: string } | { page: string }))[] = [
    { label: t.navHome, anchor: '#' },
    { label: t.navShop, anchor: '#boutique' },
    { label: t.navDelivery, anchor: '#livraison' },
    { label: t.navSizes, anchor: '#guide' },
    { label: t.navWhy, anchor: '#pourquoi' },
    { label: t.navAbout, page: '/about' },
    { label: t.navTerms, page: '/conditions' },
  ];

  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <button className="iconbtn burger" type="button" aria-label={t.openMenu}
                aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
          <IMenu />
        </button>

        <Link className="brand" href="/">
          <Mark />
          <span>
            <b>Sakura Shop</b>
            <small>{t.tagline}</small>
          </span>
        </Link>

        {searchOpen ? (
          <form className="hdr-searchbar" role="search"
                onSubmit={(e) => { e.preventDefault(); document.getElementById('boutique')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <input autoFocus type="search" placeholder={t.searchPh} aria-label={t.search}
                   value={query} onChange={(e) => onQuery(e.target.value)} />
            <button type="button" aria-label={t.closeSearch}
                    onClick={() => { onQuery(''); setSearchOpen(false); }}>×</button>
          </form>
        ) : (
          <nav className="mainnav" aria-label={t.navHome}>
            {NAV.map((n) =>
              'page' in n
                ? <Link key={n.label} href={n.page}>{n.label}</Link>
                : <a key={n.label} href={n.anchor} aria-current={n.anchor === '#' ? 'page' : undefined}>{n.label}</a>,
            )}
          </nav>
        )}

        <div className="hdr-actions">
          <button className="langbtn" type="button"
                  aria-label={t.langSwitchTo}
                  onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}>
            {t.langLabel}
          </button>
          <button className="iconbtn" type="button" aria-label={t.search}
                  aria-expanded={searchOpen} onClick={() => setSearchOpen((v) => !v)}>
            <ISearch />
          </button>
          <button className="iconbtn" type="button" aria-label={t.favourites}>
            <IHeart />
            {wishCount > 0 && <span className="badge">{wishCount}</span>}
          </button>
          <div className="acctwrap">
            <button className="iconbtn" type="button" aria-haspopup="true"
                    aria-expanded={acctOpen} aria-label={acctLabel} onClick={onAcctClick}>
              <IUser />
            </button>
            {account}
          </div>
          <div className="bagwrap">
            <button className="iconbtn" type="button" aria-haspopup="true"
                    aria-expanded={bagOpen} aria-label={t.cart} onClick={onBagToggle}>
              <IBag />
              <span className="badge">{count}</span>
            </button>
            {cart}
          </div>
        </div>
      </div>

      <NavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} nav={NAV} />
    </header>
  );
}
