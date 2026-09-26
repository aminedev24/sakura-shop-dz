'use client';

import { useEffect, useState } from 'react';
import { asset } from './asset';

export type Product = {
  id: number;
  n: string;   // name
  m: string;   // material / subtitle
  c: string;   // category slug
  p: number;   // price
  o: number;   // original price
  r: number;   // rating 0-5
  rc: number;  // rating count
  sz: string[];  // available sizes
  out: string[]; // sizes out of stock
  tag: string;   // 'off' | 'new' | 'low' | ''
  img: string;   // cover, used by the grid and copied onto orders
  imgs: string[];// cover first, then the gallery
  /** units left, or null when the quantity is not tracked */
  stock: number | null;
  d: string;     // description
};

export type Catalog = {
  products: Product[];
  /** true when api/products.php was unreachable and the bundled sample was used;
   *  login and checkout need a real backend and stay disabled in that case. */
  demo: boolean;
  loading: boolean;
  failed: boolean;
};

/** The sample catalogue and older API responses have neither imgs nor stock. */
function normalise(list: unknown): Product[] {
  return ((list as Product[]) ?? []).map((p) => ({
    ...p,
    imgs: p.imgs?.length ? p.imgs : [p.img].filter(Boolean),
    stock: p.stock ?? null,
  }));
}

export function useProducts(): Catalog {
  const [state, setState] = useState<Catalog>({
    products: [], demo: false, loading: true, failed: false,
  });

  useEffect(() => {
    let live = true;
    const ok = (r: Response) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    };
    fetch(asset('/api/products.php'))
      .then(ok)
      .then((d) => live && setState({ products: normalise(d.products), demo: false, loading: false, failed: false }))
      .catch(() =>
        fetch(asset('/data/products-sample.json'))
          .then(ok)
          .then((d) => live && setState({ products: normalise(d.products), demo: true, loading: false, failed: false }))
          .catch(() => live && setState({ products: [], demo: false, loading: false, failed: true })),
      );
    return () => { live = false; };
  }, []);

  return state;
}

export function discount(p: Product): number {
  return Math.max(0, Math.round((1 - p.p / p.o) * 100));
}

export function stars(r: number): string {
  let s = '';
  for (let k = 1; k <= 5; k++) s += k <= Math.round(r) ? '★' : '☆';
  return s;
}
