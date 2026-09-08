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
  <div class="overflow-x-auto"><table>
    <thead><tr><th>Nom</th><th>Email</th><th>Téléphone</th><th>Commandes</th><th>Total dépensé</th><th>Inscrit le</th></tr></thead>
    <tbody>
    <?php foreach ($customers as $c): ?>
      <tr>
        <td data-label="Nom"><?= h($c['name']) ?></td>
        <td data-label="Email"><?= h($c['email']) ?></td>
        <td data-label="Téléphone"><?= h($c['phone'] ?? '—') ?></td>
        <td data-label="Commandes"><?= (int)$c['order_count'] ?></td>
        <td data-label="Total dépensé"><?= fmt_da_admin($c['total_spent']) ?></td>
        <td data-label="Inscrit le"><?= h($c['created_at']) ?></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table></div>
<?php endif; ?>
<?php require __DIR__ . '/includes/footer.php'; ?>
