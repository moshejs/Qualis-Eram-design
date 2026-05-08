'use client';

import Image from 'next/image';
import { useLocale, UI_STRINGS } from '@/lib/i18n';
import { studio } from '@/lib/works';

const BIO = {
  en: (
    <>
      <p>
        The workshop is run by <strong>Edward Reno</strong>. By day, he is Associate Professor of History
        and Department Chair in the College of Arts and Sciences at Adelphi University, where he teaches
        and writes on medieval canon law, the codicology and paleography of medieval manuscripts, and the
        history of the book.
      </p>
      <p>
        The same attention to material, structure, and provenance that shapes the scholarship informs the
        work at the bench. A piece of furniture is, after all, also a record — of the wood it came from,
        of the hands that cut and joined it, of the room it was made for. Some pieces here were built on
        speculation, the way a manuscript was once copied for the maker's own shelf. Others were
        commissioned to the dimensions of a particular wall.
      </p>
    </>
  ),
  he: (
    <>
      <p>
        הסדנה מנוהלת בידי <strong>אדוארד רנו</strong>. ביומיום הוא פרופסור-חבר להיסטוריה וראש החוג בקולג׳
        לאמנויות ולמדעים באוניברסיטת אדלפי, שם הוא מלמד וכותב על דין קנוני מימי הביניים, על קודיקולוגיה
        ופלאוגרפיה של כתבי-יד מימי הביניים, ועל תולדות הספר.
      </p>
      <p>
        אותה תשומת לב לחומר, למבנה ולמקור שמעצבת את העבודה האקדמית מנחה גם את העבודה על הספסל. רהיט הוא
        בסופו של דבר תעוד — של העץ שממנו בא, של הידיים שחתכו וחיברו אותו, של החדר שלמענו נבנה. חלק
        מהפריטים כאן נבנו על דעת עצמם, כדרך שכתב-יד הועתק פעם למדף המעתיק עצמו. אחרים הוזמנו במידות של
        קיר מסוים.
      </p>
    </>
  ),
  la: (
    <>
      <p>
        Officinam regit <strong>Eduardus Reno</strong>. Per diem est Professor Adiunctus Historiae et
        Praeses Facultatis in Collegio Artium et Scientiarum apud Universitatem Adelphi, ubi de iure
        canonico medii aevi, de codicologia et paleographia codicum manu scriptorum, et de historia libri
        docet et scribit.
      </p>
      <p>
        Eadem cura materiae, structurae, et originis quae studia format etiam opus ad bancum dirigit.
        Suppellex enim et ipsa monumentum est — ligni unde venit, manuum quae secuerunt et iunxerunt,
        cellae cui parata est. Quaedam hic opera sponte facta sunt, sicut codex olim ad pluteum ipsius
        scribae transcriptus. Alia ad mensuram parietis certi mandata.
      </p>
    </>
  ),
};

const CREDENTIALS = [
  { year: 2011, line: { en: 'Ph.D., Columbia University', he: 'דוקטורט, אוניברסיטת קולומביה', la: 'Doctor Philosophiae, Universitas Columbia' } },
  { year: 1998, line: { en: 'B.A., University of Chicago', he: 'תואר ראשון, אוניברסיטת שיקגו', la: 'Baccalaureus, Universitas Chicagiensis' } },
  { year: 1993, line: { en: 'Diploma, Regis High School', he: 'תעודת בגרות, תיכון רג׳יס', la: 'Diploma, Schola Regiana' } },
];

const APPOINTMENT = {
  en: 'Associate Professor & Chair of History · Adelphi University',
  he: 'פרופסור-חבר וראש החוג להיסטוריה · אוניברסיטת אדלפי',
  la: 'Professor Adiunctus & Praeses Historiae · Universitas Adelphi',
};

const FIELDS = {
  en: 'Medieval Canon Law · Codicology & Paleography · History of the Book',
  he: 'דין קנוני מימי הביניים · קודיקולוגיה ופלאוגרפיה · תולדות הספר',
  la: 'Ius Canonicum Medii Aevi · Codicologia & Paleographia · Historia Libri',
};

export default function AboutPage() {
  const { locale } = useLocale();

  return (
    <article className="mx-auto max-w-[1100px] px-6 sm:px-10 pt-10 sm:pt-14 pb-20">
      {/* Workshop image, full width */}
      <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-[color:var(--color-paper-soft)] mb-10 sm:mb-14">
        <Image
          src="/brand/workshop.jpg"
          alt="A workbench mid-job: chisels, mallet, plane, and dovetail jig in a dust of shavings."
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1100px"
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-8">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-muted)] mb-5">
            {UI_STRINGS.about[locale]}
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-[40px] sm:text-[56px] lg:text-[68px] leading-[1.02] tracking-[-0.01em]">
            Edward Reno
          </h1>
          <div className="mt-2 text-[13px] uppercase tracking-[0.18em] text-[color:var(--color-umber)]">
            {studio.motto[locale]}
          </div>

          <div className="mt-8 space-y-5 text-[16px] sm:text-[17px] leading-[1.7] text-[color:var(--color-ink-soft)] text-pretty">
            {BIO[locale]}
          </div>
        </div>

        <aside className="lg:col-span-4 lg:pt-12 lg:border-s lg:ps-10 lg:border-[color:var(--color-rule)]/60">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] mb-3">
            {UI_STRINGS.inAcademia[locale]}
          </div>
          <p className="text-[14px] leading-relaxed text-[color:var(--color-ink-soft)] mb-2">
            {APPOINTMENT[locale]}
          </p>
          <p className="text-[13px] leading-relaxed text-[color:var(--color-muted)] italic">
            {FIELDS[locale]}
          </p>

          <div className="mt-8 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] mb-3">
            {UI_STRINGS.education[locale]}
          </div>
          <ul className="space-y-2 text-[14px] tabular-nums">
            {CREDENTIALS.map((c) => (
              <li key={c.year} className="flex items-baseline gap-3">
                <span className="text-[12px] text-[color:var(--color-muted)] tracking-[0.05em] shrink-0">{c.year}</span>
                <span className="text-[color:var(--color-ink-soft)]">{c.line[locale]}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* At the bench section */}
      <div className="mt-16 sm:mt-20 max-w-2xl">
        <div className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] mb-4">
          {UI_STRINGS.atTheBench[locale]}
        </div>
        <p className="text-[16px] sm:text-[17px] leading-[1.7] text-[color:var(--color-ink-soft)] text-pretty">
          {studio.about[locale]}
        </p>
      </div>

      {/* Inquiries */}
      <div className="mt-16 sm:mt-24 pt-10 border-t border-[color:var(--color-rule)]/60 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 items-start">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] mb-3">
            {UI_STRINGS.inquiries[locale]}
          </div>
          <a
            href="mailto:studio@qualiseramdesign.com"
            className="font-[family-name:var(--font-display)] text-2xl sm:text-[28px] hover:text-[color:var(--color-umber)] transition-colors duration-200 underline-offset-4 hover:underline"
          >
            studio@qualiseramdesign.com
          </a>
          <div className="text-[13px] text-[color:var(--color-muted)] mt-2">
            {UI_STRINGS.inquiriesHint[locale]}
          </div>
        </div>

        <div className="text-[12px] text-[color:var(--color-muted)] sm:text-end leading-relaxed">
          {studio.name} · Estd {studio.established}
        </div>
      </div>
    </article>
  );
}
