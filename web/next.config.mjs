/** @type {import('next').NextConfig} */
const nextConfig = {
  // cPanel shared hosting has no Node runtime: build locally, upload `out/`.
  // Remove this line (and `images.unoptimized`) if the host turns out to
  // support "Setup Node.js App" and you want SSR / API routes.
  output: 'export',

  // Apache serves /about/ as /about/index.html
  trailingSlash: true,

  // the Next image optimiser needs a server; product photos are plain <img>
  images: { unoptimized: true },
};

export default nextConfig;
