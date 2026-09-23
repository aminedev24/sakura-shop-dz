import type { Metadata } from 'next';
import './globals.css';
import './styles.css';
import { LangProvider } from '@/lib/i18n';
import { ShopProvider } from '@/lib/shop-context';
import Toast from '@/components/shop/Toast';
import GlobalProductModal from '@/components/shop/GlobalProductModal';

export const metadata: Metadata = {
  title: { default: 'Sakura Shop', template: '%s — Sakura Shop' },
  description: "Pyjamas et vêtements d'intérieur, livrés dans les 58 wilayas d'Algérie.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the has-js script below and LangProvider both
    // set attributes on <html> before/after hydration, which React would
    // otherwise report as a mismatch
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Sections marked .reveal start hidden and are shown by an
            IntersectionObserver. Gate that on JS actually running, set
            synchronously here so there is no flash, otherwise a hydration
            failure leaves most of the page permanently invisible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('has-js')",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Cairo:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LangProvider>
          <ShopProvider>
            {children}
            <GlobalProductModal />
            <Toast />
          </ShopProvider>
        </LangProvider>
      </body>
    </html>
  );
}
