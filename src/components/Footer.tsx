import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function Footer() {
  const t = await getTranslations('common.footer');
  const nav = await getTranslations('common.nav');

  return (
    <footer className="bg-[var(--brand-navy)] text-[var(--bg-cream)] text-sm">
      {/* Gold divider */}
      <div className="h-px bg-[var(--brand-gold)]" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 pt-10 sm:pt-14 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {/* Company */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--brand-gold)] mb-3 sm:mb-4 font-serif tracking-wide">
              {t('company')}
            </h3>
            <p className="leading-relaxed text-[var(--bg-cream)]/70 text-xs sm:text-sm">{t('companyDesc')}</p>
          </div>

          {/* Legal details */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--brand-gold)] mb-3 sm:mb-4 font-serif tracking-wide">
              {t('legalTitle')}
            </h3>
            <div className="space-y-1.5 text-[0.65rem] sm:text-xs">
              <p><span className="font-semibold text-[var(--bg-cream)]/90">{t('companyNumber')}:</span> 00000000</p>
              <p><span className="font-semibold text-[var(--bg-cream)]/90">{t('registeredOffice')}:</span> 10 Example House, London, United Kingdom</p>
              <p><span className="font-semibold text-[var(--bg-cream)]/90">{t('vatNumber')}:</span> GB 000000000</p>
            </div>
          </div>

          {/* Legal text */}
          <div className="space-y-3 text-[0.65rem] sm:text-xs text-[var(--bg-cream)]/60 leading-relaxed sm:col-span-2 md:col-span-1">
            <p>{t('legalText1')}</p>
            <p>{t('legalText2')}</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--brand-gold)]/30">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.65rem] sm:text-xs text-[var(--bg-cream)]/50">
          <span>{t('copyright')}</span>
          <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
            <Link href="/privacy" className="text-[var(--brand-gold-light)]/70 no-underline hover:text-[var(--brand-gold)]">
              {nav('privacy')}
            </Link>
            <Link href="/cookie" className="text-[var(--brand-gold-light)]/70 no-underline hover:text-[var(--brand-gold)]">
              {nav('cookie')}
            </Link>
            <Link href="/terms" className="text-[var(--brand-gold-light)]/70 no-underline hover:text-[var(--brand-gold)]">
              {nav('terms')}
            </Link>
            <Link href="/transport-terms" className="text-[var(--brand-gold-light)]/70 no-underline hover:text-[var(--brand-gold)]">
              {nav('transportTerms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
