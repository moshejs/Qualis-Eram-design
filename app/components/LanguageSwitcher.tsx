'use client';

import { useLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

const OPTIONS: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'he', label: 'עב' },
  { code: 'la', label: 'LA' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="lang-switcher flex items-center gap-1 text-[11px] tracking-[0.18em] uppercase tabular-nums"
      role="group"
      aria-label="Language"
    >
      {OPTIONS.map((opt, i) => {
        const active = opt.code === locale;
        return (
          <span key={opt.code} className="contents">
            {i > 0 && <span className="text-[color:var(--color-muted)]/50 select-none">·</span>}
            <button
              type="button"
              onClick={() => setLocale(opt.code)}
              aria-pressed={active}
              className={
                'px-1.5 py-1 leading-none ' +
                (active
                  ? 'text-[color:var(--color-ink)]'
                  : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]')
              }
            >
              {opt.label}
            </button>
          </span>
        );
      })}
    </div>
  );
}
