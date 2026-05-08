'use client';

import { useLocale, UI_STRINGS } from '@/lib/i18n';
import { studio } from '@/lib/works';

export default function Footer() {
  const { locale } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--color-rule)]/50 mt-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 items-end">
        <div>
          <div className="font-[family-name:var(--font-display)] text-2xl">{studio.name}</div>
          <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-muted)] mt-1">
            {studio.atelier[locale]}
          </div>
        </div>

        <div className="text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
          <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)] mb-2">
            {UI_STRINGS.inquiries[locale]}
          </div>
          <a
            href="mailto:studio@qualiseram.com"
            className="hover:text-[color:var(--color-umber)] transition-colors duration-200 underline-offset-4 hover:underline"
          >
            studio@qualiseram.com
          </a>
          <div className="text-[color:var(--color-muted)] mt-1 text-[13px]">
            {UI_STRINGS.inquiriesHint[locale]}
          </div>
        </div>

        <div className="sm:text-end text-xs text-[color:var(--color-muted)] tabular-nums">
          © {year} {studio.name}
        </div>
      </div>
    </footer>
  );
}
