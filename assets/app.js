/* Sakura Shop — storefront behaviour: catalog, filters, cart, wishlist,
   account panel and checkout. Extracted from index.html.
   Loaded with `defer`, so it runs after the DOM is parsed. */

var P=[]; // loaded from /api/products.php at runtime
var DEMO_MODE=false; // true when api/products.php isn't reachable (e.g. static hosting) and we fell back to data/products-sample.json — login/checkout need a real backend and are disabled in this mode
function byId(id){for(var k=0;k<P.length;k++)if(P[k].id===id)return P[k];return null}

var TILES=[
 {i:'p5', b:"Pyjamas boutonnés", s:"Crêpe froissé",   c:"boutonne"},
 {i:'p12',b:"Satin",             s:"Col revers",       c:"satin"},
 {i:'p10',b:"Coton imprimé",     s:"Coupes amples",    c:"coton"},
 {i:'p20',b:"Nouvel arrivage",   s:"Cette semaine",    c:"all"}
];

var WIL=[
["01 — Adrar",1000,1300,120],["02 — Chlef",550,750,48],["03 — Laghouat",700,900,72],["04 — Oum El Bouaghi",700,900,72],
["05 — Batna",700,900,72],["06 — Béjaïa",600,800,48],["07 — Biskra",800,1000,72],["08 — Béchar",900,1100,96],
["09 — Blida",400,600,24],["10 — Bouira",450,650,24],["11 — Tamanrasset",1200,1600,144],["12 — Tébessa",700,900,72],
["13 — Tlemcen",600,800,48],["14 — Tiaret",600,800,48],["15 — Tizi Ouzou",450,650,24],["16 — Alger",400,600,24],
["17 — Djelfa",650,850,72],["18 — Jijel",600,800,48],["19 — Sétif",550,750,48],["20 — Saïda",650,850,48],
["21 — Skikda",600,800,72],["22 — Sidi Bel Abbès",600,800,48],["23 — Annaba",650,850,72],["24 — Guelma",650,850,72],
["25 — Constantine",600,800,48],["26 — Médéa",450,650,24],["27 — Mostaganem",550,750,48],["28 — M'Sila",650,850,72],
["29 — Mascara",600,800,48],["30 — Ouargla",1000,1300,120],["31 — Oran",550,750,48],["32 — El Bayadh",800,1000,96],
["33 — Illizi",1200,1600,144],["34 — Bordj Bou Arréridj",550,750,48],["35 — Boumerdès",450,650,24],["36 — El Tarf",650,850,72],
["37 — Tindouf",1200,1600,144],["38 — Tissemsilt",600,800,48],["39 — El Oued",800,1000,72],["40 — Khenchela",700,900,72],
["41 — Souk Ahras",700,900,72],["42 — Tipaza",450,650,24],["43 — Mila",600,800,48],["44 — Aïn Defla",450,650,24],
["45 — Naâma",800,1000,96],["46 — Aïn Témouchent",600,800,48],["47 — Ghardaïa",900,1200,120],["48 — Relizane",550,750,48],
["49 — Timimoun",1000,1300,120],["50 — Bordj Badji Mokhtar",1300,1700,144],["51 — Ouled Djellal",800,1000,72],
["52 — Béni Abbès",900,1100,96],["53 — In Salah",1200,1600,144],["54 — In Guezzam",1300,1700,144],
["55 — Touggourt",1000,1300,120],["56 — Djanet",1300,1700,144],["57 — El M'Ghair",950,1250,120],
["58 — El Meniaa",1000,1300,120]
];

