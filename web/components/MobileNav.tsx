import Link from 'next/link';

const ITEMS = [
  { href: '/', label: 'Accueil' },
  { href: '/#boutique', label: 'Boutique' },
  { href: '/#livraison', label: 'Livraison' },
  { href: '/about', label: 'À propos' },
];

export default function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Navigation mobile">
      {ITEMS.map((i) => (
        <Link key={i.href} href={i.href}>{i.label}</Link>
      ))}
    </nav>
  );
}
