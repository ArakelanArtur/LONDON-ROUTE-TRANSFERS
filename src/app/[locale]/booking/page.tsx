import { getTranslations } from 'next-intl/server';
import BookingForm from '@/components/BookingForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'booking' });
  return {
    title: `${t('title')} — LONDON ROUTE TRANSFERS`,
    description: t('description'),
  };
}

export default async function BookingPage() {
  const t = await getTranslations('booking');
  const pn = await getTranslations('booking.privacyNote');

  return (
    <div>
      {/* Hero banner */}
      <section className="relative mb-8 sm:mb-12 h-36 sm:h-48 md:h-56 rounded-sm overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/london-bg.jpg)' }} />
        <div className="absolute inset-0 bg-[var(--brand-navy)]/75" />
        <div className="relative z-10 p-5 sm:p-8 md:p-12 flex flex-col justify-end h-full">
          <div className="w-8 h-0.5 bg-[var(--brand-gold)] mb-2 sm:mb-3" />
          <h1 className="font-serif text-xl sm:text-2xl md:text-3xl text-white mb-1 sm:mb-2">
            {t('title')}
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-[600px]">
            {t('description')}
          </p>
        </div>
      </section>

      <BookingForm />

      {/* Privacy note */}
      <div className="max-w-[700px] mx-auto mt-8 sm:mt-10 p-4 sm:p-6 bg-white border border-gray-200/80 rounded-sm">
        <div className="w-6 h-0.5 bg-[var(--brand-gold)] mb-3 sm:mb-4" />
        <h3 className="text-xs sm:text-sm font-bold text-[var(--brand-navy)] mb-2 sm:mb-3 font-serif">
          {pn('title')}
        </h3>
        <p className="text-[0.65rem] sm:text-xs text-[var(--text-secondary)] mb-2 sm:mb-3 leading-relaxed">{pn('p1')}</p>
        <p className="text-[0.65rem] sm:text-xs text-[var(--text-secondary)] mb-2 sm:mb-3 leading-relaxed">{pn('p2')}</p>
        <p className="text-[0.65rem] sm:text-xs text-[var(--text-secondary)] leading-relaxed">{pn('p3')}</p>
      </div>
    </div>
  );
}
