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

/** An in-app route. next/link applies basePath on its own, so this is only for
 *  places that navigate imperatively or build an href by hand. */
export const route = (path: string) => BASE + (path.startsWith('/') ? path : '/' + path);
