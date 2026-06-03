import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default async function Header() {
  const t = await getTranslations('common');

  return (
    <header className="bg-white border-b border-[var(--text-main)]/10 mb-5">
      <div className="max-w-[1200px] mx-auto px-8 sm:px-12 py-7 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <Link href="/" className="no-underline">
          <h1 className="font-serif text-[2rem] md:text-[2.2rem] text-[var(--brand-navy)] font-bold m-0">
            {t('siteName')}
          </h1>
        </Link>
          <nav className="flex items-center gap-8 flex-nowrap justify-center">
          <Link href="/" className="text-lg text-[var(--text-main)] no-underline whitespace-nowrap hover:text-[var(--brand-burgundy)] transition-all duration-500 ease-in-out">
            {t('nav.home')}
          </Link>
          <Link href="/services" className="text-lg text-[var(--text-main)] no-underline whitespace-nowrap hover:text-[var(--brand-burgundy)] transition-all duration-500 ease-in-out">
            {t('nav.services')}
          </Link>
          <Link href="/booking" className="text-lg text-[var(--text-main)] no-underline whitespace-nowrap hover:text-[var(--brand-burgundy)] transition-all duration-500 ease-in-out">
            {t('nav.booking')}
          </Link>
          <Link href="/manager" className="text-lg text-[var(--text-main)] no-underline whitespace-nowrap hover:text-[var(--brand-burgundy)] transition-all duration-500 ease-in-out">
            {t('nav.manager')}
          </Link>
          <span className="flex items-center gap-4 flex-nowrap">
            <Link href="/#contacts" className="text-lg text-[var(--text-main)] no-underline whitespace-nowrap hover:text-[var(--brand-burgundy)] transition-all duration-500 ease-in-out">
              {t('nav.contacts')}
            </Link>
            <LanguageSwitcher />
          </span>
        </nav>
      </div>
    </header>
  );
}
