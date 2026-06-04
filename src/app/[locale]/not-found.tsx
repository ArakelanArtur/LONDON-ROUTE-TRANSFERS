import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function generateMetadata() {
  const t = await getTranslations('notFound');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-5">
      <div className="text-center">
        <div className="w-12 sm:w-16 h-0.5 bg-[var(--brand-gold)] mx-auto mb-4 sm:mb-6" />
        <h1 className="font-serif text-5xl sm:text-7xl text-[var(--brand-navy)] mb-2">{t('heading')}</h1>
        <p className="text-[0.65rem] sm:text-sm text-[var(--text-muted)] uppercase tracking-widest mb-6 sm:mb-8">{t('text')}</p>
        <Link
          href="/"
          className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-[var(--brand-navy)] text-[var(--brand-gold)] rounded-sm text-xs sm:text-sm no-underline font-serif tracking-wide hover:bg-[var(--brand-gold)] hover:text-[var(--brand-navy)] transition-colors"
        >
          {t('link')}
        </Link>
      </div>
    </div>
  );
}
