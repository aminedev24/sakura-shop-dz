import data from './shipping.json';

export type Delay = '24-48' | '24-72' | '48-96';

export type Wilaya = {
  code: number;
  /** bare name, e.g. "Alger" */
  name: string;
  /** label for the select, e.g. "16 — Alger" */
  label: string;
  /** fee in DA to the carrier's desk, null when not served that way */
  bureau: number | null;
  /** fee in DA to the customer's address, null when not served that way */
  domicile: number | null;
  /** delivery window, null when the wilaya is not served at all */
  delay: Delay | null;
};

/** The 58 wilayas and their rates.
 *
 *  The figures live in data/shipping.json, which config/shipping.php reads too,
 *  so the fee the browser shows and the fee api/orders.php charges come from
 *  one place. They used to be two hand-maintained tables that drifted apart.
 */
export const WILAYAS: Wilaya[] = data.wilayas.map((w) => ({
  code: w.code,
  name: w.name,
  label: `${String(w.code).padStart(2, '0')} — ${w.name}`,
  bureau: w.bureau,
  domicile: w.domicile,
  delay: (w.delay as Delay | null) ?? null,
}));

export const FREE_FROM = data.freeFrom;

export const byCode = (code: number) => WILAYAS.find((w) => w.code === code);

/** Fee for a wilaya and method, or null when the carrier does not serve it. */
export const feeFor = (w: Wilaya | undefined, home: boolean) =>
  w ? (home ? w.domicile : w.bureau) : null;

/** A wilaya the carrier reaches by at least one method. */
export const isServed = (w: Wilaya) => w.bureau !== null || w.domicile !== null;
