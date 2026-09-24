'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Lang = 'fr' | 'ar';

const STRINGS = {
  fr: {
    dir: 'ltr', langLabel: 'العربية', langShort: 'ع', langSwitchTo: "Passer à l'arabe", currency: 'DA',
    // top bar
    tbDelivery: 'Livraison 58 wilayas', tbCod: 'Paiement à la livraison',
    tbFree: 'Livraison offerte dès 12 000 DA', follow: 'Suivez-nous',
    // nav
    navHome: 'Accueil', navShop: 'Boutique', navDelivery: 'Livraison',
    navSizes: 'Guide des tailles', navWhy: 'Pourquoi nous', navAbout: 'À propos',
    navTerms: 'Conditions',
    search: 'Rechercher', closeSearch: 'Fermer la recherche',
    searchPh: 'Chercher un modèle, une matière…',
    favourites: 'Favoris', account: 'Mon compte', cart: 'Panier',
    // hero
    heroKicker: 'Nouvelle collection · 2026',
    heroTitle1: 'Le confort', heroTitle2: 'commence ici.',
    heroText: 'Pyjamas et vêtements d’intérieur pensés pour être beaux, doux et confortables du matin au soir.',
    heroCta1: 'Découvrir les modèles', heroCta2: 'Calculer ma livraison',
    f1b: '58 wilayas', f1s: 'Livraison partout en Algérie',
    f2b: 'Paiement', f2s: 'à la livraison',
    f3b: 'Du S au XXL', f3s: 'toutes les tailles',
    f4b: 'Satin & coton', f4s: 'premium',
    // tiles
    tSatin: 'Satin', tSatinS: 'Col revers',
    tCoton: 'Coton', tCotonS: 'Respirant & doux',
    tBout: 'Boutonné', tBoutS: 'Classique & élégant',
    tNew: 'Nouveautés', tNewS: 'Cette semaine',
    // why
    whyTitle: 'Pourquoi choisir Sakura Shop ?', whySub: 'Plus qu’une boutique, une expérience de confort.',
    w1b: 'Qualité garantie', w1s: 'Tissus doux et durables',
    w2b: 'Livraison 58 wilayas', w2s: 'Rapide et sécurisée',
    w3b: 'Paiement à la livraison', w3s: 'Simple et fiable',
    w4b: 'Service client', w4s: 'Toujours à votre écoute',
    // shop
    shopKicker: 'Nos coups de cœur', shopTitle: 'Nouveautés',
    shopSub: 'Les modèles les plus récents, sélectionnés avec soin',
    shopSubCount: 'affichés', shopAll: 'Voir toute la boutique',
    fAll: 'Tout', fCoton: 'Coton', fSatin: 'Satin', fBout: 'Boutonné', fPromo: 'En promo',
    sortBy: 'Trier par', sortDef: 'Recommandés', sortAsc: 'Prix croissant',
    sortDesc: 'Prix décroissant', sortRated: 'Mieux notés',
    fav: 'favori', favs: 'favoris',
    showAll: 'Afficher tous les modèles', showLess: 'Afficher moins',
    noResult: 'Aucun modèle ne correspond.',
    loadFail: 'Impossible de charger les produits. Vérifiez que le serveur PHP et la base de données sont bien configurés (voir README).',
    demoNote: 'Mode démo · catalogue d’exemple, connexion et commande indisponibles ici.',
    pickSize: 'Choisir la taille', add: 'Ajouter', soldOut: 'épuisé',
    // promo banner
    pbKicker: 'Édition spéciale', pbTitle1: 'Des essentiels', pbTitle2: 'pour votre confort',
    pbText: 'Des matières douces, des coupes modernes et un style qui vous ressemble.',
    pbCta: 'Découvrir la collection',
    // delivery
    dKicker: '🚚 Livraison simple & transparente', dTitle: 'Combien coûte la livraison chez vous ?',
    dWilaya: 'Votre wilaya', dMode: 'Mode de livraison',
    dOffice: 'Au bureau', dHome: 'À domicile', dEta: 'Délai estimé',
    d24: '24 h', d2448: '24 – 48 h', d4872: '48 – 72 h', d35j: '3 – 5 jours', d57j: '5 – 7 jours',
    // sizes
    sgTitle: 'Guide des tailles — mesures en cm',
    sgSize: 'Taille', sgBust: 'Poitrine', sgWaist: 'Tour de taille', sgHips: 'Hanches',
    // cart
    myCart: 'Mon panier', cartEmpty: 'Votre panier est vide.',
    wilaya: 'Wilaya', daira: 'Daïra', pickDaira: 'Choisir la daïra',
    delivery: 'Livraison', office: 'Bureau', home: 'Domicile',
    addrLabel: 'Adresse de livraison', addrPh: 'Rue, quartier, ville…',
    goalFree: '🎉 Livraison offerte !', goalLeft: 'Plus que {x} pour la livraison offerte',
    goalBase: 'Livraison offerte dès 12 000 DA',
    subtotal: 'Sous-total', free: 'Offerte', total: 'Total',
    fullName: 'Nom complet', namePh: 'Votre nom', phone: 'Téléphone',
    confirm: 'Confirmer la commande', sending: 'Envoi en cours…',
    codNote: 'Paiement à la livraison · vous payez au livreur',
    edit: 'Modifier', removeItem: 'Retirer du panier',
    // modal
    close: 'Fermer', size: 'Taille', qty: 'Quantité', item: 'Article',
    addToCart: 'Ajouter au panier',
    // toasts
    tSizeT: 'Choisissez une taille', tSizeS: 'Sélectionnez votre taille avant d’ajouter',
    tAddT: 'Ajouté au panier',
    tDemoT: 'Mode démo', tDemoS: 'Impossible d’envoyer une commande sans serveur backend',
    tNameT: 'Nom requis', tNameS: 'Indiquez votre nom complet',
    tPhoneT: 'Téléphone invalide', tPhoneS: 'Vérifiez votre numéro',
    tDairaT: 'Daïra requise', tDairaS: 'Choisissez votre daïra avant de confirmer',
    tAddrT: 'Adresse requise', tAddrS: 'Indiquez votre adresse de livraison',
    tOrderT: 'Commande enregistrée', tErr: 'Erreur',
    tWelcome: 'Bienvenue', tHello: 'Bonjour {x} !',
    tBye: 'Déconnecté(e)', tByeS: 'À bientôt !',
    // auth
    welcome: 'Bienvenue',
    authSub: 'Suivez vos commandes et retrouvez vos infos au prochain achat.',
    login: 'Se connecter', register: 'Créer un compte', registerDo: 'Créer mon compte',
    loggingIn: 'Connexion…', creating: 'Création du compte…',
    email: 'Email', password: 'Mot de passe', passPh: '6 caractères min.',
    authFill: 'Merci de remplir tous les champs requis',
    authDemo: 'Compte indisponible en mode démo (pas de serveur backend)',
    authNet: 'Connexion au serveur impossible',
    acctPrompt: 'Connectez-vous pour suivre vos commandes.',
    logout: 'Déconnexion', loading: 'Chargement…', noOrders: 'Aucune commande pour l’instant.',
    // footer
    newsPh: 'Votre adresse e-mail', newsNote: 'Recevez nos nouveautés et offres exclusives.',
    newsSubmit: 'S’inscrire à la newsletter',
    rights: '© 2026 Sakura Shop — Tous droits réservés',
    termsFull: 'Conditions générales de vente',
    tagline: "VÊTEMENTS D'INTÉRIEUR",
    toTop: 'Haut de page',
    menu: 'Menu', closeMenu: 'Fermer le menu', openMenu: 'Ouvrir le menu',
    promoScript: 'Douceur au quotidien ♡',
    pbStat1: 'Livraison', pbStat1v: '58 wilayas',
    pbStat2: 'Tailles', pbStat2v: 'S — XXL',
    callUs: 'Appel & WhatsApp',
    nfTitle: 'Page introuvable',
    nfText: 'Cette page n’existe pas ou a été déplacée. Retournez à la boutique pour retrouver nos modèles.',
    nfCta: 'Retour à la boutique',
    adminPanel: 'Administration',
    wishTitle: 'Mes favoris',
    wishEmpty: 'Aucun favori pour l’instant. Touchez le cœur d’un modèle pour l’ajouter.',
    wishRemove: 'Retirer des favoris',
    wishSee: 'Voir la boutique',
    stKicker: 'Notre univers',
    stTitle: 'Le confort peut aussi être beau.',
    stText: "Sakura Shop transforme les vêtements d'intérieur en petits essentiels du quotidien : doux, féminins, faciles à porter et pensés pour vous sentir bien chez vous.",
    stP1: 'Matières choisies avec soin',
    stP2: 'Coupes pensées pour bouger',
    stP3: 'Style doux & féminin',
    stP4: 'Livraison partout en Algérie',
    catKicker: 'Explorez la collection',
    catTitle: 'Choisissez votre univers',
    catSub: 'Des matières et des coupes pour chaque moment.',
    tSatinS2: 'Brillant & élégant',
    tCotonS2: 'Doux & respirant',
    tBoutS2: 'Classique & chic',
    socKicker: 'Notre univers',
    socHandle: '@sakurashop.dz',
    socText: 'Un petit mur visuel pour donner vie à la marque.',
    socCta: 'Voir la page Facebook',
    socFallback: 'Le fil ne s’affiche pas ? Ouvrez la page directement.',
    pdBack: 'Retour à la boutique',
    pdDesc: 'Description',
    pdSizes: 'Tailles disponibles',
    pdPickSize: 'Choisissez une taille',
    pdQty: 'Quantité',
    pdRef: 'Référence',
    pdReviews: 'avis',
    pdRelated: 'Vous aimerez aussi',
    pdNotFound: 'Produit introuvable',
    pdNotFoundText: 'Ce modèle n’existe plus ou le lien est incorrect.',
    pdLoading: 'Chargement du modèle…',
    pdSoldOut: 'Épuisé',
    pdSizeGuide: 'Voir le guide des tailles',
    pdSaving: 'Vous économisez',
    socKicker2: 'Actualités & nouveautés',
    socTitle1: 'Retrouvez',
    socTitle2: 'Sakura Shop',
    socTitle3: 'sur Facebook',
    socLead: 'Découvrez nos nouveaux modèles, nos arrivages et les coulisses de la boutique.',
    socLive: 'Actualités en direct',
    socOpen: 'Ouvrir Facebook',
    socBadge: 'Sakura Shop',
    socAsideH: 'Une touche de Sakura, même en dehors de la boutique.',
    socAsideP: 'Suivez notre page Facebook pour découvrir les nouveautés, les nouveaux arrivages et les actualités de Sakura Shop.',
    socPt1: 'Nouveaux modèles', socPt1s: 'Découvrez les dernières collections.',
    socPt2: 'Inspirations', socPt2s: 'Des idées autour du confort et du style.',
    socPt3: 'Dans les coulisses', socPt3s: 'Suivez la vie de la boutique.',
    socMainCta: 'Voir notre page Facebook',
    socFallbackQ: 'Le fil ne s’affiche pas ?',
    socFallbackA: 'Ouvrir directement la page Facebook.',
    socPageMeta: 'Page · Vêtements d’intérieur',
    socFollow: 'Suivre',
    socAsideTitle: 'Suivez-nous sur Facebook',
    socAsideText: 'Nouveautés, arrivages et coulisses de la boutique : tout passe d’abord par notre page.',
  },
  ar: {
    dir: 'rtl', langLabel: 'Français', langShort: 'FR', langSwitchTo: 'التبديل إلى الفرنسية', currency: 'دج',
    tbDelivery: 'التوصيل إلى 58 ولاية', tbCod: 'الدفع عند الاستلام',
    tbFree: 'توصيل مجاني ابتداءً من \u206612 000\u2069 دج', follow: 'تابعونا',
    navHome: 'الرئيسية', navShop: 'المتجر', navDelivery: 'التوصيل',
    navSizes: 'دليل المقاسات', navWhy: 'لماذا نحن', navAbout: 'من نحن',
    navTerms: 'الشروط',
    search: 'بحث', closeSearch: 'إغلاق البحث',
    searchPh: 'ابحثي عن موديل أو قماش…',
    favourites: 'المفضلة', account: 'حسابي', cart: 'السلّة',
    heroKicker: 'تشكيلة جديدة · 2026',
    heroTitle1: 'الراحة', heroTitle2: 'تبدأ من هنا.',
    heroText: 'بيجامات وملابس منزلية مصمّمة لتكون جميلة وناعمة ومريحة من الصباح حتى المساء.',
    heroCta1: 'اكتشفي الموديلات', heroCta2: 'احسبي تكلفة التوصيل',
    f1b: '58 ولاية', f1s: 'توصيل إلى كامل الجزائر',
    f2b: 'الدفع', f2s: 'عند الاستلام',
    f3b: 'من S إلى XXL', f3s: 'كل المقاسات',
    f4b: 'ساتان وقطن', f4s: 'فاخر',
    tSatin: 'ساتان', tSatinS: 'ياقة مقلوبة',
    tCoton: 'قطن', tCotonS: 'خفيف وناعم',
    tBout: 'بأزرار', tBoutS: 'كلاسيكي وأنيق',
    tNew: 'الجديد', tNewS: 'هذا الأسبوع',
    whyTitle: 'لماذا تختارين Sakura Shop؟', whySub: 'أكثر من متجر، تجربة راحة.',
    w1b: 'جودة مضمونة', w1s: 'أقمشة ناعمة ومتينة',
    w2b: 'توصيل إلى 58 ولاية', w2s: 'سريع وآمن',
    w3b: 'الدفع عند الاستلام', w3s: 'بسيط وموثوق',
    w4b: 'خدمة الزبائن', w4s: 'دائمًا في خدمتكم',
    shopKicker: 'مختاراتنا', shopTitle: 'الجديد',
    shopSub: 'أحدث الموديلات، مختارة بعناية',
    shopSubCount: 'معروضة', shopAll: 'تصفّحي كل المتجر',
    fAll: 'الكل', fCoton: 'قطن', fSatin: 'ساتان', fBout: 'بأزرار', fPromo: 'تخفيضات',
    sortBy: 'ترتيب حسب', sortDef: 'موصى بها', sortAsc: 'السعر تصاعديًا',
    sortDesc: 'السعر تنازليًا', sortRated: 'الأعلى تقييمًا',
    fav: 'مفضّلة', favs: 'مفضّلة',
    showAll: 'عرض كل الموديلات', showLess: 'عرض أقل',
    noResult: 'لا يوجد موديل مطابق.',
    loadFail: 'تعذّر تحميل المنتجات. تأكّدي من إعداد خادم PHP وقاعدة البيانات (راجعي README).',
    demoNote: 'وضع تجريبي · كتالوج نموذجي، التسجيل والطلب غير متاحين هنا.',
    pickSize: 'اختاري المقاس', add: 'أضيفي', soldOut: 'نفد',
    pbKicker: 'إصدار خاص', pbTitle1: 'أساسيات', pbTitle2: 'من أجل راحتك',
    pbText: 'أقمشة ناعمة، قصّات عصرية وأسلوب يشبهك.',
    pbCta: 'اكتشفي التشكيلة',
    dKicker: '🚚 توصيل بسيط وواضح', dTitle: 'كم تكلفة التوصيل إليك؟',
    dWilaya: 'ولايتك', dMode: 'طريقة التوصيل',
    dOffice: 'إلى المكتب', dHome: 'إلى المنزل', dEta: 'المدة المقدّرة',
    d24: '24 ساعة', d2448: '\u206624 – 48\u2069 ساعة', d4872: '\u206648 – 72\u2069 ساعة', d35j: '\u20663 – 5\u2069 أيام', d57j: '\u20665 – 7\u2069 أيام',
    sgTitle: 'دليل المقاسات — القياسات بالسنتيمتر',
    sgSize: 'المقاس', sgBust: 'الصدر', sgWaist: 'الخصر', sgHips: 'الأرداف',
    myCart: 'سلّتي', cartEmpty: 'سلّتك فارغة.',
    wilaya: 'الولاية', daira: 'الدائرة', pickDaira: 'اختاري الدائرة',
    delivery: 'التوصيل', office: 'المكتب', home: 'المنزل',
    addrLabel: 'عنوان التوصيل', addrPh: 'الشارع، الحي، المدينة…',
    goalFree: '🎉 التوصيل مجاني!', goalLeft: 'بقي {x} للحصول على توصيل مجاني',
    goalBase: 'توصيل مجاني ابتداءً من \u206612 000\u2069 دج',
    subtotal: 'المجموع الفرعي', free: 'مجاني', total: 'المجموع',
    fullName: 'الاسم الكامل', namePh: 'اسمك', phone: 'الهاتف',
    confirm: 'تأكيد الطلب', sending: 'جارٍ الإرسال…',
    codNote: 'الدفع عند الاستلام · تدفعين لعامل التوصيل',
    edit: 'تعديل', removeItem: 'إزالة من السلّة',
    close: 'إغلاق', size: 'المقاس', qty: 'الكمية', item: 'قطعة',
    addToCart: 'أضيفي إلى السلّة',
    tSizeT: 'اختاري المقاس', tSizeS: 'حدّدي مقاسك قبل الإضافة',
    tAddT: 'أُضيف إلى السلّة',
    tDemoT: 'وضع تجريبي', tDemoS: 'لا يمكن إرسال طلب بدون خادم',
    tNameT: 'الاسم مطلوب', tNameS: 'أدخلي اسمك الكامل',
    tPhoneT: 'رقم غير صالح', tPhoneS: 'تحقّقي من رقمك',
    tDairaT: 'الدائرة مطلوبة', tDairaS: 'اختاري دائرتك قبل التأكيد',
    tAddrT: 'العنوان مطلوب', tAddrS: 'أدخلي عنوان التوصيل',
    tOrderT: 'تم تسجيل الطلب', tErr: 'خطأ',
    tWelcome: 'مرحبًا', tHello: 'أهلاً {x}!',
    tBye: 'تم تسجيل الخروج', tByeS: 'إلى اللقاء!',
    welcome: 'مرحبًا',
    authSub: 'تابعي طلباتك واحفظي معلوماتك للمرة القادمة.',
    login: 'تسجيل الدخول', register: 'إنشاء حساب', registerDo: 'أنشئي حسابي',
    loggingIn: 'جارٍ الدخول…', creating: 'جارٍ إنشاء الحساب…',
    email: 'البريد الإلكتروني', password: 'كلمة المرور', passPh: '6 أحرف على الأقل',
    authFill: 'يرجى ملء جميع الحقول المطلوبة',
    authDemo: 'الحساب غير متاح في الوضع التجريبي (لا يوجد خادم)',
    authNet: 'تعذّر الاتصال بالخادم',
    acctPrompt: 'سجّلي الدخول لمتابعة طلباتك.',
    logout: 'تسجيل الخروج', loading: 'جارٍ التحميل…', noOrders: 'لا توجد طلبات حتى الآن.',
    newsPh: 'بريدك الإلكتروني', newsNote: 'توصّلي بجديدنا وعروضنا الحصرية.',
    newsSubmit: 'الاشتراك في النشرة',
    rights: '© 2026 Sakura Shop — جميع الحقوق محفوظة',
    termsFull: 'الشروط العامة للبيع',
    tagline: 'ملابس منزلية',
    toTop: 'أعلى الصفحة',
    menu: 'القائمة', closeMenu: 'إغلاق القائمة', openMenu: 'فتح القائمة',
    promoScript: 'نعومة كل يوم ♡',
    pbStat1: 'التوصيل', pbStat1v: '58 ولاية',
    pbStat2: 'المقاسات', pbStat2v: 'S — XXL',
    callUs: 'اتصال وواتساب',
    nfTitle: 'الصفحة غير موجودة',
    nfText: 'هذه الصفحة غير موجودة أو تم نقلها. عودي إلى المتجر لتصفّح موديلاتنا.',
    nfCta: 'العودة إلى المتجر',
    adminPanel: 'لوحة التحكم',
    wishTitle: 'مفضّلاتي',
    wishEmpty: 'لا توجد مفضّلات بعد. اضغطي على القلب في أي موديل لإضافته.',
    wishRemove: 'إزالة من المفضّلة',
    wishSee: 'تصفّح المتجر',
    stKicker: 'عالمنا',
    stTitle: 'الراحة يمكن أن تكون جميلة أيضًا.',
    stText: 'يحوّل Sakura Shop الملابس المنزلية إلى أساسيات يومية: ناعمة، أنيقة، سهلة الارتداء ومصمّمة لتشعري بالراحة في بيتك.',
    stP1: 'أقمشة مختارة بعناية',
    stP2: 'قصّات تمنحك حرية الحركة',
    stP3: 'أسلوب ناعم وأنيق',
    stP4: 'توصيل إلى كامل الجزائر',
    catKicker: 'اكتشفي التشكيلة',
    catTitle: 'اختاري عالمك',
    catSub: 'أقمشة وقصّات لكل لحظة.',
    tSatinS2: 'لامع وأنيق',
    tCotonS2: 'ناعم وخفيف',
    tBoutS2: 'كلاسيكي وأنيق',
    socKicker: 'عالمنا',
    socHandle: '@sakurashop.dz',
    socText: 'جدار بصري صغير يعطي الحياة للعلامة.',
    socCta: 'زيارة صفحة فيسبوك',
    socFallback: 'لا يظهر الفيد؟ افتحي الصفحة مباشرة.',
    pdBack: 'العودة إلى المتجر',
    pdDesc: 'الوصف',
    pdSizes: 'المقاسات المتوفرة',
    pdPickSize: 'اختاري مقاسًا',
    pdQty: 'الكمية',
    pdRef: 'المرجع',
    pdReviews: 'تقييم',
    pdRelated: 'قد يعجبك أيضًا',
    pdNotFound: 'المنتج غير موجود',
    pdNotFoundText: 'هذا الموديل لم يعد متوفرًا أو الرابط غير صحيح.',
    pdLoading: 'جارٍ تحميل الموديل…',
    pdSoldOut: 'نفد',
    pdSizeGuide: 'عرض دليل المقاسات',
    pdSaving: 'توفّرين',
    socKicker2: 'أخبار وجديد',
    socTitle1: 'تابعي',
    socTitle2: 'Sakura Shop',
    socTitle3: 'على فيسبوك',
    socLead: 'اكتشفي موديلاتنا الجديدة، وصولاتنا وكواليس المتجر.',
    socLive: 'أخبار مباشرة',
    socOpen: 'فتح فيسبوك',
    socBadge: 'Sakura Shop',
    socAsideH: 'لمسة من ساكورا، حتى خارج المتجر.',
    socAsideP: 'تابعي صفحتنا على فيسبوك لاكتشاف الجديد والوصولات وآخر أخبار Sakura Shop.',
    socPt1: 'موديلات جديدة', socPt1s: 'اكتشفي أحدث التشكيلات.',
    socPt2: 'إلهام', socPt2s: 'أفكار حول الراحة والأناقة.',
    socPt3: 'من الكواليس', socPt3s: 'تابعي يوميات المتجر.',
    socMainCta: 'زيارة صفحتنا على فيسبوك',
    socFallbackQ: 'لا يظهر الفيد؟',
    socFallbackA: 'افتحي صفحة فيسبوك مباشرة.',
    socPageMeta: 'صفحة · ملابس منزلية',
    socFollow: 'متابعة',
    socAsideTitle: 'تابعينا على فيسبوك',
    socAsideText: 'الجديد والوصولات وكواليس المتجر: كل شيء يمرّ أولاً عبر صفحتنا.',
  },
} as const;

