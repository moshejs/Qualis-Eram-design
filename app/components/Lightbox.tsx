'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, UI_STRINGS } from '@/lib/i18n';
import { imageUrl } from '@/lib/works';
import type { Work } from '@/lib/types';

type Props = {
  work: Work;
  onClose: () => void;
  onNeighbor: (delta: 1 | -1) => void;
};

export default function Lightbox({ work, onClose, onNeighbor }: Props) {
  const { locale, dir } = useLocale();
  const [imageIndex, setImageIndex] = useState(work.primaryImageIndex);
  const [zoomed, setZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);

  // Reset image index when the work changes (when arrowing between works).
  useEffect(() => {
    setImageIndex(work.primaryImageIndex);
    setZoomed(false);
  }, [work.id, work.primaryImageIndex]);

  const total = work.images.length;
  const goNext = useCallback(() => setImageIndex((i) => (i + 1) % total), [total]);
  const goPrev = useCallback(() => setImageIndex((i) => (i - 1 + total) % total), [total]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomed) setZoomed(false);
        else onClose();
      } else if (e.key === 'ArrowRight') {
        // In RTL, visual right is "previous" image
        if (dir === 'rtl') goPrev();
        else goNext();
      } else if (e.key === 'ArrowLeft') {
        if (dir === 'rtl') goNext();
        else goPrev();
      } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        onNeighbor(1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        onNeighbor(-1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, onClose, onNeighbor, zoomed, dir]);

  // Lock body scroll while open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dt = Date.now() - touchStartTime.current;
    const velocity = Math.abs(dx) / Math.max(dt, 1);
    const threshold = 60;
    if (Math.abs(dx) > threshold || velocity > 0.4) {
      // In RTL the swipe direction → image index map flips
      const swipedNext = dir === 'rtl' ? dx > 0 : dx < 0;
      if (swipedNext) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  // Translate offset for slide track. Negative for LTR, positive for RTL.
  const translatePercent = dir === 'rtl' ? imageIndex * 100 : imageIndex * -100;

  return (
    <div
      className="lightbox-overlay fixed inset-0 z-50 flex flex-col bg-[color:var(--color-paper)]/96 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={work.name[locale]}
      onClick={(e) => {
        // Click on the backdrop (not on inner content) closes.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lightbox-content flex flex-col h-full" style={{ transformOrigin: 'center' }}>
        {/* Top bar */}
        <div className="flex items-start justify-between gap-6 px-5 sm:px-10 pt-5 sm:pt-7">
          <div className="min-w-0">
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-[34px] leading-[1.05] text-[color:var(--color-ink)]">
              {work.name[locale]}
            </h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-muted)] tabular-nums">
              {work.year && <span>{work.year}</span>}
              <span className="text-[color:var(--color-umber)]">{UI_STRINGS[work.type][locale]}</span>
              <span className="normal-case tracking-normal text-[13px] text-[color:var(--color-ink-soft)] truncate max-w-[60ch]">
                {work.material[locale]}
              </span>
            </div>
          </div>

          <button
            type="button"
            aria-label={UI_STRINGS.close[locale]}
            onClick={onClose}
            className="shrink-0 -m-2 p-2 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] transition-colors duration-200"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
              <path d="M5 5 L17 17 M17 5 L5 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Carousel */}
        <div
          className="relative flex-1 overflow-hidden mt-4 sm:mt-6"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="carousel-track flex h-full"
            style={{ transform: `translateX(${translatePercent}%)` }}
          >
            {work.images.map((_, i) => (
              <div key={i} className="relative shrink-0 w-full h-full px-5 sm:px-10 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  className={`relative w-full h-full ${zoomed ? 'zoomed' : 'unzoomed'}`}
                  aria-label={UI_STRINGS.zoom[locale]}
                >
                  <Image
                    src={imageUrl(work, i)}
                    alt=""
                    fill
                    sizes="100vw"
                    className={`object-contain transition-transform duration-300 ease-out ${
                      zoomed && i === imageIndex ? 'scale-[1.6]' : 'scale-100'
                    }`}
                    priority={i === work.primaryImageIndex}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Side nav buttons (hidden when zoomed for clarity) */}
          {!zoomed && total > 1 && (
            <>
              <button
                type="button"
                aria-label={UI_STRINGS.previous[locale]}
                onClick={goPrev}
                className="absolute top-1/2 -translate-y-1/2 start-2 sm:start-4 w-10 h-10 grid place-items-center text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] bg-[color:var(--color-paper)]/60 hover:bg-[color:var(--color-paper)]/85 backdrop-blur-sm rounded-full transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="flip-rtl">
                  <path d="M11 4 L5 9 L11 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={UI_STRINGS.next[locale]}
                onClick={goNext}
                className="absolute top-1/2 -translate-y-1/2 end-2 sm:end-4 w-10 h-10 grid place-items-center text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] bg-[color:var(--color-paper)]/60 hover:bg-[color:var(--color-paper)]/85 backdrop-blur-sm rounded-full transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="flip-rtl">
                  <path d="M7 4 L13 9 L7 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Description + thumbs */}
        <div className="px-5 sm:px-10 pt-5 pb-6 sm:pb-8 space-y-4">
          <p className="max-w-2xl text-[15px] leading-relaxed text-[color:var(--color-ink-soft)] text-pretty">
            {work.description[locale]}
          </p>

          {total > 1 && (
            <div className="flex items-center gap-3">
              <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
                {work.images.map((img, i) => {
                  const active = i === imageIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageIndex(i)}
                      aria-label={`${i + 1} / ${total}`}
                      aria-pressed={active}
                      className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 overflow-hidden bg-[color:var(--color-paper-soft)] transition-opacity duration-200 ${
                        active ? 'opacity-100 ring-1 ring-[color:var(--color-ink)]' : 'opacity-50 hover:opacity-90'
                      }`}
                    >
                      <Image
                        src={imageUrl(work, i)}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
              <div className="ms-auto text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)] tabular-nums whitespace-nowrap">
                {UI_STRINGS.imageOf[locale](imageIndex + 1, total)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
