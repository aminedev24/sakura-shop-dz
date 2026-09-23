'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { Mark, IInstagram, ITiktok, IFacebook, IYoutube } from './icons2';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="ftr">
      <div className="wrap ftr-in">
        <div className="ftr-brand">
          <Mark />
          <span>
            <b>Sakura Shop</b>
            <small>{t.tagline}</small>
          </span>
        </div>

        <div className="ftr-soc">
          <h5>{t.follow}</h5>
          <div className="ftr-soc-row">
            <a href="https://www.instagram.com/sakurashop.dz/" target="_blank" rel="noopener" aria-label="Instagram"><IInstagram /></a>
            <a href="https://www.facebook.com/sakurashop.dz/" target="_blank" rel="noopener" aria-label="Facebook"><IFacebook /></a>
          </div>
        </div>


        <div className="ftr-thanks" aria-hidden="true">
          <Mark className="" />
          <span className="script">Merci</span>
        </div>
      </div>

      <div className="wrap ftr-bot">
        <span>{t.rights}</span>
        <nav aria-label={t.navShop}>
          <Link href="/#boutique">{t.navShop}</Link>
          <Link href="/#livraison">{t.navDelivery}</Link>
          <Link href="/#guide">{t.navSizes}</Link>
          <Link href="/about">{t.navAbout}</Link>
          <Link href="/conditions">{t.termsFull}</Link>
        </nav>
      </div>
    </footer>
  );
}
