-- Run this if you already imported schema.sql before the daira (commune district)
-- field was added alongside wilaya. Safe to skip on a fresh install — schema.sql
-- already includes this column.

USE sakura_shop;

ALTER TABLE orders ADD COLUMN daira_name VARCHAR(60) NOT NULL DEFAULT '' AFTER wilaya_name;
