'use client';

import { ITruck, ICard, IPin, IInstagram, ITiktok, IFacebook } from '../icons2';
import { useLang } from '@/lib/i18n';

export default function TopBar() {
  const { t } = useLang();
  const items = [
    { icon: <ITruck />, label: t.tbDelivery },
    { icon: <ICard />, label: t.tbCod },
    { icon: <IPin />, label: t.tbFree },
  ];
  return (
    <aside className="topbar" aria-label={t.tbDelivery}>
      <div className="wrap topbar-in">
        <div className="topbar-items">
          {items.map((it, i) => (
            <span className="topbar-item" key={it.label}>
              {i > 0 && <span className="topbar-sep">·</span>}
              <i>{it.icon}</i>
              {it.label}
            </span>
          ))}
        </div>
        <div className="topbar-soc">
          <span>{t.follow}</span>
          <a href="https://www.instagram.com/sakurashop.dz/" target="_blank" rel="noopener" aria-label="Instagram"><IInstagram /></a>
          <a href="https://www.facebook.com/sakurashop.dz/" target="_blank" rel="noopener" aria-label="Facebook"><IFacebook /></a>
        </div>
      </div>
    </aside>
  );
}
