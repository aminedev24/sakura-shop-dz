<?php
require __DIR__ . '/includes/guard.php';

$STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
$STATUS_LABELS = [
    'pending' => 'En attente',
    'confirmed' => 'Confirmée',
    'shipped' => 'Expédiée',
    'delivered' => 'Livrée',
    'cancelled' => 'Annulée',
];
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
  <?= count($orders) ?> commande(s)<?= $filter ? ' — statut : ' . h($STATUS_LABELS[$filter] ?? $filter) : '' ?>
  <?php if ($orders): ?> · total <b><?= fmt_da_admin($sumTotal) ?></b><?php endif; ?>
</p>

<?php if ($message): ?><div class="msg ok"><?= h($message) ?></div><?php endif; ?>

<div style="margin-bottom:16px;display:flex;gap:8px;flex-wrap:wrap">
  <a class="btn <?= $filter === '' ? 'rose' : 'ghost' ?> sm" href="orders.php">Toutes</a>
  <?php foreach ($STATUSES as $s): ?>
    <a class="btn <?= $filter === $s ? 'rose' : 'ghost' ?> sm" href="?status=<?= $s ?>"><?= h($STATUS_LABELS[$s]) ?></a>
  <?php endforeach; ?>
</div>

<?php if (!$orders): ?>
  <div class="panel"><p class="sub">Aucune commande.</p></div>
<?php else: ?>
  <div class="rec-list">
    <?php foreach ($orders as $o): $items = $itemsByOrder[$o['id']]; $rid = 'items-' . (int)$o['id']; ?>
      <div class="rec">
        <div class="rec-top">
          <div class="rec-title"><?= h($o['customer_name']) ?> <span class="badge <?= h($o['status']) ?>"><?= h($STATUS_LABELS[$o['status']] ?? $o['status']) ?></span></div>
          <div class="rec-corner">
            <div class="item-thumbs">
              <?php foreach (array_slice($items, 0, 1) as $it): if ($it['image_path']): ?>
                <img class="thumb-sm" src="../<?= h($it['image_path']) ?>" alt="<?= h($it['product_name']) ?>" title="<?= h($it['product_name']) ?> (<?= h($it['size']) ?>)">
              <?php endif; endforeach; ?>
              <?php if (count($items) > 1): ?><span class="more-count">+<?= count($items) - 1 ?></span><?php endif; ?>
            </div>
          </div>
        </div>
        <div class="rec-ref">#<?= (int)$o['id'] ?> · <?= h($o['customer_phone']) ?></div>
        <div class="rec-meta"><?= $o['delivery_type'] === 'domicile' ? 'Domicile' : 'Bureau' ?> · <?= h($o['wilaya_name']) ?><?= $o['daira_name'] ? ' — ' . h($o['daira_name']) : '' ?></div>
        <div class="rec-sub"><?= h($o['created_at']) ?></div>
        <div class="rec-bottom">
          <div class="rec-actions">
            <button type="button" class="rec-ic toggle" data-target="<?= $rid ?>" aria-expanded="false" aria-label="Détails de la commande #<?= (int)$o['id'] ?>">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <form method="post" class="status-form">
              <input type="hidden" name="action" value="update_status">
              <input type="hidden" name="id" value="<?= (int)$o['id'] ?>">
              <select name="status" onchange="this.form.submit()">
                <?php foreach ($STATUSES as $s): ?>
                  <option value="<?= $s ?>" <?= $o['status'] === $s ? 'selected' : '' ?>><?= h($STATUS_LABELS[$s]) ?></option>
                <?php endforeach; ?>
              </select>
            </form>
          </div>
          <div class="rec-price">
            <?= fmt_da_admin($o['total']) ?>
            <div class="rec-sub"><?= fmt_da_admin($o['subtotal']) ?> + <?= $o['delivery_fee'] ? fmt_da_admin($o['delivery_fee']) : 'livraison offerte' ?><?= $o['delivery_fee'] ? ' livraison' : '' ?></div>
          </div>
        </div>
      </div>
      <div class="rec-detail" id="<?= $rid ?>" hidden>
        <?php if ($o['delivery_type'] === 'domicile' && $o['delivery_address']): ?>
          <p class="sub-sm" style="margin:0 0 10px"><b>Adresse :</b> <?= h($o['delivery_address']) ?></p>
        <?php endif; ?>
        <?php foreach ($items as $it): ?>
          <div class="rec-detail-row">
            <?php if ($it['image_path']): ?><img class="thumb" src="../<?= h($it['image_path']) ?>" alt=""><?php endif; ?>
            <div class="rdr-name"><?= h($it['product_name']) ?></div>
            <div class="rdr-meta">Taille <?= h($it['size']) ?> · ×<?= (int)$it['qty'] ?></div>
            <div class="rdr-meta"><?= fmt_da_admin($it['unit_price']) ?></div>
          </div>
        <?php endforeach; ?>
      </div>
    <?php endforeach; ?>
  </div>
<?php endif; ?>
<script>
document.querySelectorAll('.toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var row = document.getElementById(btn.dataset.target);
    var willOpen = row.hasAttribute('hidden');
    if (willOpen) row.removeAttribute('hidden'); else row.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', String(willOpen));
    btn.classList.toggle('on', willOpen);
  });
});
</script>
<?php require __DIR__ . '/includes/footer.php'; ?>
