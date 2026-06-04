import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import MobileNav from './MobileNav';

export default async function Header() {
  const t = await getTranslations('common');

  return (
    <header className="bg-[var(--brand-navy)] border-b-2 border-[var(--brand-gold)]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 py-4 md:py-5 flex items-center justify-between">
        <Link href="/" className="no-underline shrink-0">
          <h1 className="font-serif text-[1.1rem] sm:text-[1.4rem] md:text-[1.9rem] text-white font-bold m-0 tracking-wide">
            {t('siteName')}
          </h1>
        </Link>
        <MobileNav />
      </div>
    </header>
  );
}
