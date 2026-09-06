<?php
// One-off helper: visit this in the browser to create (or update) an admin
// account with credentials of your choice, instead of hand-crafting a
// bcrypt hash for a SQL INSERT.
//
// DELETE THIS FILE once you're done — it lets anyone who can reach it
// create an admin account, which is fine for local XAMPP development but
// must not be left reachable if this project is ever put on a public server.

require __DIR__ . '/../config/db.php';

function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

$message = '';
$messageType = 'ok';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim((string)($_POST['name'] ?? ''));
    $email = trim(strtolower((string)($_POST['email'] ?? '')));
    $password = (string)($_POST['password'] ?? '');

    if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 6) {
        $message = 'Nom, email valide et mot de passe (6 caractères min.) requis';
        $messageType = 'err';
    } else {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $existing = $stmt->fetch();

        if ($existing) {
            $pdo->prepare('UPDATE users SET name = ?, password_hash = ?, role = "admin" WHERE id = ?')
                ->execute([$name, $hash, $existing['id']]);
            $message = "Compte existant mis à jour en administrateur : $email";
        } else {
            $pdo->prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, "admin")')
                ->execute([$name, $email, $hash]);
            $message = "Compte administrateur créé : $email";
        }
    }
}

$admins = $pdo->query("SELECT name, email, created_at FROM users WHERE role = 'admin' ORDER BY created_at")->fetchAll();
?><!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Créer un compte admin</title>
<link rel="stylesheet" href="../admin/assets/admin.css">
</head>
<body>
<div class="login-wrap">
  <div class="login-box" style="width:400px">
    <h1>Créer un admin</h1>
    <p class="sub">Outil local — à supprimer une fois utilisé</p>
    <?php if ($message): ?><div class="msg <?= $messageType ?>"><?= h($message) ?></div><?php endif; ?>
    <form method="post">
      <div class="fl"><label>Nom</label><input name="name" required></div>
      <div class="fl"><label>Email</label><input name="email" type="email" required></div>
      <div class="fl"><label>Mot de passe</label><input name="password" type="password" required minlength="6"></div>
      <button class="btn rose" type="submit">Créer / mettre à jour</button>
    </form>
    <?php if ($admins): ?>
      <p class="sub" style="margin-top:20px;margin-bottom:6px">Comptes admin existants :</p>
      <ul style="margin:0;padding-left:18px;font-size:12.5px;color:var(--grey)">
        <?php foreach ($admins as $a): ?><li><?= h($a['name']) ?> — <?= h($a['email']) ?></li><?php endforeach; ?>
      </ul>
    <?php endif; ?>
    <p class="sub" style="margin-top:18px"><a href="../admin/login.php">→ Aller à la connexion admin</a></p>
  </div>
</div>
</body>
</html>
