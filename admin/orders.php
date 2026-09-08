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
$sumTotal = array_sum(array_column($orders, 'total'));

$itemsStmt = $pdo->prepare('SELECT product_name, image_path, size, qty, unit_price FROM order_items WHERE order_id = ?');
$itemsByOrder = [];
foreach ($orders as $o) {
    $itemsStmt->execute([$o['id']]);
    $itemsByOrder[$o['id']] = $itemsStmt->fetchAll();
}

$pageTitle = 'Commandes';
$activePage = 'orders';
require __DIR__ . '/includes/header.php';
?>
<h1>Commandes</h1>
<p class="sub">
  <?= count($orders) ?> commande(s)<?= $filter ? ' — statut : ' . h($filter) : '' ?>
  <?php if ($orders): ?> · total <b><?= fmt_da_admin($sumTotal) ?></b><?php endif; ?>
</p>

<?php if ($message): ?><div class="msg ok"><?= h($message) ?></div><?php endif; ?>

<div style="margin-bottom:16px;display:flex;gap:8px;flex-wrap:wrap">
  <a class="btn <?= $filter === '' ? 'rose' : 'ghost' ?> sm" href="orders.php">Toutes</a>
  <?php foreach ($STATUSES as $s): ?>
    <a class="btn <?= $filter === $s ? 'rose' : 'ghost' ?> sm" href="?status=<?= $s ?>"><?= h($s) ?></a>
  <?php endforeach; ?>
</div>

<?php if (!$orders): ?>
  <div class="panel"><p class="sub">Aucune commande.</p></div>
<?php else: ?>
  <div class="panel" style="padding:0">
    <div class="overflow-x-auto">
    <table class="orders-table">
      <thead>
        <tr>
          <th class="tog"></th>
          <th>#</th>
          <th>Client</th>
          <th>Livraison</th>
          <th>Articles</th>
          <th class="num">Total</th>
          <th>Statut</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
      <?php foreach ($orders as $o): $items = $itemsByOrder[$o['id']]; $rid = 'items-' . (int)$o['id']; ?>
        <tr class="order-row">
          <td class="tog" data-label=""><button type="button" class="toggle" data-target="<?= $rid ?>" aria-expanded="false" aria-label="Détails de la commande #<?= (int)$o['id'] ?>">▸</button></td>
          <td data-label="#">#<?= (int)$o['id'] ?></td>
          <td data-label="Client"><div class="cell-val">
            <b><?= h($o['customer_name']) ?></b>
            <div class="sub-sm"><?= h($o['customer_phone']) ?></div>
          </div></td>
          <td data-label="Livraison"><div class="cell-val">
            <?= $o['delivery_type'] === 'domicile' ? 'Domicile' : 'Bureau' ?>
            <div class="sub-sm"><?= h($o['wilaya_name']) ?><?= $o['daira_name'] ? ' — ' . h($o['daira_name']) : '' ?></div>
          </div></td>
          <td data-label="Articles"><div class="cell-val">
            <div class="item-thumbs">
              <?php foreach (array_slice($items, 0, 4) as $it): if ($it['image_path']): ?>
                <img class="thumb-sm" src="../<?= h($it['image_path']) ?>" alt="<?= h($it['product_name']) ?>" title="<?= h($it['product_name']) ?> (<?= h($it['size']) ?>)">
              <?php endif; endforeach; ?>
              <?php if (count($items) > 4): ?><span class="more-count">+<?= count($items) - 4 ?></span><?php endif; ?>
            </div>
            <div class="sub-sm"><?= count($items) ?> article(s)</div>
          </div></td>
          <td class="num" data-label="Total"><div class="cell-val">
            <b><?= fmt_da_admin($o['total']) ?></b>
            <div class="sub-sm"><?= fmt_da_admin($o['subtotal']) ?> + <?= $o['delivery_fee'] ? fmt_da_admin($o['delivery_fee']) : 'livraison offerte' ?><?= $o['delivery_fee'] ? ' livraison' : '' ?></div>
          </div></td>
          <td data-label="Statut"><div class="cell-val">
            <span class="badge <?= h($o['status']) ?>"><?= h($o['status']) ?></span>
            <form method="post" class="status-form">
              <input type="hidden" name="action" value="update_status">
              <input type="hidden" name="id" value="<?= (int)$o['id'] ?>">
              <select name="status" onchange="this.form.submit()">
                <?php foreach ($STATUSES as $s): ?>
                  <option value="<?= $s ?>" <?= $o['status'] === $s ? 'selected' : '' ?>><?= h($s) ?></option>
                <?php endforeach; ?>
              </select>
            </form>
          </div></td>
          <td class="sub-sm" data-label="Date"><?= h($o['created_at']) ?></td>
        </tr>
        <tr class="order-details" id="<?= $rid ?>" hidden>
          <td class="detail-cell" colspan="8">
            <?php if ($o['delivery_type'] === 'domicile' && $o['delivery_address']): ?>
              <p class="sub-sm" style="margin:0 0 10px"><b>Adresse :</b> <?= h($o['delivery_address']) ?></p>
            <?php endif; ?>
            <div class="overflow-x-auto"><table class="items-table">
              <thead><tr><th></th><th>Produit</th><th>Taille</th><th>Qté</th><th class="num">Prix unitaire</th></tr></thead>
              <tbody>
              <?php foreach ($items as $it): ?>
                <tr>
                  <td class="cell-photo" data-label=""><?php if ($it['image_path']): ?><img class="thumb" src="../<?= h($it['image_path']) ?>" alt=""><?php endif; ?></td>
                  <td data-label="Produit"><?= h($it['product_name']) ?></td><td data-label="Taille"><?= h($it['size']) ?></td><td data-label="Qté"><?= (int)$it['qty'] ?></td><td class="num" data-label="Prix unitaire"><?= fmt_da_admin($it['unit_price']) ?></td>
                </tr>
              <?php endforeach; ?>
              </tbody>
            </table></div>
          </td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    </div>
  </div>
<?php endif; ?>
<script>
document.querySelectorAll('.toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var row = document.getElementById(btn.dataset.target);
    var willOpen = row.hasAttribute('hidden');
    if (willOpen) row.removeAttribute('hidden'); else row.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', String(willOpen));
    btn.textContent = willOpen ? '▾' : '▸';
  });
});
</script>
<?php require __DIR__ . '/includes/footer.php'; ?>
