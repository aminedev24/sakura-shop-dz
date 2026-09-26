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

/** Several files from one <input multiple>. Returns the stored paths. */
function upload_gallery(string $field): array
{
    global $UPLOAD_DIR, $message, $messageType;
    if (empty($_FILES[$field]['name'][0])) return [];

    $allowed = ['jpg' => 1, 'jpeg' => 1, 'png' => 1, 'webp' => 1];
    $saved = [];
    foreach ($_FILES[$field]['name'] as $i => $original) {
        if ($_FILES[$field]['error'][$i] !== UPLOAD_ERR_OK) continue;
        $ext = strtolower(pathinfo($original, PATHINFO_EXTENSION));
        if (!isset($allowed[$ext])) {
            $message = 'Certaines images ont été ignorées (jpg, png, webp uniquement)';
            $messageType = 'err';
            continue;
        }
        $fname = 'p' . bin2hex(random_bytes(6)) . '.' . $ext;
        if (!is_dir($UPLOAD_DIR)) mkdir($UPLOAD_DIR, 0775, true);
        if (move_uploaded_file($_FILES[$field]['tmp_name'][$i], $UPLOAD_DIR . $fname)) {
            $saved[] = 'uploads/products/' . $fname;
        }
    }
    return $saved;
}

/** Store extra photographs for a product, after whatever it already has. */
function save_gallery(PDO $pdo, int $productId, array $paths, array $labels = []): void
{
    if (!$paths) return;
    $next = (int)$pdo->query(
        'SELECT COALESCE(MAX(sort_order), 0) FROM product_images WHERE product_id = ' . $productId
    )->fetchColumn();
    $stmt = $pdo->prepare('INSERT INTO product_images (product_id, image_path, label, sort_order) VALUES (?,?,?,?)');
    foreach ($paths as $i => $path) {
        $stmt->execute([$productId, $path, trim((string)($labels[$i] ?? '')), ++$next]);
    }
}

