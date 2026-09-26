'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PageShell from '@/components/PageShell';
import ProductCard from '@/components/shop/ProductCard';
import SizeTable from '@/components/shop/SizeTable';
import { IArrow, ITruck, ICard, IPin, IHeart } from '@/components/icons2';
import { useShop } from '@/lib/shop-context';
import { useWishlist } from '@/lib/useWishlist';
import { useLang, useMoney } from '@/lib/i18n';
import { asset } from '@/lib/asset';

/** The catalogue is fetched at runtime from api/products.php, so a product
 *  added in the admin appears in the grid straight away. Static per-product
 *  routes would 404 for those until the next build, so this is one route that
 *  reads ?id= and looks the product up in the loaded catalogue. */
function Details() {
  const params = useSearchParams();
  const id = Number(params.get('id'));
  const { products, byId, loading, add, showToast } = useShop();
  const { t } = useLang();
  const money = useMoney();
  const wish = useWishlist();

  const product = byId(id);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [guide, setGuide] = useState(false);
  const [shot, setShot] = useState(0);

  // a different product means the chosen size no longer applies
  useEffect(() => { setSize(''); setQty(1); setShot(0); }, [id]);

  const related = useMemo(
    () => products.filter((p) => p.c === product?.c && p.id !== id).slice(0, 4),
    [products, product, id],
  );

  if (loading) {
    return (
      <PageShell title={t.navShop}>
        <p className="pd-state">{t.pdLoading}</p>
      </PageShell>
    );
  }

  if (!product) {
    return (
      <PageShell title={t.pdNotFound}>
        <div className="pd-state">
          <h1>{t.pdNotFound}</h1>
          <p>{t.pdNotFoundText}</p>
          <Link className="btn2" href="/#boutique">{t.pdBack} <IArrow /></Link>
        </div>
      </PageShell>
    );
  }

  const off = product.o > product.p
    ? Math.round((1 - product.p / product.o) * 100)
    : 0;
  const faved = wish.ids.includes(product.id);
  // an untracked product has no ceiling beyond a sane cap
  const max = product.stock === null ? 20 : Math.min(20, product.stock);
  const soldOut = product.stock === 0;
  const shown = product.imgs[shot] ?? { src: product.img, label: '' };

  return (
    <PageShell title={product.n}>
    <div className="pd">
      <div className="pd-main">
        <div className="pd-media">
          <div className="pd-photo">
            <img src={asset(shown.src)} alt={product.n} />
            {off > 0 && <span className="pcard-off">-{off}%</span>}
            <button
              type="button"
              className={faved ? 'pd-fav on' : 'pd-fav'}
              aria-pressed={faved}
              aria-label={t.favourites}
              onClick={() => wish.toggle(product.id)}
            >
              <IHeart />
            </button>
          </div>

          {shown.label && (
          <p className="pd-variant"><span>{t.pdVariant}</span> {shown.label}</p>
        )}

        {product.imgs.length > 1 && (
            <div className="pd-thumbs" role="group" aria-label={t.pdPhotos}>
              {product.imgs.map((im, i) => (
                <button
                  key={im.src}
                  type="button"
                  className={i === shot ? 'pd-thumb on' : 'pd-thumb'}
                  aria-current={i === shot}
                  title={im.label || undefined}
                  onClick={() => setShot(i)}
                >
                  <img src={asset(im.src)} alt="" loading="lazy" />
                  {im.label && <span className="pd-thumb-label">{im.label}</span>}
                </button>
              ))}
            </div>
          )}
          </div>

        <div className="pd-info">
          <span className="pd-cat">{product.m}</span>
          <h1>{product.n}</h1>

          <div className="pd-rating">
            <span className="pcard-stars" aria-hidden="true">
              {'★'.repeat(Math.round(product.r))}{'☆'.repeat(5 - Math.round(product.r))}
            </span>
            <span>{product.r.toFixed(1)} · {product.rc} {t.pdReviews}</span>
          </div>

          <div className="pd-price">
            <span className="now">{money(product.p)}</span>
            {off > 0 && <span className="was">{money(product.o)}</span>}
            {off > 0 && <span className="save">{t.pdSaving} {money(product.o - product.p)}</span>}
          </div>

          {product.d && (
            <div className="pd-desc">
              <h2>{t.pdDesc}</h2>
              <p>{product.d}</p>
            </div>
          )}

          <div className="pd-sizes">
            <div className="pd-sizes-head">
              <h2>{t.pdSizes}</h2>
              <button type="button" className="pd-guide-toggle"
                      aria-expanded={guide} onClick={() => setGuide((v) => !v)}>
                {guide ? t.pdSizeGuideHide : t.pdSizeGuide}
              </button>
            </div>
            <div className="pd-size-row">
              {product.sz.map((sz) => {
                const gone = product.out.includes(sz);
                return (
                  <button
                    key={sz}
                    type="button"
                    className={`pd-size${size === sz ? ' on' : ''}${gone ? ' gone' : ''}`}
                    disabled={gone}
                    aria-pressed={size === sz}
                    title={gone ? t.pdSoldOut : undefined}
                    onClick={() => setSize(sz)}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
            {guide && (
              <div className="pd-guide">
                <p>{t.sgTitle}</p>
                <SizeTable highlight={size} compact />
              </div>
            )}
          </div>

          {product.stock !== null && (
            <p className={product.stock === 0 ? 'pd-stock out' : product.stock <= 5 ? 'pd-stock low' : 'pd-stock'}>
              {product.stock === 0
                ? t.pdOut
                : product.stock <= 5
                  ? t.pdLeft.replace('{x}', String(product.stock))
                  : t.pdInStock}
            </p>
          )}

          <div className="pd-buy">
            <div className="qty" role="group" aria-label={t.pdQty}>
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="-">−</button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(max, q + 1))} aria-label="+">+</button>
            </div>
            <button
              type="button"
              className="btn2 pd-add"
              disabled={soldOut}
              onClick={() => {
                if (!size) { showToast(t.tSizeT, t.tSizeS); return; }
                // the photograph on screen is the one being ordered
                add(product.id, size, qty, shown.src, shown.label);
                showToast(
                  t.tAddT,
                  `${product.n} — ${t.size} ${size}${shown.label ? ` · ${shown.label}` : ''} × ${qty}`,
                );
              }}
            >
              {soldOut ? t.pdOut : t.addToCart}
            </button>
          </div>

          <ul className="pd-reassure">
            <li><ITruck /> <span><b>{t.w2b}</b>{t.w2s}</span></li>
            <li><ICard /> <span><b>{t.w3b}</b>{t.w3s}</span></li>
            <li><IPin /> <span><b>{t.f3b}</b>{t.f3s}</span></li>
          </ul>

          <p className="pd-ref">{t.pdRef} #{product.id}</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pd-related">
          <h2>{t.pdRelated}</h2>
          <div className="grid3">
            {related.map((p) => (
              <ProductCard key={p.id} p={p} wished={wish.ids.includes(p.id)} onWish={wish.toggle} />
            ))}
          </div>
        </section>
      )}
    </div>
    </PageShell>
  );
}

export default function ProductPage() {
  const { t } = useLang();
  return (
    // useSearchParams needs a Suspense boundary during prerender
    <Suspense fallback={<PageShell title={t.navShop}><p className="pd-state">{t.pdLoading}</p></PageShell>}>
      <Details />
    </Suspense>
  );
}
