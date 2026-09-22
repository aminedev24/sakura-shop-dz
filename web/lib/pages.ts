import type { Lang } from './i18n';

export type Clause = { h: string; p: string[] };
export type AboutContent = {
  title: string; lead: string;
  sell: { h: string; p: string[] };
  work: { h: string; cards: { h: string; p: string }[] };
  fabric: { h: string; p: string[] };
  contact: { h: string; p1a: string; p1b: string; p1c: string; p2a: string; p2b: string };
  crumb: string;
};
export type TermsContent = { title: string; lead: string; clauses: Clause[]; updated: string; crumb: string };

const ABOUT: Record<Lang, AboutContent> = {
  fr: {
    crumb: 'À propos',
    title: 'À propos de Sakura Shop',
    lead: 'Sakura Shop habille vos moments à la maison : pyjamas, ensembles et vêtements d’intérieur choisis pour être aussi beaux que confortables, livrés partout en Algérie.',
    sell: {
      h: 'Ce que nous vendons',
      p: [
        'Nous sommes spécialisés dans le vêtement d’intérieur féminin : ensembles en coton respirant, pyjamas en satin, modèles boutonnés et coupes amples. Chaque modèle est sélectionné pour une chose simple — pouvoir être porté bien après le réveil sans avoir envie de se changer.',
        'Nos tailles vont du S au XXL, parce qu’un vêtement d’intérieur n’a d’intérêt que s’il tombe bien.',
      ],
    },
    work: {
      h: 'Comment nous travaillons',
      cards: [
        { h: 'Paiement à la livraison', p: 'Vous ne payez qu’à réception. Vous ouvrez le colis et vérifiez l’article avant de régler le livreur.' },
        { h: '58 wilayas couvertes', p: 'Nous livrons dans toute l’Algérie, à domicile ou au bureau de livraison, selon ce qui vous arrange.' },
        { h: 'Conseil sur WhatsApp', p: 'Un doute sur une taille ou une matière ? Écrivez-nous, nous répondons avant que vous commandiez.' },
      ],
    },
    fabric: {
      h: 'Nos matières',
      p: ['Nous travaillons principalement le coton et le satin. Le coton pour la respirabilité et l’usage quotidien ; le satin pour le tomber et la douceur. Les descriptions produit précisent systématiquement la matière et la coupe, afin que vous sachiez ce que vous commandez.'],
    },
    contact: {
      h: 'Nous contacter',
      p1a: 'Pour toute question sur un modèle, une taille ou une commande en cours, le plus rapide reste le téléphone ou WhatsApp au ',
      p1b: '. Vous pouvez aussi nous écrire à ',
      p1c: '.',
      p2a: 'Retrouvez également nos nouveautés sur ',
      p2b: 'notre page Facebook',
    },
  },
  ar: {
    crumb: 'من نحن',
    title: 'عن Sakura Shop',
    lead: 'يرافقك Sakura Shop في لحظاتك داخل البيت: بيجامات وأطقم وملابس منزلية مختارة لتكون جميلة ومريحة في آن واحد، مع توصيل إلى كامل الجزائر.',
    sell: {
      h: 'ماذا نبيع',
      p: [
        'نحن متخصّصون في الملابس المنزلية النسائية: أطقم من القطن الخفيف، بيجامات من الساتان، موديلات بأزرار وقصّات واسعة. كل موديل مختار لسبب بسيط — أن تستطيعي ارتداءه بعد الاستيقاظ بوقت طويل دون رغبة في تغييره.',
        'مقاساتنا من S إلى XXL، لأن الملابس المنزلية لا معنى لها إن لم تكن على القياس.',
      ],
    },
    work: {
      h: 'كيف نعمل',
      cards: [
        { h: 'الدفع عند الاستلام', p: 'لا تدفعين إلا عند الاستلام. تفتحين الطرد وتتحقّقين من القطعة قبل الدفع لعامل التوصيل.' },
        { h: '58 ولاية مغطّاة', p: 'نوصّل إلى كامل الجزائر، إلى المنزل أو إلى مكتب التوصيل، حسبما يناسبك.' },
        { h: 'استشارة عبر واتساب', p: 'مترددة في المقاس أو القماش؟ راسلينا، نجيبك قبل أن تطلبي.' },
      ],
    },
    fabric: {
      h: 'أقمشتنا',
      p: ['نعتمد أساسًا على القطن والساتان. القطن لخفّته واستعماله اليومي، والساتان لانسيابه ونعومته. وصف كل منتج يذكر القماش والقصّة دائمًا، حتى تعرفي تمامًا ما تطلبينه.'],
    },
    contact: {
      h: 'اتصلي بنا',
      p1a: 'لأي سؤال عن موديل أو مقاس أو طلب جارٍ، الأسرع هو الهاتف أو واتساب على ',
      p1b: '. يمكنك أيضًا مراسلتنا على ',
      p1c: '.',
      p2a: 'تابعي جديدنا كذلك على ',
      p2b: 'صفحتنا على فيسبوك',
    },
  },
};

