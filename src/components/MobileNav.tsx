'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function MobileNav() {
  const t = useTranslations('common.nav');
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/booking', label: t('booking') },
    { href: '/manager', label: t('manager') },
    { href: '/#contacts', label: t('contacts') },
  ] as const;

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col justify-center gap-1.5 w-7 h-7 cursor-pointer bg-transparent border-none"
        aria-label="Menu"
      >
        <span className={`block h-0.5 bg-[var(--brand-gold)] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block h-0.5 bg-[var(--brand-gold)] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 bg-[var(--brand-gold)] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute right-0 top-0 h-full w-72 bg-[var(--brand-navy)] border-l border-[var(--brand-gold)]/30 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="font-serif text-sm text-[var(--brand-gold)] uppercase tracking-widest">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="text-[var(--brand-gold)] text-2xl bg-transparent border-none cursor-pointer leading-none hover:text-white transition-colors"
              >
                &times;
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-[var(--brand-gold-light)] no-underline py-3 px-3 rounded-sm hover:bg-[var(--brand-navy-light)] hover:text-white transition-colors uppercase tracking-wider font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 pt-6 border-t border-[var(--brand-gold)]/20">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}

      {/* Desktop nav — hidden on mobile */}
      <nav className="hidden md:flex items-center gap-7 flex-nowrap justify-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-[var(--brand-gold-light)] no-underline whitespace-nowrap hover:text-white uppercase tracking-widest font-medium"
          >
            {link.label}
          </Link>
        ))}
        <span className="hidden md:flex items-center gap-4 flex-nowrap">
          <LanguageSwitcher />
        </span>
      </nav>
    </>
  );
}
