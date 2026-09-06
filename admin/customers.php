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
  <table>
    <thead><tr><th>Nom</th><th>Email</th><th>Téléphone</th><th>Commandes</th><th>Total dépensé</th><th>Inscrit le</th></tr></thead>
    <tbody>
    <?php foreach ($customers as $c): ?>
      <tr>
        <td><?= h($c['name']) ?></td>
        <td><?= h($c['email']) ?></td>
        <td><?= h($c['phone'] ?? '—') ?></td>
        <td><?= (int)$c['order_count'] ?></td>
        <td><?= fmt_da_admin($c['total_spent']) ?></td>
        <td><?= h($c['created_at']) ?></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
<?php endif; ?>
<?php require __DIR__ . '/includes/footer.php'; ?>