/* daïras (districts) par wilaya — clé = même libellé que WIL[i][0] */
var DAIRA={
'01 — Adrar':['Adrar','Aoulef','Fenoughil','Reggane','Tsabit','Zaouiat Kounta'],
'02 — Chlef':['Abou El Hassane','Ain Merane','Beni Haoua','Boukadir','Chlef','El Karimia','El Marsa','Oued Fodda','Ouled Ben Abdelkader','Ouled Fares','Taougrit','Tenes','Zeboudja'],
'03 — Laghouat':['Aflou','Ain Madhi','Brida','El Ghicha','Gueltat Sidi Saad','Hassi R\'Mel','Ksar El Hirane','Laghouat','Oued Morra','Sidi Makhlouf'],
'04 — Oum El Bouaghi':['Ain Babouche','Ain Beida','Ain Fekroun','Ain Kercha','Ain M\'Lila','Dhalaa','F\'Kirina','Ksar Sbahi','Meskiana','Oum El Bouaghi','Sigus','Souk Naamane'],
'05 — Batna':['Ain Djasser','Ain Touta','Arris','Barika','Batna','Bouzina','Chemora','Djezzar','El Madher','Ichemoul','Menaa','Merouana','N\'Gaous','Ouled Si Slimane','Ras El Aioun','Seggana','Seriana','Tazoult','Theniet El Abed','Timgad','Tkout'],
'06 — Béjaïa':['Adekar','Akbou','Amizour','Aokas','Barbacha','Bejaia','Beni Maouche','Chemini','Darguina','El Kseur','Ifri Ouzellaguene','Ighil Ali','Kherrata','Seddouk','Sidi Aich','Souk El Tenine','Tazmalt','Tichy','Timezrit'],
'07 — Biskra':['Biskra','Djemorah','El Kantara','El Outaya','Foughala','Mechouneche','Ourlal','Sidi Okba','Tolga','Zeribet El Oued'],
'08 — Béchar':['Abadla','Bechar','Beni Ounif','Kenadsa','Lahmar','Tabelbala','Taghit'],
'09 — Blida':['Blida','Boufarik','Bougara','Bouinan','El Affroun','Larbaa','Meftah','Mouzaia','Oued El Alleug','Ouled Yaich'],
'10 — Bouira':['Ain Bessem','Bechloul','Bir Ghbalou','Bordj Okhriss','Bouira','El Hachimia','Haizer','Kadiria','Lakhdaria','M\'Chedallah','Souk El Khemis','Sour El Ghozlane'],
'11 — Tamanrasset':['Silet','Tamanrasset','Tazrouk'],
'12 — Tébessa':['Bir El Ater','Bir Mokadem','Cheria','El Aouinet','El Kouif','El Malabiod','El Ogla','Morsott','Negrine','Ouenza','Oum Ali','Tebessa'],
'13 — Tlemcen':['Ain Tellout','Bab El Assa','Beni Boussaid','Beni Snous','Bensekrane','Chetouane','Fellaoucene','Ghazaouet','Hennaya','Honnaine','Maghnia','Mansourah','Marsa Ben Mehdi','Nedroma','Ouled Mimoun','Remchi','Sabra','Sebdou','Sidi Djillali','Tlemcen'],
'14 — Tiaret':['Ain Deheb','Ain Kermes','Dahmouni','Frenda','Hamadia','Ksar Chellala','Mahdia','Mechraa Sfa','Medroussa','Meghila','Oued Lili','Rahouia','Sougueur','Tiaret'],
'15 — Tizi Ouzou':['Ain El Hammam','Azazga','Azeffoun','Beni Douala','Benni Yenni','Boghni','Bouzeguene','Draa Ben Khedda','Draa El Mizan','Iferhounene','Larbaa Nath Iraten','Maatkas','Makouda','Mekla','Ouacif','Ouadhias','Ouaguenoun','Tigzirt','Tizi Ouzou','Tizi Rached','Tizi-Ghenif'],
'16 — Alger':['Bab El Oued','Baraki','Bir Mourad Rais','Birtouta','Bouzareah','Cheraga','Dar El Beida','Draria','El Harrach','Hussein Dey','Rouiba','Sidi M\'Hamed','Zeralda'],
'17 — Djelfa':['Ain El Ibel','Ain Oussera','Birine','Charef','Dar Chioukh','Djelfa','El Idrissia','Faidh El Botma','Had Sahary','Hassi Bahbah','Messaad','Sidi Laadjel'],
'18 — Jijel':['Chekfa','Djimla','El Ancer','El Aouana','El Milia','Jijel','Settara','Sidi Marouf','Taher','Texenna','Ziamah Mansouriah'],
'19 — Sétif':['Ain Arnat','Ain Azel','Ain El Kebira','Ain Oulmene','Amoucha','Babor','Beni Aziz','Beni Ourtilane','Bir El Arch','Bouandas','Bougaa','Djemila','El Eulma','Guenzet','Guidjel','Hammam Guergour','Hammam Sokhna','Maoklane','Salah Bey','Setif'],
'20 — Saïda':['Ain El Hadjar','El Hassasna','Ouled Brahim','Saida','Sidi Boubekeur','Youb'],
'21 — Skikda':['Ain Kechra','Azzaba','Ben Azzouz','Collo','El Hadaiek','El Harrouch','Ouled Attia','Oum Toub','Ramdane Djamel','Sidi Mezghiche','Skikda','Tamalous','Zitouna'],
'22 — Sidi Bel Abbès':['Ain El Berd','Ben Badis','Marhoum','Merine','Mostefa Ben Brahim','Moulay Slissen','Ras El Ma','Sfisef','Sidi Ali Ben Youb','Sidi Ali Boussidi','Sidi Bel Abbes','Sidi Lahcene','Telagh','Tenira','Tessala'],
'23 — Annaba':['Ain El Berda','Annaba','Berrahal','Chetaibi','El Bouni','El Hadjar'],
'24 — Guelma':['Ain Hessainia','Ain Makhlouf','Bouchegouf','Guelaat Bousbaa','Guelma','Hammam Debagh','Hammam N\'Bails','Heliopolis','Khezaras','Oued Zenati'],
'25 — Constantine':['Ain Abid','Constantine','El Khroub','Hamma Bouziane','Ibn Ziad','Zighoud Youcef'],
'26 — Médéa':['Ain Boucif','Aziz','Beni Slimane','Berrouaghia','Chahbounia','Chellalat El Adhaoura','El Azizia','El Omaria','Guelb El Kebir','Ksar El Boukhari','Medea','Ouamri','Ouled Antar','Ouzera','Seghouane','Si Mahdjoub','Sidi Naamane','Souaghi','Tablat'],
'27 — Mostaganem':['Achaacha','Ain Nouicy','Ain Tedeles','Bouguirat','Hassi Mameche','Kheir Eddine','Mesra','Mostaganem','Sidi Ali','Sidi Lakhdar'],
'28 — M\'Sila':['Ain El Hadjel','Ain El Melh','Ben Srour','Bousaada','Chellal','Djebel Messaad','Hammam Dalaa','Khoubana','M\'Sila','Magra','Medjedel','Ouled Derradj','Ouled Sidi Brahim','Sidi Aissa','Sidi Ameur'],
'29 — Mascara':['Ain Fares','Ain Fekan','Aouf','Bouhanifia','El Bordj','Ghriss','Hachem','Mascara','Mohammadia','Oggaz','Oued El Abtal','Oued Taria','Sig','Tighennif','Tizi','Zahana'],
'30 — Ouargla':['El Borma','Hassi Messaoud','N\'Goussa','Ouargla','Sidi Khouiled'],
'31 — Oran':['Ain Turk','Arzew','Bethioua','Bir El Djir','Boutlelis','Es Senia','Gdyel','Oran','Oued Tlelat'],
'32 — El Bayadh':['Boualem','Bougtoub','Boussemghoun','Brezina','Chellala','El Bayadh','Labiodh Sidi Cheikh','Rogassa'],
'33 — Illizi':['Illizi','In Amenas'],
'34 — Bordj Bou Arréridj':['Ain Taghrout','Bir Kasdali','Bordj Bou Arreridj','Bordj Ghedir','Bordj Zemmoura','Djaafra','El Hamadia','Mansourah','Medjana','Ras El Oued'],
'35 — Boumerdès':['Baghlia','Bordj Menaiel','Boudouaou','Boumerdes','Dellys','Isser','Khemis El Khechna','Naciria','Thenia'],
'36 — El Tarf':['Ben M\'Hidi','Besbes','Bouhadjar','Bouteldja','Drean','El Kala','El Tarf'],
'37 — Tindouf':['Tindouf'],
'38 — Tissemsilt':['Ammari','Bordj Bounaama','Bordj Emir Abdelkader','Khemisti','Lardjem','Lazharia','Theniet El Had','Tissemsilt'],
'39 — El Oued':['Bayadha','Debila','El Oued','Guemar','Hassi Khalifa','Magrane','Mih Ouensa','Reguiba','Robbah','Taleb Larbi'],
'40 — Khenchela':['Ain Touila','Babar','Bouhmama','Chechar','El Hamma','Kais','Khenchela','Ouled Rechache'],
'41 — Souk Ahras':['Bir Bouhouche','Haddada','M\'Daourouche','Mechroha','Merahna','Ouled Driss','Oum El Adhaim','Sedrata','Souk Ahras','Taoura'],
'42 — Tipaza':['Ahmar El Ain','Bou Ismail','Cherchell','Damous','Fouka','Gouraya','Hadjout','Kolea','Sidi Amar','Tipaza'],
'43 — Mila':['Ain Beida Harriche','Bouhatem','Chelghoum Laid','Ferdjioua','Grarem Gouga','Mila','Oued Endja','Rouached','Sidi Merouane','Tadjenanet','Tassadane Haddada','Teleghma','Terrai Bainen'],
'44 — Aïn Defla':['Ain Defla','Ain Lechiakh','Bathia','Bordj El Emir Khaled','Boumedfaa','Djelida','Djendel','El Abadia','El Amra','El Attaf','Hammam Righa','Khemis','Miliana','Rouina'],
'45 — Naâma':['Ain Sefra','Asla','Mecheria','Mekmen Ben Amar','Moghrar','Naama','Sfissifa'],
'46 — Aïn Témouchent':['Ain Kihel','Ain Larbaa','Ain Temouchent','Beni Saf','El Amria','El Maleh','Hammam Bou Hadjar','Oulhassa Gheraba'],
'47 — Ghardaïa':['Berriane','Bounoura','Dhayet Ben Dhahoua','El Guerrara','Ghardaia','Mansourah','Metlili','Zelfana'],
'48 — Relizane':['Ain Tarek','Ammi Moussa','Djidiouia','El H\'Madna','El Matmar','Mazouna','Mendes','Oued Rhiou','Ramka','Relizane','Sidi M\'Hamed Ben Ali','Yellel','Zemmoura'],
'49 — Timimoun':['Aougrout','Charouine','Timimoun','Tinerkouk'],
'50 — Bordj Badji Mokhtar':['Bordj Badji Mokhtar'],
'51 — Ouled Djellal':['Ouled Djellal','Sidi Khaled'],
'52 — Béni Abbès':['Beni Abbes','El Ouata','Igli','Kerzaz','Ouled Khodeir'],
'53 — In Salah':['In Ghar','In Salah'],
'54 — In Guezzam':['In Guezzam','Tin Zouatine'],
'55 — Touggourt':['El-Hadjira','Megarine','Taibet','Temacine','Touggourt'],
'56 — Djanet':['Djanet'],
'57 — El M\'Ghair':['Djamaa','El Meghaier'],
'58 — El Meniaa':['El Menia','Mansourah'],
};

