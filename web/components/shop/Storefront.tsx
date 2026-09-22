'use client';

import { useState } from 'react';
import { useReveal } from '@/lib/useReveal';
import { ShopProvider, useShop } from '@/lib/shop-context';
import { Product } from '@/lib/products';
import { useAuth } from '@/lib/useAuth';
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
import AuthModal from './AuthModal';
import AccountPanel from './AccountPanel';

function Shell() {
  const { showToast } = useShop();
  const auth = useAuth();
  const [query, setQuery] = useState('');
  const [bagOpen, setBagOpen] = useState(false);
  const [acctOpen, setAcctOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [modal, setModal] = useState<Product | null>(null);
  useReveal();

  return (
    <>
      <PromoStrip />
      <ShopHeader
        query={query}
        onQuery={setQuery}
        bagOpen={bagOpen}
        onBagToggle={() => { setBagOpen((v) => !v); setAcctOpen(false); }}
        cart={<CartPanel open={bagOpen} onClose={() => setBagOpen(false)} />}
        acctLabel={auth.user ? auth.user.name.split(' ')[0] : 'Connexion'}
        acctOpen={acctOpen}
        onAcctClick={() => {
          if (!auth.user) { setAuthOpen(true); return; }
          setAcctOpen((v) => !v);
          setBagOpen(false);
        }}
        account={
          <AccountPanel
            open={acctOpen}
            user={auth.user}
            onLogin={() => { setAcctOpen(false); setAuthOpen(true); }}
            onLogout={async () => {
              await auth.logout();
              setAcctOpen(false);
              showToast('Déconnecté(e)', 'À bientôt !');
            }}
          />
        }
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
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSubmit={auth.submit}
        onSuccess={(u) => showToast('Bienvenue', `Bonjour ${u.name.split(' ')[0]} !`)}
      />
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
