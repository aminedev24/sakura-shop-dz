<?php
require __DIR__ . '/includes/guard.php';
require __DIR__ . '/includes/paginate.php';
require __DIR__ . '/../config/shipping.php';

$STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
$STATUS_LABELS = [
    'pending' => 'En attente',
    'confirmed' => 'Confirmée',
    'shipped' => 'Expédiée',
    'delivered' => 'Livrée',
    'cancelled' => 'Annulée',
];
$message = '';

/**
 * Delete orders. order_items cascades, so the lines go with them.
 *
 * No files are touched: order_items.image_path points at the product's own
 * photograph, which belongs to the catalogue and must survive the order.
 */
function delete_orders(PDO $pdo, array $ids): int
{
    $ids = array_values(array_filter(array_map('intval', $ids)));
    if (!$ids) return 0;
    $in = implode(',', array_fill(0, count($ids), '?'));
    $pdo->prepare("DELETE FROM orders WHERE id IN ($in)")->execute($ids);
    return count($ids);
}

function wants_json(): bool
{
    return str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST'
    && in_array($_POST['action'] ?? '', ['delete_order', 'delete_orders'], true)) {

    $ids = ($_POST['action'] === 'delete_orders')
        ? (array)($_POST['ids'] ?? [])
        : [$_POST['id'] ?? 0];

    $n = delete_orders($pdo, $ids);

    if (wants_json()) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['deleted' => $n, 'ids' => array_map('intval', $ids)]);
        exit;
    }
    header('Location: orders.php?msg=deleted&n=' . $n);
    exit;
}

