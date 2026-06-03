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
      <section className="mb-16 p-8 rounded-md bg-white border border-[var(--text-main)]/10 text-center">
        <h2 className="font-serif text-2xl text-[var(--brand-navy)] mb-2">{t('success')}</h2>
        <p className="text-sm text-[var(--text-main)]/70">{t('successText')}</p>
      </section>
    );
  }

  return (
    <section className="mb-16 p-10 rounded-md bg-white border border-[var(--text-main)]/10">
      <h2 className="font-serif text-3xl text-[var(--brand-navy)] mb-8">Quick Booking</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-base font-medium text-[var(--text-main)] mb-2">
            {t('destination')}
          </label>
          <input
            {...register('destination')}
            placeholder={t('destinationPlaceholder')}
            className="w-full px-5 py-3 border border-[var(--text-main)]/20 rounded-md text-base text-[var(--text-main)] bg-[var(--bg-stone)] focus:outline-none focus:border-[var(--brand-navy)] transition-all duration-500 ease-in-out"
          />
          {errors.destination && (
            <p className="text-sm text-[var(--brand-burgundy)] mt-1">{v(errors.destination.message!)}</p>
          )}
        </div>

        <div>
          <label className="block text-base font-medium text-[var(--text-main)] mb-2">
            {t('date')}
          </label>
          <input
            type="date"
            {...register('date')}
            className="w-full px-5 py-3 border border-[var(--text-main)]/20 rounded-md text-base text-[var(--text-main)] bg-[var(--bg-stone)] focus:outline-none focus:border-[var(--brand-navy)] transition-all duration-500 ease-in-out"
          />
          {errors.date && (
            <p className="text-sm text-[var(--brand-burgundy)] mt-1">{v(errors.date.message!)}</p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register('consent')}
            className="mt-1.5 w-5 h-5"
          />
          <label className="text-sm text-[var(--text-main)]/60 leading-relaxed">
            {t('consent')}
          </label>
        </div>
        {errors.consent && (
          <p className="text-sm text-[var(--brand-burgundy)]">{v(errors.consent.message!)}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-[var(--brand-burgundy)] text-white rounded-md text-base font-serif tracking-tight transition-all duration-500 ease-in-out hover:bg-[var(--brand-navy)] disabled:opacity-50"
        >
          {isSubmitting ? t('sending') : t('submit')}
        </button>
      </form>
    </section>
  );
}
