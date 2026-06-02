import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('common.footer');
  const nav = useTranslations('common.nav');

  return (
    <footer className="bg-black text-white text-sm px-6 py-10 md:px-14 md:py-10 border-t border-gray-800">
      <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
        <div className="flex flex-col justify-center">
          <h3 className="text-[0.95rem] font-bold text-white mb-3 font-serif">
            {t('company')}
          </h3>
          <p className="mb-2.5 leading-relaxed">{t('companyDesc')}</p>
          <dl className="text-center">
            <dt className="font-bold text-gray-300 inline after:content-[':_']">{t('companyNumber')}</dt>
            <dd className="inline text-white after:block after:mb-1">00000000</dd>
            <dt className="font-bold text-gray-300 inline after:content-[':_']">{t('registeredOffice')}</dt>
            <dd className="inline text-white after:block after:mb-1">10 Example House, London, United Kingdom</dd>
            <dt className="font-bold text-gray-300 inline after:content-[':_']">{t('vatNumber')}</dt>
            <dd className="inline text-white after:block after:mb-1">GB 000000000</dd>
          </dl>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-[0.95rem] font-bold text-white mb-3 font-serif">{t('legalTitle')}</h3>
          <p className="mb-2.5 leading-relaxed">{t('legalText1')}</p>
          <p className="mb-2.5 leading-relaxed">{t('legalText2')}</p>
        </div>
      </div>
      <div className="text-center pt-5 mt-8 border-t border-gray-700 text-white text-sm">
        {t('copyright')}{' '}
        <Link href="/privacy" className="text-white underline hover:text-gold transition-colors">
          {nav('privacy')}
        </Link>{' '}
        |{' '}
        <Link href="/cookie" className="text-white underline hover:text-gold transition-colors">
          {nav('cookie')}
        </Link>{' '}
        |{' '}
        <Link href="/terms" className="text-white underline hover:text-gold transition-colors">
          {nav('terms')}
        </Link>{' '}
        |{' '}
        <Link href="/transport-terms" className="text-white underline hover:text-gold transition-colors">
          {nav('transportTerms')}
        </Link>
      </div>
    </footer>
  );
}