function fmt(n){return n.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g,' ')+' DA'}
function stars(r){var s='';for(var k=1;k<=5;k++)s+=(k<=Math.round(r)?'★':'☆');return s}

document.getElementById('heroImg').src='uploads/products/p17.jpg';

/* reveal au scroll */
var revObs='IntersectionObserver' in window?new IntersectionObserver(function(es){
  es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');revObs.unobserve(e.target)}})
},{threshold:.12}):null;
document.querySelectorAll('.reveal').forEach(function(el){if(revObs)revObs.observe(el);else el.classList.add('vis')});

/* tuiles — pointent vers les catégories de la boutique */
document.getElementById('tiles').innerHTML=TILES.map(function(t){
  return '<a class="tile" href="#boutique" data-tc="'+t.c+'" aria-label="'+t.b+'"><img src="uploads/products/'+t.i+'.jpg" alt="'+t.b+'"><span class="lbl"><b>'+t.b+'</b><span>'+t.s+'</span></span></a>';
}).join('');
document.getElementById('tiles').querySelectorAll('.tile').forEach(function(t){
  t.addEventListener('click',function(e){e.preventDefault();setFiltre(t.dataset.tc)});
});

/* cartes */
function card(p,idx){
  var off=Math.max(0,Math.round((1-p.p/p.o)*100)),
      extra=p.tag==='new'?'<span class="tag new">Nouveau</span>':(p.tag==='low'?'<span class="tag low">Stock limité</span>':''),
      opts='<option value="">Choisir la taille</option>'+p.sz.map(function(t){return '<option value="'+t+'"'+(p.out.indexOf(t)>-1?' disabled':'')+'>'+t+(p.out.indexOf(t)>-1?' — épuisé':'')+'</option>'}).join('');
  return '<article class="card" data-i="'+idx+'" data-c="'+p.c+'" data-n="'+(p.n+' '+p.m).toLowerCase()+'" data-off="'+off+'">'
   +'<div class="ph"><img src="'+p.img+'" alt="'+p.n+'" loading="lazy">'
   +'<div class="tags">'+(off>0?'<span class="tag off">−'+off+'%</span>':'')+extra+'</div>'
   +'<button class="wish" aria-label="Favori"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8-5-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 11c0 5-8 10-8 10Z"/></svg></button>'
   +'</div>'
   +'<div class="info"><div class="meta-row"><span class="mat">'+p.m+'</span><div class="rate"><span class="st">'+stars(p.r)+'</span></div></div>'
   +'<h3>'+p.n+'</h3>'
   +'<div class="price-row"><span class="now">'+fmt(p.p)+'</span>'+(p.o>p.p?'<span class="was">'+fmt(p.o)+'</span>':'')+'</div>'
   +'<div class="product-action"><select class="size-select" aria-label="Choisir la taille pour '+p.n+'">'+opts+'</select><button class="cart-btn" aria-label="Ajouter '+p.n+' au panier">Ajouter</button></div>'
   +'</div></article>';
}

