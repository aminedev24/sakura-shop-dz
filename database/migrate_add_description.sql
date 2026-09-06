-- Run this ONLY if you already imported the old schema.sql (without a
-- products.description column) and don't want to drop/recreate the database.
-- Safe to skip entirely on a fresh install — schema.sql already includes it.

USE sakura_shop;

ALTER TABLE products ADD COLUMN description TEXT AFTER material;
