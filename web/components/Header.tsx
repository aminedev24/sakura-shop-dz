'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';
import { IMenu } from './icons2';
import NavDrawer from './shop/NavDrawer';
import { useLang } from '@/lib/i18n';

export default function Header() {
  const path = usePathname();
  const { t, lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const NAV = [
    { href: '/#boutique', label: t.navShop },
    { href: '/#livraison', label: t.navDelivery },
    { href: '/#guide', label: t.navSizes },
    { href: '/about', label: t.navAbout },
    { href: '/conditions', label: t.navTerms },
  ];
  return (
    <header>
      <div className="wrap hd hd-slim">
        <button className="iconbtn burger" type="button" aria-label={t.openMenu}
                aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
          <IMenu />
        </button>

        <Link className="logo" href="/">
          <Logo />
          <span>
            <b>Sakura Shop</b>
            <small>{t.tagline}</small>
          </span>
        </Link>

        <nav className="page-nav" aria-label="Navigation principale">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={n.href === path ? 'page' : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button className="langbtn" type="button" aria-label={t.langSwitchTo}
                onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}>
          {t.langLabel}
        </button>

        <a className="tel" href="tel:+213560000000">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" />
          </svg>
          <span>
            <b>05 60 00 00 00</b>
            <span>Appel &amp; WhatsApp</span>
          </span>
        </a>
      </div>

      <NavDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        nav={NAV.map((n) => (n.href.startsWith('/#') ? { label: n.label, anchor: n.href } : { label: n.label, page: n.href }))}
      />
    </header>
  );
}
