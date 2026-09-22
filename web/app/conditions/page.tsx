import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description:
    'Conditions générales de vente de Sakura Shop : prix, commande, paiement à la livraison, livraison et données personnelles.',
};

/** Numbering is derived from the array order, so inserting a clause never
 *  leaves the headings out of sequence the way hand-written HTML does. */
const CLAUSES: { h: string; body: React.ReactNode }[] = [
  {
    h: 'Identité du vendeur',
    body: (
      <div className="page-note">
        <p>
          <b>[À COMPLÉTER]</b> — Raison sociale, forme juridique, adresse du siège, numéro de
          registre de commerce (RC), NIF et numéro de téléphone professionnel. Ces mentions sont
          obligatoires et doivent figurer ici avant toute mise en ligne.
        </p>
      </div>
    ),
  },
  {
    h: 'Produits',
    body: (
      <p>
        Les produits proposés sont des vêtements d’intérieur et pyjamas. Chaque fiche produit
        précise la matière, la coupe et les tailles disponibles. Les photographies sont les plus
        fidèles possibles ; de légères variations de teinte peuvent apparaître selon l’écran
        utilisé.
      </p>
    ),
  },
  {
    h: 'Prix',
    body: (
      <>
        <p>
          Les prix sont indiqués en dinars algériens (DA), toutes taxes comprises, hors frais de
          livraison. Les frais de livraison sont calculés séparément selon votre wilaya et le mode
          de livraison choisi, et vous sont indiqués avant la validation de la commande.
        </p>
        <p>
          Sakura Shop se réserve le droit de modifier ses prix à tout moment. Les produits sont
          facturés au tarif en vigueur au moment de l’enregistrement de la commande.
        </p>
      </>
    ),
  },
  {
    h: 'Commande',
    body: (
      <>
        <p>
          La commande est enregistrée lorsque vous validez le formulaire avec vos coordonnées de
          livraison. Un membre de notre équipe vous contacte ensuite par téléphone ou WhatsApp
          pour confirmer la commande, la taille et l’adresse avant expédition.
        </p>
        <p>
          Sakura Shop se réserve le droit d’annuler toute commande dont les coordonnées seraient
          manifestement erronées ou injoignables après plusieurs tentatives de contact.
        </p>
      </>
    ),
  },
  {
    h: 'Paiement',
    body: (
      <p>
        Le règlement s’effectue en espèces, à la livraison, directement auprès du livreur. Vous
        pouvez ouvrir le colis et vérifier l’article avant de payer.
      </p>
    ),
  },
  {
    h: 'Livraison',
    body: (
      <>
        <p>
          Nous livrons dans les 58 wilayas d’Algérie, à domicile ou au bureau du transporteur selon
          votre choix. Les délais indiqués sur le site sont estimatifs et dépendent de votre wilaya
          ainsi que du transporteur.
        </p>
        <p>
          Les délais courent à compter de la confirmation de la commande. Un retard de livraison
          imputable au transporteur ne peut donner lieu à annulation de la commande ni à
          indemnisation.
        </p>
      </>
    ),
  },
  {
    h: 'Disponibilité',
    body: (
      <p>
        Nos offres sont valables dans la limite des stocks disponibles. En cas d’indisponibilité
        d’un article après commande, nous vous en informons dans les meilleurs délais et vous
        proposons soit un modèle équivalent, soit l’annulation sans frais de la commande.
      </p>
    ),
  },
  {
    h: 'Données personnelles',
    body: (
      <>
        <p>
          Les informations que vous nous communiquez (nom, téléphone, adresse) sont utilisées
          uniquement pour traiter et livrer votre commande, et pour vous contacter à son sujet.
          Elles ne sont ni vendues ni cédées à des tiers, à l’exception du transporteur chargé de
          la livraison, qui en a besoin pour vous remettre le colis.
        </p>
        <p>
          Vous pouvez demander la consultation, la rectification ou la suppression de vos données
          en nous écrivant à <a href="mailto:contact@sakurashop.dz">contact@sakurashop.dz</a>.
        </p>
      </>
    ),
  },
  {
    h: 'Droit applicable',
    body: (
      <p>
        Les présentes conditions sont soumises au droit algérien. En cas de litige, une solution
        amiable sera recherchée en priorité avant toute action judiciaire.
      </p>
    ),
  },
  {
    h: 'Contact',
    body: (
      <p>
        Pour toute question relative à ces conditions ou à une commande :{' '}
        <a href="tel:+213560000000">05 60 00 00 00</a> ou{' '}
        <a href="mailto:contact@sakurashop.dz">contact@sakurashop.dz</a>.
      </p>
    ),
  },
];

export default function Conditions() {
  return (
    <PageShell title="Conditions générales de vente">
      <h1>Conditions générales de vente</h1>
      <p className="page-lead">
        Les présentes conditions régissent les ventes réalisées sur le site Sakura Shop. En passant
        commande, vous en acceptez les termes.
      </p>

      {CLAUSES.map((c, i) => (
        <section key={c.h}>
          <h2>{i + 1}. {c.h}</h2>
          {c.body}
        </section>
      ))}

      <p className="page-updated">Dernière mise à jour : septembre 2026.</p>
    </PageShell>
  );
}
