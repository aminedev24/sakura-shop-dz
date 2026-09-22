import Link from 'next/link';

const BOUTIQUE = ['Ensembles coton', 'Pyjamas satin', 'Modèles boutonnés', 'Nouveautés'];
const AIDE = [
  { href: '/#guide', label: 'Guide des tailles' },
  { href: '/#livraison', label: 'Tarifs de livraison' },
  { href: '/#pourquoi', label: 'Pourquoi nous choisir' },
  { href: '/about', label: 'À propos' },
  { href: '/conditions', label: 'Conditions générales de vente' },
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap fg">
        <div>
          <b style={{ fontFamily: 'var(--serif)', fontSize: 22, color: '#fff' }}>Sakura Shop</b>
          <div className="soc">
            <a href="https://www.facebook.com/sakurashop.dz/" target="_blank" rel="noopener" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" /></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.4 2.3 1.9 3.9 4 4.2v3c-1.6.1-3-.4-4.2-1.3v6.3c0 3.6-2.6 5.9-5.7 5.8-3-.1-5.2-2.6-5.1-5.6.1-3.2 3-5.6 6.2-5v3.1c-1.6-.5-3.1.5-3.2 2 0 1.4 1.1 2.5 2.5 2.4 1.3 0 2.3-1 2.3-2.5V3z" /></svg>
            </a>
          </div>
        </div>

        <div>
          <h5>Boutique</h5>
          <ul>{BOUTIQUE.map((l) => <li key={l}><Link href="/#boutique">{l}</Link></li>)}</ul>
        </div>

        <div>
          <h5>Aide</h5>
          <ul>{AIDE.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
        </div>

        <div>
          <h5>Contact</h5>
          <ul className="fc">
            <li>
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" /></svg>
              <span>05 60 00 00 00</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.7" /></svg>
              <span>Alger — Algérie</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.7" /></svg>
              <span>contact@sakurashop.dz</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap fbot">© 2026 Sakura Shop — Tous droits réservés</div>
    </footer>
  );
}
