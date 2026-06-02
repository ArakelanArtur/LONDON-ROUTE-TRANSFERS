import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  return {
    title: `${t('title')} — LONDON ROUTE TRANSFERS`,
  };
}

export default async function TermsPage() {
  const t = await getTranslations('terms');
  const sectionCount = 12;

  return (
    <div className="max-w-[800px] mx-auto py-10 px-5">
      <h1 className="font-serif text-2xl mb-6 text-black">{t('title')}</h1>

      {Array.from({ length: sectionCount }, (_, i) => {
        const num = i + 1;
        const titleKey = `section${num}Title`;
        const textKey = `section${num}Text`;
        return (
          <div key={num}>
            <h2 className="font-serif text-lg mt-8 mb-3 text-black">{t(titleKey)}</h2>
            <div className="text-sm text-gray-700 leading-relaxed mb-4 whitespace-pre-line">{t(textKey)}</div>
          </div>
        );
      })}
    </div>
  );
}
