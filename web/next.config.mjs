const isProd = process.env.NODE_ENV === 'production';

// Where the PHP side (api/, uploads/, data/) is served from during development.
// Start it with:  php -S localhost:8000 -t /home/abdou/sakura-shop
const PHP_ORIGIN = process.env.PHP_ORIGIN ?? 'http://localhost:8000';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // cPanel shared hosting has no Node runtime: the production build emits plain
  // files in out/ that Apache serves. Static export forbids rewrites, so it is
  // only applied for production builds and `next dev` keeps the proxy below.
  // the rewrites key must be absent entirely for a static export, not merely
  // return an empty list, so the two modes are spread in as whole objects
  ...(isProd
    ? { output: 'export' }
    : {
        async rewrites() {
          return [
            { source: '/api/:path*', destination: `${PHP_ORIGIN}/api/:path*` },
            { source: '/uploads/:path*', destination: `${PHP_ORIGIN}/uploads/:path*` },
            { source: '/data/:path*', destination: `${PHP_ORIGIN}/data/:path*` },
          ];
        },
      }),

  // Apache serves /about/ as /about/index.html
  trailingSlash: true,

  // the Next image optimiser needs a server; product photos are plain <img>
  images: { unoptimized: true },

};

export default nextConfig;
