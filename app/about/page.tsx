'use client';

import Image from 'next/image';
import { useLocale, UI_STRINGS } from '@/lib/i18n';
import { studio, works, primaryImageUrl } from '@/lib/works';

export default function AboutPage() {
  const { locale } = useLocale();

  // Use a workshop-context image as the about hero — feels like a place, not a product shot.
  const featured = works.find((w) => w.id === '01-walnut-chest') ?? works[0];

  return (
    <div className="mx-auto max-w-[1200px] px-6 sm:px-10 pt-12 sm:pt-20 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-paper-soft)]">
            <Image
              src={primaryImageUrl(featured)}
              alt={featured.name[locale]}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-5 lg:order-1 lg:pt-4">
          <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-muted)] mb-6">
            {UI_STRINGS.about[locale]}
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-[-0.01em]">
            {studio.atelier[locale]}
          </h1>
          <p className="mt-8 text-[17px] leading-relaxed text-[color:var(--color-ink-soft)] text-pretty">
            {studio.about[locale]}
          </p>

          <div className="mt-12 pt-8 border-t border-[color:var(--color-rule)]/60">
            <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-muted)] mb-3">
              {UI_STRINGS.inquiries[locale]}
            </div>
            <a
              href="mailto:studio@qualiseram.com"
              className="font-[family-name:var(--font-display)] text-2xl hover:text-[color:var(--color-umber)] transition-colors duration-200 underline-offset-4 hover:underline"
            >
              studio@qualiseram.com
            </a>
            <div className="text-[13px] text-[color:var(--color-muted)] mt-2">
              {UI_STRINGS.inquiriesHint[locale]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
