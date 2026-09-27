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

/** 2026-09-24 16:49:02 becomes 24 sept. 16:49 — the seconds and the year are
 *  noise in a list, and the full stamp stays in the title attribute. */
function fmt_when(string $ts): string
{
    $t = strtotime($ts);
    if (!$t) return $ts;
    $months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
               'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    return date('j', $t) . ' ' . $months[(int)date('n', $t) - 1] . ' ' . date('H:i', $t);
}
