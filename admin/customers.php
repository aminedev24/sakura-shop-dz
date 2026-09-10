<?php
require __DIR__ . '/includes/guard.php';

$customers = $pdo->query(
    "SELECT u.id, u.name, u.email, u.phone, u.created_at,
            COUNT(o.id) AS order_count,
            COALESCE(SUM(o.total), 0) AS total_spent
     FROM users u
     LEFT JOIN orders o ON o.user_id = u.id
     WHERE u.role = 'customer'
     GROUP BY u.id
     ORDER BY u.created_at DESC"
)->fetchAll();

$pageTitle = 'Clients';
$activePage = 'customers';
require __DIR__ . '/includes/header.php';
?>
<h1>Clients</h1>
<p class="sub"><?= count($customers) ?> compte(s) client(s) inscrit(s). Les commandes passées sans compte (achat invité) n'apparaissent pas ici — voir <a href="orders.php">Commandes</a>.</p>

<?php if (!$customers): ?>
  <div class="panel"><p class="sub">Aucun client inscrit pour le moment.</p></div>
<?php else: ?>
  <div class="rec-list">
    <?php foreach ($customers as $c): ?>
      <div class="rec">
        <div class="rec-top">
          <div class="rec-title">
            <span class="ava"><?= h(strtoupper(substr($c['name'], 0, 1))) ?></span>
            <?= h($c['name']) ?>
          </div>
        </div>
        <div class="rec-ref"><?= h($c['email']) ?></div>
        <div class="rec-meta"><?= h($c['phone'] ?? '—') ?></div>
        <div class="rec-bottom">
          <div class="rec-sub"><?= (int)$c['order_count'] ?> commande(s) · inscrit le <?= date('d/m/Y', strtotime($c['created_at'])) ?></div>
          <div class="rec-price"><?= fmt_da_admin($c['total_spent']) ?></div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
<?php endif; ?>
<?php require __DIR__ . '/includes/footer.php'; ?>
