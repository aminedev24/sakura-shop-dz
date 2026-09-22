import type { Metadata } from 'next';

// the page itself is a client component (it reads the active language), so its
// metadata lives here
export const metadata: Metadata = {
  title: 'À propos',
  description:
    "Qui est Sakura Shop : vêtements d'intérieur et pyjamas pour femme, paiement à la livraison, livraison dans les 58 wilayas d'Algérie.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
