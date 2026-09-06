-- Wipes the product catalog and restores the original 15 products.
-- Safe to re-run any time you want to reset back to the defaults.
-- WARNING: this deletes ALL products currently in the catalog, including
-- any you added yourself through the admin panel. Past orders are not
-- affected (order_items keeps its own snapshot of product name/price).

USE sakura_shop;

DELETE FROM products;
ALTER TABLE products AUTO_INCREMENT = 1;

INSERT INTO products (name, material, description, category, price, original_price, rating, review_count, sizes, out_of_stock_sizes, tag, image_path) VALUES
('Ensemble Ourson',          'Coton · manches longues',          'Coton doux et respirant pour un confort maximal. Coupe décontractée parfaite pour les soirées d''hiver.', 'coton',    3900, 4800, 4.5, 31, 'S,M,L,XL',      'XXL', 'off', 'uploads/products/p1.jpg'),
('Ensemble Panda',           'Coton doux · oversize',            'Coupe oversize ultra-confortable, idéale pour la détente à la maison. Design fun et chaleureux.', 'coton',    3700, 4600, 4.5, 24, 'M,L,XL,XXL',    '',    'off', 'uploads/products/p2.jpg'),
('Ensemble Lapin rose',      'Coton · rose poudré',              'Tons pastel et coton ultra-doux. Un classique adoré par nos clientes pour sa douceur.', 'coton',    4100, 5000, 5.0, 42, 'S,M,L,XL',      '',    'off', 'uploads/products/p3.jpg'),
('Ensemble Lucky Rabbit',    'Coton · haut long',                'Pyjama confortable avec haut légèrement long. Coton épais de qualité supérieure.', 'coton',    3800, 4500, 4.0, 18, 'M,L,XL',        'S',   'low', 'uploads/products/p4.jpg'),
('Pyjama boutonné Nounours', 'Crêpe froissé · col revers',       'Élégant pyjama en crêpe froissé avec col revers et boutonnage. Tissu premium anti-froissage.', 'boutonne', 4600, 5600, 4.5, 27, 'S,M,L,XL',      '',    'new', 'uploads/products/p6.jpg'),
('Pyjama boutonné Fleurs',   'Crêpe froissé · bordeaux',         'Imprimé fleuri raffiné en bordeaux. Crêpe froissé doux au toucher, coupe fluide.', 'boutonne', 4600, 5600, 5.0, 35, 'S,M,L,XL,XXL',  '',    'off', 'uploads/products/p7.jpg'),
('Ensemble Feuillage',       'Coton imprimé · vert',             'Imprimé feuillage tendance en coton respirant. Parfait pour se sentir bien toute la journée.', 'coton',    4900, 6000, 4.5, 22, 'M,L,XL',        '',    'off', 'uploads/products/p8.jpg'),
('Ensemble Paisley nuit',    'Viscose · bleu marine',            'Motif paisley élégant en viscose fluide. Légèreté et confort garantis.', 'coton',    5200, 6400, 4.5, 19, 'S,M,L,XL',      '',    'off', 'uploads/products/p9.jpg'),
('Ensemble Nœuds',           'Coton · rose poudré',              'Délicat détail nœud sur coton rose poudré. Féminin et confortable.', 'coton',    4700, 5800, 5.0, 38, 'S,M,L,XL,XXL',  '',    'off', 'uploads/products/p11.jpg'),
('Pyjama satin rayé pêche',  'Satin · col revers',               'Satin soyeux avec rayures pêche et col revers. Glisse et douceur absolue.', 'satin',    4300, 5200, 4.5, 29, 'S,M,L,XL',      '',    'off', 'uploads/products/p13.jpg'),
('Pyjama satin Cœurs',       'Satin · crème',                    'Satin crème imprimé cœurs. Élégant et doux pour un sommeil réparateur.', 'satin',    4300, 5200, 5.0, 33, 'M,L,XL,XXL',    'S',   'off', 'uploads/products/p14.jpg'),
('Pyjama Ratatouille',       'Satin · bleu ciel',                'Satin bleu ciel avec imprimé ludique. Nouvelle arrivée légère et agréable.', 'satin',    4500, 5400, 4.0, 14, 'S,M,L',         '',    'new', 'uploads/products/p15.jpg'),
('Pyjama boutonné Winnie',   'Coton · imprimé all-over',         'Imprimé all-over adorable en coton confortable. Col boutonné classique.', 'boutonne', 4800, 5900, 5.0, 47, 'M,L,XL',        'S',   'low', 'uploads/products/p16.jpg'),
('Ensemble Stitch rayé',     'Coton · bleu ciel',                'Rayures bleu ciel en coton doux. Un design cool et décontracté.', 'coton',    4200, 5000, 4.5, 26, 'S,M,L,XL',      '',    'off', 'uploads/products/p18.jpg'),
('Ensemble Fraises',         'Coton rayé · manches longues',     'Imprimé fraises frais et joyeux. Manches longues pour la saison froide.', 'coton',    4200, 5000, 4.5, 30, 'S,M,L,XL,XXL',  '',    'off', 'uploads/products/p19.jpg');
