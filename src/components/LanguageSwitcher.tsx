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
          className={`text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider cursor-pointer disabled:opacity-50 border rounded-sm px-3 sm:px-2.5 py-1.5 sm:py-1 font-[system-ui] transition-all ${
            locale === lang.code
              ? 'text-[var(--brand-navy)] bg-[var(--brand-gold)] border-[var(--brand-gold)]'
              : 'text-[var(--brand-gold-light)] bg-transparent border-[var(--brand-gold)]/40 hover:border-[var(--brand-gold)] hover:text-white'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
