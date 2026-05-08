'use client';

import Image from 'next/image';
import { useLocale, UI_STRINGS } from '@/lib/i18n';
import { studio, works, primaryImageUrl } from '@/lib/works';

export default function Hero() {
  const { locale } = useLocale();

  // Featured: a recent installed built-in — feels like a place, not a product.
  const featured = works.find((w) => w.id === '17-lacewood-builtin') ?? works[works.length - 1];

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 pt-10 sm:pt-16 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <div className="lg:col-span-5 lg:pb-4">
            <div className="flex items-center gap-3 mb-7">
              <Image
                src="/brand/seal.png"
                alt=""
                width={590}
                height={727}
                aria-hidden
                className="h-14 w-auto opacity-80"
                sizes="56px"
              />
              <div className="text-[10px] uppercase tracking-[0.32em] text-[color:var(--color-muted)] leading-tight">
                <div>Estd {studio.established}</div>
                <div className="text-[color:var(--color-umber)]">{studio.motto[locale]}</div>
              </div>
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-[44px] leading-[1] sm:text-[68px] lg:text-[88px] tracking-[-0.02em] text-[color:var(--color-ink)] text-balance">
              {studio.name}
            </h1>

            <p className="mt-7 max-w-md text-[17px] leading-relaxed text-[color:var(--color-ink-soft)] text-balance">
              {studio.tagline[locale]}
            </p>

            <div className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-umber)]">
              <span className="w-6 h-px bg-[color:var(--color-umber)]/50" aria-hidden />
              <span>{UI_STRINGS.selectedWorks[locale]}</span>
            </div>
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
