'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const otherLocale = locale === 'en' ? 'ru' : 'en';
  const label = locale === 'en' ? 'Русский' : 'English';

  function switchLocale() {
    startTransition(() => {
      router.replace(pathname, { locale: otherLocale });
    });
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="text-xs text-white bg-gold hover:bg-gold-light transition-all cursor-pointer disabled:opacity-50 border-none rounded px-2.5 py-1 font-[system-ui]"
    >
      {label}
    </button>
  );
}
