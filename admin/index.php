<?php
require __DIR__ . '/includes/guard.php';

$totalOrders = (int)$pdo->query('SELECT COUNT(*) c FROM orders')->fetch()['c'];
$todayOrders = (int)$pdo->query('SELECT COUNT(*) c FROM orders WHERE DATE(created_at) = CURDATE()')->fetch()['c'];
$pendingOrders = (int)$pdo->query("SELECT COUNT(*) c FROM orders WHERE status = 'pending'")->fetch()['c'];
$revenue = (int)$pdo->query("SELECT COALESCE(SUM(total),0) s FROM orders WHERE status IN ('confirmed','shipped','delivered')")->fetch()['s'];
$customerCount = (int)$pdo->query("SELECT COUNT(*) c FROM users WHERE role = 'customer'")->fetch()['c'];
$productCount = (int)$pdo->query('SELECT COUNT(*) c FROM products WHERE active = 1')->fetch()['c'];

$topProducts = $pdo->query(
    'SELECT product_name, SUM(qty) qty_sold
     FROM order_items GROUP BY product_name ORDER BY qty_sold DESC LIMIT 5'
)->fetchAll();

$recentOrders = $pdo->query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 8')->fetchAll();
$STATUS_LABELS = [
    'pending' => 'En attente',
    'confirmed' => 'Confirmée',
    'shipped' => 'Expédiée',
    'delivered' => 'Livrée',
    'cancelled' => 'Annulée',
];

$pageTitle = 'Tableau de bord';
$activePage = 'dashboard';
require __DIR__ . '/includes/header.php';
?>
<h1>Tableau de bord</h1>
<p class="sub">Vue d'ensemble de l'activité de la boutique.</p>

<div class="cards">
  <div class="card"><b><?= $totalOrders ?></b><span>Commandes totales</span></div>
  <div class="card"><b><?= $todayOrders ?></b><span>Commandes aujourd'hui</span></div>
  <div class="card"><b><?= $pendingOrders ?></b><span>En attente</span></div>
  <div class="card"><b><?= fmt_da_admin($revenue) ?></b><span>Chiffre d'affaires</span></div>
  <div class="card"><b><?= $customerCount ?></b><span>Clients inscrits</span></div>
  <div class="card"><b><?= $productCount ?></b><span>Produits actifs</span></div>
</div>

<div class="panel">
  <h2>Meilleures ventes</h2>
  <?php if (!$topProducts): ?>
    <p class="sub">Aucune vente enregistrée pour le moment.</p>
  <?php else: ?>
    <div class="overflow-x-auto"><table>
      <thead><tr><th>Produit</th><th>Quantité vendue</th></tr></thead>
      <tbody>
      <?php foreach ($topProducts as $t): ?>
        <tr><td data-label="Produit"><?= h($t['product_name']) ?></td><td data-label="Quantité vendue"><?= (int)$t['qty_sold'] ?></td></tr>
      <?php endforeach; ?>
      </tbody>
    </table></div>
  <?php endif; ?>
</div>

<div class="panel">
  <h2>Commandes récentes</h2>
  <?php if (!$recentOrders): ?>
    <p class="sub">Aucune commande pour le moment.</p>
  <?php else: ?>
    <div class="overflow-x-auto"><table>
      <thead><tr><th>#</th><th>Client</th><th>Wilaya</th><th>Total</th><th>Statut</th><th>Date</th></tr></thead>
      <tbody>
      <?php foreach ($recentOrders as $o): ?>
        <tr>
          <td data-label="#">#<?= (int)$o['id'] ?></td>
          <td data-label="Client"><?= h($o['customer_name']) ?></td>
          <td data-label="Wilaya"><?= h($o['wilaya_name']) ?></td>
          <td data-label="Total"><?= fmt_da_admin($o['total']) ?></td>
          <td data-label="Statut"><span class="badge <?= h($o['status']) ?>"><?= h($STATUS_LABELS[$o['status']] ?? $o['status']) ?></span></td>
          <td data-label="Date"><?= h($o['created_at']) ?></td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table></div>
  <?php endif; ?>
</div>
<?php require __DIR__ . '/includes/footer.php'; ?>
