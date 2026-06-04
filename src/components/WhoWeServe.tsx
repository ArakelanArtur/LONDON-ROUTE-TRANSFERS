'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const whoItems = [
  { titleKey: 'whoPrivateTitle', descKey: 'whoPrivateDesc' },
  { titleKey: 'whoCorporateTitle', descKey: 'whoCorporateDesc' },
  { titleKey: 'whoEducationTitle', descKey: 'whoEducationDesc' },
  { titleKey: 'whoTourGroupsTitle', descKey: 'whoTourGroupsDesc' },
  { titleKey: 'whoEventTitle', descKey: 'whoEventDesc' },
] as const;

export default function WhoWeServe() {
  const c = useTranslations('home.clients');

  return (
    <section className="relative overflow-hidden bg-[var(--brand-navy)] pt-12 sm:pt-16 md:pt-20 pb-0">
      {/* Decorative background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/Why.png"
          alt=""
          fill
          className="object-cover object-center opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[var(--brand-navy)] via-[var(--brand-navy)]/90 to-[var(--brand-navy)]/70" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 sm:gap-5 mb-8 sm:mb-10 md:mb-12">
          <div className="w-10 sm:w-12 h-0.5 bg-[var(--brand-gold)]" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-white">
            {c('whoTitle')}
          </h2>
        </div>

        {/* Grid: image left + cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 items-center">
          {/* Left: feature image */}
          <div className="lg:col-span-2 relative order-2 lg:order-1">
            <div className="relative rounded-sm overflow-hidden border border-[var(--brand-gold)]/20 shadow-2xl">
              <Image
                src="/images/Why.png"
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
                  Trusted Partner
                </p>
              </div>
            </div>
            {/* Decorative corner */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[var(--brand-gold)]/30 rounded-tl-sm" />
          </div>

          {/* Right: who cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 order-1 lg:order-2">
            {whoItems.map((item, i) => (
              <div
                key={i}
                className="group relative bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-sm p-4 sm:p-5 hover:bg-white/[0.12] hover:border-[var(--brand-gold)]/40 transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Number icon */}
                  <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--brand-gold)]/15 border border-[var(--brand-gold)]/30 group-hover:bg-[var(--brand-gold)]/25 transition-colors duration-300 shrink-0">
                    <span className="text-[var(--brand-gold)] text-xs sm:text-sm font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-sm sm:text-base text-[var(--brand-gold)] font-semibold leading-snug mb-1">
                      {c(item.titleKey)}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                      {c(item.descKey)}
                    </p>
                  </div>
                </div>
                {/* Subtle bottom line */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--brand-gold)]/20 to-transparent group-hover:via-[var(--brand-gold)]/40 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
