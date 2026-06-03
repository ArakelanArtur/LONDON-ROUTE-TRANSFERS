'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NewBookingButton() {
  const t = useTranslations('manager');
  return (
    <Link
      href="/booking"
      className="font-serif px-7 py-2.5 bg-black text-white border-none rounded-lg text-sm no-underline cursor-pointer transition-all duration-200 hover:bg-[var(--brand-burgundy)] hover:-translate-y-0.5 hover:shadow-md"
    >
      {t('newBooking')}
    </Link>
  );
}
