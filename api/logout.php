<?php
require __DIR__ . '/_helpers.php';
$_SESSION = [];
session_destroy();
respond(['ok' => true]);
