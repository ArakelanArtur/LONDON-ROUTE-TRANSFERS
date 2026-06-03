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
      <div className="flex items-center justify-between gap-5 mb-8 flex-wrap">
        <div className="text-center sm:text-left">
          <h2 className="font-serif text-2xl text-gray-900 mb-1">{t('title')}</h2>
          <p className="text-[var(--brand-burgundy)] text-sm">{t('subtitle')}</p>
        </div>
        <NewBookingButton />
      </div>

      <BookingTable />
    </div>
  );
}
