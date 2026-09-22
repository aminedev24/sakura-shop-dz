'use client';

import PageShell from '@/components/PageShell';
import { useLang } from '@/lib/i18n';
import { termsContent } from '@/lib/pages';

export default function Conditions() {
  const { lang } = useLang();
  const c = termsContent(lang);

  return (
    <PageShell title={c.crumb}>
      <h1>{c.title}</h1>
      <p className="page-lead">{c.lead}</p>

      {/* numbering comes from the array index, so inserting a clause cannot
          leave the headings out of sequence */}
      {c.clauses.map((cl, i) => (
        <section key={cl.h}>
          <h2>{i + 1}. {cl.h}</h2>
          {cl.note ? (
            <div className="page-note">
              <p><b>[À COMPLÉTER]</b> — {cl.note}</p>
            </div>
          ) : (
            cl.p.map((x, k) => <p key={k}>{x}</p>)
          )}
        </section>
      ))}

      <p className="page-updated">{c.updated}</p>
    </PageShell>
  );
}
