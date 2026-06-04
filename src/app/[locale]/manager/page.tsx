import { getTranslations } from 'next-intl/server';
import BookingTable from '@/components/BookingTable';
import NewBookingButton from '@/components/NewBookingButton';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'manager' });
  return {
    title: `${t('title')} — LONDON ROUTE TRANSFERS`,
    description: t('subtitle'),
  };
}

export default async function ManagerPage() {
  const t = await getTranslations('manager');

  return (
    <div>
      {/* Header area */}
      <div className="text-center mb-10">
        <div className="w-10 h-0.5 bg-[var(--brand-gold)] mb-3 mx-auto" />
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--brand-navy)]">{t('title')}</h2>
        <p className="text-sm text-[var(--brand-burgundy)] uppercase tracking-widest mb-6">{t('subtitle')}</p>
        <NewBookingButton />
      </div>

      <BookingTable />
    </div>
  );
}
