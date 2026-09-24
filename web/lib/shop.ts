/** The shop's own contact details.
 *
 *  One place, because these were previously hardcoded in nine components and
 *  written into the French and Arabic page copy besides — so changing the
 *  number meant finding every one of them.
 */
export const SHOP = {
  name: 'Sakura Shop',

  /** as written for a reader in Algeria */
  phoneDisplay: '0554 33 23 42',
  /** for tel: links */
  phoneTel: '+213554332342',
  /** for wa.me links — digits only, no plus */
  whatsapp: '213554332342',

  email: 'contact@sakurashop.dz',

  address: {
    fr: 'Rue Slimani Abed (près de bâtiment 11ème), Oued Rhiou, Algérie',
    ar: 'شارع سليماني عبد (قرب العمارة 11)، وادي رهيو، الجزائر',
  },

  facebook: 'https://www.facebook.com/sakurashop.dz/',
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${SHOP.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : '');
