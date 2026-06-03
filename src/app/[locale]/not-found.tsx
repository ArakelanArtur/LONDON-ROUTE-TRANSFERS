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
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-6xl text-[var(--brand-navy)] mb-4">{t('heading')}</h1>
        <p className="text-[var(--text-main)]/70 mb-6">{t('text')}</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[var(--brand-burgundy)] text-white rounded-md text-sm no-underline hover:bg-[var(--brand-navy)] transition-all duration-500 ease-in-out"
        >
          {t('link')}
        </Link>
      </div>
    </div>
  );
}
