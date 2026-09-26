-- Extra product photographs, and an optional stock count.
--
-- products.image_path stays as the cover: it is what the grid shows and what
-- order_items copies at checkout, so the historical record of an order keeps
-- working even if the gallery changes later.
--
-- stock NULL means the quantity is not tracked for that product, which is the
-- existing behaviour — only a number turns the limit on.

USE sakura_shop;

CREATE TABLE IF NOT EXISTS product_images (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  product_id  INT NOT NULL,
  image_path  VARCHAR(255) NOT NULL,
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_product_images_product ON product_images(product_id, sort_order);

ALTER TABLE products
  ADD COLUMN stock INT DEFAULT NULL COMMENT 'NULL = not tracked' AFTER out_of_stock_sizes;
