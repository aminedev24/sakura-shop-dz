'use client';

import { useCallback, useEffect, useState } from 'react';
import { asset } from './asset';

export type User = { id: number; name: string; email: string; phone?: string;
  /** 'customer' | 'admin' — api/login.php and api/me.php both return it */
  role?: string };

export type OrderItem = { product_name: string; size: string; qty: number; image_path?: string };
export type Order = {
  id: number; status: string; total: number; created_at: string;
  wilaya_name: string; daira_name?: string;
  delivery_type: 'bureau' | 'domicile'; delivery_address?: string;
  items: OrderItem[];
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  // restore the PHP session on load, exactly as api/me.php did
  useEffect(() => {
    let live = true;
    fetch(asset('/api/me.php'))
      .then((r) => r.json())
      .then((d) => { if (live) { setUser(d.user ?? null); setReady(true); } })
      .catch(() => live && setReady(true));
    return () => { live = false; };
  }, []);

  const submit = useCallback(async (
    mode: 'login' | 'register',
    payload: Record<string, string>,
  ): Promise<User> => {
    const r = await fetch(mode === 'login' ? '/api/login.php' : '/api/register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Erreur');
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    await fetch(asset('/api/logout.php'), { method: 'POST' });
    setUser(null);
  }, []);

  return { user, ready, submit, logout };
}

export async function fetchOrders(): Promise<Order[]> {
  const r = await fetch(asset('/api/orders.php'));
  const d = await r.json();
  return d.orders ?? [];
}
