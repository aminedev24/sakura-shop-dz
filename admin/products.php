<?php
require __DIR__ . '/includes/guard.php';

$CATEGORY_OPTIONS = ['coton' => 'Coton', 'satin' => 'Satin', 'boutonne' => 'Boutonnés'];
$TAG_OPTIONS = ['' => 'Aucun', 'new' => 'Nouveau', 'off' => 'Promo', 'low' => 'Stock limité'];

$message = '';
$messageType = 'ok';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'delete') {
    $id = (int)($_POST['id'] ?? 0);
    $stmt = $pdo->prepare('SELECT image_path FROM products WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    $pdo->prepare('DELETE FROM products WHERE id = ?')->execute([$id]);
    // the product_images rows cascade, but their files do not
    $gs = $pdo->prepare('SELECT image_path FROM product_images WHERE product_id = ?');
    $gs->execute([(int)$_POST['id']]);
    foreach ($gs->fetchAll() as $g) {
        $f = __DIR__ . '/../' . $g['image_path'];
        if (is_file($f)) @unlink($f);
    }

    if ($row && $row['image_path'] && is_file(__DIR__ . '/../' . $row['image_path'])) {
        @unlink(__DIR__ . '/../' . $row['image_path']);
    }
    $message = 'Produit supprimé';
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
  <div class="rec-list" id="prodList">
    <?php foreach ($products as $p): ?>
      <div class="rec">
        <div class="rec-top">
          <div class="rec-title">
            <?= h($p['name']) ?>
            <?php if ($p['tag']): ?><span class="badge tag-<?= h($p['tag']) ?>"><?= h($TAG_OPTIONS[$p['tag']] ?? $p['tag']) ?></span><?php endif; ?>
            <?php if (!$p['active']): ?><span class="badge cancelled">masqué</span><?php endif; ?>
          </div>
          <div class="rec-corner">
            <?php if ($p['image_path']): ?><img class="rec-thumb" src="../<?= h($p['image_path']) ?>" alt=""><?php endif; ?>
          </div>
        </div>
        <div class="rec-ref">Réf #<?= (int)$p['id'] ?> · <?= h($CATEGORY_OPTIONS[$p['category']] ?? $p['category']) ?></div>
        <div class="rec-meta">Tailles <?= h($p['sizes']) ?></div>
        <div class="rec-bottom">
          <div class="rec-actions">
            <a class="rec-ic" href="product-form.php?edit=<?= (int)$p['id'] ?>" title="Modifier" aria-label="Modifier">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </a>
            <form method="post" style="display:contents" onsubmit="return confirm('Supprimer ce produit ?')">
              <input type="hidden" name="action" value="delete">
              <input type="hidden" name="id" value="<?= (int)$p['id'] ?>">
              <button type="submit" class="rec-ic danger" title="Supprimer" aria-label="Supprimer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
              </button>
            </form>
          </div>
          <div class="rec-price"><?= fmt_da_admin($p['price']) ?><?php if ((int)$p['original_price'] > (int)$p['price']): ?> <s><?= fmt_da_admin($p['original_price']) ?></s><?php endif; ?></div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</div>
<script>
document.getElementById('prodSearch').addEventListener('input', function () {
  var q = this.value.toLowerCase();
  document.querySelectorAll('#prodList .rec').forEach(function (rec) {
    rec.style.display = rec.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
  });
});
</script>
<?php require __DIR__ . '/includes/footer.php'; ?>
