import Link from 'next/link';
import PageShell from '@/components/PageShell';

/** Placeholder. The storefront itself (hero, product grid, cart, checkout)
 *  is phases 2–5 of the port; this spike covers the shell and content pages. */
export default function Home() {
  return (
    <PageShell title="Accueil">
      <h1>Spike Next.js</h1>
      <p className="page-lead">
        Cette page remplacera la vitrine. Pour l’instant, le spike couvre la structure partagée et
        les pages de contenu.
      </p>
      <ul>
        <li><Link href="/about">À propos</Link></li>
        <li><Link href="/conditions">Conditions générales de vente</Link></li>
      </ul>
    </PageShell>
  );
}
