<?php
require __DIR__ . '/_helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') respond(['error' => 'Méthode non autorisée'], 405);

$rows = $pdo->query('SELECT * FROM products WHERE active = 1 ORDER BY id ASC')->fetchAll();
$rows = attach_images($pdo, $rows);
respond(['products' => array_map('product_to_json', $rows)]);
