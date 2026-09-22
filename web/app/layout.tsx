import type { Metadata } from 'next';
import './globals.css';
import './redesign.css';

export const metadata: Metadata = {
  title: { default: 'Sakura Shop', template: '%s — Sakura Shop' },
  description: "Pyjamas et vêtements d'intérieur, livrés dans les 58 wilayas d'Algérie.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Cairo:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
