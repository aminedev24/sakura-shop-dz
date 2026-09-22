'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import TopBar from './shop/TopBar';
import SiteHeader from './SiteHeader';
import MobileNav from './MobileNav';
import Footer from './Footer';

/** Chrome shared by the content pages. The storefront home page gets its own
 *  header (search + cart) in phase 2, which is why this is not in layout.tsx. */
export default function PageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { t } = useLang();
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main id="contenu" className="wrap page-prose">
        <nav className="crumbs" aria-label="Fil d'Ariane">
          <Link href="/">{t.navHome}</Link>
          <span>/</span>
          <span aria-current="page">{title}</span>
        </nav>
        {children}
      </main>
      <MobileNav />
      <Footer />
    </>
  );
}
