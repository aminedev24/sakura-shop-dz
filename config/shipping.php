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

// Daïras (sub-wilaya districts) per wilaya, keyed by the same label used in
// $WILAYAS above. Kept here so /api/orders.php can check the daira sent by
// the browser actually belongs to the selected wilaya — must stay in sync
// with index.html's DAIRA object. Source: official territorial division
// (58 wilayas / 548 daïras).
$DAIRAS = [
    '01 — Adrar' => ['Adrar','Aoulef','Fenoughil','Reggane','Tsabit','Zaouiat Kounta'],
    '02 — Chlef' => ['Abou El Hassane','Ain Merane','Beni Haoua','Boukadir','Chlef','El Karimia','El Marsa','Oued Fodda','Ouled Ben Abdelkader','Ouled Fares','Taougrit','Tenes','Zeboudja'],
    '03 — Laghouat' => ['Aflou','Ain Madhi','Brida','El Ghicha','Gueltat Sidi Saad','Hassi R\'Mel','Ksar El Hirane','Laghouat','Oued Morra','Sidi Makhlouf'],
    '04 — Oum El Bouaghi' => ['Ain Babouche','Ain Beida','Ain Fekroun','Ain Kercha','Ain M\'Lila','Dhalaa','F\'Kirina','Ksar Sbahi','Meskiana','Oum El Bouaghi','Sigus','Souk Naamane'],
    '05 — Batna' => ['Ain Djasser','Ain Touta','Arris','Barika','Batna','Bouzina','Chemora','Djezzar','El Madher','Ichemoul','Menaa','Merouana','N\'Gaous','Ouled Si Slimane','Ras El Aioun','Seggana','Seriana','Tazoult','Theniet El Abed','Timgad','Tkout'],
    '06 — Béjaïa' => ['Adekar','Akbou','Amizour','Aokas','Barbacha','Bejaia','Beni Maouche','Chemini','Darguina','El Kseur','Ifri Ouzellaguene','Ighil Ali','Kherrata','Seddouk','Sidi Aich','Souk El Tenine','Tazmalt','Tichy','Timezrit'],
    '07 — Biskra' => ['Biskra','Djemorah','El Kantara','El Outaya','Foughala','Mechouneche','Ourlal','Sidi Okba','Tolga','Zeribet El Oued'],
    '08 — Béchar' => ['Abadla','Bechar','Beni Ounif','Kenadsa','Lahmar','Tabelbala','Taghit'],
    '09 — Blida' => ['Blida','Boufarik','Bougara','Bouinan','El Affroun','Larbaa','Meftah','Mouzaia','Oued El Alleug','Ouled Yaich'],
    '10 — Bouira' => ['Ain Bessem','Bechloul','Bir Ghbalou','Bordj Okhriss','Bouira','El Hachimia','Haizer','Kadiria','Lakhdaria','M\'Chedallah','Souk El Khemis','Sour El Ghozlane'],
    '11 — Tamanrasset' => ['Silet','Tamanrasset','Tazrouk'],
    '12 — Tébessa' => ['Bir El Ater','Bir Mokadem','Cheria','El Aouinet','El Kouif','El Malabiod','El Ogla','Morsott','Negrine','Ouenza','Oum Ali','Tebessa'],
    '13 — Tlemcen' => ['Ain Tellout','Bab El Assa','Beni Boussaid','Beni Snous','Bensekrane','Chetouane','Fellaoucene','Ghazaouet','Hennaya','Honnaine','Maghnia','Mansourah','Marsa Ben Mehdi','Nedroma','Ouled Mimoun','Remchi','Sabra','Sebdou','Sidi Djillali','Tlemcen'],
    '14 — Tiaret' => ['Ain Deheb','Ain Kermes','Dahmouni','Frenda','Hamadia','Ksar Chellala','Mahdia','Mechraa Sfa','Medroussa','Meghila','Oued Lili','Rahouia','Sougueur','Tiaret'],
    '15 — Tizi Ouzou' => ['Ain El Hammam','Azazga','Azeffoun','Beni Douala','Benni Yenni','Boghni','Bouzeguene','Draa Ben Khedda','Draa El Mizan','Iferhounene','Larbaa Nath Iraten','Maatkas','Makouda','Mekla','Ouacif','Ouadhias','Ouaguenoun','Tigzirt','Tizi Ouzou','Tizi Rached','Tizi-Ghenif'],
    '16 — Alger' => ['Bab El Oued','Baraki','Bir Mourad Rais','Birtouta','Bouzareah','Cheraga','Dar El Beida','Draria','El Harrach','Hussein Dey','Rouiba','Sidi M\'Hamed','Zeralda'],
    '17 — Djelfa' => ['Ain El Ibel','Ain Oussera','Birine','Charef','Dar Chioukh','Djelfa','El Idrissia','Faidh El Botma','Had Sahary','Hassi Bahbah','Messaad','Sidi Laadjel'],
    '18 — Jijel' => ['Chekfa','Djimla','El Ancer','El Aouana','El Milia','Jijel','Settara','Sidi Marouf','Taher','Texenna','Ziamah Mansouriah'],
    '19 — Sétif' => ['Ain Arnat','Ain Azel','Ain El Kebira','Ain Oulmene','Amoucha','Babor','Beni Aziz','Beni Ourtilane','Bir El Arch','Bouandas','Bougaa','Djemila','El Eulma','Guenzet','Guidjel','Hammam Guergour','Hammam Sokhna','Maoklane','Salah Bey','Setif'],
    '20 — Saïda' => ['Ain El Hadjar','El Hassasna','Ouled Brahim','Saida','Sidi Boubekeur','Youb'],
    '21 — Skikda' => ['Ain Kechra','Azzaba','Ben Azzouz','Collo','El Hadaiek','El Harrouch','Ouled Attia','Oum Toub','Ramdane Djamel','Sidi Mezghiche','Skikda','Tamalous','Zitouna'],
    '22 — Sidi Bel Abbès' => ['Ain El Berd','Ben Badis','Marhoum','Merine','Mostefa Ben Brahim','Moulay Slissen','Ras El Ma','Sfisef','Sidi Ali Ben Youb','Sidi Ali Boussidi','Sidi Bel Abbes','Sidi Lahcene','Telagh','Tenira','Tessala'],
    '23 — Annaba' => ['Ain El Berda','Annaba','Berrahal','Chetaibi','El Bouni','El Hadjar'],
    '24 — Guelma' => ['Ain Hessainia','Ain Makhlouf','Bouchegouf','Guelaat Bousbaa','Guelma','Hammam Debagh','Hammam N\'Bails','Heliopolis','Khezaras','Oued Zenati'],
    '25 — Constantine' => ['Ain Abid','Constantine','El Khroub','Hamma Bouziane','Ibn Ziad','Zighoud Youcef'],
    '26 — Médéa' => ['Ain Boucif','Aziz','Beni Slimane','Berrouaghia','Chahbounia','Chellalat El Adhaoura','El Azizia','El Omaria','Guelb El Kebir','Ksar El Boukhari','Medea','Ouamri','Ouled Antar','Ouzera','Seghouane','Si Mahdjoub','Sidi Naamane','Souaghi','Tablat'],
    '27 — Mostaganem' => ['Achaacha','Ain Nouicy','Ain Tedeles','Bouguirat','Hassi Mameche','Kheir Eddine','Mesra','Mostaganem','Sidi Ali','Sidi Lakhdar'],
    '28 — M\'Sila' => ['Ain El Hadjel','Ain El Melh','Ben Srour','Bousaada','Chellal','Djebel Messaad','Hammam Dalaa','Khoubana','M\'Sila','Magra','Medjedel','Ouled Derradj','Ouled Sidi Brahim','Sidi Aissa','Sidi Ameur'],
    '29 — Mascara' => ['Ain Fares','Ain Fekan','Aouf','Bouhanifia','El Bordj','Ghriss','Hachem','Mascara','Mohammadia','Oggaz','Oued El Abtal','Oued Taria','Sig','Tighennif','Tizi','Zahana'],
    '30 — Ouargla' => ['El Borma','Hassi Messaoud','N\'Goussa','Ouargla','Sidi Khouiled'],
    '31 — Oran' => ['Ain Turk','Arzew','Bethioua','Bir El Djir','Boutlelis','Es Senia','Gdyel','Oran','Oued Tlelat'],
    '32 — El Bayadh' => ['Boualem','Bougtoub','Boussemghoun','Brezina','Chellala','El Bayadh','Labiodh Sidi Cheikh','Rogassa'],
    '33 — Illizi' => ['Illizi','In Amenas'],
    '34 — Bordj Bou Arréridj' => ['Ain Taghrout','Bir Kasdali','Bordj Bou Arreridj','Bordj Ghedir','Bordj Zemmoura','Djaafra','El Hamadia','Mansourah','Medjana','Ras El Oued'],
    '35 — Boumerdès' => ['Baghlia','Bordj Menaiel','Boudouaou','Boumerdes','Dellys','Isser','Khemis El Khechna','Naciria','Thenia'],
    '36 — El Tarf' => ['Ben M\'Hidi','Besbes','Bouhadjar','Bouteldja','Drean','El Kala','El Tarf'],
    '37 — Tindouf' => ['Tindouf'],
    '38 — Tissemsilt' => ['Ammari','Bordj Bounaama','Bordj Emir Abdelkader','Khemisti','Lardjem','Lazharia','Theniet El Had','Tissemsilt'],
    '39 — El Oued' => ['Bayadha','Debila','El Oued','Guemar','Hassi Khalifa','Magrane','Mih Ouensa','Reguiba','Robbah','Taleb Larbi'],
    '40 — Khenchela' => ['Ain Touila','Babar','Bouhmama','Chechar','El Hamma','Kais','Khenchela','Ouled Rechache'],
    '41 — Souk Ahras' => ['Bir Bouhouche','Haddada','M\'Daourouche','Mechroha','Merahna','Ouled Driss','Oum El Adhaim','Sedrata','Souk Ahras','Taoura'],
    '42 — Tipaza' => ['Ahmar El Ain','Bou Ismail','Cherchell','Damous','Fouka','Gouraya','Hadjout','Kolea','Sidi Amar','Tipaza'],
    '43 — Mila' => ['Ain Beida Harriche','Bouhatem','Chelghoum Laid','Ferdjioua','Grarem Gouga','Mila','Oued Endja','Rouached','Sidi Merouane','Tadjenanet','Tassadane Haddada','Teleghma','Terrai Bainen'],
    '44 — Aïn Defla' => ['Ain Defla','Ain Lechiakh','Bathia','Bordj El Emir Khaled','Boumedfaa','Djelida','Djendel','El Abadia','El Amra','El Attaf','Hammam Righa','Khemis','Miliana','Rouina'],
    '45 — Naâma' => ['Ain Sefra','Asla','Mecheria','Mekmen Ben Amar','Moghrar','Naama','Sfissifa'],
    '46 — Aïn Témouchent' => ['Ain Kihel','Ain Larbaa','Ain Temouchent','Beni Saf','El Amria','El Maleh','Hammam Bou Hadjar','Oulhassa Gheraba'],
    '47 — Ghardaïa' => ['Berriane','Bounoura','Dhayet Ben Dhahoua','El Guerrara','Ghardaia','Mansourah','Metlili','Zelfana'],
    '48 — Relizane' => ['Ain Tarek','Ammi Moussa','Djidiouia','El H\'Madna','El Matmar','Mazouna','Mendes','Oued Rhiou','Ramka','Relizane','Sidi M\'Hamed Ben Ali','Yellel','Zemmoura'],
    '49 — Timimoun' => ['Aougrout','Charouine','Timimoun','Tinerkouk'],
    '50 — Bordj Badji Mokhtar' => ['Bordj Badji Mokhtar'],
    '51 — Ouled Djellal' => ['Ouled Djellal','Sidi Khaled'],
    '52 — Béni Abbès' => ['Beni Abbes','El Ouata','Igli','Kerzaz','Ouled Khodeir'],
    '53 — In Salah' => ['In Ghar','In Salah'],
    '54 — In Guezzam' => ['In Guezzam','Tin Zouatine'],
    '55 — Touggourt' => ['El-Hadjira','Megarine','Taibet','Temacine','Touggourt'],
    '56 — Djanet' => ['Djanet'],
    '57 — El M\'Ghair' => ['Djamaa','El Meghaier'],
    '58 — El Meniaa' => ['El Menia','Mansourah'],
];

function find_daira(string $wilayaName, string $dairaName): ?string
{
    global $DAIRAS;
    $list = $DAIRAS[$wilayaName] ?? [];
    return in_array($dairaName, $list, true) ? $dairaName : null;
}
