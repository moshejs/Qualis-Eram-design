'use client';

import Image from 'next/image';
import { useLocale, UI_STRINGS } from '@/lib/i18n';
import { studio } from '@/lib/works';

export default function Footer() {
  const { locale } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--color-rule)]/50 mt-32 bg-[color:var(--color-paper-soft)]/40">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-3 gap-10 items-start">
        <div>
          <Image
            src="/brand/seal.png"
            alt={studio.name}
            width={590}
            height={727}
            sizes="80px"
            className="h-20 w-auto mb-3"
          />
          <div className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-umber)]">
            {studio.motto[locale]}
          </div>
        </div>

        <div className="text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)] mb-2">
            {UI_STRINGS.inquiries[locale]}
          </div>
          <a
            href="mailto:studio@qualiseramdesign.com"
            className="hover:text-[color:var(--color-umber)] transition-colors duration-200 underline-offset-4 hover:underline"
          >
            studio@qualiseramdesign.com
          </a>
          <div className="text-[color:var(--color-muted)] mt-1 text-[13px]">
            {UI_STRINGS.inquiriesHint[locale]}
          </div>
        </div>

        <div className="sm:text-end text-xs text-[color:var(--color-muted)] tabular-nums">
          <div className="font-[family-name:var(--font-display)] text-[15px] tracking-tight text-[color:var(--color-ink-soft)] not-italic mb-1">
            {studio.name}
          </div>
          <div>Estd {studio.established} · © {year}</div>
        </div>
      </div>
    </footer>
  );
}
