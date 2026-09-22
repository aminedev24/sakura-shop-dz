import { IArrow } from '../icons2';

export default function PromoBanner() {
  return (
    <section className="promo" aria-label="Édition spéciale">
      <div className="promo-img">
        <img src="/uploads/products/p13.jpg" alt="" />
      </div>
      <div className="promo-body">
        <span className="kicker">Édition spéciale</span>
        <h3>Des essentiels<br />pour votre confort</h3>
        <p>Des matières douces, des coupes modernes et un style qui vous ressemble.</p>
        <a className="btn2" href="#boutique">Découvrir la collection <IArrow /></a>
      </div>
      <div className="promo-deco" aria-hidden="true">
        <span className="heart">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.8 4.2 13a4.9 4.9 0 0 1 6.9-6.9l.9.9.9-.9A4.9 4.9 0 0 1 19.8 13Z" /></svg>
        </span>
        <span className="promo-script">Douceur<br />au quotidien</span>
      </div>
    </section>
  );
}
