# web/public

Static files served from the site root. `web/public/brand/hero.jpg` is
requested as `/brand/hero.jpg`, in development and in the exported build alike.

    brand/      design assets: the hero photograph, logo files, share images

Product photography does **not** belong here. It lives in `uploads/products/`,
which the PHP admin panel writes to at runtime; anything in `public/` is
baked in at build time and cannot be changed from the admin.

Keep this directory small — every file is copied into `out/` on each build.
Large marketing source files (posters, print artwork) belong in `/brand` at the
repository root instead, which is not served.
