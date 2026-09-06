<?php
session_start();
require __DIR__ . '/../config/db.php';

if (!empty($_SESSION['user']) && $_SESSION['user']['role'] === 'admin') {
    header('Location: index.php');
    exit;
}

function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim(strtolower((string)($_POST['email'] ?? '')));
    $password = (string)($_POST['password'] ?? '');

    $stmt = $pdo->prepare('SELECT id, name, email, phone, password_hash, role FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $row = $stmt->fetch();

    if ($row && $row['role'] === 'admin' && password_verify($password, $row['password_hash'])) {
        $_SESSION['user'] = [
            'id' => (int)$row['id'],
            'name' => $row['name'],
            'email' => $row['email'],
            'phone' => $row['phone'],
            'role' => $row['role'],
        ];
        header('Location: index.php');
        exit;
    }

    $error = 'Email ou mot de passe incorrect, ou ce compte n\'est pas administrateur.';
}
?><!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Connexion admin · Sakura Shop</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body>
<div class="login-wrap">
  <div class="login-box">
    <h1>Administration</h1>
    <p class="sub">Sakura Shop — accès réservé</p>
    <?php if ($error): ?><div class="msg err"><?= h($error) ?></div><?php endif; ?>
    <form method="post">
      <div class="fl"><label for="email">Email</label><input id="email" name="email" type="email" required autofocus></div>
      <div class="fl"><label for="password">Mot de passe</label><input id="password" name="password" type="password" required></div>
      <button class="btn rose" type="submit">Se connecter</button>
    </form>
  </div>
</div>
</body>
</html>
