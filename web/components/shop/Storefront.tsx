'use client';

import { useState } from 'react';
import { useReveal } from '@/lib/useReveal';
import { useShop } from '@/lib/shop-context';
import { Product } from '@/lib/products';
import TopBar from './TopBar';
import SiteHeader from '../SiteHeader';
import Footer from '../Footer';
import Hero from './Hero';
import TrustStrip from './TrustStrip';
import ProductGrid from './ProductGrid';
import PromoBanner from './PromoBanner';
import DeliveryCalculator from './DeliveryCalculator';
import SizeGuide from './SizeGuide';
import Fab from './Fab';
import ShopMobileNav from './ShopMobileNav';
import AddToCartModal from './AddToCartModal';

export default function Storefront() {
  const { query } = useShop();
  const [cat, setCat] = useState('all');
  const [modal, setModal] = useState<Product | null>(null);
  useReveal();

  return (
    <>
      <TopBar />
      <SiteHeader />
      <main id="contenu">
        <Hero />
        <div className="wrap">
          <TrustStrip />
          <ProductGrid query={query} cat={cat} onCat={setCat} onOpen={setModal} />
          <DeliveryCalculator />
          <SizeGuide />
        </div>
        <PromoBanner />
      </main>
      <Fab />
      <ShopMobileNav onCart={() => {
        document.querySelector<HTMLButtonElement>('.bagwrap .iconbtn')?.click();
      }} />
      <AddToCartModal product={modal} onClose={() => setModal(null)} />
      <Footer />
    </>
  );
}
