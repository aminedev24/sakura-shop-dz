<?php
require __DIR__ . '/_helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(['error' => 'Méthode non autorisée'], 405);

$in = json_input();
$name = trim((string)($in['name'] ?? ''));
$email = trim(strtolower((string)($in['email'] ?? '')));
$phone = trim((string)($in['phone'] ?? ''));
$password = (string)($in['password'] ?? '');

if ($name === '' || $email === '' || strlen($password) < 6) {
    respond(['error' => 'Nom, email et mot de passe (6 caractères min.) requis'], 400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(['error' => 'Adresse email invalide'], 400);
}

$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    respond(['error' => 'Un compte existe déjà avec cet email'], 409);
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO users (name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, "customer")');
$stmt->execute([$name, $email, $phone, $hash]);

$user = ['id' => (int)$pdo->lastInsertId(), 'name' => $name, 'email' => $email, 'phone' => $phone, 'role' => 'customer'];
$_SESSION['user'] = $user;

respond(['user' => $user]);
