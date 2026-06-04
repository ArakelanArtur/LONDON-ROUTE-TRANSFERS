'use client';

import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { quickBookingSchema, type QuickBookingFormValues } from '@/lib/form-schema';

const defaultValues: QuickBookingFormValues = {
  destination: '',
  date: '',
  consent: false,
};

export default function QuickBookingForm() {
  const t = useTranslations('booking.form');
  const v = useTranslations('booking.validation');
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuickBookingFormValues>({
    resolver: zodResolver(quickBookingSchema) as unknown as Resolver<QuickBookingFormValues>,
    defaultValues,
  });

  function onSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="w-full p-6 sm:p-10 bg-[var(--brand-navy)] text-center">
        <div className="w-10 h-0.5 bg-[var(--brand-gold)] mx-auto mb-4" />
        <h2 className="font-serif text-xl sm:text-2xl text-[var(--brand-gold)] mb-2">{t('success')}</h2>
        <p className="text-xs sm:text-sm text-[var(--bg-cream)]/70">{t('successText')}</p>
      </section>
    );
  }

  return (
    <section className="w-full overflow-hidden">
      <div className="p-6 sm:p-10 md:p-14 lg:p-16 bg-[var(--brand-navy)]">
        <div className="w-8 h-0.5 bg-[var(--brand-gold)] mb-5 sm:mb-6" />
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-white mb-6 sm:mb-10">Quick Booking</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
          <div>
            <label className="block text-xs text-[var(--brand-gold)] uppercase tracking-widest font-semibold mb-2">
              {t('destination')}
            </label>
            <input
              {...register('destination')}
              placeholder={t('destinationPlaceholder')}
              className="w-full px-4 sm:px-5 py-3 bg-[var(--brand-navy-light)] border border-[var(--brand-gold)]/20 rounded-sm text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--brand-gold)] transition-colors"
            />
            {errors.destination && (
              <p className="text-xs text-[var(--brand-burgundy)] mt-1.5">{v(errors.destination.message!)}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-[var(--brand-gold)] uppercase tracking-widest font-semibold mb-2">
              {t('date')}
            </label>
            <input
              type="date"
              {...register('date')}
              className="w-full px-4 sm:px-5 py-3 bg-[var(--brand-navy-light)] border border-[var(--brand-gold)]/20 rounded-sm text-sm text-white focus:outline-none focus:border-[var(--brand-gold)] transition-colors"
            />
            {errors.date && (
              <p className="text-xs text-[var(--brand-burgundy)] mt-1.5">{v(errors.date.message!)}</p>
            )}
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              {...register('consent')}
              className="mt-1.5 w-4 h-4 shrink-0 accent-[var(--brand-gold)]"
            />
            <label className="text-[0.7rem] sm:text-xs text-[var(--bg-cream)]/60 leading-relaxed">
              {t('consent')}
            </label>
          </div>
          {errors.consent && (
            <p className="text-xs text-[var(--brand-burgundy)]">{v(errors.consent.message!)}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 sm:px-8 py-3.5 sm:py-4 bg-[var(--brand-gold)] text-[var(--brand-navy)] rounded-sm text-sm font-serif tracking-wide font-semibold transition-colors hover:bg-[var(--brand-gold-light)] disabled:opacity-50"
          >
            {isSubmitting ? t('sending') : t('submit')}
          </button>
        </form>
      </div>
    </section>
  );
}
