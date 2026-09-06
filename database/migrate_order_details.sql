-- Run this if you already imported schema.sql before delivery address and
-- per-item product images were added. Safe to skip on a fresh install —
-- schema.sql already includes these columns.

USE sakura_shop;

ALTER TABLE orders ADD COLUMN delivery_address VARCHAR(255) DEFAULT NULL AFTER delivery_type;
ALTER TABLE order_items ADD COLUMN image_path VARCHAR(255) DEFAULT NULL AFTER product_name;
