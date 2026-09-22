'use client';

import { useEffect, useState } from 'react';
import { Order, User, fetchOrders } from '@/lib/useAuth';
import { fmt } from '@/lib/format';

export default function AccountPanel({
  open,
  user,
  onLogin,
  onLogout,
}: {
  open: boolean;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}) {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (!open || !user) return;
    let live = true;
    setOrders(null);
    fetchOrders().then((o) => live && setOrders(o)).catch(() => live && setOrders([]));
    return () => { live = false; };
  }, [open, user]);

  return (
    <div className={open ? 'acctpanel on' : 'acctpanel'} role="dialog" aria-label="Mon compte" aria-hidden={!open}>
      {!user ? (
        <div className="acct-prompt">
          <p>Connectez-vous pour suivre vos commandes.</p>
          <button className="ok" type="button" style={{ margin: 0 }} onClick={onLogin}>Se connecter</button>
        </div>
      ) : (
        <>
          <div className="acct-head">
            <b>{user.name}</b>
            <span>{user.email}</span>
          </div>

          <div>
            {orders === null && 'Chargement…'}
            {orders?.length === 0 && (
              <p className="acct-prompt" style={{ margin: 0 }}>Aucune commande pour l’instant.</p>
            )}
            {orders?.map((o) => {
              const loc = o.wilaya_name + (o.daira_name ? `, ${o.daira_name}` : '');
              const deliv = o.delivery_type === 'domicile'
                ? `Domicile — ${loc}${o.delivery_address ? ` · ${o.delivery_address}` : ''}`
                : `Bureau — ${loc}`;
              return (
                <div className="ord" key={o.id}>
                  <div className="ord-h">
                    <span>#{o.id}</span>
                    <span className={`badge-st ${o.status}`}>{o.status}</span>
                  </div>
                  <div className="ord-items">
                    {o.items.map((it, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        {it.image_path && (
                          <img src={`/${it.image_path}`} alt=""
                               style={{ width: 28, height: 28, borderRadius: 'var(--r-xs)', objectFit: 'cover', flex: 'none' }} />
                        )}
                        <span>{it.qty}× {it.product_name} ({it.size})</span>
                      </div>
                    ))}
                  </div>
                  <div className="ord-f">{deliv}</div>
                  <div className="ord-f">{o.created_at} · <b>{fmt(o.total)}</b></div>
                </div>
              );
            })}
          </div>

          <button
            className="ok"
            type="button"
            style={{ marginTop: 12, background: 'none', border: '1px solid var(--line)', color: 'var(--ink)' }}
            onClick={onLogout}
          >
            Déconnexion
          </button>
        </>
      )}
    </div>
  );
}
