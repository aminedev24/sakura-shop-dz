<?php
require __DIR__ . '/_helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(['error' => 'Méthode non autorisée'], 405);

$in = json_input();
$email = trim(strtolower((string)($in['email'] ?? '')));
$password = (string)($in['password'] ?? '');

if ($email === '' || $password === '') {
    respond(['error' => 'Email et mot de passe requis'], 400);
}

$stmt = $pdo->prepare('SELECT id, name, email, phone, password_hash, role FROM users WHERE email = ?');
$stmt->execute([$email]);
$row = $stmt->fetch();

if (!$row || !password_verify($password, $row['password_hash'])) {
    respond(['error' => 'Email ou mot de passe incorrect'], 401);
}

$user = ['id' => (int)$row['id'], 'name' => $row['name'], 'email' => $row['email'], 'phone' => $row['phone'], 'role' => $row['role']];
$_SESSION['user'] = $user;

respond(['user' => $user]);
