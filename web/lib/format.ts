/** Money formatting, matching fmt() in the original app.js: French grouping,
 *  normal spaces rather than narrow no-break spaces, then " DA". */
export function fmt(n: number): string {
  return n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' DA';
}
