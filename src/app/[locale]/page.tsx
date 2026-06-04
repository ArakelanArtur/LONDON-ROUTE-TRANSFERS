import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Hero from '@/components/Hero';
import QuickBookingForm from '@/components/QuickBookingForm';
import KeyAdvantages from '@/components/KeyAdvantages';
import WhoWeServe from '@/components/WhoWeServe';
import WhyChooseUs from '@/components/WhyChooseUs';


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
    { key: 'airport', img: 'aiplan.png' },
    { key: 'corporate', img: 'car.png' },
    { key: 'group', img: 'bass.png' },
    { key: 'private', img: 'lodca.png' },
  ] as const;

  return (
    <div>
      <Hero t={h} />

      <QuickBookingForm />

      {/* Content inside container */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 py-8 sm:py-10">

        {/* About section */}
        <section className="mb-12 sm:mb-20">
          <div className="w-10 sm:w-12 h-0.5 bg-[var(--brand-gold)] mb-4 sm:mb-6" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-2 text-[var(--brand-navy)]">{a('title')}</h2>
          <p className="text-xs sm:text-sm text-[var(--brand-burgundy)] mb-6 sm:mb-8 uppercase tracking-widest font-medium">{a('subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed space-y-4 sm:space-y-5">
              <p>{a('p1')}</p>
              <p>{a('p2')}</p>
              <p>{a('p3')}</p>
              <p>{a('p4')}</p>
            </div>
            <div className="relative h-48 sm:h-64 md:h-96 overflow-hidden rounded-sm border border-[var(--brand-gold)]/20">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/baza.png)' }} />
              <div className="absolute inset-0 bg-[var(--brand-navy)]/10" />
            </div>
          </div>
        </section>

        {/* Services section */}
        <section id="services" className="mb-12 sm:mb-20">
          <div className="w-10 sm:w-12 h-0.5 bg-[var(--brand-gold)] mb-4 sm:mb-6" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-2 text-[var(--brand-navy)]">{s('title')}</h2>
          <p className="text-xs sm:text-sm text-[var(--brand-burgundy)] mb-8 sm:mb-10 uppercase tracking-widest font-medium">{s('subtitle')}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-12">
            {services.map((svc) => (
              <div key={svc.key} className="bg-white border border-gray-200/80 overflow-hidden rounded-sm group hover:shadow-lg transition-shadow duration-300">
                <div className="h-36 sm:h-52 bg-cover bg-center relative" style={{ backgroundImage: `url(/images/${svc.img})` }}>
                  <div className="absolute inset-0 bg-[var(--brand-navy)]/20 group-hover:bg-[var(--brand-navy)]/10 transition-colors" />
                </div>
                <div className="p-5 sm:p-7">
                  <div className="w-8 h-0.5 bg-[var(--brand-gold)] mb-3 sm:mb-4" />
                  <h3 className="font-serif font-bold text-base sm:text-lg mb-2 sm:mb-3 text-[var(--brand-navy)]">{s(`${svc.key}.title`)}</h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{s(`${svc.key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 mt-6 sm:mt-8 text-xs sm:text-sm text-[var(--brand-burgundy)] no-underline hover:text-[var(--brand-navy)] font-semibold uppercase tracking-widest"
          >
            {s('viewAllLink')} <span className="text-base sm:text-lg">→</span>
          </Link>
        </section>

      </div>{/* end container */}

      {/* Key Advantages — full-width dark section */}
      <KeyAdvantages />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 py-8 sm:py-10">

        {/* Clients section — text + WhoWeServe */}
        <section className="mb-8 sm:mb-12">
          <div className="w-10 sm:w-12 h-0.5 bg-[var(--brand-gold)] mb-4 sm:mb-6" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-2 text-[var(--brand-navy)]">{c('title')}</h2>
          <p className="text-xs sm:text-sm text-[var(--brand-burgundy)] mb-6 sm:mb-8 uppercase tracking-widest font-medium">{c('subtitle')}</p>
          <div className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed space-y-4 sm:space-y-5">
            <p>{c('text')}</p>
            <p>{c('text2')}</p>
          </div>
        </section>

      </div>{/* end container */}

      {/* Who We Serve + Why choose us — склеенные full-width тёмные секции */}
      <WhoWeServe />
      <WhyChooseUs />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 py-8 sm:py-10">

        {/* Contacts section */}
        <section id="contacts" className="mb-10 sm:mb-16">
          <div className="w-10 sm:w-12 h-0.5 bg-[var(--brand-gold)] mb-4 sm:mb-6" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-2 text-[var(--brand-navy)]">{ct('title')}</h2>
          <p className="text-xs sm:text-sm text-[var(--brand-burgundy)] mb-8 sm:mb-10 uppercase tracking-widest font-medium">{ct('subtitle')}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="bg-white border border-gray-200/80 p-5 sm:p-8 rounded-sm">
              <div className="w-8 h-0.5 bg-[var(--brand-gold)] mb-4 sm:mb-5" />
              <dl className="space-y-3 sm:space-y-4">
                <div><dt className="text-[0.6rem] sm:text-[0.65rem] font-bold text-[var(--brand-gold)] uppercase tracking-widest mb-1">{ct('labelFullName')}</dt><dd className="text-xs sm:text-sm text-[var(--brand-navy)] font-medium">{ct('companyFullName')}</dd></div>
                <div><dt className="text-[0.6rem] sm:text-[0.65rem] font-bold text-[var(--brand-gold)] uppercase tracking-widest mb-1">{ct('labelLegalForm')}</dt><dd className="text-xs sm:text-sm text-[var(--text-secondary)]">{ct('legalForm')}</dd></div>
                <div><dt className="text-[0.6rem] sm:text-[0.65rem] font-bold text-[var(--brand-gold)] uppercase tracking-widest mb-1">{ct('labelRegistrationNo')}</dt><dd className="text-xs sm:text-sm text-[var(--text-secondary)]">{ct('registrationNumber')}</dd></div>
                <div><dt className="text-[0.6rem] sm:text-[0.65rem] font-bold text-[var(--brand-gold)] uppercase tracking-widest mb-1">{ct('labelAddress')}</dt><dd className="text-xs sm:text-sm text-[var(--text-secondary)]">{ct('registeredAddress')}</dd></div>
                <div><dt className="text-[0.6rem] sm:text-[0.65rem] font-bold text-[var(--brand-gold)] uppercase tracking-widest mb-1">{ct('labelVatNo')}</dt><dd className="text-xs sm:text-sm text-[var(--text-secondary)]">{ct('vatNumber')}</dd></div>
              </dl>
            </div>
            <div className="bg-white border border-gray-200/80 p-5 sm:p-8 rounded-sm">
              <div className="w-8 h-0.5 bg-[var(--brand-gold)] mb-4 sm:mb-5" />
              <dl className="space-y-3 sm:space-y-4">
                <div><dt className="text-[0.6rem] sm:text-[0.65rem] font-bold text-[var(--brand-gold)] uppercase tracking-widest mb-1">{ct('labelPhone')}</dt><dd className="text-xs sm:text-sm text-[var(--brand-navy)] font-medium">{ct('phone')}</dd></div>
                <div><dt className="text-[0.6rem] sm:text-[0.65rem] font-bold text-[var(--brand-gold)] uppercase tracking-widest mb-1">{ct('labelEmail')}</dt><dd className="text-xs sm:text-sm text-[var(--brand-navy)] font-medium">{ct('email')}</dd></div>
              </dl>
              <p className="text-[0.65rem] sm:text-xs text-[var(--text-muted)] italic mt-4 sm:mt-6 leading-relaxed">{ct('note')}</p>
            </div>
          </div>
        </section>

      </div>{/* end container */}
    </div>
  );
}
