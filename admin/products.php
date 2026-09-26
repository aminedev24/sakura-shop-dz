<?php
require __DIR__ . '/includes/guard.php';

$CATEGORY_OPTIONS = ['coton' => 'Coton', 'satin' => 'Satin', 'boutonne' => 'Boutonnés'];
$TAG_OPTIONS = ['' => 'Aucun', 'new' => 'Nouveau', 'off' => 'Promo', 'low' => 'Stock limité'];

$message = '';
$messageType = 'ok';

/**
 * Delete products and their photographs.
 *
 * Every file is collected before the rows go, because product_images cascades
 * on delete — reading it afterwards returns nothing and the gallery files are
 * left orphaned on disk.
 */
function delete_products(PDO $pdo, array $ids): int
{
    $ids = array_values(array_filter(array_map('intval', $ids)));
    if (!$ids) return 0;

    $in = implode(',', array_fill(0, count($ids), '?'));

    $files = [];
    $stmt = $pdo->prepare("SELECT image_path FROM products WHERE id IN ($in)");
    $stmt->execute($ids);
    foreach ($stmt->fetchAll() as $r) {
        if ($r['image_path']) $files[] = $r['image_path'];
    }
    $gs = $pdo->prepare("SELECT image_path FROM product_images WHERE product_id IN ($in)");
    $gs->execute($ids);
    foreach ($gs->fetchAll() as $g) $files[] = $g['image_path'];

    $pdo->prepare("DELETE FROM products WHERE id IN ($in)")->execute($ids);

    foreach ($files as $rel) {
        $f = __DIR__ . '/../' . $rel;
        if (is_file($f)) @unlink($f);
    }
    return count($ids);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'delete') {
    delete_products($pdo, [$_POST['id'] ?? 0]);
    // Redirect rather than render the result of a POST, so a refresh does not
    // offer to submit the deletion again. Create and update already do this.
    header('Location: products.php?msg=deleted');
    exit;
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'delete_bulk') {
    $n = delete_products($pdo, (array)($_POST['ids'] ?? []));
    header('Location: products.php?msg=deleted&n=' . $n);
    exit;
} elseif (($_GET['msg'] ?? '') === 'deleted') {
    $n = (int)($_GET['n'] ?? 1);
    $message = $n > 1 ? "$n produits supprimés" : 'Produit supprimé';
} elseif (($_GET['msg'] ?? '') === 'created') {
    $message = 'Produit créé';
} elseif (($_GET['msg'] ?? '') === 'updated') {
    $message = 'Produit mis à jour';
}

$products = $pdo->query('SELECT * FROM products ORDER BY id DESC')->fetchAll();

$pageTitle = 'Produits';
$activePage = 'products';
require __DIR__ . '/includes/header.php';
?>
<h1>Produits</h1>
<p class="sub"><?= count($products) ?> produit(s) au catalogue.</p>

<?php if ($message): ?><div class="msg <?= $messageType ?>"><?= h($message) ?></div><?php endif; ?>

<p style="margin:0 0 16px">
  <a class="btn rose" href="product-form.php">+ Nouveau produit</a>
</p>

