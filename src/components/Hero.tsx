import { Link } from '@/i18n/navigation';

interface HeroProps {
  t: (key: string) => string;
}

export default function Hero({ t }: HeroProps) {
  return (
    <section className="relative min-h-[420px] sm:min-h-[520px] md:min-h-[600px] flex items-end w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/london-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy)] via-[var(--brand-navy)]/60 to-[var(--brand-navy)]/20" />
      <div className="relative z-10 w-full pb-10 sm:pb-14 pt-20 sm:pt-24 px-5 sm:px-8 md:px-16 lg:px-24">
        {/* Gold accent line */}
        <div className="w-10 sm:w-16 h-0.5 bg-[var(--brand-gold)] mb-4 sm:mb-6" />
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 sm:mb-5 text-white tracking-tight max-w-3xl">
          {t('heading')}
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-white/80 mb-2 max-w-2xl leading-relaxed">
          {t('subheading')}
        </p>
        <p className="text-xs sm:text-sm text-white/50 mb-6 sm:mb-10 max-w-2xl leading-relaxed">
          {t('text')}
        </p>
        <Link
          href="/booking"
          className="inline-block px-7 sm:px-10 py-3 sm:py-4 bg-[var(--brand-gold)] text-[var(--brand-navy)] rounded-sm text-sm sm:text-base no-underline font-serif tracking-wide font-semibold hover:bg-[var(--brand-gold-light)]"
        >
          {t('cta')}
        </Link>
        <p className="text-[0.65rem] sm:text-xs text-white/40 mt-3 sm:mt-4 tracking-wide">{t('underCta')}</p>
      </div>
    </section>
  );
}
