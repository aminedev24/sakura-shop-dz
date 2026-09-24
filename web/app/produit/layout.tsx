import type { Metadata } from 'next';

// the page reads the product from the query string at runtime, so its title is
// generic; per-product metadata would need a static route per product
export const metadata: Metadata = {
  title: 'Modèle',
  description: "Détail d'un modèle Sakura Shop : matière, tailles, prix et livraison.",
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
