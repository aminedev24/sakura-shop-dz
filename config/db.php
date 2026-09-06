<?php
// XAMPP defaults: MySQL on localhost, user root, no password.
// Edit these if your local MySQL is configured differently.
$DB_HOST = 'localhost';
$DB_NAME = 'sakura_shop';
$DB_USER = 'root';
$DB_PASS = '';

try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    die(json_encode(['error' => 'Connexion à la base de données impossible. Vérifiez que MySQL est démarré et que la base "sakura_shop" existe.']));
}