$editing = null;
if (isset($_GET['edit'])) {
    $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
    $stmt->execute([(int)$_GET['edit']]);
    $editing = $stmt->fetch() ?: null;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'delete_image') {
        $imgId = (int)($_POST['image_id'] ?? 0);
        $pid   = (int)($_POST['id'] ?? 0);
        $stmt = $pdo->prepare('SELECT image_path FROM product_images WHERE id = ? AND product_id = ?');
        $stmt->execute([$imgId, $pid]);
        if ($row = $stmt->fetch()) {
            $file = __DIR__ . '/../' . $row['image_path'];
            if (is_file($file)) @unlink($file);
            $pdo->prepare('DELETE FROM product_images WHERE id = ?')->execute([$imgId]);
        }
        header('Location: product-form.php?edit=' . $pid);
        exit;
    }

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
        // blank means the quantity is not tracked, which is not the same as zero
        $coverLabel = trim((string)($_POST['cover_label'] ?? ''));
        $stockRaw = trim((string)($_POST['stock'] ?? ''));
        $stock = $stockRaw === '' ? null : max(0, (int)$stockRaw);

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
                        'INSERT INTO products (name, material, description, category, price, original_price, rating, review_count, sizes, out_of_stock_sizes, stock, tag, image_path, cover_label, active)
                         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
                    );
                    $stmt->execute([$name, $material, $description, $category, $price, $original, $rating, $reviewCount, $sizes, $outSizes, $stock, $tag, $imagePath, $coverLabel, $active]);
                    save_gallery($pdo, (int)$pdo->lastInsertId(), upload_gallery('gallery'), $_POST['gallery_labels'] ?? []);
                    header('Location: products.php?msg=created');
                    exit;
                }
            } else {
                if ($imagePath) {
                    $stmt = $pdo->prepare(
                        'UPDATE products SET name=?, material=?, description=?, category=?, price=?, original_price=?, rating=?, review_count=?, sizes=?, out_of_stock_sizes=?, stock=?, tag=?, image_path=?, cover_label=?, active=? WHERE id=?'
                    );
                    $stmt->execute([$name, $material, $description, $category, $price, $original, $rating, $reviewCount, $sizes, $outSizes, $stock, $tag, $imagePath, $coverLabel, $active, $id]);
                } else {
                    $stmt = $pdo->prepare(
                        'UPDATE products SET name=?, material=?, description=?, category=?, price=?, original_price=?, rating=?, review_count=?, sizes=?, out_of_stock_sizes=?, stock=?, tag=?, cover_label=?, active=? WHERE id=?'
                    );
                    $stmt->execute([$name, $material, $description, $category, $price, $original, $rating, $reviewCount, $sizes, $outSizes, $stock, $tag, $coverLabel, $active, $id]);
                }
                save_gallery($pdo, $id, upload_gallery('gallery'), $_POST['gallery_labels'] ?? []);
                // labels typed against images already stored
                foreach (($_POST['label'] ?? []) as $imgId => $lab) {
                    $pdo->prepare('UPDATE product_images SET label = ? WHERE id = ? AND product_id = ?')
                        ->execute([trim((string)$lab), (int)$imgId, $id]);
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
      <div>
        <label>Quantité en stock <span style="font-weight:400;color:#7A6570">(facultatif)</span></label>
        <input type="number" min="0" name="stock" placeholder="illimité"
               value="<?= h($editing && $editing['stock'] !== null ? (string)$editing['stock'] : '') ?>">
        <small style="display:block;margin-top:4px;color:#7A6570">Laisser vide pour ne pas suivre la quantité.</small>
      </div>
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
        <label>Image principale <?= $editing ? '(laisser vide pour garder l\'image actuelle)' : '' ?></label>
        <input type="file" name="image" accept=".jpg,.jpeg,.png,.webp" <?= $editing ? '' : 'required' ?>>
        <small style="display:block;margin-top:4px;color:#7A6570">Celle qui apparaît dans la grille et sur la commande.</small>
        <input name="cover_label" placeholder="Nom de ce modèle, ex. « Rose » (facultatif)"
               style="margin-top:6px" value="<?= h($editing['cover_label'] ?? '') ?>">
        <?php if ($editing && $editing['image_path']): ?>
          <img class="thumb" style="margin-top:8px" src="../<?= h($editing['image_path']) ?>" alt="">
        <?php endif; ?>
      </div>

      <div class="full">
        <label>Autres images <span style="font-weight:400;color:#7A6570">(facultatif, plusieurs à la fois)</span></label>
        <input type="file" name="gallery[]" accept=".jpg,.jpeg,.png,.webp" multiple>
        <small style="display:block;margin-top:4px;color:#7A6570">
          Affichées en vignettes sur la fiche produit. Nommez-les si ce sont des variantes
          (« Rose », « Bleu ») : le nom apparaît sur la commande et dans le message WhatsApp.
        </small>
        <input name="gallery_labels[]" placeholder="Nom de la 1re image ajoutée (facultatif)" style="margin-top:6px">
        <input name="gallery_labels[]" placeholder="Nom de la 2e image ajoutée (facultatif)" style="margin-top:6px">
        <input name="gallery_labels[]" placeholder="Nom de la 3e image ajoutée (facultatif)" style="margin-top:6px">

        <?php if ($editing): ?>
          <?php
            $gs = $pdo->prepare('SELECT id, image_path, label FROM product_images WHERE product_id = ? ORDER BY sort_order, id');
            $gs->execute([(int)$editing['id']]);
            $gallery = $gs->fetchAll();
          ?>
          <?php if ($gallery): ?>
            <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:10px">
              <?php foreach ($gallery as $g): ?>
                <span style="position:relative;display:inline-block;text-align:center">
                  <img class="thumb" src="../<?= h($g['image_path']) ?>" alt="">
                  <input name="label[<?= (int)$g['id'] ?>]" value="<?= h($g['label']) ?>"
                         placeholder="nom" style="display:block;width:100%;margin-top:4px;font-size:12px;padding:4px 6px">
                  <button type="submit" name="action" value="delete_image"
                          formnovalidate
                          onclick="document.getElementById('imgId').value=<?= (int)$g['id'] ?>"
                          title="Retirer cette image"
                          style="position:absolute;top:-6px;right:-6px;width:22px;height:22px;border:0;border-radius:50%;background:#D6456F;color:#fff;font-size:13px;line-height:1;cursor:pointer">&times;</button>
                </span>
              <?php endforeach; ?>
            </div>
            <input type="hidden" name="image_id" id="imgId" value="">
          <?php endif; ?>
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
