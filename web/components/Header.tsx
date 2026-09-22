'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const NAV = [
  { href: '/#boutique', label: 'Boutique' },
  { href: '/#livraison', label: 'Livraison' },
  { href: '/#guide', label: 'Guide des tailles' },
  { href: '/about', label: 'À propos' },
  { href: '/conditions', label: 'Conditions' },
];

export default function Header() {
  const path = usePathname();
  return (
    <header>
      <div className="wrap hd hd-slim">
        <Link className="logo" href="/">
          <Logo />
          <span>
            <b>Sakura Shop</b>
            <small>VÊTEMENTS D&apos;INTÉRIEUR</small>
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
    </header>
  );
}
