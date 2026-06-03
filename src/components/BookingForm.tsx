'use client';

import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'motion/react';
import { bookingSchema, BookingFormValues } from '@/lib/form-schema';

const defaultValues: BookingFormValues = {
  name: '',
  company: '',
  phone: '',
  email: '',
  service: '',
  pickup: '',
  destination: '',
  date: '',
  time: '',
  passengers: 1,
  meetAndGreet: 'no',
  notes: '',
  consent: false,
};

export default function BookingForm() {
  const t = useTranslations('booking.form');
  const v = useTranslations('booking.validation');
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema) as unknown as Resolver<BookingFormValues>,
    defaultValues,
  });

  function onSubmit() {
    setSubmitted(true);
  }

  function getError(field: keyof BookingFormValues) {
    if (!errors[field]) return null;
    const key = errors[field]?.message as string;
    return key ? v(key) : null;
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[700px] mx-auto bg-white p-8 border border-gray-200 rounded-lg text-center"
      >
        <div className="text-5xl mb-4">✓</div>
        <h2 className="font-serif text-2xl text-gray-900 mb-2">
          {t('success')}
        </h2>
        <p className="text-gray-600">{t('successText')}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[700px] mx-auto bg-white p-8 border border-gray-200 rounded-lg" noValidate>
      <fieldset className="border-none p-0 mb-7">
        <legend className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">
          {t('contactInfo')}
        </legend>
        <div className="flex gap-5 mb-6 flex-col sm:flex-row">
          <label className="flex-1 block text-sm text-gray-700">
            {t('name')}
            <input
              {...register('name')}
              placeholder={t('namePlaceholder')}
              className={`block w-full mt-1.5 px-3.5 py-2.5 border rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-[var(--brand-navy)] transition-colors ${
                errors.name ? 'border-red-600 bg-red-50' : 'border-gray-300'
              }`}
            />
            {getError('name') && <span className="block text-xs text-red-600 mt-1">{getError('name')}</span>}
          </label>
          <label className="flex-1 block text-sm text-gray-700">
            {t('company')}
            <input
              {...register('company')}
              placeholder={t('companyPlaceholder')}
              className="block w-full mt-1.5 px-3.5 py-2.5 border border-gray-300 rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-[var(--brand-navy)] transition-colors"
            />
          </label>
        </div>
        <div className="flex gap-5 mb-6 flex-col sm:flex-row">
          <label className="flex-1 block text-sm text-gray-700">
            {t('phone')}
            <input
              {...register('phone')}
              type="tel"
              placeholder={t('phonePlaceholder')}
              className={`block w-full mt-1.5 px-3.5 py-2.5 border rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-[var(--brand-navy)] transition-colors ${
                errors.phone ? 'border-red-600 bg-red-50' : 'border-gray-300'
              }`}
            />
            {getError('phone') && <span className="block text-xs text-red-600 mt-1">{getError('phone')}</span>}
          </label>
          <label className="flex-1 block text-sm text-gray-700">
            {t('email')}
            <input
              {...register('email')}
              type="email"
              placeholder={t('emailPlaceholder')}
              className={`block w-full mt-1.5 px-3.5 py-2.5 border rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-[var(--brand-navy)] transition-colors ${
                errors.email ? 'border-red-600 bg-red-50' : 'border-gray-300'
              }`}
            />
            {getError('email') && <span className="block text-xs text-red-600 mt-1">{getError('email')}</span>}
          </label>
        </div>
      </fieldset>

      <fieldset className="border-none p-0 mb-7">
        <legend className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">
          {t('tripDetails')}
        </legend>
        <div className="flex gap-5 mb-6 flex-col sm:flex-row">
          <label className="flex-1 block text-sm text-gray-700">
            {t('serviceType')}
            <select
              {...register('service')}
              className={`block w-full mt-1.5 px-3.5 py-2.5 border rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-[var(--brand-navy)] transition-colors ${
                errors.service ? 'border-red-600 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">{t('servicePlaceholder')}</option>
              <option value="airport">{t('serviceAirport')}</option>
              <option value="corporate">{t('serviceCorporate')}</option>
              <option value="group">{t('serviceGroup')}</option>
              <option value="private">{t('servicePrivate')}</option>
            </select>
            {getError('service') && <span className="block text-xs text-red-600 mt-1">{getError('service')}</span>}
          </label>
          <label className="flex-1 block text-sm text-gray-700">
            {t('passengers')}
            <input
              {...register('passengers')}
              type="number"
              min={1}
              placeholder={t('passengersPlaceholder')}
              className={`block w-full mt-1.5 px-3.5 py-2.5 border rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-[var(--brand-navy)] transition-colors ${
                errors.passengers ? 'border-red-600 bg-red-50' : 'border-gray-300'
              }`}
            />
            {getError('passengers') && <span className="block text-xs text-red-600 mt-1">{getError('passengers')}</span>}
          </label>
        </div>
        <div className="flex gap-5 mb-6 flex-col sm:flex-row">
          <label className="flex-1 block text-sm text-gray-700">
            {t('pickup')}
            <input
              {...register('pickup')}
              placeholder={t('pickupPlaceholder')}
              className={`block w-full mt-1.5 px-3.5 py-2.5 border rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-[var(--brand-navy)] transition-colors ${
                errors.pickup ? 'border-red-600 bg-red-50' : 'border-gray-300'
              }`}
            />
            {getError('pickup') && <span className="block text-xs text-red-600 mt-1">{getError('pickup')}</span>}
          </label>
          <label className="flex-1 block text-sm text-gray-700">
            {t('destination')}
            <input
              {...register('destination')}
              placeholder={t('destinationPlaceholder')}
              className={`block w-full mt-1.5 px-3.5 py-2.5 border rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-[var(--brand-navy)] transition-colors ${
                errors.destination ? 'border-red-600 bg-red-50' : 'border-gray-300'
              }`}
            />
            {getError('destination') && <span className="block text-xs text-red-600 mt-1">{getError('destination')}</span>}
          </label>
        </div>
        <div className="flex gap-5 mb-6 flex-col sm:flex-row">
          <label className="flex-1 block text-sm text-gray-700">
            {t('date')}
            <input
              {...register('date')}
              type="date"
              className={`block w-full mt-1.5 px-3.5 py-2.5 border rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-[var(--brand-navy)] transition-colors ${
                errors.date ? 'border-red-600 bg-red-50' : 'border-gray-300'
              }`}
            />
            {getError('date') && <span className="block text-xs text-red-600 mt-1">{getError('date')}</span>}
          </label>
          <label className="flex-1 block text-sm text-gray-700">
            {t('time')}
            <input
              {...register('time')}
              type="time"
              className={`block w-full mt-1.5 px-3.5 py-2.5 border rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-[var(--brand-navy)] transition-colors ${
                errors.time ? 'border-red-600 bg-red-50' : 'border-gray-300'
              }`}
            />
            {getError('time') && <span className="block text-xs text-red-600 mt-1">{getError('time')}</span>}
          </label>
        </div>
        <label className="block text-sm text-gray-700 mb-4">
          {t('meetAndGreet')}
          <select
            {...register('meetAndGreet')}
            className="block w-full mt-1.5 px-3.5 py-2.5 border border-gray-300 rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-[var(--brand-navy)] transition-colors"
          >
            <option value="no">{t('meetAndGreetNo')}</option>
            <option value="yes">{t('meetAndGreetYes')}</option>
          </select>
        </label>
        <label className="block text-sm text-gray-700">
          {t('notes')}
          <textarea
            {...register('notes')}
            rows={3}
            placeholder={t('notesPlaceholder')}
            className="block w-full mt-1.5 px-3.5 py-2.5 border border-gray-300 rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-[var(--brand-navy)] transition-colors"
          />
        </label>
      </fieldset>

      <fieldset className="border-none p-0 mb-7">
        <legend className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">
          {t('fieldConsent')}
        </legend>
        <label className="flex items-start gap-2.5 text-sm text-gray-700 cursor-pointer">
          <input
            {...register('consent')}
            type="checkbox"
            className="mt-1 shrink-0 w-4 h-4 accent-[var(--brand-burgundy)]"
          />
          <span className="leading-relaxed text-xs">
            {t('consent')}
          </span>
        </label>
        {getError('consent') && (
          <span className="block text-xs text-red-600 mt-1">{getError('consent')}</span>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="font-serif inline-block px-9 py-3.5 bg-black text-white border-none rounded-md text-base cursor-pointer transition-all duration-200 hover:bg-gray-800 disabled:opacity-50"
      >
        {isSubmitting ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
