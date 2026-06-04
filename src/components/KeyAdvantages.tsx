'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const icons = ['clock', 'plane', 'handshake', 'car', 'shield'] as const;

export default function KeyAdvantages() {
  const t = useTranslations('home.services');

  const advantages = t.raw('keyAdvantages') as string[];

  return (
    <section className="relative overflow-hidden bg-[var(--brand-navy)] py-12 sm:py-16 md:py-20">
      {/* Decorative background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/like.png"
          alt=""
          fill
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-navy)] via-[var(--brand-navy)]/90 to-[var(--brand-navy)]/70" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 sm:gap-5 mb-8 sm:mb-10 md:mb-12">
          <div className="w-10 sm:w-12 h-0.5 bg-[var(--brand-gold)]" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-white">
            {t('keyAdvantagesTitle')}
          </h2>
        </div>

        {/* Advantages grid + image */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 items-center">
          {/* Left: advantages cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {advantages.map((adv: string, i: number) => (
              <div
                key={i}
                className="group relative bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-sm p-4 sm:p-5 hover:bg-white/[0.12] hover:border-[var(--brand-gold)]/40 transition-all duration-300"
              >
                {/* Icon number */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--brand-gold)]/15 border border-[var(--brand-gold)]/30 group-hover:bg-[var(--brand-gold)]/25 transition-colors duration-300 shrink-0">
                    <span className="text-[var(--brand-gold)] text-xs sm:text-sm font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-sm sm:text-base text-white/90 leading-snug">{adv}</span>
                </div>
                {/* Subtle bottom line */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--brand-gold)]/20 to-transparent group-hover:via-[var(--brand-gold)]/40 transition-colors duration-300" />
              </div>
            ))}
          </div>

          {/* Right: feature image */}
          <div className="lg:col-span-2 relative">
            <div className="relative rounded-sm overflow-hidden border border-[var(--brand-gold)]/20 shadow-2xl">
              <Image
                src="/images/like.png"
                alt="LONDON ROUTE TRANSFERS"
                width={500}
                height={400}
                className="object-cover w-full h-64 sm:h-72 md:h-80"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--brand-navy)] via-[var(--brand-navy)]/80 to-transparent p-5 sm:p-6">
                <div className="w-8 h-0.5 bg-[var(--brand-gold)] mb-2 sm:mb-3" />
                <p className="font-serif text-white text-base sm:text-lg leading-snug">
                  LONDON ROUTE TRANSFERS
                </p>
                <p className="text-white/60 text-xs sm:text-sm mt-1 uppercase tracking-widest">
                  Premium Service
                </p>
              </div>
            </div>
            {/* Decorative corner */}
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[var(--brand-gold)]/30 rounded-tr-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
