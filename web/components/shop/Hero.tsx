import { IArrow, ITruck, ICard, IExchange, IStar, IPin } from '../icons2';
import Tiles from './Tiles';

const FEATS = [
  { icon: <ITruck />, b: '58 wilayas', s: 'Livraison partout en Algérie' },
  { icon: <ICard />, b: 'Paiement', s: 'à la livraison' },
  { icon: <IExchange />, b: 'Échange', s: 'sous 48h' },
  { icon: <IStar />, b: 'Satin & coton', s: 'premium' },
];

export default function Hero() {
  return (
    <section className="wrap hero3" aria-label="Mise en avant">
      <div className="hero3-card">
        <div className="hero3-photo">
          <img src="/uploads/products/p17.jpg" alt="Ensemble pyjama Sakura Shop" />
        </div>

        <div className="hero3-badge">
          <span className="pin"><IPin /></span>
          <span>
            <b>58 wilayas</b>
            <span>Paiement à la livraison</span>
          </span>
        </div>

        <div className="hero3-in">
          <span className="kicker">Nouvelle collection · 2026</span>
          <h1>Le confort<br />commence ici.</h1>
          <p>
            Pyjamas et vêtements d’intérieur pensés pour être beaux, doux et confortables du matin
            au soir.
          </p>
          <div className="hero3-btns">
            <a className="btn2" href="#boutique">Découvrir les modèles <IArrow /></a>
            <a className="btn2 ghost" href="#livraison"><ITruck /> Calculer ma livraison</a>
          </div>
          <div className="hero3-feats">
            {FEATS.map((f) => (
              <div className="hero3-feat" key={f.b}>
                {f.icon}
                <span><b>{f.b}</b><span>{f.s}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Tiles />
    </section>
  );
}
