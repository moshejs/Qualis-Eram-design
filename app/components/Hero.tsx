'use client';

import Image from 'next/image';
import { useLocale } from '@/lib/i18n';
import { studio, works, primaryImageUrl } from '@/lib/works';

export default function Hero() {
  const { locale } = useLocale();

  // Pick a recent commissioned built-in for the hero — feels installed and lived-in.
  const featured = works.find((w) => w.id === '17-lacewood-builtin') ?? works[works.length - 1];

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 pt-12 sm:pt-20 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-muted)] mb-6">
              {studio.atelier[locale]}
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[64px] leading-[0.95] sm:text-[96px] lg:text-[120px] tracking-[-0.02em] text-[color:var(--color-ink)]">
              {studio.name}
            </h1>
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-[color:var(--color-ink-soft)] text-balance">
              {studio.tagline[locale]}
            </p>
          </div>

          <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden bg-[color:var(--color-paper-soft)]">
            <Image
              src={primaryImageUrl(featured)}
              alt={featured.name[locale]}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute bottom-3 end-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] bg-[color:var(--color-paper)]/85 backdrop-blur-sm text-[color:var(--color-ink-soft)]">
              {featured.name[locale]}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
