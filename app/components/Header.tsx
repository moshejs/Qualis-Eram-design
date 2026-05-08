'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, UI_STRINGS } from '@/lib/i18n';
import { studio } from '@/lib/works';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { locale } = useLocale();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[color:var(--color-paper)]/82 border-b border-[color:var(--color-rule)]/40">
      <div className="mx-auto max-w-[1400px] flex items-center justify-between gap-6 px-5 sm:px-10 py-3 sm:py-4">
        <Link href="/" className="group leading-none flex items-center gap-3 text-[color:var(--color-ink)]" aria-label={studio.name}>
          <Image
            src="/brand/wordmark.png"
            alt={studio.name}
            width={1480}
            height={358}
            priority
            sizes="(max-width: 640px) 220px, 280px"
            className="h-[26px] sm:h-[30px] w-auto select-none"
          />
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7 text-[13px] sm:text-sm">
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
          <span className="hidden sm:inline w-px h-3 bg-[color:var(--color-rule)]" aria-hidden />
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
