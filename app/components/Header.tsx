'use client';

import Link from 'next/link';
import { useLocale, UI_STRINGS } from '@/lib/i18n';
import { studio } from '@/lib/works';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { locale } = useLocale();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[color:var(--color-paper)]/80 border-b border-[color:var(--color-rule)]/40">
      <div className="mx-auto max-w-[1400px] flex items-center justify-between px-6 sm:px-10 py-4 sm:py-5">
        <Link href="/" className="group leading-none flex items-baseline gap-3 text-[color:var(--color-ink)]">
          <span className="font-[family-name:var(--font-display)] text-2xl sm:text-[28px] tracking-tight">
            {studio.name}
          </span>
          <span className="hidden sm:inline text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            {studio.atelier[locale]}
          </span>
        </Link>

        <nav className="flex items-center gap-6 sm:gap-8 text-sm">
          <Link
            href="/"
            className="hover:text-[color:var(--color-umber)] transition-colors duration-200"
          >
            {UI_STRINGS.works[locale]}
          </Link>
          <Link
            href="/about"
            className="hover:text-[color:var(--color-umber)] transition-colors duration-200"
          >
            {UI_STRINGS.about[locale]}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
