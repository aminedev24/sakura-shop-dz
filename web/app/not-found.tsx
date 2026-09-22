'use client';

import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { IArrow } from '@/components/icons2';
import { useLang } from '@/lib/i18n';

/** An App Router 404. Without this, a static export falls back to the Pages
 *  Router /404 and needs next/dist/pages/_document, which it resolves from the
 *  default .next rather than a custom distDir — and the export fails. */
export default function NotFound() {
  const { t } = useLang();
  return (
    <PageShell title={t.nfTitle}>
      <h1>{t.nfTitle}</h1>
      <p className="page-lead">{t.nfText}</p>
      <Link className="btn2" href="/">{t.nfCta} <IArrow /></Link>
    </PageShell>
  );
}