if (($_GET['msg'] ?? '') === 'deleted') {
    $n = (int)($_GET['n'] ?? 1);
    $message = $n > 1 ? "$n commandes supprimées" : 'Commande supprimée';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'update_status') {
    $id = (int)($_POST['id'] ?? 0);
    $status = $_POST['status'] ?? '';
    if (in_array($status, $STATUSES, true)) {
        $pdo->prepare('UPDATE orders SET status = ? WHERE id = ?')->execute([$status, $id]);
        $message = "Commande #$id mise à jour";
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'update_order') {
    $id = (int)($_POST['id'] ?? 0);
    $cname = trim((string)($_POST['customer_name'] ?? ''));
    $cphone = trim((string)($_POST['customer_phone'] ?? ''));
    $wil = trim((string)($_POST['wilaya_name'] ?? ''));
    $dai = trim((string)($_POST['daira_name'] ?? ''));
    $dtype = ($_POST['delivery_type'] ?? 'bureau') === 'domicile' ? 'domicile' : 'bureau';
    $addr = trim((string)($_POST['delivery_address'] ?? ''));

    if ($cname === '' || $cphone === '') {
        $message = 'Nom et téléphone sont requis';
        $messageType = 'err';
    } elseif (!find_wilaya($wil)) {
        $message = 'Wilaya invalide';
        $messageType = 'err';
    } else {
        // A correction by hand must not silently change what the customer pays,
        // so the delivery fee is recomputed from the wilaya and the method and
        // the total follows the stored subtotal.
        $w = find_wilaya($wil);
        $rate = $dtype === 'domicile' ? $w[2] : $w[1];

        if ($rate === null) {
            $message = 'Ce mode de livraison n\'est pas desservi dans cette wilaya';
            $messageType = 'err';
        } else {
            $cur = $pdo->prepare('SELECT subtotal FROM orders WHERE id = ?');
            $cur->execute([$id]);
            $subtotal = (int)$cur->fetchColumn();
            $fee = $subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : (int)$rate;

            $pdo->prepare(
                'UPDATE orders SET customer_name=?, customer_phone=?, wilaya_name=?, daira_name=?,
                 delivery_type=?, delivery_address=?, delivery_fee=?, total=? WHERE id=?'
            )->execute([$cname, $cphone, $wil, $dai, $dtype, $addr ?: null, $fee, $subtotal + $fee, $id]);

            $message = "Commande #$id modifiée";
        }
    }
}

$filter = $_GET['status'] ?? '';
$isFiltered = in_array($filter, $STATUSES, true);
if (!$isFiltered) $filter = '';

$pg = paginate(
    $pdo,
    $isFiltered ? 'SELECT COUNT(*) FROM orders WHERE status = ?' : 'SELECT COUNT(*) FROM orders',
    $isFiltered ? [$filter] : []
);

$sql = $isFiltered
    ? 'SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?'
    : 'SELECT * FROM orders ORDER BY created_at DESC LIMIT ? OFFSET ?';
$stmt = $pdo->prepare($sql);
$i = 1;
if ($isFiltered) $stmt->bindValue($i++, $filter);
$stmt->bindValue($i++, $pg['perPage'], PDO::PARAM_INT);
$stmt->bindValue($i, $pg['offset'], PDO::PARAM_INT);
$stmt->execute();
$orders = $stmt->fetchAll();
$sumTotal = array_sum(array_column($orders, 'total'));

$itemsStmt = $pdo->prepare('SELECT product_name, image_path, size, variant, qty, unit_price FROM order_items WHERE order_id = ?');
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
            <button type="button" class="rec-ic toggle" data-target="edit-<?= (int)$o['id'] ?>" aria-expanded="false" aria-label="Modifier la commande #<?= (int)$o['id'] ?>" title="Modifier">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </button>
            <button type="button" class="rec-ic danger" title="Supprimer" aria-label="Supprimer la commande #<?= (int)$o['id'] ?>"
                    data-del-order="<?= (int)$o['id'] ?>">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
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
            <div class="rdr-meta">Taille <?= h($it['size']) ?><?php if ($it['variant'] !== ''): ?> · <?= h($it['variant']) ?><?php endif; ?> · ×<?= (int)$it['qty'] ?></div>
            <div class="rdr-meta"><?= fmt_da_admin($it['unit_price']) ?></div>
          </div>
        <?php endforeach; ?>
      </div>

      <form method="post" class="order-edit" id="edit-<?= (int)$o['id'] ?>" hidden>
        <input type="hidden" name="action" value="update_order">
        <input type="hidden" name="id" value="<?= (int)$o['id'] ?>">

        <div class="oe-grid">
          <label>Nom du client
            <input name="customer_name" required value="<?= h($o['customer_name']) ?>"></label>
          <label>Téléphone
            <input name="customer_phone" required value="<?= h($o['customer_phone']) ?>"></label>

          <label>Wilaya
            <select name="wilaya_name" required>
              <?php foreach ($WILAYAS as $w): ?>
                <option value="<?= h($w[0]) ?>" <?= $o['wilaya_name'] === $w[0] ? 'selected' : '' ?>>
                  <?= h($w[0]) ?><?= $w[1] === null && $w[2] === null ? ' (non desservie)' : '' ?>
                </option>
              <?php endforeach; ?>
            </select></label>
          <label>Daïra
            <input name="daira_name" value="<?= h($o['daira_name']) ?>"></label>

          <label>Livraison
            <select name="delivery_type">
              <option value="bureau" <?= $o['delivery_type'] === 'bureau' ? 'selected' : '' ?>>Bureau</option>
              <option value="domicile" <?= $o['delivery_type'] === 'domicile' ? 'selected' : '' ?>>Domicile</option>
            </select></label>
          <label>Adresse
            <input name="delivery_address" value="<?= h($o['delivery_address'] ?? '') ?>"></label>
        </div>

        <p class="oe-note">
          Les frais de livraison et le total sont recalculés d'après la wilaya et le mode choisis.
        </p>
        <button type="submit" class="oe-save">Enregistrer</button>
      </form>
    <?php endforeach; ?>
  </div>
  <?php pager($pg, 'commandes'); ?>
<?php endif; ?>
<script>
// Delete in place, like the catalogue: the endpoint answers JSON when asked,
// so the row goes without reloading and losing the filter and scroll position.
document.querySelectorAll('[data-del-order]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var id = btn.dataset.delOrder;
    if (!confirm('Supprimer la commande #' + id + ' ? Cette action est définitive.')) return;

    var body = new URLSearchParams();
    body.append('action', 'delete_order');
    body.append('id', id);

    fetch('orders.php', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body,
      credentials: 'same-origin',
    })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function () {
        var rec = btn.closest('.rec');
        if (!rec) return;
        rec.style.transition = 'opacity .2s';
        rec.style.opacity = '0';
        setTimeout(function () { rec.remove(); }, 200);
      })
      .catch(function () { alert('La suppression a échoué'); });
  });
});

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
