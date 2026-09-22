const PETAL =
  'M16 15.2C12.9 12.9 11.9 8.9 13.6 6.2c1-1.5 1.7-1 2.4.4c.7-1.4 1.4-1.9 2.4-.4C20.1 8.9 19.1 12.9 16 15.2Z';
const DOTS: [number, number, number][] = [
  [16, 16, 1.75], [16, 11.9, 0.7], [19.9, 14.7, 0.7],
  [18.4, 19.3, 0.7], [13.6, 19.3, 0.7], [12.1, 14.7, 0.7],
];

/** The five-petal blossom. In the HTML build this path was copy-pasted five
 *  times with different rotations; here it is one path and a map. */
export default function Logo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <g fill="var(--accent)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <path key={deg} d={PETAL} transform={`rotate(${deg} 16 16)`} />
        ))}
      </g>
      <g fill="var(--rose-dk)">
        {DOTS.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>
    </svg>
  );
}
