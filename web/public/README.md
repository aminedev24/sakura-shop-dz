# web/public

Static files served from the site root. `web/public/brand/hero.jpg` is
requested as `/brand/hero.jpg`, in development and in the exported build alike.

    brand/      design assets, referenced with bundled() from lib/asset.ts

                hero.jpg        the hero photograph
                satin4.jpeg     the satin category tile
                coton.jpg       category tile
                boutonne.jpg    category tile
                nouveautes.jpg  category tile, and the story section
                satin.jpg       the promo banner

Filenames are written out in full wherever they are referenced, extension and
all. The artwork arrives in whatever format it was shot in — satin4 is a .jpeg
while the rest are .jpg — so building a path by appending an extension gives a
404 the first time that assumption is wrong.

The site's own furniture belongs here even when the picture happens to be of a
product — hero.jpg is the photograph that was uploads/products/p17.jpg. These
used to be referenced there directly, and every one of those files had already
outlived the product it was uploaded for: deleting a product from the admin
takes its photographs with it, which would have left the homepage with broken
tiles and no hero.

Product photography does **not** belong here. It lives in `uploads/products/`,
which the PHP admin panel writes to at runtime; anything in `public/` is
baked in at build time and cannot be changed from the admin.

Keep this directory small — every file is copied into `out/` on each build.
Large marketing source files (posters, print artwork) belong in `/brand` at the
repository root instead, which is not served.
