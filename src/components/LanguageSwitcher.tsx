'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(code: string) {
    if (code === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: code as 'en' | 'ru' });
    });
  }

  return (
    <div className="flex gap-1">
      {locales.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLocale(lang.code)}
          disabled={isPending}
          className={`text-base font-semibold transition-all cursor-pointer disabled:opacity-50 border-none rounded-md px-3 py-1.5 font-[system-ui] ${
            locale === lang.code
              ? 'text-white bg-[var(--brand-burgundy)]'
              : 'text-black bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
