export type Wilaya = {
  /** label exactly as shown in the select, e.g. "16 — Alger" */
  name: string;
  /** delivery fee in DA to the carrier's desk */
  bureau: number;
  /** delivery fee in DA to the customer's address */
  domicile: number;
  /** estimated delivery time in hours */
  hours: number;
};

/** The 58 wilayas and their delivery rates.
 *
 *  NOTE: config/shipping.php holds a hand-maintained copy of this same table so
 *  api/orders.php can recompute the fee server-side instead of trusting the
 *  browser. The two must stay in sync. Worth collapsing into one JSON file that
 *  both the PHP and this module read. */
export const WILAYAS: Wilaya[] = [
  { name: "01 — Adrar", bureau: 1000, domicile: 1300, hours: 120 },
  { name: "02 — Chlef", bureau: 550, domicile: 750, hours: 48 },
  { name: "03 — Laghouat", bureau: 700, domicile: 900, hours: 72 },
  { name: "04 — Oum El Bouaghi", bureau: 700, domicile: 900, hours: 72 },
  { name: "05 — Batna", bureau: 700, domicile: 900, hours: 72 },
  { name: "06 — Béjaïa", bureau: 600, domicile: 800, hours: 48 },
  { name: "07 — Biskra", bureau: 800, domicile: 1000, hours: 72 },
  { name: "08 — Béchar", bureau: 900, domicile: 1100, hours: 96 },
  { name: "09 — Blida", bureau: 400, domicile: 600, hours: 24 },
  { name: "10 — Bouira", bureau: 450, domicile: 650, hours: 24 },
  { name: "11 — Tamanrasset", bureau: 1200, domicile: 1600, hours: 144 },
  { name: "12 — Tébessa", bureau: 700, domicile: 900, hours: 72 },
  { name: "13 — Tlemcen", bureau: 600, domicile: 800, hours: 48 },
  { name: "14 — Tiaret", bureau: 600, domicile: 800, hours: 48 },
  { name: "15 — Tizi Ouzou", bureau: 450, domicile: 650, hours: 24 },
  { name: "16 — Alger", bureau: 400, domicile: 600, hours: 24 },
  { name: "17 — Djelfa", bureau: 650, domicile: 850, hours: 72 },
  { name: "18 — Jijel", bureau: 600, domicile: 800, hours: 48 },
  { name: "19 — Sétif", bureau: 550, domicile: 750, hours: 48 },
  { name: "20 — Saïda", bureau: 650, domicile: 850, hours: 48 },
  { name: "21 — Skikda", bureau: 600, domicile: 800, hours: 72 },
  { name: "22 — Sidi Bel Abbès", bureau: 600, domicile: 800, hours: 48 },
  { name: "23 — Annaba", bureau: 650, domicile: 850, hours: 72 },
  { name: "24 — Guelma", bureau: 650, domicile: 850, hours: 72 },
  { name: "25 — Constantine", bureau: 600, domicile: 800, hours: 48 },
  { name: "26 — Médéa", bureau: 450, domicile: 650, hours: 24 },
  { name: "27 — Mostaganem", bureau: 550, domicile: 750, hours: 48 },
  { name: "28 — M'Sila", bureau: 650, domicile: 850, hours: 72 },
  { name: "29 — Mascara", bureau: 600, domicile: 800, hours: 48 },
  { name: "30 — Ouargla", bureau: 1000, domicile: 1300, hours: 120 },
  { name: "31 — Oran", bureau: 550, domicile: 750, hours: 48 },
  { name: "32 — El Bayadh", bureau: 800, domicile: 1000, hours: 96 },
  { name: "33 — Illizi", bureau: 1200, domicile: 1600, hours: 144 },
  { name: "34 — Bordj Bou Arréridj", bureau: 550, domicile: 750, hours: 48 },
  { name: "35 — Boumerdès", bureau: 450, domicile: 650, hours: 24 },
  { name: "36 — El Tarf", bureau: 650, domicile: 850, hours: 72 },
  { name: "37 — Tindouf", bureau: 1200, domicile: 1600, hours: 144 },
  { name: "38 — Tissemsilt", bureau: 600, domicile: 800, hours: 48 },
  { name: "39 — El Oued", bureau: 800, domicile: 1000, hours: 72 },
  { name: "40 — Khenchela", bureau: 700, domicile: 900, hours: 72 },
  { name: "41 — Souk Ahras", bureau: 700, domicile: 900, hours: 72 },
  { name: "42 — Tipaza", bureau: 450, domicile: 650, hours: 24 },
  { name: "43 — Mila", bureau: 600, domicile: 800, hours: 48 },
  { name: "44 — Aïn Defla", bureau: 450, domicile: 650, hours: 24 },
  { name: "45 — Naâma", bureau: 800, domicile: 1000, hours: 96 },
  { name: "46 — Aïn Témouchent", bureau: 600, domicile: 800, hours: 48 },
  { name: "47 — Ghardaïa", bureau: 900, domicile: 1200, hours: 120 },
  { name: "48 — Relizane", bureau: 550, domicile: 750, hours: 48 },
  { name: "49 — Timimoun", bureau: 1000, domicile: 1300, hours: 120 },
  { name: "50 — Bordj Badji Mokhtar", bureau: 1300, domicile: 1700, hours: 144 },
  { name: "51 — Ouled Djellal", bureau: 800, domicile: 1000, hours: 72 },
  { name: "52 — Béni Abbès", bureau: 900, domicile: 1100, hours: 96 },
  { name: "53 — In Salah", bureau: 1200, domicile: 1600, hours: 144 },
  { name: "54 — In Guezzam", bureau: 1300, domicile: 1700, hours: 144 },
  { name: "55 — Touggourt", bureau: 1000, domicile: 1300, hours: 120 },
  { name: "56 — Djanet", bureau: 1300, domicile: 1700, hours: 144 },
  { name: "57 — El M'Ghair", bureau: 950, domicile: 1250, hours: 120 },
  { name: "58 — El Meniaa", bureau: 1000, domicile: 1300, hours: 120 },
];

/** Bucketed delivery estimate, matching delai() in the original app.js. */
export function delay(hours: number): string {
  if (hours <= 24) return '24 h';
  if (hours <= 48) return '24 – 48 h';
  if (hours <= 72) return '48 – 72 h';
  if (hours <= 120) return '3 – 5 jours';
  return '5 – 7 jours';
}
