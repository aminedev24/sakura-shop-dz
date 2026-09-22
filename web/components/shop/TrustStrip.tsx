import { Trust0, Trust1, Trust2, Trust3 } from '../icons';

const ITEMS = [
  { icon: Trust0, h: 'Livraison 58 wilayas',   p: 'Nous livrons partout en Algérie, avec délais de 24h à 3-5 jours selon votre wilaya.' },
  { icon: Trust1, h: 'Paiement à la livraison', p: 'Payez à la réception de votre commande. Vous ouvrez et vérifiez avant de payer.' },
  { icon: Trust2, h: 'Du S au XXL',             p: 'Toutes les tailles disponibles, avec des coupes amples pensées pour le confort.' },
  { icon: Trust3, h: 'Qualité garantie',        p: 'Coton doux et satin premium, testés pour un confort toute la journée.' },
];

export default function TrustStrip() {
  return (
    <section className="sec reveal" id="pourquoi" aria-label="Pourquoi nous choisir">
      <div className="sec-h"><h2>Pourquoi choisir Sakura Shop ?</h2></div>
      <div className="trust">
        {ITEMS.map((i) => (
          <div className="trust-item" key={i.h}>
            <div className="ti-icon">{i.icon}</div>
            <h4>{i.h}</h4>
            <p>{i.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
