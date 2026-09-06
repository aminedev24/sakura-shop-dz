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
        'd'  => $p['description'] ?? '',
    ];
}
