'use client';

import { Up, Whatsapp } from '../icons';

export default function Fab() {
  return (
    <div className="fab" role="complementary" aria-label="Contact rapide">
      <button
        className="up"
        type="button"
        aria-label="Haut de page"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        {Up}
      </button>
      <a className="wa" href="https://wa.me/213560000000" target="_blank" rel="noopener" aria-label="WhatsApp">
        {Whatsapp}
      </a>
    </div>
  );
}
