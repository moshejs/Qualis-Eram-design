'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Locale } from './types';

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  dir: 'ltr' | 'rtl';
};

const I18nContext = createContext<I18nContextValue | null>(null);

const LOCALES: Locale[] = ['en', 'he', 'la'];

function isLocale(value: string | null): value is Locale {
  return value !== null && LOCALES.includes(value as Locale);
}

const dirFor = (locale: Locale): 'ltr' | 'rtl' => (locale === 'he' ? 'rtl' : 'ltr');

const STORAGE_KEY = 'reno.locale';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored)) {
        setLocaleState(stored);
        applyToDocument(stored);
      } else {
        applyToDocument('en');
      }
    } catch {
      applyToDocument('en');
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    applyToDocument(next);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, dir: dirFor(locale) }}>
      {children}
    </I18nContext.Provider>
  );
}

function applyToDocument(locale: Locale) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  html.lang = locale;
  html.dir = dirFor(locale);
  html.dataset.locale = locale;
}

export function useLocale() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useLocale must be inside I18nProvider');
  return ctx;
}

export const UI_STRINGS = {
  works: { en: 'Works', he: 'עבודות', la: 'Opera' },
  about: { en: 'About', he: 'אודות', la: 'De studio' },
  studio: { en: 'studio', he: 'סטודיו', la: 'ex officina' },
  commissioned: { en: 'commissioned', he: 'הזמנה', la: 'ad mandatum' },
  inquiries: {
    en: 'Inquiries',
    he: 'פניות',
    la: 'Quaestiones',
  },
  inquiriesHint: {
    en: 'For a piece of your own.',
    he: 'לחפץ משלך.',
    la: 'Pro opere proprio.',
  },
  close: { en: 'Close', he: 'סגור', la: 'Claude' },
  next: { en: 'Next', he: 'הבא', la: 'Sequens' },
  previous: { en: 'Previous', he: 'הקודם', la: 'Praecedens' },
  zoom: { en: 'Zoom', he: 'הגדל', la: 'Auge' },
  material: { en: 'Material', he: 'חומר', la: 'Materia' },
  year: { en: 'Year', he: 'שנה', la: 'Annus' },
  selectedWorks: {
    en: 'Selected works below',
    he: 'מבחר עבודות',
    la: 'Opera selecta',
  },
  atTheBench: {
    en: 'At the bench',
    he: 'בסדנה',
    la: 'Ad Bancum',
  },
  inAcademia: {
    en: 'In academia',
    he: 'באקדמיה',
    la: 'In Academia',
  },
  education: {
    en: 'Education',
    he: 'השכלה',
    la: 'Studia',
  },
  imageOf: {
    en: (i: number, total: number) => `${i} / ${total}`,
    he: (i: number, total: number) => `${i} / ${total}`,
    la: (i: number, total: number) => `${i} / ${total}`,
  },
} as const;