var grid=document.getElementById('grid'),full=false,sortMode='def';
function hasFiltre(){return curS!=='all'||q.value.trim()!==''}
function paint(){
  var list=P.slice();
  if(sortMode==='prix-asc')list.sort(function(a,b){return a.p-b.p});
  else if(sortMode==='prix-desc')list.sort(function(a,b){return b.p-a.p});
  else if(sortMode==='note')list.sort(function(a,b){return b.r-a.r});
  grid.innerHTML=list.map(function(p){return card(p,p.id)}).join('');
  bind();rafraichir();
}
/* 8 cartes par défaut + filtres (catégorie, promo, recherche) */
function rafraichir(){
  var t=q.value.trim().toLowerCase(),shown=0,lim=!full&&!hasFiltre();
  grid.querySelectorAll('.card').forEach(function(el,i){
    var okS=curS==='all'||(curS==='promo'?+el.dataset.off>=20:el.dataset.c===curS),
        okQ=!t||el.dataset.n.indexOf(t)>-1,
        ok=okS&&okQ&&!(lim&&i>=12);
    el.classList.toggle('hide',!ok);if(ok)shown++;
  });
  var old=grid.querySelector('.noresult');if(old)old.remove();
  var countEl=document.getElementById('productCount');
  if(countEl)countEl.textContent=shown;
  if(!shown){var d=document.createElement('p');d.className='noresult';d.textContent='Aucun modèle ne correspond.';grid.appendChild(d)}
}
document.getElementById('sort').addEventListener('change',function(){sortMode=this.value;paint()});

/* stockage local */
function loadLS(k){try{var v=JSON.parse(localStorage.getItem(k));return Array.isArray(v)?v:[]}catch(e){return []}}
function saveLS(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}

/* favoris persistés */
var wish=loadLS('sakura_wish');
var wishCount=document.getElementById('wishCount');
function paintWish(){
  wishCount.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8-5-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 11c0 5-8 10-8 10Z"/></svg> '+wish.length+' favori'+(wish.length>1?'s':'');
  var wl=document.getElementById('wishList');
  wl.innerHTML=wish.length?'<ul class="wp-list">'+wish.map(function(id){
    var p=byId(id);
    if(!p)return '';
    return '<li class="wp-row"><div><div class="wp-name">'+p.n+'</div><div class="wp-price">'+fmt(p.p)+'</div></div>'
      +'<div style="display:flex;align-items:center;gap:8px"><button class="wp-cmd" data-wi="'+id+'">Voir</button>'
      +'<button class="wp-del" data-wi="'+id+'" aria-label="Retirer">×</button></div></li>';
  }).join('')+'</ul>':'<p class="wp-empty">Aucun favori pour l’instant. Cochez le cœur d’un modèle.</p>';
  wl.querySelectorAll('.wp-cmd').forEach(function(b){b.addEventListener('click',function(){
    var p=byId(+b.dataset.wi);if(p)open_(p);
    wishPanel.classList.remove('on');
  })});
  wl.querySelectorAll('.wp-del').forEach(function(b){b.addEventListener('click',function(e){
    e.stopPropagation();
    var id=+b.dataset.wi;
    wish=wish.filter(function(x){return x!==id});
    grid.querySelectorAll('.card').forEach(function(el){if(+el.dataset.i===id)el.querySelector('.wish').classList.remove('on')});
    paintWish();
  })});
  saveLS('sakura_wish',wish);
}
document.getElementById('more').addEventListener('click',function(){
  full=!full;this.textContent=full?'Afficher moins':'Afficher tous les modèles';rafraichir();
});
var shopAllTop=document.getElementById('shopAllTop');
if(shopAllTop)shopAllTop.addEventListener('click',function(e){e.preventDefault();full=true;document.getElementById('more').textContent='Afficher moins';rafraichir();});

/* filtres */
var q=document.getElementById('q'),chips=document.querySelectorAll('.chip'),curS='all';
function setFiltre(s){
  curS=s;
  chips.forEach(function(x){x.setAttribute('aria-pressed',x.dataset.s===curS)});
  document.getElementById('boutique').scrollIntoView({behavior:'smooth',block:'start'});
  paint();
}
chips.forEach(function(c){c.addEventListener('click',function(){setFiltre(c.dataset.s)})});
q.addEventListener('input',rafraichir);
document.getElementById('searchForm').addEventListener('submit',function(e){e.preventDefault();rafraichir();});

/* livraison (estimation informative, indépendante du panier) */
var wil=document.getElementById('wil');
WIL.forEach(function(w){wil.add(new Option(w[0],w[1]+'|'+w[2]+'|'+w[3]))});
var sB=document.getElementById('sB'),sD=document.getElementById('sD'),dom=false;
function delai(h){return h<=24?'24 h':h<=48?'24 – 48 h':h<=72?'48 – 72 h':h<=120?'3 – 5 jours':'5 – 7 jours'}
function majLiv(){
  var v=wil.value.split('|');
  document.getElementById('fee').textContent=fmt(+(dom?v[1]:v[0]));
  document.getElementById('del').textContent=delai(+v[2]);
  sB.setAttribute('aria-pressed',String(!dom));sD.setAttribute('aria-pressed',String(dom));
}
wil.addEventListener('change',majLiv);
sB.addEventListener('click',function(){dom=false;majLiv()});
sD.addEventListener('click',function(){dom=true;majLiv()});
majLiv();

/* modal produit : choisir taille/quantité puis ajouter au panier */
var modal=document.getElementById('modal'),scrim=document.getElementById('scrim'),cur=null,
    mS=document.getElementById('mS'),mQ=document.getElementById('mQ');
