<?php
require __DIR__ . '/includes/guard.php';

$STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'update_status') {
    $id = (int)($_POST['id'] ?? 0);
    $status = $_POST['status'] ?? '';
    if (in_array($status, $STATUSES, true)) {
        $pdo->prepare('UPDATE orders SET status = ? WHERE id = ?')->execute([$status, $id]);
        $message = "Commande #$id mise à jour";
    }
}

$filter = $_GET['status'] ?? '';
if (in_array($filter, $STATUSES, true)) {
    $stmt = $pdo->prepare('SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC');
    $stmt->execute([$filter]);
} else {
    $stmt = $pdo->query('SELECT * FROM orders ORDER BY created_at DESC');
    $filter = '';
}
$orders = $stmt->fetchAll();

$itemsStmt = $pdo->prepare('SELECT product_name, image_path, size, qty, unit_price FROM order_items WHERE order_id = ?');

$pageTitle = 'Commandes';
$activePage = 'orders';
require __DIR__ . '/includes/header.php';
?>
<h1>Commandes</h1>
<p class="sub"><?= count($orders) ?> commande(s)<?= $filter ? ' — statut : ' . h($filter) : '' ?>.</p>

<?php if ($message): ?><div class="msg ok"><?= h($message) ?></div><?php endif; ?>

<div style="margin-bottom:16px;display:flex;gap:8px;flex-wrap:wrap">
  <a class="btn <?= $filter === '' ? 'rose' : 'ghost' ?> sm" href="orders.php">Toutes</a>
  <?php foreach ($STATUSES as $s): ?>
    <a class="btn <?= $filter === $s ? 'rose' : 'ghost' ?> sm" href="?status=<?= $s ?>"><?= h($s) ?></a>
  <?php endforeach; ?>
</div>

<?php if (!$orders): ?>
  <div class="panel"><p class="sub">Aucune commande.</p></div>
<?php endif; ?>

<?php foreach ($orders as $o): $itemsStmt->execute([$o['id']]); $items = $itemsStmt->fetchAll(); ?>
  <div class="panel">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px">
      <div>
        <h2>Commande #<?= (int)$o['id'] ?> — <?= h($o['customer_name']) ?></h2>
        <p class="sub" style="margin:0">
          <?= h($o['customer_phone']) ?> · <?= h($o['wilaya_name']) ?> ·
          <?= $o['delivery_type'] === 'domicile' ? 'Livraison à domicile' : 'Livraison au bureau' ?> ·
          <?= h($o['created_at']) ?>
        </p>
        <?php if ($o['delivery_type'] === 'domicile' && $o['delivery_address']): ?>
          <p class="sub" style="margin:4px 0 0"><b>Adresse :</b> <?= h($o['delivery_address']) ?></p>
        <?php endif; ?>
      </div>
      <div style="text-align:right">
        <span class="badge <?= h($o['status']) ?>"><?= h($o['status']) ?></span>
        <form method="post" style="margin-top:8px">
          <input type="hidden" name="action" value="update_status">
          <input type="hidden" name="id" value="<?= (int)$o['id'] ?>">
          <select name="status" onchange="this.form.submit()">
            <?php foreach ($STATUSES as $s): ?>
              <option value="<?= $s ?>" <?= $o['status'] === $s ? 'selected' : '' ?>><?= h($s) ?></option>
            <?php endforeach; ?>
          </select>
        </form>
      </div>
    </div>
    <table style="margin-top:14px">
      <thead><tr><th></th><th>Produit</th><th>Taille</th><th>Qté</th><th>Prix unitaire</th></tr></thead>
      <tbody>
      <?php foreach ($items as $it): ?>
        <tr>
          <td><?php if ($it['image_path']): ?><img class="thumb" src="../<?= h($it['image_path']) ?>" alt=""><?php endif; ?></td>
          <td><?= h($it['product_name']) ?></td><td><?= h($it['size']) ?></td><td><?= (int)$it['qty'] ?></td><td><?= fmt_da_admin($it['unit_price']) ?></td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    <p style="text-align:right;margin:10px 0 0">
      Sous-total <?= fmt_da_admin($o['subtotal']) ?> + livraison <?= fmt_da_admin($o['delivery_fee']) ?> =
      <b><?= fmt_da_admin($o['total']) ?></b>
    </p>
  </div>
<?php endforeach; ?>
<?php require __DIR__ . '/includes/footer.php'; ?>
