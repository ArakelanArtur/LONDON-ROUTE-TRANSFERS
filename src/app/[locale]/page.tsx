import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Hero from '@/components/Hero';
import QuickBookingForm from '@/components/QuickBookingForm';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: `${t('title')} — ${t('subtitle')}`,
    description: t('hero.text'),
  };
}

export default async function HomePage() {
  const h = await getTranslations('home.hero');
  const a = await getTranslations('home.about');
  const s = await getTranslations('home.services');
  const c = await getTranslations('home.clients');
  const ct = await getTranslations('home.contacts');

  const services = [
    { key: 'airport' },
    { key: 'corporate' },
    { key: 'group' },
    { key: 'private' },
  ] as const;

  return (
    <div>
      <Hero t={h} />

      <QuickBookingForm />

      <section className="mb-16">
        <h2 className="font-serif text-3xl mb-3 text-gray-900">{a('title')}</h2>
        <p className="text-base text-[var(--brand-burgundy)] mb-6">{a('subtitle')}</p>
        <div className="text-base text-gray-700 leading-relaxed space-y-4">
          <p>{a('p1')}</p>
          <p>{a('p2')}</p>
          <p>{a('p3')}</p>
          <p>{a('p4')}</p>
        </div>
      </section>

      <section id="services" className="mb-16">
        <h2 className="font-serif text-3xl mb-3 text-gray-900">{s('title')}</h2>
        <p className="text-base text-[var(--brand-burgundy)] mb-8">{s('subtitle')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {services.map((svc) => (
            <div key={svc.key} className="bg-white border border-gray-200 p-8">
              <h3 className="font-serif font-bold text-lg mb-4 text-gray-900">{s(`${svc.key}.title`)}</h3>
              <p className="text-base text-gray-700 leading-relaxed">{s(`${svc.key}.desc`)}</p>
            </div>
          ))}
        </div>
        <h3 className="font-serif text-xl mb-4 text-gray-900">{s('keyAdvantagesTitle')}</h3>
        <ul className="text-base text-gray-700 space-y-2 list-disc pl-6">
          {(s.raw('keyAdvantages') as string[]).map((adv: string, i: number) => (
            <li key={i}>{adv}</li>
          ))}
        </ul>
        <Link
          href="/services"
          className="inline-block mt-8 text-base text-[var(--brand-burgundy)] no-underline hover:text-[var(--brand-navy)] transition-all duration-500 ease-in-out font-bold"
        >
          {s('viewAllLink')} →
        </Link>
      </section>

      <section className="mb-16">
        <h2 className="font-serif text-3xl mb-3 text-gray-900">{c('title')}</h2>
        <p className="text-base text-[var(--brand-burgundy)] mb-6">{c('subtitle')}</p>
        <div className="text-base text-gray-700 leading-relaxed space-y-4 mb-8">
          <p>{c('text')}</p>
          <p>{c('text2')}</p>
        </div>

        <h3 className="font-serif text-2xl mb-4 text-gray-900">{c('whoTitle')}</h3>
        <ul className="text-base text-gray-700 space-y-2 list-disc pl-6 mb-8">
          {([
            { title: c('whoPrivateTitle'), desc: c('whoPrivateDesc') },
            { title: c('whoCorporateTitle'), desc: c('whoCorporateDesc') },
            { title: c('whoEducationTitle'), desc: c('whoEducationDesc') },
            { title: c('whoTourGroupsTitle'), desc: c('whoTourGroupsDesc') },
            { title: c('whoEventTitle'), desc: c('whoEventDesc') },
          ] as const).map((item, i) => (
            <li key={i}>
              <strong className="text-gray-900">{item.title}</strong>: {item.desc}
            </li>
          ))}
        </ul>

        <h3 className="font-serif text-xl mb-4 text-gray-900">{c('whyTitle')}</h3>
        <ul className="text-base text-gray-700 space-y-2 list-disc pl-6">
          {(c.raw('whyList') as string[]).map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="contacts" className="mb-16">
        <h2 className="font-serif text-3xl mb-3 text-gray-900">{ct('title')}</h2>
        <p className="text-base text-[var(--brand-burgundy)] mb-6">{ct('subtitle')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 p-8">
            <dl className="space-y-3">
              <div><dt className="text-sm font-bold text-gray-500 uppercase">{ct('labelFullName')}</dt><dd className="text-base text-gray-900">{ct('companyFullName')}</dd></div>
              <div><dt className="text-sm font-bold text-gray-500 uppercase">{ct('labelLegalForm')}</dt><dd className="text-base text-gray-900">{ct('legalForm')}</dd></div>
              <div><dt className="text-sm font-bold text-gray-500 uppercase">{ct('labelRegistrationNo')}</dt><dd className="text-base text-gray-900">{ct('registrationNumber')}</dd></div>
              <div><dt className="text-sm font-bold text-gray-500 uppercase">{ct('labelAddress')}</dt><dd className="text-base text-gray-900">{ct('registeredAddress')}</dd></div>
              <div><dt className="text-sm font-bold text-gray-500 uppercase">{ct('labelVatNo')}</dt><dd className="text-base text-gray-900">{ct('vatNumber')}</dd></div>
            </dl>
          </div>
          <div className="bg-white border border-gray-200 p-8">
            <dl className="space-y-3">
              <div><dt className="text-sm font-bold text-gray-500 uppercase">{ct('labelPhone')}</dt><dd className="text-base text-gray-900">{ct('phone')}</dd></div>
              <div><dt className="text-sm font-bold text-gray-500 uppercase">{ct('labelEmail')}</dt><dd className="text-base text-gray-900">{ct('email')}</dd></div>
            </dl>
            <p className="text-sm text-gray-400 italic mt-4">{ct('note')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