function recap(){
  if(!cur)return;
  var qte=+mQ.value;
  document.getElementById('rA').textContent='Article ×'+qte;
  document.getElementById('rAV').textContent=fmt(cur.p*qte);
}
mQ.addEventListener('change',recap);
function open_(p){
  cur=p;
  document.getElementById('mT').textContent=p.n;
  var im=document.getElementById('mI');im.src=p.img;im.alt=p.n;
  document.getElementById('mN').textContent=fmt(p.p);
  document.getElementById('mW').textContent=fmt(p.o);
  document.getElementById('mDesc').textContent=p.d||'';
  mS.innerHTML=p.sz.map(function(t,k){return '<option'+(k===1?' selected':'')+'>'+t+'</option>'}).join('');
  if(!mQ.children.length){var qt='';for(var qn=1;qn<=10;qn++)qt+='<option'+(qn===1?' selected':'')+'>'+qn+'</option>';mQ.innerHTML=qt;}
  recap();modal.classList.add('on');scrim.classList.add('on');
}
function close_(){modal.classList.remove('on');scrim.classList.remove('on')}
document.getElementById('mX').addEventListener('click',close_);
scrim.addEventListener('click',close_);
document.addEventListener('keydown',function(e){if(e.key==='Escape'){close_();closeAuth()}});
document.getElementById('ok').addEventListener('click',function(){
  addToBag(cur.id,mS.value,+mQ.value);
  showToast('Ajouté au panier','« '+cur.n+' » · Taille '+mS.value);
  close_();
});

/* panier réel, persisté (id produit + taille + quantité) */
var SHOP_WHATSAPP='213560000000'; // placeholder shop number — replace with the real WhatsApp line before launch
var bag=loadLS('sakura_bag').filter(function(o){return o&&o.id&&o.size&&o.qty});
var cC=document.getElementById('cCount'),cT=document.getElementById('cTotal'),bagList=document.getElementById('bagList');
function bagSum(){return bag.reduce(function(s,o){var p=byId(o.id);return s+(p?p.p*o.qty:0)},0)}
function findBagLine(id,size){for(var k=0;k<bag.length;k++)if(bag[k].id===id&&bag[k].size===size)return bag[k];return null}
function addToBag(id,size,qty){
  var line=findBagLine(id,size);
  if(line)line.qty+=qty;else bag.push({id:id,size:size,qty:qty});
  renderBag();
}
function renderBag(){
  bag=bag.filter(function(o){return !!byId(o.id)});
  saveLS('sakura_bag',bag);
  cC.textContent=bag.reduce(function(s,o){return s+o.qty},0);
  cT.textContent=fmt(bagSum());
  var mobileCount=document.getElementById('mobileCartCount');if(mobileCount)mobileCount.textContent=bag.reduce(function(s,o){return s+o.qty},0);
  bagList.innerHTML=bag.length?'<ul class="bp-list">'+bag.map(function(o,idx){
    var p=byId(o.id);
    var szOpts=p.sz.map(function(s){return '<option'+(s===o.size?' selected':'')+(p.out.indexOf(s)>-1?' disabled':'')+'>'+s+'</option>'}).join('');
    var qOpts=[1,2,3,4,5,6,7,8,9,10].map(function(n){return '<option'+(n===o.qty?' selected':'')+'>'+n+'</option>'}).join('');
    return '<li class="bp-row"><img src="'+p.img+'" alt="'+p.n+'" style="width:46px;height:46px;border-radius:var(--r-sm);object-fit:cover;flex:none">'
      +'<div style="flex:1;min-width:0"><div class="bp-name">'+p.n+'</div>'
      +'<div class="bp-ref">'+o.size+' × '+o.qty+'</div>'
      +'<div class="bp-edit-row" id="er-'+idx+'">'
        +'<select class="er-sz">'+szOpts+'</select>'
        +'<select class="er-qt">'+qOpts+'</select>'
        +'<div style="display:flex;gap:4px"><button class="bp-edit-ok" data-bi="'+idx+'">✓</button>'
        +'<button class="bp-edit-no" data-bi="'+idx+'">✗</button></div>'
      +'</div></div>'
      +'<div style="text-align:right;flex:none;white-space:nowrap;display:flex;flex-direction:column;align-items:flex-end;gap:4px"><b>'+fmt(p.p*o.qty)+'</b>'
      +'<div class="bp-btns"><button class="bp-edit" data-bi="'+idx+'" aria-label="Modifier"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>'
      +'<button class="bp-del" data-bi="'+idx+'" aria-label="Retirer du panier">×</button></div></div></li>';
  }).join('')+'</ul>':'<p class="bp-empty">Votre panier est vide.</p>';
  bagList.querySelectorAll('.bp-del').forEach(function(b){
    b.addEventListener('click',function(e){e.stopPropagation();bag.splice(+b.dataset.bi,1);renderBag()});
  });
  bagList.querySelectorAll('.bp-edit').forEach(function(b){
    b.addEventListener('click',function(e){
      e.stopPropagation();
      var row=bagList.querySelector('#er-'+b.dataset.bi);
      bagList.querySelectorAll('.bp-edit-row').forEach(function(r){if(r!==row)r.classList.remove('on')});
      row.classList.toggle('on');
    });
  });
  bagList.querySelectorAll('.bp-edit-no').forEach(function(b){
    b.addEventListener('click',function(e){e.stopPropagation();bagList.querySelector('#er-'+b.dataset.bi).classList.remove('on')});
  });
  bagList.querySelectorAll('.bp-edit-ok').forEach(function(b){
    b.addEventListener('click',function(e){
      e.stopPropagation();
      var idx=+b.dataset.bi,row=bagList.querySelector('#er-'+idx);
      bag[idx].size=row.querySelector('.er-sz').value;
      bag[idx].qty=+row.querySelector('.er-qt').value;
      renderBag();
    });
  });
  updateCartTotals();
}

