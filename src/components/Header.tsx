import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('common');

  return (
    <header className="bg-white border-b border-gray-200 mb-5">
      <div className="max-w-[1100px] mx-auto px-10 py-5 flex flex-col items-center gap-3 md:flex-row md:justify-between">
        <Link href="/" className="no-underline">
          <h1 className="font-serif text-[1.7rem] text-black font-bold m-0">
            {t('siteName')}
          </h1>
        </Link>
        <nav className="flex items-center gap-4 flex-wrap justify-center">
          <Link href="/" className="text-sm text-gray-700 no-underline hover:text-gold transition-colors">
            {t('nav.home')}
          </Link>
          <Link href="/#services" className="text-sm text-gray-700 no-underline hover:text-gold transition-colors">
            {t('nav.services')}
          </Link>
          <Link href="/booking" className="text-sm text-gray-700 no-underline hover:text-gold transition-colors">
            {t('nav.booking')}
          </Link>
          <Link href="/manager" className="text-sm text-gray-700 no-underline hover:text-gold transition-colors">
            {t('nav.manager')}
          </Link>
          <span className="flex items-center gap-1">
            <Link href="/#contacts" className="text-sm text-gray-700 no-underline hover:text-gold transition-colors">
              {t('nav.contacts')}
            </Link>
            <LanguageSwitcher />
          </span>
        </nav>
      </div>
    </header>
  );
}
