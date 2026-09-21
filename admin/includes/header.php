<?php
// Expects $pageTitle, $activePage ('dashboard'|'products'|'orders'|'customers') and $admin to be set.
$nav = [
    'dashboard' => ['index.php', 'Tableau de bord'],
    'products'  => ['products.php', 'Produits'],
    'orders'    => ['orders.php', 'Commandes'],
    'customers' => ['customers.php', 'Clients'],
];
?><!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= h($pageTitle ?? 'Admin') ?> · Sakura Shop Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/admin.css?v=<?= filemtime(__DIR__ . '/../assets/admin.css') ?>">
<link rel="stylesheet" href="../assets/tailwind.css?v=<?= filemtime(__DIR__ . '/../../assets/tailwind.css') ?>">
</head>
<body>
<div class="wrap">
  <aside class="side">
    <div class="brand">Sakura Shop<small>ADMINISTRATION</small></div>
    <nav>
      <?php foreach ($nav as $key => $item): ?>
        <a href="<?= h($item[0]) ?>" class="<?= $activePage === $key ? 'on' : '' ?>"><?= h($item[1]) ?></a>
      <?php endforeach; ?>
      <a href="../index.html" target="_blank">Voir la boutique ↗</a>
    </nav>
    <div class="who">
      Connecté en tant que<br><b><?= h($admin['name']) ?></b>
      <form method="post" action="logout.php"><button type="submit">Déconnexion</button></form>
    </div>
  </aside>
  <main class="main">
