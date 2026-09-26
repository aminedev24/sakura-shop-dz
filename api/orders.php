<?php
require __DIR__ . '/_helpers.php';
require __DIR__ . '/../config/shipping.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $user = require_login();
    $stmt = $pdo->prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC');
    $stmt->execute([$user['id']]);
    $orders = $stmt->fetchAll();

    $itemsStmt = $pdo->prepare('SELECT product_id, product_name, image_path, size, variant, qty, unit_price FROM order_items WHERE order_id = ?');
    $out = [];
    foreach ($orders as $o) {
        $itemsStmt->execute([$o['id']]);
        $out[] = [
            'id' => (int)$o['id'],
            'status' => $o['status'],
            'wilaya_name' => $o['wilaya_name'],
            'daira_name' => $o['daira_name'],
            'delivery_type' => $o['delivery_type'],
            'delivery_address' => $o['delivery_address'],
            'delivery_fee' => (int)$o['delivery_fee'],
            'subtotal' => (int)$o['subtotal'],
            'total' => (int)$o['total'],
            'created_at' => $o['created_at'],
            'items' => $itemsStmt->fetchAll(),
        ];
    }
    respond(['orders' => $out]);
}

if ($method === 'POST') {
    $in = json_input();
    $user = current_user();

    $name = trim((string)($in['customer_name'] ?? ''));
    $phone = trim((string)($in['customer_phone'] ?? ''));
    $wilayaName = trim((string)($in['wilaya_name'] ?? ''));
    $dairaName = trim((string)($in['daira_name'] ?? ''));
    $deliveryType = ($in['delivery_type'] ?? 'bureau') === 'domicile' ? 'domicile' : 'bureau';
    $address = trim((string)($in['delivery_address'] ?? ''));
    $items = is_array($in['items'] ?? null) ? $in['items'] : [];

    if ($name === '') respond(['error' => 'Nom complet requis'], 400);
    if (strlen(preg_replace('/\D/', '', $phone)) < 9) respond(['error' => 'Numéro de téléphone invalide'], 400);
    if ($deliveryType === 'domicile' && $address === '') respond(['error' => 'Adresse de livraison requise pour une livraison à domicile'], 400);
    if (!$items) respond(['error' => 'Le panier est vide'], 400);

    $wilaya = find_wilaya($wilayaName);
    if (!$wilaya) respond(['error' => 'Wilaya invalide'], 400);

    $daira = find_daira($wilaya[0], $dairaName);
    if (!$daira) respond(['error' => 'Daïra invalide pour la wilaya choisie'], 400);

    // Recompute everything server-side from the DB — never trust client-sent prices.
    $subtotal = 0;
    $lines = [];
    $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ? AND active = 1');
    foreach ($items as $it) {
        $productId = (int)($it['id'] ?? 0);
        $size = trim((string)($it['size'] ?? ''));
        $chosenImg = trim((string)($it['img'] ?? ''));
        $qty = max(1, min(20, (int)($it['qty'] ?? 0)));

        $stmt->execute([$productId]);
        $p = $stmt->fetch();
        if (!$p) respond(['error' => 'Un article du panier n\'est plus disponible'], 409);

        $availableSizes = $p['sizes'] !== '' ? explode(',', $p['sizes']) : [];
        $outSizes = $p['out_of_stock_sizes'] !== '' ? explode(',', $p['out_of_stock_sizes']) : [];
        // Which photograph the customer picked is part of what they ordered, so
        // it is stored on the line. Never trust the browser's path: accept it
        // only if it is the cover or one of this product's gallery images.
        $ownImages = [$p['image_path'] => (string)($p['cover_label'] ?? '')];
        $gi = $pdo->prepare('SELECT image_path, label FROM product_images WHERE product_id = ?');
        $gi->execute([$p['id']]);
        foreach ($gi->fetchAll() as $g) $ownImages[$g['image_path']] = $g['label'];

        $lineImage = array_key_exists($chosenImg, $ownImages) ? $chosenImg : $p['image_path'];
        // the label travels with the order so the confirmation message, the
        // phone call and the packing slip can all name the variant in words
        $lineVariant = $ownImages[$lineImage] ?? '';

        if (!in_array($size, $availableSizes, true) || in_array($size, $outSizes, true)) {
            respond(['error' => 'Taille indisponible pour "' . $p['name'] . '"'], 409);
        }

        $lineTotal = (int)$p['price'] * $qty;
        $subtotal += $lineTotal;
        $lines[] = [
            'product_id' => $productId,
            'product_name' => $p['name'],
            'image_path' => $lineImage,
            'size' => $size,
            'variant' => $lineVariant,
            'qty' => $qty,
            'unit_price' => (int)$p['price'],
        ];
    }

    // the carrier does not serve every wilaya by every method, and a null rate
    // must be refused rather than cast to a free delivery
    $rate = $deliveryType === 'domicile' ? $wilaya[2] : $wilaya[1];
    if ($rate === null) {
        respond(['error' => 'Livraison indisponible pour cette wilaya avec ce mode'], 400);
    }
    $fee = $subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : (int)$rate;
    $total = $subtotal + $fee;

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare(
            'INSERT INTO orders (user_id, customer_name, customer_phone, wilaya_name, daira_name, delivery_type, delivery_address, delivery_fee, subtotal, total, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "pending")'
        );
        $stmt->execute([
            $user['id'] ?? null,
            $name,
            $phone,
            $wilaya[0],
            $daira,
            $deliveryType,
            $address !== '' ? $address : null,
            $fee,
            $subtotal,
            $total,
        ]);
        $orderId = (int)$pdo->lastInsertId();

        $itemStmt = $pdo->prepare(
            'INSERT INTO order_items (order_id, product_id, product_name, image_path, size, variant, qty, unit_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        );
        foreach ($lines as $l) {
            $itemStmt->execute([$orderId, $l['product_id'], $l['product_name'], $l['image_path'], $l['size'], $l['variant'], $l['qty'], $l['unit_price']]);
        }

        $pdo->commit();
    } catch (Exception $e) {
        $pdo->rollBack();
        respond(['error' => 'Impossible d\'enregistrer la commande, réessayez'], 500);
    }

    respond(['order' => ['id' => $orderId, 'subtotal' => $subtotal, 'delivery_fee' => $fee, 'total' => $total]], 201);
}

respond(['error' => 'Méthode non autorisée'], 405);
