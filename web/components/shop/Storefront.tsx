'use client';

import { useState } from 'react';
import { useReveal } from '@/lib/useReveal';
import { useShop } from '@/lib/shop-context';
import TopBar from './TopBar';
import SiteHeader from '../SiteHeader';
import Footer from '../Footer';
import Hero from './Hero';
import TrustStrip from './TrustStrip';
import ProductGrid from './ProductGrid';
import PromoBanner from './PromoBanner';
import StorySection from './StorySection';
import SocialWall from './SocialWall';
import DeliveryCalculator from './DeliveryCalculator';
import SizeGuide from './SizeGuide';
import Fab from './Fab';
import ShopMobileNav from './ShopMobileNav';

export default function Storefront() {
  const { query } = useShop();
  const [cat, setCat] = useState('all');
  useReveal();

  return (
    <>
      <TopBar />
      <SiteHeader />
      <main id="contenu">
        <Hero />
        <div className="wrap">
          <TrustStrip />
          <ProductGrid query={query} cat={cat} onCat={setCat} />
        </div>
        {/* sits between the products and the delivery block rather than at the
            very bottom; it manages its own width, so it is outside .wrap */}
        <PromoBanner />
        
        <div className="wrap">
          <DeliveryCalculator />
          <SizeGuide />
        </div>
        <StorySection />
        <SocialWall />
      </main>
      <Fab />
      <ShopMobileNav onCart={() => {
        document.querySelector<HTMLButtonElement>('.bagwrap .iconbtn')?.click();
      }} />
      <Footer />
    </>
  );
}
