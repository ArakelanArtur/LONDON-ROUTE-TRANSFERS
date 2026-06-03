import { Link } from '@/i18n/navigation';

interface HeroProps {
  t: (key: string) => string;
}

export default function Hero({ t }: HeroProps) {
  return (
    <section className="relative mb-16 pb-6 border-b border-[var(--text-main)]/10">
      <div
        className="absolute inset-0 bg-cover bg-center rounded-md"
        style={{ backgroundImage: 'url(/images/aiplan.png)' }}
      />
      <div className="absolute inset-0 bg-black/50 rounded-md" />
      <div className="relative z-10 p-10 md:p-16">
        <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6 text-white tracking-tight">
          {t('heading')}
        </h1>
        <p className="text-lg text-white/80 mb-3 max-w-3xl leading-relaxed">
          {t('subheading')}
        </p>
        <p className="text-base text-white/60 mb-10 max-w-3xl leading-relaxed">
          {t('text')}
        </p>
        <Link
          href="/booking"
          className="inline-block px-10 py-4 bg-[var(--brand-burgundy)] text-white rounded-md text-lg no-underline font-serif tracking-tight transition-all duration-500 ease-in-out hover:bg-[var(--brand-navy)]"
        >
          {t('cta')}
        </Link>
        <p className="text-sm text-white/50 mt-4">{t('underCta')}</p>
      </div>
    </section>
  );
}
