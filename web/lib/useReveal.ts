'use client';

import { useEffect } from 'react';

/** Adds .vis to every .reveal section as it scrolls into view.
 *  Ports the IntersectionObserver block from the original app.js — without it
 *  those sections stay at opacity 0. Falls back to revealing everything
 *  immediately where IntersectionObserver is unavailable. */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('vis'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vis');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
