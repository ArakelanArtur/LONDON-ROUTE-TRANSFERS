import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.services' });
  return {
    title: `${t('title')} — LONDON ROUTE TRANSFERS`,
    description: t('subtitle'),
  };
}

export default async function ServicesPage() {
  const s = await getTranslations('home.services');

  const services = ['airport', 'corporate', 'group', 'private'] as const;

  return (
    <div>
      <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-3 text-gray-900">
        {s('title')}
      </h1>
      <p className="text-base text-[var(--brand-burgundy)] mb-10">{s('subtitle')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {services.map((key) => (
          <div key={key} className="bg-white border border-gray-200 p-8">
            <h2 className="font-serif font-bold text-lg mb-4 text-gray-900">{s(`${key}.title`)}</h2>
            <p className="text-base text-gray-700 leading-relaxed">{s(`${key}.desc`)}</p>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-2xl mb-4 text-gray-900">{s('servicesKeyAdvantagesTitle')}</h2>
      <ul className="text-base text-gray-700 space-y-2 list-disc pl-6 mb-12">
        {(s.raw('servicesKeyAdvantages') as string[]).map((adv: string, i: number) => (
          <li key={i}>{adv}</li>
        ))}
      </ul>

      <Link
        href="/booking"
        className="inline-block px-10 py-4 bg-[var(--brand-burgundy)] text-white rounded-md text-base no-underline font-serif tracking-tight transition-all duration-500 ease-in-out hover:bg-[var(--brand-navy)]"
      >
        {s('bookCta')}
      </Link>
    </div>
  );
}
