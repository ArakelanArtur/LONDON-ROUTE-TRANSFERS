import { getTranslations } from 'next-intl/server';
import BookingTable from '@/components/BookingTable';

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
          <p className="text-gold text-sm">{t('subtitle')}</p>
        </div>
        <button
          onClick={() => alert('Create new booking')}
          className="font-serif px-7 py-2.5 bg-black text-white border-none rounded-lg text-sm cursor-pointer transition-all duration-200 hover:bg-gold hover:-translate-y-0.5 hover:shadow-md"
        >
          {t('newBooking')}
        </button>
      </div>

      <BookingTable />
    </div>
  );
}
