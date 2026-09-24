'use client';

import { useMemo, useState } from 'react';
import { WILAYAS } from '@/lib/wilayas';
import { DAIRA } from '@/lib/daira';
import { useLang, useMoney } from '@/lib/i18n';
import { FREE_SHIPPING_FROM, SHOP_WHATSAPP, useShop } from '@/lib/shop-context';
import { asset } from '@/lib/asset';

export default function CartPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, byId, remove, update, clear, subtotal, demo, showToast } = useShop();
  const { t } = useLang();
  const money = useMoney();

  const [wIdx, setWIdx] = useState(0);
  const [daira, setDaira] = useState('');
  const [home, setHome] = useState(false);
  const [addr, setAddr] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [sending, setSending] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);

  const w = WILAYAS[wIdx];
  const dairas = useMemo(() => DAIRA[w.name] ?? [], [w.name]);
  const fee = home ? w.domicile : w.bureau;
  const free = subtotal >= FREE_SHIPPING_FROM;
  const shipping = free ? 0 : fee;
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_FROM) * 100));

  async function confirm() {
    if (!lines.length) return;
    if (demo) return showToast(t.tDemoT, t.tDemoS);
    if (!name.trim()) return showToast(t.tNameT, t.tNameS);
    if (tel.replace(/\D/g, '').length < 9) return showToast(t.tPhoneT, t.tPhoneS);
    if (!daira) return showToast(t.tDairaT, t.tDairaS);
    if (home && !addr.trim()) return showToast(t.tAddrT, t.tAddrS);

    setSending(true);
    try {
      const r = await fetch(asset('/api/orders.php'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: name.trim(),
          customer_phone: tel.trim(),
          wilaya_name: w.name,
          daira_name: daira,
          delivery_type: home ? 'domicile' : 'bureau',
          delivery_address: home ? addr.trim() : '',
          items: lines.map((o) => ({ id: o.id, size: o.size, qty: o.qty })),
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Erreur lors de la commande');
      const order = data.order;

      const msg = [
        'Sakura Shop',
        '#' + order.id,
        '',
        ...lines.map((o) => `${byId(o.id)?.n ?? '?'} — ${t.size} ${o.size} × ${o.qty}`),
        '',
        t.subtotal + ' : ' + money(order.subtotal),
        `${t.delivery} (${home ? t.home : t.office} — ${w.name}, ${daira}) : ` +
          (order.delivery_fee ? money(order.delivery_fee) : t.free),
        t.total + ' : ' + money(order.total),
        '',
        ...(home ? [t.addrLabel + ' : ' + addr.trim()] : []),
        t.fullName + ' : ' + name.trim(),
        t.phone + ' : ' + tel.trim(),
      ].join('\n');

      window.open(`https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
      showToast(t.tOrderT, `#${order.id} · ${money(order.total)}`);
      clear();
      setName(''); setTel(''); setAddr('');
      onClose();
    } catch (err) {
      showToast(t.tErr, err instanceof Error ? err.message : t.tErr);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={open ? 'bagpanel on' : 'bagpanel'} role="dialog" aria-label={t.cart} aria-hidden={!open}>
      <h4>{t.myCart}</h4>

      <div>
        {lines.length === 0 && <p className="bp-empty">{t.cartEmpty}</p>}
        {lines.length > 0 && (
          <ul className="bp-list">
            {lines.map((o, i) => {
              const p = byId(o.id);
              if (!p) return null;
              return (
                <li className="bp-row" key={`${o.id}-${o.size}`}>
                  <img src={asset(p.img)} alt={p.n}
                       style={{ width: 46, height: 46, borderRadius: 'var(--r-sm)', objectFit: 'cover', flex: 'none' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="bp-name">{p.n}</div>
                    <div className="bp-ref">{o.size} × {o.qty}</div>
                    <div className={editing === i ? 'bp-edit-row on' : 'bp-edit-row'}>
                      <select className="er-sz" value={o.size} onChange={(e) => update(i, e.target.value, o.qty)}>
                        {p.sz.map((s) => (
                          <option key={s} value={s} disabled={p.out.includes(s)}>{s}</option>
                        ))}
                      </select>
                      <select className="er-qt" value={o.qty} onChange={(e) => update(i, o.size, Number(e.target.value))}>
                        {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="bp-edit-ok" type="button" onClick={() => setEditing(null)}>✓</button>
                        <button className="bp-edit-no" type="button" onClick={() => setEditing(null)}>✗</button>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flex: 'none', whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <b>{money(p.p * o.qty)}</b>
                    <div className="bp-btns">
                      <button className="bp-edit" type="button" aria-label={t.edit}
                              onClick={() => setEditing(editing === i ? null : i)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15.232 5.232l3.536 3.536M4 20h4l10-10-4-4L4 16v4Z" />
                        </svg>
                      </button>
                      <button className="bp-del" type="button" aria-label={t.removeItem} onClick={() => remove(i)}>×</button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div>
        <div className="fl full">
          <label htmlFor="cWil">{t.wilaya}</label>
          <select id="cWil" value={wIdx} onChange={(e) => { setWIdx(Number(e.target.value)); setDaira(''); }}>
            {WILAYAS.map((x, i) => <option key={x.name} value={i}>{x.name}</option>)}
          </select>
        </div>

        <div className="fl full" style={{ marginTop: 8 }}>
          <label htmlFor="cDaira">{t.daira}</label>
          <select id="cDaira" value={daira} onChange={(e) => setDaira(e.target.value)}>
            <option value="">{t.pickDaira}</option>
            {dairas.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div className="fl full" style={{ marginTop: 8 }}>
          <label>{t.delivery}</label>
          <div className="seg">
            <button type="button" aria-pressed={!home} onClick={() => setHome(false)}>{t.office}</button>
            <button type="button" aria-pressed={home} onClick={() => setHome(true)}>{t.home}</button>
          </div>
        </div>

        {home && (
          <div className="fl full" style={{ marginTop: 8 }}>
            <label htmlFor="cAddr">{t.addrLabel}</label>
            <input id="cAddr" type="text" placeholder={t.addrPh}
                   value={addr} onChange={(e) => setAddr(e.target.value)} />
          </div>
        )}

        <div className="shipping-goal" aria-live="polite">
          <div className="shipping-goal-head">
            <span>
              {free ? t.goalFree
                : subtotal > 0 ? t.goalLeft.replace('{x}', money(FREE_SHIPPING_FROM - subtotal))
                : t.goalBase}
            </span>
            <b>{free ? '' : `${progress}%`}</b>
          </div>
          <div className="shipping-track"><span style={{ width: `${free ? 100 : progress}%` }} /></div>
        </div>

        <div className="recap" style={{ marginTop: 12 }}>
          <div className="rl"><span>{t.subtotal}</span><span>{money(subtotal)}</span></div>
          <div className="rl"><span>{t.delivery}</span><span>{free ? t.free : money(fee)}</span></div>
          <div className="rl tot"><span>{t.total}</span><span>{money(subtotal + shipping)}</span></div>
        </div>

        <div className="fl full" style={{ marginTop: 10 }}>
          <label htmlFor="cNom">{t.fullName}</label>
          <input id="cNom" type="text" placeholder={t.namePh} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="fl full" style={{ marginTop: 8 }}>
          <label htmlFor="cTel">{t.phone}</label>
          <input id="cTel" type="tel" placeholder="0X XX XX XX XX" value={tel} onChange={(e) => setTel(e.target.value)} />
        </div>

        <button className="ok" type="button" style={{ marginTop: 12 }} disabled={sending || !lines.length} onClick={confirm}>
          {sending ? t.sending : t.confirm}
        </button>
        <p className="cod">{t.codNote}</p>
      </div>
    </div>
  );
}
