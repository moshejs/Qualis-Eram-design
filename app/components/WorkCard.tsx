'use client';

import Image from 'next/image';
import { useLocale, UI_STRINGS } from '@/lib/i18n';
import { primaryImageUrl } from '@/lib/works';
import type { Work } from '@/lib/types';

type Props = {
  work: Work;
  index: number;
  span?: 'tall' | 'normal';
  onOpen: (work: Work) => void;
};

export default function WorkCard({ work, index, span = 'normal', onOpen }: Props) {
  const { locale } = useLocale();
  const aspect = span === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/5]';

  // Cap stagger delay so later cards don't lag visibly on first paint.
  const delay = Math.min(index * 50, 400);

  return (
    <button
      type="button"
      onClick={() => onOpen(work)}
      className="work-card stagger-item group block w-full text-start"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`relative ${aspect} overflow-hidden bg-[color:var(--color-paper-soft)]`}>
        <Image
          src={primaryImageUrl(work)}
          alt={work.name[locale]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="work-card-image object-cover"
          priority={index < 3}
        />
      </div>

      <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-[22px] leading-tight text-[color:var(--color-ink)]">
          {work.name[locale]}
        </h3>
        <span className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-muted)] tabular-nums whitespace-nowrap">
          {work.year ?? '—'}
        </span>
      </div>

      <div className="mt-1 flex items-center gap-3 text-[13px] text-[color:var(--color-ink-soft)]">
        <span className="text-[color:var(--color-muted)] truncate">{work.material[locale]}</span>
      </div>

      <div className="mt-2">
        <span className="inline-block text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-umber)] border-b border-[color:var(--color-umber)]/30 pb-px">
          {UI_STRINGS[work.type][locale]}
        </span>
      </div>
    </button>
  );
}
