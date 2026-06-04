'use client';

import { useTranslations } from 'next-intl';

export default function WhyChooseUs() {
  const c = useTranslations('home.clients');

  const items = c.raw('whyList') as string[];

  return (
    <section className="relative overflow-hidden bg-[var(--brand-navy)] py-12 sm:py-16 md:py-20">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.06),transparent_60%)]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 sm:gap-5 mb-8 sm:mb-10 md:mb-12">
          <div className="w-10 sm:w-12 h-0.5 bg-[var(--brand-gold)]" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-white">
            {c('whyTitle')}
          </h2>
        </div>

        {/* Why choose us grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {items.map((item: string, i: number) => (
            <div
              key={i}
              className="group relative bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-sm p-5 sm:p-6 hover:bg-white/[0.12] hover:border-[var(--brand-gold)]/40 transition-all duration-300"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Number icon */}
                <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--brand-gold)]/15 border border-[var(--brand-gold)]/30 group-hover:bg-[var(--brand-gold)]/25 transition-colors duration-300 shrink-0">
                  <span className="text-[var(--brand-gold)] text-xs sm:text-sm font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-sm sm:text-base text-white/90 leading-snug">{item}</span>
              </div>
              {/* Subtle bottom line */}
              <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--brand-gold)]/20 to-transparent group-hover:via-[var(--brand-gold)]/40 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
