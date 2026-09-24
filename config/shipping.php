<?php
// Delivery rates, read from data/shipping.json so the server and the browser
// cannot disagree — web/lib/wilayas.ts imports the same file. api/orders.php
// recomputes the fee here rather than trusting whatever the browser sends.
//
// bureau or domicile being null means the carrier does not serve that wilaya by
// that method; both null means it is not served at all.

$SHIPPING_JSON = __DIR__ . '/../data/shipping.json';
$SHIPPING = json_decode(file_get_contents($SHIPPING_JSON), true);

if (!$SHIPPING || empty($SHIPPING['wilayas'])) {
    http_response_code(500);
    die(json_encode(['error' => 'Tarifs de livraison indisponibles.']));
}

$FREE_SHIPPING_FROM = $SHIPPING['freeFrom'];

/** Legacy shape kept for existing callers: [name, bureau, domicile, hours]. */
$WILAYAS = [];
foreach ($SHIPPING['wilayas'] as $w) {
    $WILAYAS[] = [
        sprintf('%02d — %s', $w['code'], $w['name']),
        $w['bureau'],
        $w['domicile'],
        $w['delay'],
    ];
}

/** Fee for a wilaya, or null when that combination is not served. */
function shipping_fee(int $code, bool $home, array $SHIPPING): ?int {
    foreach ($SHIPPING['wilayas'] as $w) {
        if ((int)$w['code'] === $code) {
            return $home ? $w['domicile'] : $w['bureau'];
        }
    }
    return null;
}
