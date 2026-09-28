/** Prefixes for absolute paths the app references.
 *
 *  Next's `basePath` rewrites its own bundles and next/link hrefs, but not a
 *  raw <img src="/uploads/…"> or a fetch. Two prefixes are needed because on
 *  GitHub Pages the app is published under /sakura-shop-dz/demo while the
 *  photographs and the sample catalogue stay at the repository root, one level
 *  up. Both are empty for a normal build, which the real host serves from its
 *  own domain root.
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** where uploads/, data/ and api/ sit — the repo root on Pages */
export const CONTENT = process.env.NEXT_PUBLIC_CONTENT_BASE ?? BASE;

export const asset = (path: string) =>
  CONTENT + (path.startsWith('/') ? path : '/' + path);

/** A file that ships inside the app, from web/public. It is exported next to
 *  the pages, so it takes BASE and not CONTENT — and unlike uploads/, the
 *  admin panel cannot delete it, which is why the site's own furniture (the
 *  hero, the category tiles, the banners) belongs here rather than in a
 *  product photograph that someone may retire from the catalogue. */
export const bundled = (path: string) =>
  BASE + (path.startsWith('/') ? path : '/' + path);

/** An in-app route. next/link applies basePath on its own, so this is only for
 *  places that navigate imperatively or build an href by hand. */
export const route = (path: string) => BASE + (path.startsWith('/') ? path : '/' + path);
