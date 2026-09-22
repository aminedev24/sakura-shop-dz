'use client';

import { useCallback, useEffect, useState } from 'react';

const KEY = 'sakura_wish';

function read(): number[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [ids, setIds] = useState<number[]>([]);

  // read after mount: localStorage does not exist during the static export
  useEffect(() => setIds(read()), []);

  const toggle = useCallback((id: number) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  return { ids, toggle, has: (id: number) => ids.includes(id) };
}
