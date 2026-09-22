import { Arrow } from '../icons';
import Tiles from './Tiles';

export default function Hero() {
  return (
    <section className="wrap hero hero-v2" aria-label="Mise en avant">
      <div className="hero-card">
        <div className="hero-orb orb-a" />
        <div className="hero-orb orb-b" />
        <div className="hgrid">
          <div className="hcopy hero-load">
            <div className="eyebrow hero-eyebrow">NOUVELLE COLLECTION · 2026</div>
            <h1>Le confort<br />commence ici.</h1>
            <p className="hdesc">
              Pyjamas et vêtements d’intérieur pensés pour être beaux, doux et confortables du
              matin au soir. Du S au XXL, livrés partout en Algérie.
            </p>
            <p className="ar">تشكيلة جديدة من البيجامات — توصيل إلى 58 ولاية</p>
            <div className="hbtns">
              <a className="btn hero-primary" href="#boutique">Découvrir les modèles {Arrow}</a>
              <a className="btn o hero-secondary" href="#livraison">Calculer ma livraison</a>
            </div>
          </div>
          <div className="hero-stage hero-load">
            <div className="hero-art">
              <div className="hero-art-label">S A K U R A</div>
              <div className="hero-art-inner">
                {/* served by Apache from the PHP side, not bundled into out/ */}
                <img src="/uploads/products/p17.jpg" alt="Ensemble pyjama Sakura Shop" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tiles />
    </section>
  );
}
