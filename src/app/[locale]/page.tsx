import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function HomePage() {
  const h = await getTranslations('home.hero');
  const a = await getTranslations('home.about');
  const s = await getTranslations('home.services');
  const c = await getTranslations('home.clients');
  const ct = await getTranslations('home.contacts');

  const services = [
    { key: 'airport', icon: '✈' },
    { key: 'corporate', icon: '💼' },
    { key: 'group', icon: '🚌' },
    { key: 'private', icon: '🚗' },
  ] as const;

  return (
    <div>
      <section className="mb-10 pb-4 border-b border-gray-200">
        <h1 className="font-serif text-3xl md:text-4xl leading-tight mb-3 text-gray-900">
          {h('heading')}
        </h1>
        <p className="text-base text-gray-600 mb-2 max-w-2xl leading-relaxed">
          {h('subheading')}
        </p>
        <p className="text-sm text-gray-500 mb-6 max-w-2xl leading-relaxed">
          {h('text')}
        </p>
        <Link
          href="/booking"
          className="inline-block px-8 py-3.5 bg-black text-white rounded-md text-base no-underline font-serif transition-all duration-200 hover:bg-gray-800"
        >
          {h('cta')}
        </Link>
        <p className="text-xs text-gray-400 mt-3">{h('underCta')}</p>
      </section>

      <section className="mb-12">
        <h2 className="font-serif text-2xl mb-2 text-gray-900">{a('title')}</h2>
        <p className="text-sm text-gold mb-5">{a('subtitle')}</p>
        <div className="text-sm text-gray-700 leading-relaxed space-y-3">
          <p>{a('p1')}</p>
          <p>{a('p2')}</p>
          <p>{a('p3')}</p>
          <p>{a('p4')}</p>
        </div>
      </section>

      <section id="services" className="mb-12">
        <h2 className="font-serif text-2xl mb-2 text-gray-900">{s('title')}</h2>
        <p className="text-sm text-gold mb-6">{s('subtitle')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {services.map((svc) => (
            <div key={svc.key} className="bg-white border border-gray-200 p-6">
              <div className="text-2xl mb-3">{svc.icon}</div>
              <h3 className="font-serif font-bold text-base mb-3 text-gray-900">{s(`${svc.key}.title`)}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{s(`${svc.key}.desc`)}</p>
            </div>
          ))}
        </div>
        <h3 className="font-serif text-lg mb-3 text-gray-900">{s('keyAdvantagesTitle')}</h3>
        <ul className="text-sm text-gray-700 space-y-1.5 list-disc pl-5">
          {(s.raw('keyAdvantages') as string[]).map((adv: string, i: number) => (
            <li key={i}>{adv}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="font-serif text-2xl mb-2 text-gray-900">{c('title')}</h2>
        <p className="text-sm text-gold mb-5">{c('subtitle')}</p>
        <div className="text-sm text-gray-700 leading-relaxed space-y-3 mb-6">
          <p>{c('text')}</p>
          <p>{c('text2')}</p>
        </div>

        <h3 className="font-serif text-lg mb-3 text-gray-900">{c('whoTitle')}</h3>
        <ul className="text-sm text-gray-700 space-y-1.5 list-disc pl-5 mb-6">
          <li>{c('whoPrivate')}</li>
          <li>{c('whoCorporate')}</li>
          <li>{c('whoEducation')}</li>
          <li>{c('whoTourGroups')}</li>
          <li>{c('whoEvent')}</li>
        </ul>

        <h3 className="font-serif text-lg mb-3 text-gray-900">{c('whyTitle')}</h3>
        <ul className="text-sm text-gray-700 space-y-1.5 list-disc pl-5">
          {(c.raw('whyList') as string[]).map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="contacts" className="mb-12">
        <h2 className="font-serif text-2xl mb-2 text-gray-900">{ct('title')}</h2>
        <p className="text-sm text-gold mb-5">{ct('subtitle')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 p-6">
            <dl className="space-y-2">
              <div><dt className="text-xs font-bold text-gray-500 uppercase">Full Name</dt><dd className="text-sm text-gray-900">{ct('companyFullName')}</dd></div>
              <div><dt className="text-xs font-bold text-gray-500 uppercase">Legal Form</dt><dd className="text-sm text-gray-900">{ct('legalForm')}</dd></div>
              <div><dt className="text-xs font-bold text-gray-500 uppercase">Registration No.</dt><dd className="text-sm text-gray-900">{ct('registrationNumber')}</dd></div>
              <div><dt className="text-xs font-bold text-gray-500 uppercase">Address</dt><dd className="text-sm text-gray-900">{ct('registeredAddress')}</dd></div>
              <div><dt className="text-xs font-bold text-gray-500 uppercase">VAT No.</dt><dd className="text-sm text-gray-900">{ct('vatNumber')}</dd></div>
            </dl>
          </div>
          <div className="bg-white border border-gray-200 p-6">
            <dl className="space-y-2">
              <div><dt className="text-xs font-bold text-gray-500 uppercase">Phone</dt><dd className="text-sm text-gray-900">{ct('phone')}</dd></div>
              <div><dt className="text-xs font-bold text-gray-500 uppercase">Email</dt><dd className="text-sm text-gray-900">{ct('email')}</dd></div>
            </dl>
            <p className="text-xs text-gray-400 italic mt-4">{ct('note')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
