'use client';

import { useLang } from '@/lib/i18n';
import SizeTable from './SizeTable';

export default function SizeGuide() {
  const { t } = useLang();
  return (
    <section className="sec reveal" id="guide">
      <details>
        <summary>{t.sgTitle}</summary>
        <SizeTable />
      </details>
    </section>
  );
}
