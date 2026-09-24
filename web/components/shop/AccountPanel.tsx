'use client';

import { useEffect, useState } from 'react';
import { Order, User, fetchOrders } from '@/lib/useAuth';
import { useLang, useMoney } from '@/lib/i18n';
import { asset } from '@/lib/asset';

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
  const { t } = useLang();
  const money = useMoney();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (!open || !user) return;
    let live = true;
    setOrders(null);
    fetchOrders().then((o) => live && setOrders(o)).catch(() => live && setOrders([]));
    return () => { live = false; };
  }, [open, user]);

  return (
    <div className={open ? 'acctpanel on' : 'acctpanel'} role="dialog" aria-label={t.account} aria-hidden={!open}>
      {!user ? (
        <div className="acct-prompt">
          <p>{t.acctPrompt}</p>
          <button className="ok" type="button" style={{ margin: 0 }} onClick={onLogin}>{t.login}</button>
        </div>
      ) : (
        <>
          <div className="acct-head">
            <b>{user.name}</b>
            <span>{user.email}</span>
          </div>

          <div>
            {orders === null && t.loading}
            {orders?.length === 0 && (
              <p className="acct-prompt" style={{ margin: 0 }}>{t.noOrders}</p>
            )}
            {orders?.map((o) => {
              const loc = o.wilaya_name + (o.daira_name ? `, ${o.daira_name}` : '');
              const deliv = o.delivery_type === 'domicile'
                ? `${t.home} — ${loc}${o.delivery_address ? ` · ${o.delivery_address}` : ''}`
                : `${t.office} — ${loc}`;
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
                          <img src={asset(it.image_path)} alt=""
                               style={{ width: 28, height: 28, borderRadius: 'var(--r-xs)', objectFit: 'cover', flex: 'none' }} />
                        )}
                        <span>{it.qty}× {it.product_name} ({it.size})</span>
                      </div>
                    ))}
                  </div>
                  <div className="ord-f">{deliv}</div>
                  <div className="ord-f">{o.created_at} · <b>{money(o.total)}</b></div>
                </div>
              );
            })}
          </div>

          {/* the admin panel is a separate PHP app; surfaced here rather than in
              public navigation so it is not advertised to every visitor */}
          {user.role === 'admin' && (
            <a className="acct-admin" href="/admin/">{t.adminPanel} →</a>
          )}

          <button
            className="ok"
            type="button"
            style={{ marginTop: 12, background: 'none', border: '1px solid var(--line)', color: 'var(--ink)' }}
            onClick={onLogout}
          >
            {t.logout}
          </button>
        </>
      )}
    </div>
  );
}
