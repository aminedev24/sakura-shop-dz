'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Product, useProducts } from './products';

export const SHOP_WHATSAPP = '213560000000'; // placeholder — replace before launch
export const FREE_SHIPPING_FROM = 12000;

export type Line = { id: number; size: string; qty: number };
export type ToastMsg = { title: string; sub: string } | null;

type Shop = {
  products: Product[];
  byId: (id: number) => Product | undefined;
  demo: boolean;
  loading: boolean;
  failed: boolean;
  lines: Line[];
  add: (id: number, size: string, qty: number) => void;
  remove: (i: number) => void;
  update: (i: number, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  toast: ToastMsg;
  showToast: (title: string, sub: string) => void;
};

const Ctx = createContext<Shop | null>(null);

const KEY = 'sakura_bag';
function readBag(): Line[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v.filter((o) => o && o.id && o.size && o.qty) : [];
  } catch {
    return [];
  }
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const catalog = useProducts();
  const [lines, setLines] = useState<Line[]>([]);
  const [toast, setToast] = useState<ToastMsg>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // localStorage is unavailable while the page is prerendered
  useEffect(() => setLines(readBag()), []);

  const byId = useCallback(
    (id: number) => catalog.products.find((p) => p.id === id),
    [catalog.products],
  );

  // drop saved lines whose product no longer exists, but only once the catalog
  // has actually loaded — otherwise this would wipe a valid cart
  useEffect(() => {
    if (catalog.loading || !catalog.products.length) return;
    setLines((prev) => prev.filter((o) => catalog.products.some((p) => p.id === o.id)));
  }, [catalog.loading, catalog.products]);

  const persist = useCallback((next: Line[]) => {
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
    return next;
  }, []);

  const add = useCallback((id: number, size: string, qty: number) => {
    setLines((prev) => {
      const i = prev.findIndex((o) => o.id === id && o.size === size);
      const next = i >= 0
        ? prev.map((o, k) => (k === i ? { ...o, qty: o.qty + qty } : o))
        : [...prev, { id, size, qty }];
      return persist(next);
    });
  }, [persist]);

  const remove = useCallback((i: number) => {
    setLines((prev) => persist(prev.filter((_, k) => k !== i)));
  }, [persist]);

  const update = useCallback((i: number, size: string, qty: number) => {
    setLines((prev) => persist(prev.map((o, k) => (k === i ? { ...o, size, qty } : o))));
  }, [persist]);

  const clear = useCallback(() => setLines(() => persist([])), [persist]);

  const showToast = useCallback((title: string, sub: string) => {
    setToast({ title, sub });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const count = lines.reduce((s, o) => s + o.qty, 0);
  const subtotal = lines.reduce((s, o) => s + (byId(o.id)?.p ?? 0) * o.qty, 0);

  const value = useMemo<Shop>(() => ({
    products: catalog.products, byId, demo: catalog.demo,
    loading: catalog.loading, failed: catalog.failed,
    lines, add, remove, update, clear, count, subtotal, toast, showToast,
  }), [catalog, byId, lines, add, remove, update, clear, count, subtotal, toast, showToast]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShop(): Shop {
  const v = useContext(Ctx);
  if (!v) throw new Error('useShop must be used inside <ShopProvider>');
  return v;
}