const TERMS: Record<Lang, TermsContent> = {
  fr: {
    crumb: 'Conditions générales de vente',
    title: 'Conditions générales de vente',
    lead: 'Les présentes conditions régissent les ventes réalisées sur le site Sakura Shop. En passant commande, vous en acceptez les termes.',
    updated: 'Dernière mise à jour : septembre 2026.',
    clauses: [
{ h: 'Produits', p: ['Les produits proposés sont des vêtements d’intérieur et pyjamas. Chaque fiche produit précise la matière, la coupe et les tailles disponibles. Les photographies sont les plus fidèles possibles ; de légères variations de teinte peuvent apparaître selon l’écran utilisé.'] },
      { h: 'Prix', p: ['Les prix sont indiqués en dinars algériens (DA), toutes taxes comprises, hors frais de livraison. Les frais de livraison sont calculés séparément selon votre wilaya et le mode de livraison choisi, et vous sont indiqués avant la validation de la commande.', 'Sakura Shop se réserve le droit de modifier ses prix à tout moment. Les produits sont facturés au tarif en vigueur au moment de l’enregistrement de la commande.'] },
      { h: 'Commande', p: ['La commande est enregistrée lorsque vous validez le formulaire avec vos coordonnées de livraison. Un membre de notre équipe vous contacte ensuite par téléphone ou WhatsApp pour confirmer la commande, la taille et l’adresse avant expédition.', 'Sakura Shop se réserve le droit d’annuler toute commande dont les coordonnées seraient manifestement erronées ou injoignables après plusieurs tentatives de contact.'] },
      { h: 'Paiement', p: ['Le règlement s’effectue en espèces, à la livraison, directement auprès du livreur. Vous pouvez ouvrir le colis et vérifier l’article avant de payer.'] },
      { h: 'Livraison', p: ['Nous livrons dans les 58 wilayas d’Algérie, à domicile ou au bureau du transporteur selon votre choix. Les délais indiqués sur le site sont estimatifs et dépendent de votre wilaya ainsi que du transporteur.', 'Les délais courent à compter de la confirmation de la commande. Un retard de livraison imputable au transporteur ne peut donner lieu à annulation de la commande ni à indemnisation.'] },
      { h: 'Disponibilité', p: ['Nos offres sont valables dans la limite des stocks disponibles. En cas d’indisponibilité d’un article après commande, nous vous en informons dans les meilleurs délais et vous proposons soit un modèle équivalent, soit l’annulation sans frais de la commande.'] },
      { h: 'Données personnelles', p: ['Les informations que vous nous communiquez (nom, téléphone, adresse) sont utilisées uniquement pour traiter et livrer votre commande, et pour vous contacter à son sujet. Elles ne sont ni vendues ni cédées à des tiers, à l’exception du transporteur chargé de la livraison, qui en a besoin pour vous remettre le colis.', 'Vous pouvez demander la consultation, la rectification ou la suppression de vos données en nous écrivant à contact@sakurashop.dz.'] },
      { h: 'Droit applicable', p: ['Les présentes conditions sont soumises au droit algérien. En cas de litige, une solution amiable sera recherchée en priorité avant toute action judiciaire.'] },
      { h: 'Contact', p: ['Pour toute question relative à ces conditions ou à une commande : 05 60 00 00 00 ou contact@sakurashop.dz.'] },
    ],
  },
  ar: {
    crumb: 'الشروط العامة للبيع',
    title: 'الشروط العامة للبيع',
    lead: 'تنظّم هذه الشروط عمليات البيع التي تتم عبر موقع Sakura Shop. بتقديمك للطلب فإنك توافقين على بنودها.',
    updated: 'آخر تحديث: سبتمبر 2026.',
    clauses: [
{ h: 'المنتجات', p: ['المنتجات المعروضة هي ملابس منزلية وبيجامات. تذكر بطاقة كل منتج القماش والقصّة والمقاسات المتوفرة. الصور مطابقة قدر الإمكان، وقد تظهر فروق طفيفة في اللون حسب الشاشة المستعملة.'] },
      { h: 'الأسعار', p: ['الأسعار معروضة بالدينار الجزائري (دج)، شاملة للرسوم، دون تكاليف التوصيل. تُحسب تكاليف التوصيل بشكل منفصل حسب ولايتك وطريقة التوصيل المختارة، وتُعرض عليك قبل تأكيد الطلب.', 'يحتفظ Sakura Shop بحق تعديل أسعاره في أي وقت. تُفوتر المنتجات بالسعر الساري وقت تسجيل الطلب.'] },
      { h: 'الطلب', p: ['يُسجَّل الطلب عند تأكيدك للاستمارة ببيانات التوصيل الخاصة بك. يتصل بك بعدها أحد أفراد فريقنا هاتفيًا أو عبر واتساب لتأكيد الطلب والمقاس والعنوان قبل الإرسال.', 'يحتفظ Sakura Shop بحق إلغاء أي طلب تكون بياناته خاطئة بشكل واضح أو يتعذّر الاتصال بصاحبه بعد عدة محاولات.'] },
      { h: 'الدفع', p: ['يتم الدفع نقدًا عند الاستلام، مباشرةً لعامل التوصيل. يمكنك فتح الطرد والتحقّق من القطعة قبل الدفع.'] },
      { h: 'التوصيل', p: ['نوصّل إلى 58 ولاية عبر الجزائر، إلى المنزل أو إلى مكتب الناقل حسب اختيارك. المدد المعروضة على الموقع تقديرية وتتعلّق بولايتك وبالناقل.', 'تبدأ المدة من تاريخ تأكيد الطلب. لا يترتّب على تأخّر التوصيل المنسوب إلى الناقل إلغاء للطلب ولا تعويض.'] },
      { h: 'التوفّر', p: ['عروضنا سارية في حدود المخزون المتوفر. في حال نفاد قطعة بعد الطلب، نُعلمك في أقرب وقت ونقترح عليك إمّا موديلاً مماثلاً وإمّا إلغاء الطلب دون مصاريف.'] },
      { h: 'المعطيات الشخصية', p: ['المعلومات التي تزوّديننا بها (الاسم، الهاتف، العنوان) تُستعمل فقط لمعالجة طلبك وتوصيله وللاتصال بك بشأنه. لا تُباع ولا تُمنح لأطراف أخرى، باستثناء الناقل المكلّف بالتوصيل الذي يحتاجها لتسليمك الطرد.', 'يمكنك طلب الاطلاع على معطياتك أو تصحيحها أو حذفها بمراسلتنا على contact@sakurashop.dz.'] },
      { h: 'القانون المطبَّق', p: ['تخضع هذه الشروط للقانون الجزائري. في حال نشوب نزاع، يُسعى أولاً إلى حلّ ودّي قبل أي إجراء قضائي.'] },
      { h: 'الاتصال', p: ['لأي سؤال يتعلّق بهذه الشروط أو بطلب ما: \u206605 60 00 00 00\u2069 أو contact@sakurashop.dz.'] },
    ],
  },
};

export const aboutContent = (l: Lang) => ABOUT[l];
export const termsContent = (l: Lang) => TERMS[l];
