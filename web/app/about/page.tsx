import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "Qui est Sakura Shop : vêtements d'intérieur et pyjamas pour femme, paiement à la livraison, livraison dans les 58 wilayas d'Algérie.",
};

const VALUES = [
  { h: 'Paiement à la livraison', p: 'Vous ne payez qu’à réception. Vous ouvrez le colis et vérifiez l’article avant de régler le livreur.' },
  { h: '58 wilayas couvertes', p: 'Nous livrons dans toute l’Algérie, à domicile ou au bureau de livraison, selon ce qui vous arrange.' },
  { h: 'Conseil sur WhatsApp', p: 'Un doute sur une taille ou une matière ? Écrivez-nous, nous répondons avant que vous commandiez.' },
];

export default function About() {
  return (
    <PageShell title="À propos">
      <h1>À propos de Sakura Shop</h1>
      <p className="page-lead">
        Sakura Shop habille vos moments à la maison : pyjamas, ensembles et vêtements
        d’intérieur choisis pour être aussi beaux que confortables, livrés partout en Algérie.
      </p>

      <h2>Ce que nous vendons</h2>
      <p>
        Nous sommes spécialisés dans le vêtement d’intérieur féminin : ensembles en coton
        respirant, pyjamas en satin, modèles boutonnés et coupes amples. Chaque modèle est
        sélectionné pour une chose simple — pouvoir être porté bien après le réveil sans avoir
        envie de se changer.
      </p>
      <p>
        Nos tailles vont du S au XXL, parce qu’un vêtement d’intérieur n’a d’intérêt que s’il
        tombe bien.
      </p>

      <h2>Comment nous travaillons</h2>
      <div className="page-cards">
        {VALUES.map((v) => (
          <div className="page-card" key={v.h}>
            <h3>{v.h}</h3>
            <p>{v.p}</p>
          </div>
        ))}
      </div>

      <h2>Nos matières</h2>
      <p>
        Nous travaillons principalement le coton et le satin. Le coton pour la respirabilité et
        l’usage quotidien ; le satin pour le tomber et la douceur. Les descriptions produit
        précisent systématiquement la matière et la coupe, afin que vous sachiez ce que vous
        commandez.
      </p>

      <h2>Nous contacter</h2>
      <p>
        Pour toute question sur un modèle, une taille ou une commande en cours, le plus rapide
        reste le téléphone ou WhatsApp au <a href="tel:+213560000000">05 60 00 00 00</a>. Vous
        pouvez aussi nous écrire à{' '}
        <a href="mailto:contact@sakurashop.dz">contact@sakurashop.dz</a>.
      </p>

      <div className="page-note">
        <p>
          <b>[À COMPLÉTER]</b> — Ajoutez ici votre histoire : année de création, qui est derrière
          Sakura Shop, et ce qui vous a donné envie de lancer la boutique. C’est la partie que les
          clientes lisent vraiment.
        </p>
      </div>
    </PageShell>
  );
}
