const isProd = process.env.NODE_ENV === 'production';

// Where the PHP side (api/, uploads/, data/) is served from during development.
// Start it with:  php -S localhost:8000 -t /home/abdou/sakura-shop
const PHP_ORIGIN = process.env.PHP_ORIGIN ?? 'http://localhost:8000';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // cPanel shared hosting has no Node runtime: the production build emits plain
  // files in out/ that Apache serves. Static export forbids rewrites, so it is
  // only applied for production builds and `next dev` keeps the proxy below.
  ...(isProd ? { output: 'export' } : {}),

  // Apache serves /about/ as /about/index.html
  trailingSlash: true,

  // the Next image optimiser needs a server; product photos are plain <img>
  images: { unoptimized: true },

  async rewrites() {
    if (isProd) return [];
    return [
      { source: '/api/:path*', destination: `${PHP_ORIGIN}/api/:path*` },
      { source: '/uploads/:path*', destination: `${PHP_ORIGIN}/uploads/:path*` },
      { source: '/data/:path*', destination: `${PHP_ORIGIN}/data/:path*` },
    ];
  },
};

export default nextConfig;
