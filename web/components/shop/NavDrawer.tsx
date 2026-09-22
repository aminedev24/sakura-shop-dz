'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Mark, IPhone } from '../icons2';
import { useLang } from '@/lib/i18n';

export type NavEntry = { label: string } & ({ anchor: string } | { page: string });

export default function NavDrawer({
  open,
  onClose,
  nav,
}: {
  open: boolean;
  onClose: () => void;
  nav: NavEntry[];
}) {
  const { t } = useLang();

  // Escape closes, and the page must not scroll behind the drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <>
      <div className={open ? 'drawer-scrim on' : 'drawer-scrim'} onClick={onClose} />
      <aside
        className={open ? 'navdrawer on' : 'navdrawer'}
        aria-label={t.menu}
        aria-hidden={!open}
      >
        <div className="navdrawer-head">
          <span className="brand">
            <Mark />
            <span>
              <b>Sakura Shop</b>
              <small>{t.tagline}</small>
            </span>
          </span>
          <button type="button" className="navdrawer-x" aria-label={t.closeMenu} onClick={onClose}>×</button>
        </div>

        <nav className="navdrawer-links">
          {nav.map((n) =>
            'page' in n
              ? <Link key={n.label} href={n.page} onClick={onClose}>{n.label}</Link>
              : <a key={n.label} href={n.anchor} onClick={onClose}>{n.label}</a>,
          )}
        </nav>

        <div className="navdrawer-foot">
          <a className="navdrawer-tel" href="tel:+213560000000">
            <IPhone />
            <span><b>05 60 00 00 00</b><span>{t.callUs}</span></span>
          </a>
        </div>
      </aside>
    </>
  );
}
