import { IShield, ITruck, ICard, IHeadset } from '../icons2';

const ITEMS = [
  { icon: <IShield />,  b: 'Qualité garantie',       s: 'Tissus doux et durables' },
  { icon: <ITruck />,   b: 'Livraison 58 wilayas',   s: 'Rapide et sécurisée' },
  { icon: <ICard />,    b: 'Paiement à la livraison', s: 'Simple et fiable' },
  { icon: <IHeadset />, b: 'Service client',          s: 'Toujours à votre écoute' },
];

export default function TrustStrip() {
  return (
    <section className="sec3 reveal" id="pourquoi" aria-label="Pourquoi nous choisir">
      <div className="sechead sechead-c">
        <h2>Pourquoi choisir Sakura Shop ?</h2>
        <p>Plus qu’une boutique, une expérience de confort.</p>
      </div>
      <div className="why">
        {ITEMS.map((i) => (
          <div className="why-item" key={i.b}>
            <span className="why-ic">{i.icon}</span>
            <span><b>{i.b}</b><span>{i.s}</span></span>
          </div>
        ))}
      </div>
    </section>
  );
}
