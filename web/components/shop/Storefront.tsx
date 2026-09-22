'use client';

import { useState } from 'react';
import { useReveal } from '@/lib/useReveal';
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

export default function Storefront() {
  // lifted here because the product grid (phase 3) filters on it
  const [query, setQuery] = useState('');
  useReveal();

  return (
    <>
      <PromoStrip />
      <ShopHeader query={query} onQuery={setQuery} />
      <main id="contenu">
        <Hero />
        <div className="wrap">
          <TrustStrip />
          <ProductGrid query={query} />
          <DeliveryCalculator />
          <SizeGuide />
        </div>
      </main>
      <Fab />
      <ShopMobileNav />
      <Footer />
    </>
  );
}
