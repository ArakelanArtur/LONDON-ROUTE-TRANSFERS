import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function Footer() {
  const t = await getTranslations('common.footer');
  const nav = await getTranslations('common.nav');

  return (
    <footer className="bg-[var(--brand-navy)] text-white text-base px-8 py-14 md:px-16 md:py-14 border-t border-[var(--brand-burgundy)]">
      <div className="max-w-[900px] mx-auto text-center space-y-5">
        <h3 className="text-xl font-bold text-white mb-4 font-serif">
          {t('company')}
        </h3>
        <p className="leading-relaxed">{t('companyDesc')}</p>
        <h3 className="text-xl font-bold text-white mb-4 font-serif">{t('legalTitle')}</h3>
        <div className="space-y-2 mb-6">
          <p><span className="font-bold text-gray-300">{t('companyNumber')}:</span> 00000000</p>
          <p><span className="font-bold text-gray-300">{t('registeredOffice')}:</span> 10 Example House, London, United Kingdom</p>
          <p><span className="font-bold text-gray-300">{t('vatNumber')}:</span> GB 000000000</p>
        </div>
        <div className="space-y-4">
          <p className="leading-relaxed">{t('legalText1')}</p>
          <p className="leading-relaxed">{t('legalText2')}</p>
        </div>
      </div>
      <div className="text-center pt-6 mt-10 border-t border-gray-700 text-white text-base">
        {t('copyright')}{' '}
        <Link href="/privacy" className="text-white underline hover:text-[var(--brand-burgundy)] transition-all duration-500 ease-in-out">
          {nav('privacy')}
        </Link>{' '}
        |{' '}
        <Link href="/cookie" className="text-white underline hover:text-[var(--brand-burgundy)] transition-all duration-500 ease-in-out">
          {nav('cookie')}
        </Link>{' '}
        |{' '}
        <Link href="/terms" className="text-white underline hover:text-[var(--brand-burgundy)] transition-all duration-500 ease-in-out">
          {nav('terms')}
        </Link>{' '}
        |{' '}
        <Link href="/transport-terms" className="text-white underline hover:text-[var(--brand-burgundy)] transition-all duration-500 ease-in-out">
          {nav('transportTerms')}
        </Link>
      </div>
    </footer>
  );
}
