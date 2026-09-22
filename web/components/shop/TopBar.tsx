import { ITruck, ICard, IPin, IInstagram, ITiktok, IFacebook } from '../icons2';

const ITEMS = [
  { icon: <ITruck />, label: 'Livraison 58 wilayas' },
  { icon: <ICard />, label: 'Paiement à la livraison' },
  { icon: <IPin />, label: 'Livraison offerte dès 12 000 DA' },
];

export default function TopBar() {
  return (
    <aside className="topbar" aria-label="Informations livraison">
      <div className="wrap topbar-in">
        <div className="topbar-items">
          {ITEMS.map((it, i) => (
            <span className="topbar-item" key={it.label}>
              {i > 0 && <span className="topbar-sep">·</span>}
              <i>{it.icon}</i>
              {it.label}
            </span>
          ))}
        </div>
        <div className="topbar-soc">
          <span>Suivez-nous</span>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram"><IInstagram /></a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noopener" aria-label="TikTok"><ITiktok /></a>
          <a href="https://www.facebook.com/sakurashop.dz/" target="_blank" rel="noopener" aria-label="Facebook"><IFacebook /></a>
        </div>
      </div>
    </aside>
  );
}
