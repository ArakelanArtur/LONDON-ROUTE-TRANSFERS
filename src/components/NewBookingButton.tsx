'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NewBookingButton() {
  const t = useTranslations('manager');
  return (
    <Link
      href="/booking"
      className="font-serif px-6 sm:px-8 py-2.5 sm:py-3 bg-[var(--brand-gold)] text-[var(--brand-navy)] border-none rounded-sm text-xs sm:text-sm no-underline cursor-pointer font-semibold tracking-wide uppercase hover:bg-[var(--brand-gold-light)] transition-colors"
    >
      {t('newBooking')}
    </Link>
  );
}
