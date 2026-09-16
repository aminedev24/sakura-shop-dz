# Sakura Shop DZ

Storefront + login system + admin panel, running on PHP + MySQL (XAMPP).

## Setup (first time)

1. Start **Apache** and **MySQL** in the XAMPP control panel.
2. Open phpMyAdmin (`http://localhost/phpmyadmin`) and import, in this order:
   - `database/schema.sql` (creates the `sakura_shop` database and tables)
   - `database/seed.sql` (adds the 15 existing products + one admin account)
3. If your MySQL uses a different user/password than XAMPP's default (`root`, no password), edit `config/db.php`.
4. Visit the site at **`http://localhost/sakura-shop-dz/`** — not by double-clicking `index.html`. The storefront needs PHP running behind it to load products, log in, and place orders.

## Styling (Tailwind)

Most of `index.html` is still hand-written CSS in its `<style>` block, but new responsive fixes use Tailwind utility classes, compiled to `assets/tailwind.css` and linked from `<head>`. That file is a build artifact checked into the repo (there's no server-side build step, so it has to already exist for the page to look right) — if you add or change any Tailwind class in `index.html` or `admin/**/*.php`, rebuild it:

```
npm install       # first time only
npm run build:css # one-off build
npm run watch:css # rebuilds on save while you work
```

## Static preview (GitHub Pages)

GitHub Pages only serves static files — it can't run `api/products.php`. When that fetch fails, the storefront automatically falls back to the bundled sample catalog at `data/products-sample.json` and shows a "Mode démo" toast. In that mode browsing, filtering, the cart, wishlist, and the delivery/wilaya/daïra calculator all work normally (nothing there touches the backend), but login/account and actually submitting an order are disabled with an explanatory message, since those genuinely need the PHP + MySQL backend. The admin panel isn't usable at all on a static host.

To refresh the sample data after editing products (e.g. via the admin panel), regenerate it from the live database:

```
php -r '
require __DIR__ . "/config/db.php";
require __DIR__ . "/api/_helpers.php";
$rows = $pdo->query("SELECT * FROM products WHERE active = 1 ORDER BY id ASC")->fetchAll();
echo json_encode(["products" => array_map("product_to_json", $rows)], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
' > data/products-sample.json
```

## Admin panel

`http://localhost/sakura-shop-dz/admin/login.php`

Default account from the seed data:
- Email: `admin@sakurashop.dz`
- Password: `ChangeMe123!`

There's no "change password" screen yet — to change it, create a new admin user (or update the `password_hash` column) directly in phpMyAdmin using PHP's `password_hash()`, then remove the seed account.

From the admin panel you can manage products (with image upload), view and update order status, and see registered customers and revenue stats.

## How it fits together

- `index.html` — storefront. Loads products from `api/products.php`, handles login/register/checkout via fetch calls to `api/*.php`.
- `api/` — JSON endpoints used by the storefront (auth, products, orders).
- `admin/` — separate, session-guarded admin area (server-rendered PHP pages, not part of the storefront's JS).
- `config/db.php` — database credentials.
- `config/shipping.php` — server-side copy of delivery fees per wilaya, used to recompute order totals safely (never trusts prices sent from the browser).
- `uploads/products/` — product images (uploaded via the admin panel, or seeded from the original catalog).
- `database/schema.sql`, `database/seed.sql` — run once to set up the database.

## Notes

- Checkout is cash-on-delivery only, matching the original site — no payment gateway is wired in.
- Customer accounts are optional: checkout works as a guest, but a logged-in customer's orders are saved to their account under "Mon compte" and their name/phone are prefilled at checkout.
- Deleting a product from the admin panel doesn't touch past orders (order line items keep a snapshot of the product name/price at the time of purchase).
