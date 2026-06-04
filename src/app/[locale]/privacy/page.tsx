import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: `${t('title')} — LONDON ROUTE TRANSFERS`,
    description: t('description'),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy');
  const sectionCount = 10;

  return (
    <div className="max-w-[800px] mx-auto py-8 sm:py-12 px-4 sm:px-5">
      <div className="w-10 h-0.5 bg-[var(--brand-gold)] mb-4 sm:mb-5" />
      <h1 className="font-serif text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 text-[var(--brand-navy)]">{t('title')}</h1>

      {Array.from({ length: sectionCount }, (_, i) => {
        const num = i + 1;
        const titleKey = `section${num}Title`;
        const textKey = `section${num}Text`;
        return (
          <div key={num}>
            <h2 className="font-serif text-base sm:text-lg mt-6 sm:mt-10 mb-2 sm:mb-3 text-[var(--brand-navy)] flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[var(--brand-gold)] rounded-full inline-block shrink-0" />
              {t(titleKey)}
            </h2>
            <div className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-3 sm:mb-4 whitespace-pre-line border-l-2 border-[var(--brand-gold)]/30 pl-3 sm:pl-4">{t(textKey)}</div>
          </div>
        );
      })}
    </div>
  );
}
