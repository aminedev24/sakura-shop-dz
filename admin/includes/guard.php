<?php
session_start();
require __DIR__ . '/../../config/db.php';

if (empty($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
    header('Location: login.php');
    exit;
}

$admin = $_SESSION['user'];

function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

function fmt_da_admin($n): string
{
    return number_format((float)$n, 0, ',', ' ') . ' DA';
}

/** Human-readable product reference — COT-0007. Mirrors web/lib/ref.ts. */
function product_ref(int $id, string $category): string
{
    $prefix = ['coton' => 'COT', 'satin' => 'SAT', 'boutonne' => 'BTN'][$category] ?? 'SKR';
    return $prefix . '-' . str_pad((string)$id, 4, '0', STR_PAD_LEFT);
}
