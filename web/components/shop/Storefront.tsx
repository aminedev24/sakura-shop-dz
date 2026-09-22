'use client';

import { useState } from 'react';
import { useReveal } from '@/lib/useReveal';
import { ShopProvider } from '@/lib/shop-context';
import { Product } from '@/lib/products';
import PromoStrip from '../PromoStrip';
import Footer from '../Footer';
import ShopHeader from './ShopHeader';
import Hero from './Hero';
import TrustStrip from './TrustStrip';
import ProductGrid from './ProductGrid';
import DeliveryCalculator from './DeliveryCalculator';
import SizeGuide from './SizeGuide';
import Fab from './Fab';
import ShopMobileNav from './ShopMobileNav';
import CartPanel from './CartPanel';
import AddToCartModal from './AddToCartModal';
import Toast from './Toast';

function Shell() {
  const [query, setQuery] = useState('');
  const [bagOpen, setBagOpen] = useState(false);
  const [modal, setModal] = useState<Product | null>(null);
  useReveal();

  return (
    <>
      <PromoStrip />
      <ShopHeader
        query={query}
        onQuery={setQuery}
        bagOpen={bagOpen}
        onBagToggle={() => setBagOpen((v) => !v)}
        cart={<CartPanel open={bagOpen} onClose={() => setBagOpen(false)} />}
      />
      <main id="contenu">
        <Hero />
        <div className="wrap">
          <TrustStrip />
          <ProductGrid query={query} onOpen={setModal} />
          <DeliveryCalculator />
          <SizeGuide />
        </div>
      </main>
      <Fab />
      <ShopMobileNav onCart={() => setBagOpen(true)} />
      <AddToCartModal product={modal} onClose={() => setModal(null)} />
      <Toast />
      <Footer />
    </>
  );
}

export default function Storefront() {
  return (
    <ShopProvider>
      <Shell />
    </ShopProvider>
  );
}
