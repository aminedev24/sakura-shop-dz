'use client';

import { useShop } from '@/lib/shop-context';
import AddToCartModal from './AddToCartModal';

/** Rendered once at the root so the favourites panel can open a product from
 *  the header on any page, not only on the storefront. */
export default function GlobalProductModal() {
  const { product, closeProduct } = useShop();
  return <AddToCartModal product={product} onClose={closeProduct} />;
}
