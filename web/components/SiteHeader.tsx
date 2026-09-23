'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mark, ISearch, IHeart, IUser, IBag, IMenu } from './icons2';
import NavDrawer from './shop/NavDrawer';
import CartPanel from './shop/CartPanel';
import AccountPanel from './shop/AccountPanel';
import AuthModal from './shop/AuthModal';
import WishlistPanel from './shop/WishlistPanel';
import { useShop } from '@/lib/shop-context';
import { useWishlist } from '@/lib/useWishlist';
import { useAuth } from '@/lib/useAuth';
import { useLang } from '@/lib/i18n';

/** One header for every page. It owns its own open/closed state and renders the
 *  cart, account and auth panels itself, so the storefront and the content
 *  pages no longer need two different headers — and the cart stays reachable
 *  everywhere. */
export default function SiteHeader() {
  const { count, query, setQuery, showToast } = useShop();
  const { t, lang, setLang } = useLang();
  const wish = useWishlist();
  const auth = useAuth();

  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [acctOpen, setAcctOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);

  const NAV: ({ label: string } & ({ anchor: string } | { page: string }))[] = [
    { label: t.navHome, page: '/' },
    { label: t.navShop, anchor: '/#boutique' },
    { label: t.navDelivery, anchor: '/#livraison' },
    { label: t.navSizes, anchor: '/#guide' },
    { label: t.navWhy, anchor: '/#pourquoi' },
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
                   value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="button" aria-label={t.closeSearch}
                    onClick={() => { setQuery(''); setSearchOpen(false); }}>×</button>
          </form>
        ) : (
          <nav className="mainnav" aria-label={t.navHome}>
            {NAV.map((n) =>
              'page' in n
                ? <Link key={n.label} href={n.page}>{n.label}</Link>
                : <a key={n.label} href={n.anchor}>{n.label}</a>,
            )}
          </nav>
        )}

        <div className="hdr-actions">
          <button className="langbtn" type="button" aria-label={t.langSwitchTo}
                  onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}>
            <span className="lang-full">{t.langLabel}</span>
            <span className="lang-short">{t.langShort}</span>
          </button>

          <button className="iconbtn ib-search" type="button" aria-label={t.search}
                  aria-expanded={searchOpen} onClick={() => setSearchOpen((v) => !v)}>
            <ISearch />
          </button>

          <div className="wish-wrap">
            <button className="iconbtn ib-wish" type="button" aria-haspopup="true"
                    aria-expanded={wishOpen} aria-label={t.favourites}
                    onClick={() => { setWishOpen((v) => !v); setBagOpen(false); setAcctOpen(false); }}>
              <IHeart />
              {wish.ids.length > 0 && <span className="badge">{wish.ids.length}</span>}
            </button>
            <WishlistPanel open={wishOpen} ids={wish.ids} onRemove={wish.toggle}
                           onClose={() => setWishOpen(false)} />
          </div>

          <div className="acctwrap">
            <button className="iconbtn" type="button" aria-haspopup="true" aria-expanded={acctOpen}
                    aria-label={auth.user ? auth.user.name.split(' ')[0] : t.account}
                    onClick={() => {
                      if (!auth.user) { setAuthOpen(true); return; }
                      setAcctOpen((v) => !v); setBagOpen(false); setWishOpen(false);
                    }}>
              <IUser />
            </button>
            <AccountPanel
              open={acctOpen}
              user={auth.user}
              onLogin={() => { setAcctOpen(false); setAuthOpen(true); }}
              onLogout={async () => { await auth.logout(); setAcctOpen(false); showToast(t.tBye, t.tByeS); }}
            />
          </div>

          <div className="bagwrap">
            <button className="iconbtn" type="button" aria-haspopup="true" aria-expanded={bagOpen}
                    aria-label={t.cart}
                    onClick={() => { setBagOpen((v) => !v); setAcctOpen(false); setWishOpen(false); }}>
              <IBag />
              <span className="badge">{count}</span>
            </button>
            <CartPanel open={bagOpen} onClose={() => setBagOpen(false)} />
          </div>
        </div>
      </div>

      <NavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} nav={NAV} />
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSubmit={auth.submit}
        onSuccess={(u) => showToast(t.tWelcome, t.tHello.replace('{x}', u.name.split(' ')[0]))}
      />
    </header>
  );
}
