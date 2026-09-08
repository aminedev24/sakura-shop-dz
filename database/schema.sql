-- Sakura Shop DZ — database schema
-- Import this first in phpMyAdmin (or `mysql -u root < schema.sql`), then import seed.sql.

CREATE DATABASE IF NOT EXISTS sakura_shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sakura_shop;

CREATE TABLE users (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(120) NOT NULL,
  email          VARCHAR(190) NOT NULL UNIQUE,
  phone          VARCHAR(30)  DEFAULT NULL,
  password_hash  VARCHAR(255) NOT NULL,
  role           ENUM('customer','admin') NOT NULL DEFAULT 'customer',
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE products (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  name                VARCHAR(150) NOT NULL,
  material            VARCHAR(150) DEFAULT NULL,
  description         TEXT,
  category            VARCHAR(40)  NOT NULL DEFAULT 'coton',
  price               INT NOT NULL,
  original_price      INT NOT NULL,
  rating              DECIMAL(2,1) NOT NULL DEFAULT 5.0,
  review_count        INT NOT NULL DEFAULT 0,
  sizes               VARCHAR(100) NOT NULL DEFAULT 'S,M,L,XL',
  out_of_stock_sizes  VARCHAR(100) NOT NULL DEFAULT '',
  tag                 ENUM('','new','off','low') NOT NULL DEFAULT '',
  image_path          VARCHAR(255) DEFAULT NULL,
  active              TINYINT(1) NOT NULL DEFAULT 1,
  created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE orders (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  user_id           INT DEFAULT NULL,
  customer_name     VARCHAR(120) NOT NULL,
  customer_phone    VARCHAR(30)  NOT NULL,
  wilaya_name       VARCHAR(60)  NOT NULL,
  daira_name        VARCHAR(60)  NOT NULL DEFAULT '',
  delivery_type     ENUM('bureau','domicile') NOT NULL DEFAULT 'bureau',
  delivery_address  VARCHAR(255) DEFAULT NULL,
  delivery_fee      INT NOT NULL DEFAULT 0,
  subtotal          INT NOT NULL,
  total             INT NOT NULL,
  status            ENUM('pending','confirmed','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE order_items (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  order_id      INT NOT NULL,
  product_id    INT DEFAULT NULL,
  product_name  VARCHAR(150) NOT NULL,
  image_path    VARCHAR(255) DEFAULT NULL,
  size          VARCHAR(10) NOT NULL,
  qty           INT NOT NULL,
  unit_price    INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_products_active ON products(active);
