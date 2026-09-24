'use client';

import PageShell from '@/components/PageShell';
import { useLang } from '@/lib/i18n';
import { aboutContent } from '@/lib/pages';
import { SHOP } from '@/lib/shop';

export default function About() {
  const { lang } = useLang();
  const c = aboutContent(lang);

  return (
    <PageShell title={c.crumb}>
      <h1>{c.title}</h1>
      <p className="page-lead">{c.lead}</p>

      <h2>{c.sell.h}</h2>
      {c.sell.p.map((x, i) => <p key={i}>{x}</p>)}

      <h2>{c.work.h}</h2>
      <div className="page-cards">
        {c.work.cards.map((v) => (
          <div className="page-card" key={v.h}>
            <h3>{v.h}</h3>
            <p>{v.p}</p>
          </div>
        ))}
      </div>

      <h2>{c.fabric.h}</h2>
      {c.fabric.p.map((x, i) => <p key={i}>{x}</p>)}

      <h2>{c.contact.h}</h2>
      <p>
        {c.contact.p1a}
        <a href={`tel:${SHOP.phoneTel}`}>{SHOP.phoneDisplay}</a>
        {c.contact.p1b}
        <a href="mailto:contact@sakurashop.dz">contact@sakurashop.dz</a>
        {c.contact.p1c}
      </p>
      <p>
        {c.contact.p2a}
        <a href="https://www.facebook.com/sakurashop.dz/" target="_blank" rel="noopener">
          {c.contact.p2b}
        </a>.
      </p>

    </PageShell>
  );
}
