import Link from 'next/link';
import TopBar from './shop/TopBar';
import Header from './Header';
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
  return (
    <>
      <TopBar />
      <Header />
      <main id="contenu" className="wrap page-prose">
        <nav className="crumbs" aria-label="Fil d'Ariane">
          <Link href="/">Accueil</Link>
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
