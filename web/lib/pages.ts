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
      {
        h: 'Identification du vendeur',
        p: [
          'Le site Sakura Shop est exploité par [raison sociale à compléter], dont le siège est situé à [adresse physique à compléter].',
          'Pour toute question ou demande concernant une commande, vous pouvez nous contacter au 05 60 00 00 00 ou par e-mail à contact@sakurashop.dz.',
        ],
      },

      {
        h: 'Objet et champ d’application',
        p: [
          'Les présentes conditions générales de vente définissent les règles applicables aux achats effectués sur le site Sakura Shop.',
          'Elles s’appliquent à toute commande passée par un client pour l’achat de vêtements d’intérieur, pyjamas et autres produits proposés sur le site.',
          'La validation d’une commande signifie que le client reconnaît avoir pris connaissance des présentes conditions et les accepter.',
        ],
      },

      {
        h: 'Produits',
        p: [
          'Les produits proposés sont des vêtements d’intérieur et pyjamas. Chaque fiche produit précise la matière, la coupe et les tailles disponibles.',
          'Les photographies sont les plus fidèles possibles ; de légères variations de teinte peuvent apparaître selon l’écran utilisé.',
        ],
      },

      {
        h: 'Prix',
        p: [
          'Les prix sont indiqués en dinars algériens (DA), toutes taxes comprises, hors frais de livraison.',
          'Les frais de livraison sont calculés séparément selon votre wilaya et le mode de livraison choisi, et vous sont indiqués avant la validation de la commande.',
          'Sakura Shop se réserve le droit de modifier ses prix à tout moment. Les produits sont facturés au tarif en vigueur au moment de l’enregistrement de la commande.',
        ],
      },

      {
        h: 'Disponibilité',
        p: [
          'Nos offres sont valables dans la limite des stocks disponibles.',
          'En cas d’indisponibilité d’un article après commande, nous vous en informons dans les meilleurs délais et vous proposons soit un modèle équivalent, soit l’annulation sans frais de la commande.',
        ],
      },

      {
        h: 'Commande',
        p: [
          'La commande est enregistrée lorsque vous validez le formulaire avec vos coordonnées de livraison.',
          'Un membre de notre équipe vous contacte ensuite par téléphone ou WhatsApp pour confirmer la commande, la taille et l’adresse avant expédition.',
          'Sakura Shop se réserve le droit d’annuler toute commande dont les coordonnées seraient manifestement erronées ou injoignables après plusieurs tentatives de contact.',
        ],
      },

      {
        h: 'Paiement',
        p: [
          'Le règlement s’effectue en espèces, à la livraison, directement auprès du livreur.',
          'Vous pouvez ouvrir le colis et vérifier l’article avant de payer.',
        ],
      },

      {
        h: 'Livraison',
        p: [
          'Nous livrons dans les 58 wilayas d’Algérie, à domicile ou au bureau du transporteur selon votre choix.',
          'Les délais indiqués sur le site sont estimatifs et dépendent de votre wilaya ainsi que du transporteur.',
          'Les délais courent à compter de la confirmation de la commande.',
          'En cas de retard ou de difficulté de livraison, nous vous invitons à contacter Sakura Shop afin que nous puissions suivre la situation avec le transporteur.',
          'Cette disposition s’applique sans préjudice des droits et recours prévus par la législation applicable.',
        ],
      },

      {
        h: 'Réception de la commande',
        p: [
          'Lors de la réception du colis, nous vous recommandons de vérifier que le produit reçu correspond bien à votre commande et de contrôler son état.',
          'En cas de problème concernant le produit reçu, notamment en cas d’erreur de modèle, de taille, de couleur ou de défaut apparent, veuillez contacter Sakura Shop dans les meilleurs délais afin que nous puissions examiner votre demande.',
          'Lorsque cela est possible, nous vous invitons à conserver l’emballage et le produit dans son état initial jusqu’à la résolution de la réclamation.',
        ],
      },

      {
        h: 'Retour et produit défectueux ou non conforme',
        p: [
          'Si le produit reçu est défectueux, endommagé ou ne correspond pas au produit commandé, veuillez contacter Sakura Shop afin de nous signaler le problème et de nous fournir les informations nécessaires à son traitement.',
          'Après examen de la situation, Sakura Shop pourra proposer, selon le cas et les dispositions applicables, une nouvelle livraison conforme, un échange ou l’annulation de la commande avec remboursement.',
          'Pour faciliter le traitement de la demande, des photographies du produit concerné peuvent être demandées.',
          'Les droits du client prévus par la législation applicable restent pleinement applicables.',
        ],
      },

      {
        h: 'Réclamations et service client',
        p: [
          'Toute réclamation relative à une commande, à un produit ou à une livraison peut être adressée à notre service client par téléphone au 05 60 00 00 00, par WhatsApp ou par e-mail à contact@sakurashop.dz.',
          'Afin de nous permettre de traiter rapidement votre demande, nous vous invitons à communiquer votre nom, votre numéro de téléphone ainsi que, lorsque cela est disponible, la référence de votre commande.',
          'Notre équipe examine chaque réclamation et vous indique les démarches à suivre selon la nature du problème.',
        ],
      },

      {
        h: 'Données personnelles',
        p: [
          'Les informations que vous nous communiquez (nom, téléphone, adresse) sont utilisées uniquement pour traiter et livrer votre commande, et pour vous contacter à son sujet.',
          'Elles ne sont ni vendues ni cédées à des tiers, à l’exception du transporteur chargé de la livraison, qui en a besoin pour vous remettre le colis.',
          'Vous pouvez demander la consultation, la rectification ou la suppression de vos données en nous écrivant à contact@sakurashop.dz.',
        ],
      },

      {
        h: 'Responsabilité',
        p: [
          'Sakura Shop s’engage à présenter les produits et leurs caractéristiques de manière aussi fidèle que possible. De légères différences de couleur peuvent toutefois apparaître selon l’écran ou les paramètres d’affichage utilisés.',
          'Sakura Shop ne peut être tenue responsable des difficultés ou retards résultant de circonstances indépendantes de sa volonté, notamment certains incidents affectant le transporteur, les conditions météorologiques ou tout autre événement extérieur empêchant ou perturbant la livraison.',
          'Cette disposition ne limite pas les droits et recours qui peuvent être prévus par les dispositions légales applicables.',
        ],
      },

      {
        h: 'Modification des CGV',
        p: [
          'Sakura Shop se réserve la possibilité de modifier les présentes conditions générales de vente afin de les adapter à l’évolution de ses services, de son activité ou de la réglementation applicable.',
          'Les conditions générales applicables à une commande sont celles qui sont acceptées par le client au moment de la validation de cette commande.',
          'Les modifications apportées après la validation d’une commande ne s’appliquent pas à cette commande.',
        ],
      },

      {
        h: 'Droit applicable et règlement des litiges',
        p: [
          'Les présentes conditions générales de vente sont soumises au droit algérien.',
          'En cas de difficulté ou de litige concernant une commande, le client est invité à contacter Sakura Shop en priorité afin de rechercher une solution amiable.',
          'Les réclamations sont examinées de bonne foi et Sakura Shop s’efforce d’apporter une réponse dans les meilleurs délais.',
          'À défaut de résolution amiable, le litige pourra être soumis aux autorités ou juridictions compétentes conformément à la législation algérienne applicable.',
        ],
      },

      {
        h: 'Contact',
        p: [
          'Pour toute question relative à ces conditions ou à une commande : 05 60 00 00 00 ou contact@sakurashop.dz.',
        ],
      },
    ],
  },

  ar: {
    crumb: 'الشروط العامة للبيع',
    title: 'الشروط العامة للبيع',
    lead: 'تنظّم هذه الشروط عمليات البيع التي تتم عبر موقع Sakura Shop. بتقديمك للطلب فإنك توافقين على بنودها.',
    updated: 'آخر تحديث: سبتمبر 2026.',
    clauses: [
      {
        h: 'بيانات البائع',
        p: [
          'يُدار موقع Sakura Shop من طرف [اسم الشركة أو المؤسسة يُستكمل لاحقًا]، ويقع مقرّه في [العنوان الكامل يُستكمل لاحقًا].',
          'لأي سؤال أو طلب يتعلق بالطلبية، يمكنك التواصل معنا على الرقم 05 60 00 00 00 أو عبر البريد الإلكتروني contact@sakurashop.dz.',
        ],
      },

      {
        h: 'موضوع الشروط ونطاق تطبيقها',
        p: [
          'تحدد هذه الشروط العامة للبيع القواعد المطبقة على عمليات الشراء التي تتم عبر موقع Sakura Shop.',
          'تنطبق هذه الشروط على كل طلبية يقوم بها العميل لشراء الملابس المنزلية والبيجامات وغيرها من المنتجات المعروضة على الموقع.',
          'يعني تأكيد الطلب أن العميل قد اطّلع على هذه الشروط ووافق عليها.',
        ],
      },

      {
        h: 'المنتجات',
        p: [
          'المنتجات المعروضة هي ملابس منزلية وبيجامات. تذكر بطاقة كل منتج القماش والقصّة والمقاسات المتوفرة.',
          'الصور مطابقة قدر الإمكان للمنتجات، وقد تظهر فروق طفيفة في اللون حسب الشاشة أو إعدادات العرض المستخدمة.',
        ],
      },

      {
        h: 'الأسعار',
        p: [
          'الأسعار معروضة بالدينار الجزائري (دج)، شاملة للرسوم، دون تكاليف التوصيل.',
          'تُحسب تكاليف التوصيل بشكل منفصل حسب ولايتك وطريقة التوصيل المختارة، وتُعرض عليك قبل تأكيد الطلب.',
          'يحتفظ Sakura Shop بحق تعديل أسعاره في أي وقت. تُحتسب قيمة المنتجات بالسعر الساري وقت تسجيل الطلب.',
        ],
      },

      {
        h: 'التوفّر',
        p: [
          'عروضنا سارية في حدود المخزون المتوفر.',
          'في حال عدم توفر منتج بعد تقديم الطلب، نُعلمك في أقرب وقت ممكن ونقترح عليك إما منتجًا مماثلًا أو إلغاء الطلب دون مصاريف.',
        ],
      },

      {
        h: 'الطلب',
        p: [
          'يُسجَّل الطلب عند تأكيدك للاستمارة ببيانات التوصيل الخاصة بك.',
          'يتصل بك بعدها أحد أفراد فريقنا هاتفيًا أو عبر واتساب لتأكيد الطلب والمقاس والعنوان قبل الإرسال.',
          'يحتفظ Sakura Shop بحق إلغاء أي طلب تكون بياناته خاطئة بشكل واضح أو يتعذّر الاتصال بصاحبه بعد عدة محاولات.',
        ],
      },

      {
        h: 'الدفع',
        p: [
          'يتم الدفع نقدًا عند الاستلام، مباشرةً لعامل التوصيل.',
          'يمكنك فتح الطرد والتحقّق من القطعة قبل الدفع.',
        ],
      },

      {
        h: 'التوصيل',
        p: [
          'نوصّل إلى 58 ولاية عبر الجزائر، إلى المنزل أو إلى مكتب الناقل حسب اختيارك.',
          'المدد المعروضة على الموقع تقديرية وتتعلق بولايتك وبالناقل.',
          'تبدأ مدة التوصيل من تاريخ تأكيد الطلب.',
          'في حال حدوث تأخر أو صعوبة في التوصيل، ندعوك للتواصل مع Sakura Shop حتى نتمكن من متابعة الوضع مع شركة التوصيل.',
          'يُطبّق هذا دون المساس بالحقوق ووسائل الانتصاف المنصوص عليها في التشريع المعمول به.',
        ],
      },

      {
        h: 'استلام الطلب',
        p: [
          'عند استلام الطرد، ننصحك بالتأكد من أن المنتج المستلم يطابق طلبك والتحقق من حالته.',
          'في حال وجود مشكلة في المنتج المستلم، مثل خطأ في الموديل أو المقاس أو اللون أو وجود عيب ظاهر، يُرجى التواصل مع Sakura Shop في أقرب وقت حتى نتمكن من دراسة طلبك.',
          'عندما يكون ذلك ممكنًا، ننصحك بالاحتفاظ بالتغليف والمنتج في حالته الأصلية إلى حين معالجة الشكوى.',
        ],
      },

      {
        h: 'إرجاع المنتج والمنتج المعيب أو غير المطابق',
        p: [
          'إذا كان المنتج المستلم معيبًا أو متضررًا أو لا يطابق المنتج المطلوب، يُرجى التواصل مع Sakura Shop للإبلاغ عن المشكلة وتزويدنا بالمعلومات اللازمة لمعالجتها.',
          'بعد دراسة الحالة، يمكن لـ Sakura Shop، حسب الحالة والأحكام المعمول بها، اقتراح إرسال منتج مطابق من جديد أو استبداله أو إلغاء الطلب مع رد المبلغ.',
          'لتسهيل معالجة الطلب، قد يُطلب منك إرسال صور للمنتج المعني.',
          'تبقى حقوق العميل المنصوص عليها في التشريع المعمول به سارية بالكامل.',
        ],
      },

      {
        h: 'الشكاوى وخدمة العملاء',
        p: [
          'يمكن تقديم أي شكوى تتعلق بطلب أو منتج أو توصيل إلى خدمة العملاء عبر الهاتف على الرقم 05 60 00 00 00 أو عبر واتساب أو البريد الإلكتروني contact@sakurashop.dz.',
          'لتسهيل معالجة طلبك بسرعة، نرجو تزويدنا باسمك ورقم هاتفك، وكذلك رقم الطلب إن كان متوفرًا.',
          'يقوم فريقنا بدراسة كل شكوى وإبلاغك بالإجراءات المناسبة حسب طبيعة المشكلة.',
        ],
      },

      {
        h: 'المعطيات الشخصية',
        p: [
          'المعلومات التي تزوّديننا بها (الاسم، الهاتف، العنوان) تُستعمل فقط لمعالجة طلبك وتوصيله وللاتصال بك بشأنه.',
          'لا تُباع هذه المعلومات ولا تُمنح لأطراف أخرى، باستثناء الناقل المكلّف بالتوصيل الذي يحتاجها لتسليمك الطرد.',
          'يمكنك طلب الاطلاع على معطياتك أو تصحيحها أو حذفها بمراسلتنا على contact@sakurashop.dz.',
        ],
      },

      {
        h: 'المسؤولية',
        p: [
          'يلتزم Sakura Shop بعرض المنتجات وخصائصها بأكبر قدر ممكن من الدقة. ومع ذلك، قد تظهر فروق طفيفة في اللون حسب الشاشة أو إعدادات العرض المستخدمة.',
          'لا يتحمل Sakura Shop مسؤولية الصعوبات أو التأخيرات الناتجة عن ظروف خارجة عن إرادته، بما في ذلك بعض الحوادث التي تؤثر على شركة التوصيل أو الظروف الجوية أو أي حدث خارجي آخر يمنع أو يعطل عملية التوصيل.',
          'لا يحد هذا البند من الحقوق ووسائل الانتصاف التي قد ينص عليها التشريع المعمول به.',
        ],
      },

      {
        h: 'تعديل الشروط العامة للبيع',
        p: [
          'يحتفظ Sakura Shop بإمكانية تعديل هذه الشروط العامة للبيع من أجل تكييفها مع تطور خدماته أو نشاطه أو التشريعات المعمول بها.',
          'تكون الشروط العامة المطبقة على أي طلب هي الشروط التي وافق عليها العميل وقت تأكيد الطلب.',
          'لا تسري التعديلات التي تتم بعد تأكيد الطلب بأثر رجعي على ذلك الطلب.',
        ],
      },

      {
        h: 'القانون المطبق وتسوية النزاعات',
        p: [
          'تخضع هذه الشروط العامة للبيع للقانون الجزائري.',
          'في حال حدوث صعوبة أو نزاع يتعلق بطلب ما، يُدعى العميل إلى التواصل مع Sakura Shop أولاً من أجل محاولة إيجاد حل ودي.',
          'تتم دراسة الشكاوى بحسن نية، ويسعى Sakura Shop إلى تقديم رد في أقرب وقت ممكن.',
          'في حال عدم التوصل إلى حل ودي، يمكن عرض النزاع على الجهات أو المحاكم المختصة وفقًا للتشريع الجزائري المعمول به.',
        ],
      },

      {
        h: 'الاتصال',
        p: [
          'لأي سؤال يتعلق بهذه الشروط أو بطلب ما: 05 60 00 00 00 أو contact@sakurashop.dz.',
        ],
      },
    ],
  },
};

export const aboutContent = (l: Lang) => ABOUT[l];
export const termsContent = (l: Lang) => TERMS[l];