export type Dict = typeof STRINGS.fr;

const KEY = 'sakura_lang';
const Ctx = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void } | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');

  // localStorage does not exist while the page is prerendered
  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === 'ar' || v === 'fr') setLangState(v);
    } catch {}
  }, []);

  // the <html> element is emitted at build time, so dir/lang are set here
  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = STRINGS[lang].dir;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch {}
  }, []);

  return (
    <Ctx.Provider value={{ lang, t: STRINGS[lang] as Dict, setLang }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useLang must be used inside <LangProvider>');
  return v;
}

/** Money formatter bound to the current language: DA in French, دج in Arabic.
 *
 *  The digits are wrapped in U+2066 LEFT-TO-RIGHT ISOLATE / U+2069 POP
 *  DIRECTIONAL ISOLATE. Without that, the space used as a thousands separator
 *  is a neutral character, and the bidi algorithm reorders "1 000 دج" into
 *  "000 1 دج" on an RTL page. */
export function useMoney() {
  const { t, lang } = useLang();
  return useCallback(
    (n: number) => {
      const digits = n.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ');
      return lang === 'ar'
        ? `\u2066${digits}\u2069 ${t.currency}`
        : `${digits} ${t.currency}`;
    },
    [t.currency, lang],
  );
}

/** Same isolation for any mixed number/text label, e.g. "01 — Adrar". */
export function bidi(text: string, lang: Lang) {
  return lang === 'ar' ? `\u2066${text}\u2069` : text;
}

/** Delivery estimate buckets, translated. */
export function useDelay() {
  const { t } = useLang();
  return useCallback((h: number) => {
    if (h <= 24) return t.d24;
    if (h <= 48) return t.d2448;
    if (h <= 72) return t.d4872;
    if (h <= 120) return t.d35j;
    return t.d57j;
  }, [t]);
}