/* pied du panier : wilaya, livraison, coordonnées, confirmation */
document.getElementById('bagCheckout').innerHTML=
   '<div class="fl full"><label for="cWil">Wilaya</label><select id="cWil"></select></div>'
  +'<div class="fl full" style="margin-top:8px"><label for="cDaira">Daïra</label><select id="cDaira"></select></div>'
  +'<div class="fl full" style="margin-top:8px"><label>Livraison</label><div class="seg"><button type="button" id="cB" aria-pressed="true">Bureau</button><button type="button" id="cD" aria-pressed="false">Domicile</button></div></div>'
  +'<div class="fl full" id="cAddrWrap" style="display:none;margin-top:8px"><label for="cAddr">Adresse de livraison</label><input id="cAddr" type="text" placeholder="Rue, quartier, ville…"></div>'
  +'<div class="shipping-goal" id="shippingGoal" aria-live="polite">'
    +'<div class="shipping-goal-head"><span id="shippingGoalText">Livraison offerte dès 12 000 DA</span><b id="shippingGoalAmount"></b></div>'
    +'<div class="shipping-track"><span id="shippingGoalFill"></span></div>'
  +'</div>'
  +'<div class="recap" style="margin-top:12px">'
    +'<div class="rl"><span>Sous-total</span><span id="cSub">0 DA</span></div>'
    +'<div class="rl"><span>Livraison</span><span id="cLiv">0 DA</span></div>'
    +'<div class="rl tot"><span>Total</span><span id="cTot">0 DA</span></div>'
  +'</div>'
  +'<div class="fl full" style="margin-top:10px"><label for="cNom">Nom complet</label><input id="cNom" type="text" placeholder="Votre nom"></div>'
  +'<div class="fl full" style="margin-top:8px"><label for="cTel">Téléphone</label><input id="cTel" type="tel" placeholder="0X XX XX XX XX"></div>'
  +'<button class="ok" id="cartOk" style="margin-top:12px">Confirmer la commande</button>'
  +'<p class="cod">Paiement à la livraison · vous payez au livreur</p>';
var cWil=document.getElementById('cWil'),cDaira=document.getElementById('cDaira'),cB=document.getElementById('cB'),cD=document.getElementById('cD'),cDom=false,
    cAddrWrap=document.getElementById('cAddrWrap'),cAddr=document.getElementById('cAddr');
WIL.forEach(function(w){cWil.add(new Option(w[0],w[1]+'|'+w[2]))});
function populateDaira(){
  var name=cWil.options[cWil.selectedIndex]?cWil.options[cWil.selectedIndex].text:'',prev=cDaira.value;
  cDaira.innerHTML='';
  (DAIRA[name]||[]).forEach(function(d){cDaira.add(new Option(d,d))});
  if(prev)cDaira.value=prev;
}
populateDaira();
function updateCartTotals(){
  var sum=bagSum(),v=cWil.value?cWil.value.split('|'):[0,0],fee=+(cDom?v[1]:v[0])||0,free=sum>=12000,liv=free?0:fee;
  document.getElementById('cSub').textContent=fmt(sum);
  document.getElementById('cLiv').textContent=free?'Offerte':fmt(fee);
  document.getElementById('cTot').textContent=fmt(sum+liv);
  var goalFill=document.getElementById('shippingGoalFill'),goalText=document.getElementById('shippingGoalText'),goalAmt=document.getElementById('shippingGoalAmount');
  if(goalFill&&goalText&&goalAmt){
    var progress=Math.min(100,Math.round((sum/12000)*100));
    goalFill.style.width=progress+'%';
    if(sum>=12000){goalText.textContent='🎉 Livraison offerte !';goalAmt.textContent='';goalFill.style.width='100%';}
    else if(sum>0){var remain=12000-sum;goalText.textContent='Plus que '+fmt(remain)+' pour la livraison offerte';goalAmt.textContent=progress+'%';}
    else{goalText.textContent='Livraison offerte dès 12 000 DA';goalAmt.textContent='0%';}
  }
  cAddrWrap.style.display=cDom?'':'none';
  var mobileCount=document.getElementById('mobileCartCount');if(mobileCount)mobileCount.textContent=bag.reduce(function(s,o){return s+o.qty},0);
}
cWil.addEventListener('change',function(){populateDaira();updateCartTotals()});
cB.addEventListener('click',function(){cDom=false;cB.setAttribute('aria-pressed','true');cD.setAttribute('aria-pressed','false');updateCartTotals()});
cD.addEventListener('click',function(){cDom=true;cD.setAttribute('aria-pressed','true');cB.setAttribute('aria-pressed','false');updateCartTotals()});
document.getElementById('cartOk').addEventListener('click',function(){
  var nom=document.getElementById('cNom'),tel=document.getElementById('cTel'),btn=this;
  if(!bag.length)return;
  if(DEMO_MODE){showToast('Mode démo','Impossible d\'envoyer une commande sans serveur backend');return}
  if(!nom.value.trim()){nom.focus();nom.style.borderColor='var(--sale)';return}
  if(tel.value.replace(/\D/g,'').length<9){tel.focus();tel.style.borderColor='var(--sale)';return}
  if(!cWil.value){showToast('Wilaya requise','Choisissez votre wilaya avant de confirmer');return}
  if(!cDaira.value){showToast('Daïra requise','Choisissez votre daïra avant de confirmer');return}
  if(cDom&&!cAddr.value.trim()){cAddr.focus();cAddr.style.borderColor='var(--sale)';return}
  var wilName=cWil.options[cWil.selectedIndex].text,dairaName=cDaira.value;
  var items=bag.map(function(o){return {id:o.id,size:o.size,qty:o.qty}});
  btn.disabled=true;btn.textContent='Envoi en cours…';
  fetch('api/orders.php',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      customer_name:nom.value.trim(),
      customer_phone:tel.value.trim(),
      wilaya_name:wilName,
      daira_name:dairaName,
      delivery_type:cDom?'domicile':'bureau',
      delivery_address:cDom?cAddr.value.trim():'',
      items:items
    })
  }).then(function(r){return r.json().then(function(data){return {ok:r.ok,data:data}})})
  .then(function(res){
    btn.disabled=false;btn.textContent='Confirmer la commande';
    if(!res.ok)throw new Error(res.data.error||'Erreur lors de la commande');
    var order=res.data.order;
    var lines=bag.map(function(o){var p=byId(o.id);return (p?p.n:'?')+' — Taille '+o.size+' × '+o.qty});
    var msg=['Nouvelle commande — Sakura Shop','Référence : #'+order.id,''].concat(lines,[
      '','Sous-total : '+fmt(order.subtotal),
      'Livraison ('+(cDom?'Domicile':'Bureau')+' — '+wilName+', '+dairaName+') : '+(order.delivery_fee?fmt(order.delivery_fee):'Offerte'),
      'Total : '+fmt(order.total),''
    ],cDom?['Adresse : '+cAddr.value.trim()]:[],[
      'Client : '+nom.value.trim(),'Téléphone : '+tel.value.trim()
    ]).join('\n');
    window.open('https://wa.me/'+SHOP_WHATSAPP+'?text='+encodeURIComponent(msg),'_blank');
    showToast('Commande enregistrée','Réf. #'+order.id+' · '+fmt(order.total));
    bag=[];renderBag();
    nom.value='';tel.value='';cAddr.value='';nom.style.borderColor='';tel.style.borderColor='';cAddr.style.borderColor='';
    bagPanel.classList.remove('on');bagBtn.setAttribute('aria-expanded','false');
  })
  .catch(function(err){
    btn.disabled=false;btn.textContent='Confirmer la commande';
    showToast('Erreur',err.message);
  });
});
// renderBag() runs once products have loaded from the API (see bottom of file) —
// calling it before P is populated would wipe a saved cart (byId() would find nothing).

