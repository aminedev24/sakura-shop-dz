<?php
// Server-side mirror of the wilaya delivery rates shown in index.html (var WIL).
// Kept here so /api/orders.php can recompute the delivery fee itself instead of
// trusting whatever the browser sends — must stay in sync with index.html's WIL array.
// [name, fee_bureau, fee_domicile, delay_hours]
$WILAYAS = [
    ['01 — Adrar', 1000, 1300, 120],
    ['02 — Chlef', 550, 750, 48],
    ['03 — Laghouat', 700, 900, 72],
    ['04 — Oum El Bouaghi', 700, 900, 72],
    ['05 — Batna', 700, 900, 72],
    ['06 — Béjaïa', 600, 800, 48],
    ['07 — Biskra', 800, 1000, 72],
    ['08 — Béchar', 900, 1100, 96],
    ['09 — Blida', 400, 600, 24],
    ['10 — Bouira', 450, 650, 24],
    ['11 — Tamanrasset', 1200, 1600, 144],
    ['12 — Tébessa', 700, 900, 72],
    ['13 — Tlemcen', 600, 800, 48],
    ['14 — Tiaret', 600, 800, 48],
    ['15 — Tizi Ouzou', 450, 650, 24],
    ['16 — Alger', 400, 600, 24],
    ['17 — Djelfa', 650, 850, 72],
    ['18 — Jijel', 600, 800, 48],
    ['19 — Sétif', 550, 750, 48],
    ['20 — Saïda', 650, 850, 48],
    ['21 — Skikda', 600, 800, 72],
    ['22 — Sidi Bel Abbès', 600, 800, 48],
    ['23 — Annaba', 650, 850, 72],
    ['24 — Guelma', 650, 850, 72],
    ['25 — Constantine', 600, 800, 48],
    ['26 — Médéa', 450, 650, 24],
    ['27 — Mostaganem', 550, 750, 48],
    ['28 — M\'Sila', 650, 850, 72],
    ['29 — Mascara', 600, 800, 48],
    ['30 — Ouargla', 1000, 1300, 120],
    ['31 — Oran', 550, 750, 48],
    ['32 — El Bayadh', 800, 1000, 96],
    ['33 — Illizi', 1200, 1600, 144],
    ['34 — Bordj Bou Arréridj', 550, 750, 48],
    ['35 — Boumerdès', 450, 650, 24],
    ['36 — El Tarf', 650, 850, 72],
    ['37 — Tindouf', 1200, 1600, 144],
    ['38 — Tissemsilt', 600, 800, 48],
    ['39 — El Oued', 800, 1000, 72],
    ['40 — Khenchela', 700, 900, 72],
    ['41 — Souk Ahras', 700, 900, 72],
    ['42 — Tipaza', 450, 650, 24],
    ['43 — Mila', 600, 800, 48],
    ['44 — Aïn Defla', 450, 650, 24],
    ['45 — Naâma', 800, 1000, 96],
    ['46 — Aïn Témouchent', 600, 800, 48],
    ['47 — Ghardaïa', 900, 1200, 120],
    ['48 — Relizane', 550, 750, 48],
    ['49 — Timimoun', 1000, 1300, 120],
    ['50 — Bordj Badji Mokhtar', 1300, 1700, 144],
    ['51 — Ouled Djellal', 800, 1000, 72],
    ['52 — Béni Abbès', 900, 1100, 96],
    ['53 — In Salah', 1200, 1600, 144],
    ['54 — In Guezzam', 1300, 1700, 144],
    ['55 — Touggourt', 1000, 1300, 120],
    ['56 — Djanet', 1300, 1700, 144],
    ['57 — El M\'Ghair', 950, 1250, 120],
    ['58 — El Meniaa', 1000, 1300, 120],
];

define('FREE_SHIPPING_THRESHOLD', 12000);

function find_wilaya(string $name): ?array
{
    global $WILAYAS;
    foreach ($WILAYAS as $w) {
        if ($w[0] === $name) return $w;
    }
    return null;
}
