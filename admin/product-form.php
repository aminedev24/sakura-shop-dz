<?php
require __DIR__ . '/includes/guard.php';

$SIZE_OPTIONS = ['S', 'M', 'L', 'XL', 'XXL'];
$CATEGORY_OPTIONS = ['coton' => 'Coton', 'satin' => 'Satin', 'boutonne' => 'Boutonnés'];
$TAG_OPTIONS = ['' => 'Aucun', 'new' => 'Nouveau', 'off' => 'Promo', 'low' => 'Stock limité'];
$UPLOAD_DIR = __DIR__ . '/../uploads/products/';

$message = '';
$messageType = 'ok';

function upload_image(string $field): ?string
{
    global $UPLOAD_DIR, $message, $messageType;
    if (empty($_FILES[$field]['name']) || $_FILES[$field]['error'] === UPLOAD_ERR_NO_FILE) {
        return null;
    }
    if ($_FILES[$field]['error'] !== UPLOAD_ERR_OK) {
        $message = "Échec du téléversement de l'image";
        $messageType = 'err';
        return null;
    }
    $allowed = ['jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp'];
    $ext = strtolower(pathinfo($_FILES[$field]['name'], PATHINFO_EXTENSION));
    if (!isset($allowed[$ext])) {
        $message = 'Format d\'image non supporté (jpg, png, webp uniquement)';
        $messageType = 'err';
        return null;
    }
    $fname = 'p' . bin2hex(random_bytes(6)) . '.' . $ext;
    if (!is_dir($UPLOAD_DIR)) mkdir($UPLOAD_DIR, 0775, true);
    move_uploaded_file($_FILES[$field]['tmp_name'], $UPLOAD_DIR . $fname);
    return 'uploads/products/' . $fname;
}

$editing = null;
if (isset($_GET['edit'])) {
    $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
    $stmt->execute([(int)$_GET['edit']]);
    $editing = $stmt->fetch() ?: null;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'create' || $action === 'update') {
        $id = (int)($_POST['id'] ?? 0);
        $name = trim((string)($_POST['name'] ?? ''));
        $material = trim((string)($_POST['material'] ?? ''));
        $description = trim((string)($_POST['description'] ?? ''));
        $category = in_array($_POST['category'] ?? '', array_keys($CATEGORY_OPTIONS), true) ? $_POST['category'] : 'coton';
        $price = max(0, (int)($_POST['price'] ?? 0));
        $original = max(0, (int)($_POST['original_price'] ?? 0));
        $rating = max(0, min(5, (float)($_POST['rating'] ?? 5)));
        $reviewCount = max(0, (int)($_POST['review_count'] ?? 0));
        $tag = in_array($_POST['tag'] ?? '', array_keys($TAG_OPTIONS), true) ? $_POST['tag'] : '';
        $active = isset($_POST['active']) ? 1 : 0;
        $sizes = implode(',', array_intersect($_POST['sizes'] ?? [], $SIZE_OPTIONS));
        $outSizes = implode(',', array_intersect($_POST['out_sizes'] ?? [], $SIZE_OPTIONS));

        if ($name === '' || $price <= 0 || $original <= 0 || $sizes === '') {
            $message = 'Nom, prix, prix barré et au moins une taille sont requis';
            $messageType = 'err';
        } else {
            $imagePath = upload_image('image');

            if ($action === 'create') {
                if (!$imagePath) {
                    $message = 'Une image est requise pour créer un produit';
                    $messageType = 'err';
                } else {
                    $stmt = $pdo->prepare(
                        'INSERT INTO products (name, material, description, category, price, original_price, rating, review_count, sizes, out_of_stock_sizes, tag, image_path, active)
                         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)'
                    );
                    $stmt->execute([$name, $material, $description, $category, $price, $original, $rating, $reviewCount, $sizes, $outSizes, $tag, $imagePath, $active]);
                    header('Location: products.php?msg=created');
                    exit;
                }
            } else {
                if ($imagePath) {
                    $stmt = $pdo->prepare(
                        'UPDATE products SET name=?, material=?, description=?, category=?, price=?, original_price=?, rating=?, review_count=?, sizes=?, out_of_stock_sizes=?, tag=?, image_path=?, active=? WHERE id=?'
                    );
                    $stmt->execute([$name, $material, $description, $category, $price, $original, $rating, $reviewCount, $sizes, $outSizes, $tag, $imagePath, $active, $id]);
                } else {
                    $stmt = $pdo->prepare(
                        'UPDATE products SET name=?, material=?, description=?, category=?, price=?, original_price=?, rating=?, review_count=?, sizes=?, out_of_stock_sizes=?, tag=?, active=? WHERE id=?'
                    );
                    $stmt->execute([$name, $material, $description, $category, $price, $original, $rating, $reviewCount, $sizes, $outSizes, $tag, $active, $id]);
                }
                header('Location: products.php?msg=updated');
                exit;
            }
        }
    }
}

