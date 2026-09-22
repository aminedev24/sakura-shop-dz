'use client';

import { useShop } from '@/lib/shop-context';

export default function Toast() {
  const { toast } = useShop();
  return (
    <div className={toast ? 'toast on' : 'toast'} role="status" aria-live="polite">
      <span className="toast-ic">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="m5 12 5 5 9-10" />
        </svg>
      </span>
      <span>
        <b>{toast?.title ?? ''}</b>
        <span>{toast?.sub ?? ''}</span>
      </span>
    </div>
  );
}
