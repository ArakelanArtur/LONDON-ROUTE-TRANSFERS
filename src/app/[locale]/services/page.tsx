import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import ParallaxBanner from '@/components/ParallaxBanner';
import KeyAdvantages from '@/components/KeyAdvantages';
import WhoWeServe from '@/components/WhoWeServe';
import WhyChooseUs from '@/components/WhyChooseUs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.services' });
  return {
    title: `${t('title')} — LONDON ROUTE TRANSFERS`,
    description: t('subtitle'),
  };
}

const services = [
  { key: 'airport', img: 'aiplan.png' },
  { key: 'corporate', img: 'car.png' },
  { key: 'group', img: 'bass.png' },
  { key: 'private', img: 'lodca.png' },
] as const;

export default async function ServicesPage() {
  const s = await getTranslations('home.services');

  return (
    <div>
      {/* Hero banner */}
      <ParallaxBanner className="mb-10 sm:mb-16 h-48 sm:h-64 md:h-80 rounded-sm" overlay="bg-[var(--brand-navy)]/70">
        <div className="p-6 sm:p-10 md:p-16 flex flex-col justify-end h-full">
          <div className="w-8 sm:w-10 h-0.5 bg-[var(--brand-gold)] mb-3 sm:mb-4" />
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-2 sm:mb-3 text-white">
            {s('title')}
          </h1>
          <p className="text-[0.65rem] sm:text-sm text-white/70 uppercase tracking-widest">{s('subtitle')}</p>
        </div>
      </ParallaxBanner>

      {/* Service cards — 2 колонки, карточки уже */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-16 max-w-[900px] mx-auto">
        {services.map((item) => (
          <div key={item.key} className="bg-white border border-gray-200/80 overflow-hidden rounded-sm group hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-52 sm:h-60 md:h-72 bg-white flex items-center justify-center p-3 sm:p-5">
              <Image
                src={`/images/${item.img}`}
                alt={s(`${item.key}.title`)}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-5 sm:p-7">
              <div className="w-8 h-0.5 bg-[var(--brand-gold)] mb-3 sm:mb-4" />
              <h2 className="font-serif font-bold text-base sm:text-lg mb-2 sm:mb-3 text-[var(--brand-navy)]">{s(`${item.key}.title`)}</h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{s(`${item.key}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Key advantages — shared component */}
      <KeyAdvantages />

      {/* Who we serve — shared component */}
      <WhoWeServe />

      {/* Why choose us — shared component */}
      <WhyChooseUs />

      {/* CTA */}
      <div className="text-center py-12 sm:py-16">
        <Link
          href="/booking"
          className="inline-flex items-center gap-3 px-7 sm:px-10 py-3.5 sm:py-4 bg-[var(--brand-navy)] text-[var(--brand-gold)] rounded-sm text-xs sm:text-sm no-underline font-serif tracking-wide font-semibold uppercase hover:bg-[var(--brand-gold)] hover:text-[var(--brand-navy)] transition-colors"
        >
          {s('bookCta')}
        </Link>
      </div>
    </div>
  );
}
