'use client';

import Link from 'next/link';
import { Mark, IInstagram, ITiktok, IFacebook, IYoutube, IArrow } from './icons2';

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr-in">
        <div className="ftr-brand">
          <Mark />
          <span>
            <b>Sakura Shop</b>
            <small>VÊTEMENTS D&apos;INTÉRIEUR</small>
          </span>
        </div>

        <div className="ftr-soc">
          <h5>Suivez-nous</h5>
          <div className="ftr-soc-row">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram"><IInstagram /></a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener" aria-label="TikTok"><ITiktok /></a>
            <a href="https://www.facebook.com/sakurashop.dz/" target="_blank" rel="noopener" aria-label="Facebook"><IFacebook /></a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="YouTube"><IYoutube /></a>
          </div>
        </div>

        <div>
          <form className="news" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Votre adresse e-mail" aria-label="Votre adresse e-mail" />
            <button type="submit" aria-label="S’inscrire à la newsletter"><IArrow /></button>
          </form>
          <p className="news-note">Recevez nos nouveautés et offres exclusives.</p>
        </div>

        <div className="ftr-thanks" aria-hidden="true">
          <Mark className="" />
          <span className="script">Merci</span>
        </div>
      </div>

      <div className="wrap ftr-bot">
        <span>© 2026 Sakura Shop — Tous droits réservés</span>
        <nav aria-label="Liens utiles">
          <Link href="/#boutique">Boutique</Link>
          <Link href="/#livraison">Livraison</Link>
          <Link href="/#guide">Guide des tailles</Link>
          <Link href="/about">À propos</Link>
          <Link href="/conditions">Conditions générales de vente</Link>
        </nav>
      </div>
    </footer>
  );
}
