'use client';

import Link from 'next/link';
import { useShop } from '@/lib/shop-context';
import { useLang, useMoney } from '@/lib/i18n';

export default function WishlistPanel({
  open,
  ids,
  onRemove,
  onClose,
}: {
  open: boolean;
  ids: number[];
  onRemove: (id: number) => void;
  onClose: () => void;
}) {
  const { byId, openProduct } = useShop();
  const { t } = useLang();
  const money = useMoney();

  const items = ids.map((id) => byId(id)).filter((p) => !!p);

  return (
    <div className={open ? 'wishpanel on' : 'wishpanel'} role="dialog"
         aria-label={t.wishTitle} aria-hidden={!open}>
      <h4>{t.wishTitle}</h4>

      {items.length === 0 ? (
        <p className="wp-empty">{t.wishEmpty}</p>
      ) : (
        <>
          <ul className="wp-list">
            {items.map((p) => (
              <li className="wp-row" key={p!.id}>
                <img src={`/${p!.img}`} alt="" className="wp-thumb" />
                <div className="wp-info">
                  <div className="wp-name">{p!.n}</div>
                  <div className="wp-price">{money(p!.p)}</div>
                </div>
                <div className="wp-actions">
                  {/* opens the product modal so a size can be chosen before adding */}
                  <button className="wp-add" type="button"
                          onClick={() => { openProduct(p!); onClose(); }}>
                    {t.add}
                  </button>
                  <button className="wp-del" type="button"
                          aria-label={t.wishRemove} onClick={() => onRemove(p!.id)}>×</button>
                </div>
              </li>
            ))}
          </ul>
          <Link className="wp-see" href="/#boutique" onClick={onClose}>{t.wishSee} →</Link>
        </>
      )}
    </div>
  );
}