$pageTitle = $editing ? 'Modifier un produit' : 'Ajouter un produit';
$activePage = 'products';
require __DIR__ . '/includes/header.php';
?>
<h1><?= $editing ? 'Modifier "' . h($editing['name']) . '"' : 'Ajouter un produit' ?></h1>
<p class="sub"><a href="products.php">← Retour au catalogue</a></p>

<?php if ($message): ?><div class="msg <?= $messageType ?>"><?= h($message) ?></div><?php endif; ?>

<div class="panel">
  <form method="post" enctype="multipart/form-data">
    <input type="hidden" name="action" value="<?= $editing ? 'update' : 'create' ?>">
    <?php if ($editing): ?><input type="hidden" name="id" value="<?= (int)$editing['id'] ?>"><?php endif; ?>
    <div class="frm">
      <div class="full"><label>Nom</label><input name="name" required value="<?= h($editing['name'] ?? '') ?>"></div>
      <div class="full"><label>Matière / description courte</label><input name="material" value="<?= h($editing['material'] ?? '') ?>"></div>
      <div class="full"><label>Description (affichée dans la fiche produit)</label><textarea name="description" rows="2"><?= h($editing['description'] ?? '') ?></textarea></div>
      <div>
        <label>Catégorie</label>
        <select name="category">
          <?php foreach ($CATEGORY_OPTIONS as $val => $label): ?>
            <option value="<?= h($val) ?>" <?= ($editing['category'] ?? 'coton') === $val ? 'selected' : '' ?>><?= h($label) ?></option>
          <?php endforeach; ?>
        </select>
      </div>
      <div>
        <label>Étiquette</label>
        <select name="tag">
          <?php foreach ($TAG_OPTIONS as $val => $label): ?>
            <option value="<?= h($val) ?>" <?= ($editing['tag'] ?? '') === $val ? 'selected' : '' ?>><?= h($label) ?></option>
          <?php endforeach; ?>
        </select>
      </div>
      <div><label>Prix (DA)</label><input type="number" name="price" min="0" required value="<?= h((string)($editing['price'] ?? '')) ?>"></div>
      <div><label>Prix barré (DA)</label><input type="number" name="original_price" min="0" required value="<?= h((string)($editing['original_price'] ?? '')) ?>"></div>
      <div><label>Note (0-5)</label><input type="number" step="0.1" min="0" max="5" name="rating" value="<?= h((string)($editing['rating'] ?? '5')) ?>"></div>
      <div><label>Nombre d'avis</label><input type="number" min="0" name="review_count" value="<?= h((string)($editing['review_count'] ?? '0')) ?>"></div>
      <div class="full">
        <label>Tailles disponibles</label>
        <div class="checks">
          <?php $sel = $editing ? explode(',', $editing['sizes']) : []; ?>
          <?php foreach ($SIZE_OPTIONS as $s): ?>
            <label><input type="checkbox" name="sizes[]" value="<?= $s ?>" <?= in_array($s, $sel, true) ? 'checked' : '' ?>><?= $s ?></label>
          <?php endforeach; ?>
        </div>
      </div>
      <div class="full">
        <label>Tailles en rupture de stock</label>
        <div class="checks">
          <?php $out = $editing ? explode(',', $editing['out_of_stock_sizes']) : []; ?>
          <?php foreach ($SIZE_OPTIONS as $s): ?>
            <label><input type="checkbox" name="out_sizes[]" value="<?= $s ?>" <?= in_array($s, $out, true) ? 'checked' : '' ?>><?= $s ?></label>
          <?php endforeach; ?>
        </div>
      </div>
      <div class="full">
        <label>Image <?= $editing ? '(laisser vide pour garder l\'image actuelle)' : '' ?></label>
        <input type="file" name="image" accept=".jpg,.jpeg,.png,.webp" <?= $editing ? '' : 'required' ?>>
        <?php if ($editing && $editing['image_path']): ?>
          <img class="thumb" style="margin-top:8px" src="../<?= h($editing['image_path']) ?>" alt="">
        <?php endif; ?>
      </div>
      <div class="full">
        <label><input type="checkbox" name="active" value="1" <?= (!$editing || $editing['active']) ? 'checked' : '' ?>> Produit actif (visible sur la boutique)</label>
      </div>
    </div>
    <div style="margin-top:16px;display:flex;gap:10px">
      <button class="btn rose" type="submit"><?= $editing ? 'Enregistrer' : 'Créer le produit' ?></button>
      <a class="btn ghost" href="products.php">Annuler</a>
    </div>
  </form>
</div>
<?php require __DIR__ . '/includes/footer.php'; ?>
