<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/../config/db.php';

function json_input(): array
{
    $data = json_decode(file_get_contents('php://input'), true);
    return is_array($data) ? $data : [];
}

function respond($data, int $code = 200): void
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function current_user(): ?array
{
    return $_SESSION['user'] ?? null;
}

function require_login(): array
{
    $u = current_user();
    if (!$u) respond(['error' => 'Authentification requise'], 401);
    return $u;
}

// Product row (DB shape) -> JSON shape the storefront JS expects.
function product_to_json(array $p): array
{
    return [
        'id' => (int)$p['id'],
        'n'  => $p['name'],
        'm'  => $p['material'],
        'c'  => $p['category'],
        'p'  => (int)$p['price'],
        'o'  => (int)$p['original_price'],
        'r'  => (float)$p['rating'],
        'rc' => (int)$p['review_count'],
        'sz' => $p['sizes'] !== '' ? explode(',', $p['sizes']) : [],
        'out' => $p['out_of_stock_sizes'] !== '' ? explode(',', $p['out_of_stock_sizes']) : [],
        'tag' => $p['tag'],
        'img' => $p['image_path'] ?: '',
        // cover first, then the gallery; the detail page shows them as thumbnails
        'imgs' => $p['images'] ?? array_values(array_filter([$p['image_path'] ?? ''])),
        // null means the quantity is not tracked for this product
        'stock' => isset($p['stock']) && $p['stock'] !== null ? (int)$p['stock'] : null,
        'd'  => $p['description'] ?? '',
    ];
}

/** Attach each product's gallery in one query rather than one per product. */
function attach_images(PDO $pdo, array $rows): array
{
    if (!$rows) return $rows;
    $ids = array_column($rows, 'id');
    $in  = implode(',', array_fill(0, count($ids), '?'));
    $stmt = $pdo->prepare(
        "SELECT product_id, image_path FROM product_images
         WHERE product_id IN ($in) ORDER BY product_id, sort_order, id"
    );
    $stmt->execute($ids);

    $byProduct = [];
    foreach ($stmt->fetchAll() as $r) {
        $byProduct[(int)$r['product_id']][] = $r['image_path'];
    }
    foreach ($rows as &$row) {
        $cover = $row['image_path'] ?? '';
        $extra = $byProduct[(int)$row['id']] ?? [];
        $row['images'] = array_values(array_filter(array_merge($cover ? [$cover] : [], $extra)));
    }
    return $rows;
}