<div class="panel">
  <h2>Catalogue</h2>
  <input type="search" id="prodSearch" class="search-input" placeholder="Rechercher un produit…">

  <form method="post" id="bulkForm">
    <input type="hidden" name="action" value="delete_bulk">

    <div class="bulkbar" id="bulkBar" hidden>
      <label class="bulk-all">
        <input type="checkbox" id="bulkAll">
        Tout sélectionner
      </label>
      <span id="bulkCount">0 sélectionné</span>
      <button type="submit" class="bulk-del" id="bulkDel">Supprimer la sélection</button>
    </div>

  <div class="rec-list" id="prodList">
    <?php foreach ($products as $p): ?>
      <div class="rec">
        <div class="rec-top">
          <div class="rec-title">
            <label class="rec-pick" title="Sélectionner">
              <input type="checkbox" name="ids[]" value="<?= (int)$p['id'] ?>" class="bulk-cb">
            </label>
            <?= h($p['name']) ?>
            <?php if ($p['tag']): ?><span class="badge tag-<?= h($p['tag']) ?>"><?= h($TAG_OPTIONS[$p['tag']] ?? $p['tag']) ?></span><?php endif; ?>
            <?php if (!$p['active']): ?><span class="badge cancelled">masqué</span><?php endif; ?>
          </div>
          <div class="rec-corner">
            <?php if ($p['image_path']): ?><img class="rec-thumb" src="../<?= h($p['image_path']) ?>" alt=""><?php endif; ?>
          </div>
        </div>
        <div class="rec-ref">Réf <?= h(product_ref((int)$p['id'], $p['category'])) ?> · <?= h($CATEGORY_OPTIONS[$p['category']] ?? $p['category']) ?><?php if ($p['stock'] !== null): ?> · <?= (int)$p['stock'] ?> en stock<?php endif; ?></div>
        <div class="rec-meta">Tailles <?= h($p['sizes']) ?></div>
        <div class="rec-bottom">
          <div class="rec-actions">
            <a class="rec-ic" href="product-form.php?edit=<?= (int)$p['id'] ?>" title="Modifier" aria-label="Modifier">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </a>
            <button type="submit" form="oneDelete" name="id" value="<?= (int)$p['id'] ?>"
                    class="rec-ic danger" title="Supprimer" aria-label="Supprimer"
                    onclick="return confirm('Supprimer ce produit ?')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
              </button>
          </div>
          <div class="rec-price"><?= fmt_da_admin($p['price']) ?><?php if ((int)$p['original_price'] > (int)$p['price']): ?> <s><?= fmt_da_admin($p['original_price']) ?></s><?php endif; ?></div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
  </form>

  <!-- kept outside #bulkForm: nested forms are invalid, so the per-row delete
       buttons reference this one with form="oneDelete" -->
  <form method="post" id="oneDelete">
    <input type="hidden" name="action" value="delete">
  </form>
</div>
<style>
  .rec-pick{margin-inline-end:8px;vertical-align:middle}
  .rec-pick input{width:16px;height:16px;accent-color:#D6456F;cursor:pointer}
  .bulkbar{display:flex;align-items:center;gap:14px;flex-wrap:wrap;
    margin:10px 0 14px;padding:10px 14px;border:1px solid #F1DEE5;border-radius:14px;
    background:#FFF5F8}
  .bulkbar .bulk-all{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;cursor:pointer}
  .bulkbar .bulk-all input{width:16px;height:16px;accent-color:#D6456F;cursor:pointer}
  .bulkbar #bulkCount{font-size:12.5px;color:#7A6570}
  .bulk-del{margin-inline-start:auto;border:0;border-radius:999px;background:#D6456F;color:#fff;
    padding:9px 16px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit}
  .bulk-del:hover{background:#AF385B}
</style>
<script>
// Bulk selection. The bar only appears once something is ticked, so the list
// looks unchanged until it is being used.
(function () {
  var bar = document.getElementById('bulkBar');
  var all = document.getElementById('bulkAll');
  var count = document.getElementById('bulkCount');
  var form = document.getElementById('bulkForm');
  var boxes = function () { return Array.prototype.slice.call(document.querySelectorAll('.bulk-cb')); };
  // "select all" applies to what the search has left visible, not the whole catalogue
  var visible = function () {
    return boxes().filter(function (b) { return b.closest('.rec').style.display !== 'none'; });
  };

  function sync() {
    var picked = boxes().filter(function (b) { return b.checked; });
    bar.hidden = picked.length === 0;
    count.textContent = picked.length + (picked.length > 1 ? ' sélectionnés' : ' sélectionné');
    var vis = visible();
    all.checked = vis.length > 0 && vis.every(function (b) { return b.checked; });
  }

  document.addEventListener('change', function (e) {
    if (e.target.classList.contains('bulk-cb')) sync();
  });

  all.addEventListener('change', function () {
    visible().forEach(function (b) { b.checked = all.checked; });
    sync();
  });

  form.addEventListener('submit', function (e) {
    var n = boxes().filter(function (b) { return b.checked; }).length;
    if (!n) { e.preventDefault(); return; }
    var msg = n > 1 ? 'Supprimer ces ' + n + ' produits ?' : 'Supprimer ce produit ?';
    if (!confirm(msg)) e.preventDefault();
  });

  document.addEventListener('bulk:resync', sync);
  sync();
})();

document.getElementById('prodSearch').addEventListener('input', function () {
  var q = this.value.toLowerCase();
  document.querySelectorAll('#prodList .rec').forEach(function (rec) {
    rec.style.display = rec.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
  });
  // "select all" covers what is visible, so filtering changes its state
  document.dispatchEvent(new Event('bulk:resync'));
});
</script>
<?php require __DIR__ . '/includes/footer.php'; ?>