function showToast(t,s){
  var to=document.getElementById('toast');
  document.getElementById('toastT').textContent=t;
  document.getElementById('toastS').textContent=s;
  to.classList.add('on');
  setTimeout(function(){to.classList.remove('on')},2600);
}

function bind(){
  grid.querySelectorAll('.card').forEach(function(el){
    var id=+el.dataset.i,p=byId(id),ph=el.querySelector('.ph');
    var wh=el.querySelector('.wish'),sizeSel=el.querySelector('.size-select');
    if(wish.indexOf(id)>-1)wh.classList.add('on');
    ph.addEventListener('click',function(e){if(!e.target.closest('button'))open_(p)});
    sizeSel.addEventListener('click',function(e){e.stopPropagation()});
    sizeSel.addEventListener('change',function(){this.classList.toggle('chosen',!!this.value)});
    el.querySelector('.cart-btn').addEventListener('click',function(e){
      e.stopPropagation();
      var size=sizeSel.value;
      if(!size){sizeSel.classList.add('needs-size');sizeSel.focus();showToast('Choisissez une taille','Sélectionnez votre taille avant d’ajouter');return}
      addToBag(p.id,size,1);
      showToast('Ajouté au panier','« '+p.n+' » · Taille '+size);
    });
    wh.addEventListener('click',function(e){
      e.stopPropagation();
      var on=this.classList.toggle('on');
      if(on){if(wish.indexOf(id)<0)wish.push(id)}else{wish=wish.filter(function(x){return x!==id})}
      paintWish();
    });
  });
}
var bagBtn=document.getElementById('bagBtn'),bagPanel=document.getElementById('bagPanel');
bagBtn.addEventListener('click',function(e){
  e.stopPropagation();
  var open=bagPanel.classList.toggle('on');
  bagBtn.setAttribute('aria-expanded',String(open));
  acctPanel.classList.remove('on');
});
document.addEventListener('click',function(e){
  if(!e.target.closest('.bagwrap')){bagPanel.classList.remove('on');bagBtn.setAttribute('aria-expanded','false')}
  if(!e.target.closest('.wish-wrap'))wishPanel.classList.remove('on');
  if(!e.target.closest('.acctwrap')){acctPanel.classList.remove('on');acctBtn.setAttribute('aria-expanded','false')}
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    bagPanel.classList.remove('on');bagBtn.setAttribute('aria-expanded','false');
    wishPanel.classList.remove('on');
    acctPanel.classList.remove('on');acctBtn.setAttribute('aria-expanded','false');
  }
});
document.getElementById('up').addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});

/* panneau favoris */
var wishPanel=document.getElementById('wishPanel');
wishCount.addEventListener('click',function(e){e.stopPropagation();wishPanel.classList.toggle('on')});

// navigation mobile
document.querySelectorAll('[data-mobile]').forEach(function(a){
  a.addEventListener('click',function(e){
    var type=a.getAttribute('data-mobile');
    if(type==='cart'){
      e.preventDefault();
      bagPanel.classList.add('on');
      bagBtn.setAttribute('aria-expanded','true');
      return;
    }
    if(type==='home'){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}
  });
});

/* ---------- compte : connexion / inscription / mes commandes ---------- */
var authUser=null;
var acctBtn=document.getElementById('acctBtn'),acctLabel=document.getElementById('acctLabel'),
    acctPanel=document.getElementById('acctPanel'),acctBody=document.getElementById('acctBody');
var authModal=document.getElementById('authModal'),authScrim=document.getElementById('authScrim'),
    authMode='login',authErr=document.getElementById('authErr'),authSubmit=document.getElementById('authSubmit'),
    tabLogin=document.getElementById('tabLogin'),tabRegister=document.getElementById('tabRegister');

function setAuthMode(mode){
  authMode=mode;
  authErr.style.display='none';
  document.getElementById('authFormLogin').style.display=mode==='login'?'grid':'none';
  document.getElementById('authFormRegister').style.display=mode==='register'?'grid':'none';
  authSubmit.textContent=mode==='login'?'Se connecter':'Créer mon compte';
  tabLogin.classList.toggle('on',mode==='login');
  tabRegister.classList.toggle('on',mode==='register');
}
tabLogin.addEventListener('click',function(){setAuthMode('login')});
tabRegister.addEventListener('click',function(){setAuthMode('register')});
function openAuth(mode){setAuthMode(mode||'login');authModal.classList.add('on');authScrim.classList.add('on')}
function closeAuth(){authModal.classList.remove('on');authScrim.classList.remove('on')}
document.getElementById('authX').addEventListener('click',closeAuth);
authScrim.addEventListener('click',closeAuth);

