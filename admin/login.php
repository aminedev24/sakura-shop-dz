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
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/admin.css?v=<?= filemtime(__DIR__ . '/assets/admin.css') ?>">
<link rel="stylesheet" href="../assets/tailwind.css?v=<?= filemtime(__DIR__ . '/../assets/tailwind.css') ?>">
</head>
<body>
<div class="login-wrap">
  <div class="login-box">
    <h1>Administration</h1>
    <p class="sub">Sakura Shop — accès réservé</p>
    <?php if ($error): ?><div class="msg err"><?= h($error) ?></div><?php endif; ?>
    <form method="post">
      <div class="fl"><label for="email">Email</label><input id="email" name="email" type="email" required autofocus></div>
      <div class="fl"><label for="password">Mot de passe</label><span class="passwrap"><input id="password" name="password" type="password" required><button type="button" class="passtoggle" aria-label="Afficher le mot de passe"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z"/><circle cx="12" cy="12" r="3"/></svg></button></span></div>
      <button class="btn rose" type="submit">Se connecter</button>
    </form>
  </div>
</div>
<style>
  .passwrap{position:relative;display:block}
  .passwrap input{width:100%;padding-inline-end:42px}
  .passtoggle{position:absolute;inset-inline-end:6px;top:50%;transform:translateY(-50%);
    width:30px;height:30px;display:grid;place-items:center;border:0;border-radius:50%;
    background:none;color:#7A6570;cursor:pointer}
  .passtoggle svg{width:17px;height:17px}
  .passtoggle:hover{background:#FFEAF1;color:#D6456F}
</style>
<script>
  // reveal toggle: the input keeps its name and id so password managers still
  // treat it as a password field while it is shown
  document.querySelectorAll('.passtoggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = btn.parentNode.querySelector('input');
      var shown = input.type === 'text';
      input.type = shown ? 'password' : 'text';
      btn.setAttribute('aria-label', shown ? 'Afficher le mot de passe' : 'Masquer le mot de passe');
      btn.setAttribute('aria-pressed', String(!shown));
    });
  });
</script>
</body>
</html>
