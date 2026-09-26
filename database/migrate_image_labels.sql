-- Optional names for a product's photographs.
--
-- A gallery is sometimes different angles of one item and sometimes genuinely
-- different variants. Labelling turns the second case into something an order
-- can state in words: the WhatsApp confirmation, the phone call and the packing
-- all read text, not thumbnails. Blank means the photograph is just a photograph
-- and nothing extra is shown.

USE sakura_shop;

ALTER TABLE product_images
  ADD COLUMN label VARCHAR(60) NOT NULL DEFAULT '' AFTER image_path;

-- the cover is a photograph too, and can be a variant like any other
ALTER TABLE products
  ADD COLUMN cover_label VARCHAR(60) NOT NULL DEFAULT '' AFTER image_path;

-- what the customer actually picked, stored beside the size
ALTER TABLE order_items
  ADD COLUMN variant VARCHAR(60) NOT NULL DEFAULT '' AFTER size;
