/** A product reference for humans.
 *
 *  The raw database id told a customer nothing and told the shop nothing when
 *  picking stock. This prefixes it with the fabric — COT-0007, SAT-0012 — so a
 *  reference read over the phone or written on a parcel says what the item is,
 *  and still maps one-to-one onto the id. Derived, never stored, so it cannot
 *  drift or collide.
 */
const PREFIX: Record<string, string> = {
  coton: 'COT',
  satin: 'SAT',
  boutonne: 'BTN',
};

export const productRef = (p: { id: number; c: string }) =>
  `${PREFIX[p.c] ?? 'SKR'}-${String(p.id).padStart(4, '0')}`;
