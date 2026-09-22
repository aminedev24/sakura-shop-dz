/* Icon set for the redesign. All 24x24, currentColor. */
type P = { className?: string };
const s = (d: React.ReactNode, fill = false) => (p: P) => (
  <svg viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'}
       stroke={fill ? undefined : 'currentColor'} strokeWidth={fill ? undefined : 1.7}
       strokeLinecap="round" strokeLinejoin="round" className={p.className}>{d}</svg>
);

export const ISearch = s(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" /></>);
export const IHeart = s(<path d="M12 20.3 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 0 1 19.4 13Z" />);
export const IHeartFill = s(<path d="M12 20.8 4.2 13a4.9 4.9 0 0 1 6.9-6.9l.9.9.9-.9A4.9 4.9 0 0 1 19.8 13Z" />, true);
export const IUser = s(<><circle cx="12" cy="8" r="3.6" /><path d="M4.6 20c1.2-4 4-6 7.4-6s6.2 2 7.4 6" /></>);
export const IBag = s(<><path d="M6 8h12l-1 12H7Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>);
export const IPin = s(<><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" /></>);
export const ITruck = s(<><path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>);
export const ICard = s(<><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 10h18" /></>);
export const IExchange = s(<><path d="M4 8h12a4 4 0 0 1 0 8H9l3-3m-3 3 3 3" /></>);
export const IStar = s(<path d="m12 4 2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8Z" />);
export const IMenu = s(<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>);
export const IPhone = s(<path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />);
export const IArrow = s(<path d="M5 12h13m-5-6 6 6-6 6" />);
export const IShield = s(<><path d="M12 3.5 5 6.2v5.1c0 4.4 3 8 7 9.2 4-1.2 7-4.8 7-9.2V6.2Z" /><path d="m9.2 12 2 2 3.6-3.8" /></>);
export const IHeadset = s(<><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><path d="M4 13h2.6a1 1 0 0 1 1 1v3.4a1 1 0 0 1-1 1H5.6A1.6 1.6 0 0 1 4 16.8Z" /><path d="M20 13h-2.6a1 1 0 0 0-1 1v3.4a1 1 0 0 0 1 1h1a1.6 1.6 0 0 0 1.6-1.6Z" /></>);
export const IInstagram = s(<><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="3.8" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" /></>);
export const IFacebook = s(<path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />, true);
export const ITiktok = s(<path d="M16 3c.4 2.3 1.9 3.9 4 4.2v3c-1.6.1-3-.4-4.2-1.3v6.3c0 3.6-2.6 5.9-5.7 5.8-3-.1-5.2-2.6-5.1-5.6.1-3.2 3-5.6 6.2-5v3.1c-1.6-.5-3.1.5-3.2 2 0 1.4 1.1 2.5 2.5 2.4 1.3 0 2.3-1 2.3-2.5V3z" />, true);
export const IYoutube = s(<><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10.5 9.5 5 2.5-5 2.5Z" /></>);

/** The blossom mark — five rounded petals plus stamens. */
export function Mark({ className = 'mark' }: P) {
  const petal = 'M16 5.2c2.9 0 5.1 2.3 5.1 5.2 0 2.6-1.8 4.6-3.7 5.5-.8.4-1.1.7-1.4.7s-.6-.3-1.4-.7c-1.9-.9-3.7-2.9-3.7-5.5 0-2.9 2.2-5.2 5.1-5.2Z';
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="sk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4A6C4" /><stop offset="1" stopColor="#DE3E79" />
        </linearGradient>
      </defs>
      <g fill="url(#sk)">
        {[0, 72, 144, 216, 288].map((d) => (
          <path key={d} d={petal} transform={`rotate(${d} 16 16)`} />
        ))}
      </g>
      <circle cx="16" cy="16" r="2.1" fill="#C22C64" />
      {[0, 60, 120, 180, 240, 300].map((d) => (
        <circle key={d} cx="16" cy="12.4" r=".62" fill="#FBD9E6" transform={`rotate(${d} 16 16)`} />
      ))}
    </svg>
  );
}
