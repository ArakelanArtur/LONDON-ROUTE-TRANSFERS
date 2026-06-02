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
      <h2 className="font-serif text-base font-normal text-gray-700 mb-9 leading-relaxed text-center max-w-[600px] mx-auto">
        {t('description')}
      </h2>

      <BookingForm />

      <div className="max-w-[700px] mx-auto mt-10 p-6 bg-white border border-gray-200 text-xs text-gray-600 rounded-lg">
        <h3 className="text-sm font-bold text-gray-900 mb-3 font-serif">
          {pn('title')}
        </h3>
        <p className="mb-2.5 leading-relaxed">{pn('p1')}</p>
        <p className="mb-2.5 leading-relaxed">{pn('p2')}</p>
        <p className="leading-relaxed">{pn('p3')}</p>
      </div>
    </div>
  );
}
