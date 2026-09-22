import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';

// Where the PHP side (api/, uploads/, data/) is served from during development.
// Start it with:  php -S localhost:8000 -t /home/abdou/sakura-shop
const PHP_ORIGIN = process.env.PHP_ORIGIN ?? 'http://localhost:8000';

/** Next passes the phase in, which is reliable. process.env.NODE_ENV is not:
 *  it is not guaranteed to be set when this module is evaluated, so a build
 *  could fall through to the development branch and write into .next, wiping
 *  the manifests out from under a running dev server. */
export default function config(phase) {
  const isBuild = phase === PHASE_PRODUCTION_BUILD;

  return {
    // cPanel shared hosting has no Node runtime: the production build emits
    // plain files in out/ that Apache serves. Static export forbids rewrites,
    // so the key must be absent entirely rather than return an empty list —
    // hence spreading whole objects rather than setting fields conditionally.
    ...(isBuild
      ? { output: 'export' }
      : {
          async rewrites() {
            return [
              { source: '/api/:path*', destination: `${PHP_ORIGIN}/api/:path*` },
              { source: '/uploads/:path*', destination: `${PHP_ORIGIN}/uploads/:path*` },
              { source: '/data/:path*', destination: `${PHP_ORIGIN}/data/:path*` },
              // the admin panel is a separate PHP app; without this `next dev`
              // answers /admin/ itself and serves the Next 404
              { source: '/admin', destination: `${PHP_ORIGIN}/admin/index.php` },
              { source: '/admin/:path*', destination: `${PHP_ORIGIN}/admin/:path*` },
            ];
          },
        }),

    // NOTE: do not set a custom distDir here. It looks like the right fix for a
    // build and `next dev` fighting over .next, but `output: 'export'` resolves
    // the Pages Router _document from the default .next regardless, so the
    // export fails on /404 with "Cannot find module for page: /_document".
    // Avoid the collision by not building while a dev server is running.

    // Apache serves /about/ as /about/index.html
    trailingSlash: true,

    // the Next image optimiser needs a server; product photos are plain <img>
    images: { unoptimized: true },
  };
}