function updateAcctUI(){
  acctBtn.classList.toggle('on',!!authUser);
  acctLabel.textContent=authUser?authUser.name.split(' ')[0]:'Connexion';
}

authSubmit.addEventListener('click',function(){
  authErr.style.display='none';
  if(DEMO_MODE){authErr.textContent='Compte indisponible en mode démo (pas de serveur backend)';authErr.style.display='block';return}
  var payload,url;
  if(authMode==='login'){
    url='api/login.php';
    payload={email:document.getElementById('loEmail').value.trim(),password:document.getElementById('loPass').value};
  }else{
    url='api/register.php';
    payload={
      name:document.getElementById('reName').value.trim(),
      email:document.getElementById('reEmail').value.trim(),
      phone:document.getElementById('rePhone').value.trim(),
      password:document.getElementById('rePass').value
    };
  }
  if(!payload.email||!payload.password){authErr.textContent='Merci de remplir tous les champs requis';authErr.style.display='block';return}
  authSubmit.disabled=true;
  authSubmit.textContent=authMode==='login'?'Connexion…':'Création du compte…';
  fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
    .then(function(r){return r.json().then(function(data){return {ok:r.ok,data:data}})})
    .then(function(res){
      authSubmit.disabled=false;
      authSubmit.textContent=authMode==='login'?'Se connecter':'Créer mon compte';
      if(!res.ok){authErr.textContent=res.data.error||'Erreur';authErr.style.display='block';return}
      authUser=res.data.user;updateAcctUI();closeAuth();
      showToast('Bienvenue','Bonjour '+authUser.name.split(' ')[0]+' !');
    })
    .catch(function(){
      authSubmit.disabled=false;
      authSubmit.textContent=authMode==='login'?'Se connecter':'Créer mon compte';
      authErr.textContent='Connexion au serveur impossible';authErr.style.display='block';
    });
});

function renderAcctPanel(){
  if(!authUser){
    acctBody.innerHTML='<div class="acct-prompt"><p>Connectez-vous pour suivre vos commandes.</p><button class="ok" id="acctLoginBtn" style="margin:0">Se connecter</button></div>';
    document.getElementById('acctLoginBtn').addEventListener('click',function(){acctPanel.classList.remove('on');openAuth('login')});
    return;
  }
  acctBody.innerHTML='<div class="acct-head"><b>'+authUser.name+'</b><span>'+authUser.email+'</span></div><div id="acctOrders">Chargement…</div>'
    +'<button class="ok" id="acctLogout" style="margin-top:12px;background:none;border:1px solid var(--line);color:var(--ink)">Déconnexion</button>';
  document.getElementById('acctLogout').addEventListener('click',function(){
    fetch('api/logout.php',{method:'POST'}).then(function(){
      authUser=null;updateAcctUI();acctPanel.classList.remove('on');showToast('Déconnecté(e)','À bientôt !');
    });
  });
  fetch('api/orders.php').then(function(r){return r.json()}).then(function(data){
    var orders=data.orders||[];
    var el=document.getElementById('acctOrders');
    if(!el)return;
    if(!orders.length){el.innerHTML='<p class="acct-prompt" style="margin:0">Aucune commande pour l\'instant.</p>';return}
    el.innerHTML=orders.map(function(o){
      var items=o.items.map(function(it){
        var img=it.image_path?'<img src="'+it.image_path+'" alt="" style="width:28px;height:28px;border-radius:var(--r-xs);object-fit:cover;flex:none">':'';
        return '<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">'+img+'<span>'+it.qty+'× '+it.product_name+' ('+it.size+')</span></div>';
      }).join('');
      var loc=o.wilaya_name+(o.daira_name?', '+o.daira_name:'');
      var deliv=o.delivery_type==='domicile'?'Domicile — '+loc+(o.delivery_address?' · '+o.delivery_address:''):'Bureau — '+loc;
      return '<div class="ord"><div class="ord-h"><span>#'+o.id+'</span><span class="badge-st '+o.status+'">'+o.status+'</span></div>'
       +'<div class="ord-items">'+items+'</div>'
       +'<div class="ord-f">'+deliv+'</div>'
       +'<div class="ord-f">'+o.created_at+' · <b>'+fmt(o.total)+'</b></div></div>';
    }).join('');
  });
}
acctBtn.addEventListener('click',function(e){
  e.stopPropagation();
  if(!authUser){openAuth('login');return}
  var open=acctPanel.classList.toggle('on');
  acctBtn.setAttribute('aria-expanded',String(open));
  if(open){bagPanel.classList.remove('on');renderAcctPanel()}
});

paintWish();

fetch('api/me.php').then(function(r){return r.json()}).then(function(data){
  authUser=data.user;updateAcctUI();
}).catch(function(){});

function loadProducts(data){
  P=data.products||[];
  bag=bag.filter(function(o){return !!byId(o.id)});
  wish=wish.filter(function(id){return !!byId(id)});
  saveLS('sakura_bag',bag);saveLS('sakura_wish',wish);
  paint();
  renderBag();
}
fetch('api/products.php').then(function(r){return r.json()}).then(loadProducts).catch(function(){
  // No PHP backend responding (e.g. a static host like GitHub Pages) — fall back to a
  // bundled sample catalog so the storefront can still be browsed read-only.
  DEMO_MODE=true;
  fetch('data/products-sample.json').then(function(r){return r.json()}).then(function(data){
    loadProducts(data);
    showToast('Mode démo','Catalogue d\'exemple · connexion et commande indisponibles ici');
  }).catch(function(){
    document.getElementById('grid').innerHTML='<p class="noresult">Impossible de charger les produits. Vérifiez que le serveur PHP et la base de données sont bien configurés (voir README).</p>';
  });
});
