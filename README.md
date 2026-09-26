# Sakura Shop

Storefront for a women's loungewear shop in Algeria: a Next.js front end over a
small PHP + MySQL back end, delivered as static files so it can run on ordinary
shared hosting with no Node runtime.

## Layout

    web/            the storefront — Next.js app router, TypeScript
    api/            PHP endpoints: products, orders, auth
    admin/          PHP admin panel (products, orders) at /admin/
    config/         database credentials and shipping rates
    database/       schema.sql, seed.sql and helper scripts
    uploads/        product photography, written by the admin at runtime
    data/           sample catalogue used when the API is unreachable
    scripts/        build-preview.py, format-css.py
    docs/           reference material: screenshots, brand and print originals

    demo/           generated — the exported app, published by GitHub Pages
    preview/        generated — a one-file homepage snapshot for sharing

    index.html      the original static site, superseded by web/ (see below)
    about.html      "
    conditions.html "
    assets/         its stylesheets
    styles/         its Tailwind source

## Running it

Two processes: PHP serves the back end, Next serves the front end and proxies
`/api`, `/uploads`, `/data` and `/admin` through to it.

    npm run php     # http://localhost:8000
    npm run dev     # http://localhost:3000   ← open this one

Never run a build while the dev server is up; they share `web/.next`.

## Building

    npm run build          # → web/out/, upload alongside api/ config/ data/ uploads/
    npm run preview:html   # → preview/index.html, one self-contained file
    npm --prefix web run build:pages   # → demo/, for GitHub Pages

## Two front ends

`web/` replaced the original static site, but `index.html` and friends are
still here and still served at the GitHub Pages root. They duplicate the
storefront: two stylesheets, two size guides, two sets of design tokens to keep
in step. Decide whether to keep them as a fallback or remove them; right now
both exist and only `web/` is maintained.

## Package managers

pnpm throughout, as one workspace: the root for the original site's Tailwind,
`web` for Next. `pnpm-workspace.yaml` sets `nodeLinker: hoisted`, because Next
resolves some of its own internals through a flat `node_modules`; the tree is
still hardlinked to the shared store, so `web/node_modules` costs almost
nothing on disk.
