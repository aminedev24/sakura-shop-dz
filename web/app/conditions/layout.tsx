import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description:
    'Conditions générales de vente de Sakura Shop : prix, commande, paiement à la livraison, livraison et données personnelles.',
};

export default function ConditionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
