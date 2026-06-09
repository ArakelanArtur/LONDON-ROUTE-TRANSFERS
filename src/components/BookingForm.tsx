'use client';

import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'motion/react';
import { bookingSchema, BookingFormValues } from '@/lib/form-schema';
import { createBooking } from '@/lib/api';

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
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema) as unknown as Resolver<BookingFormValues>,
    defaultValues,
  });

  async function onSubmit(data: BookingFormValues) {
    setStatus('submitting');
    setServerError('');
    try {
      await createBooking({
        name: data.name,
        company: data.company || undefined,
        phone: data.phone,
        email: data.email,
        service: data.service,
        pickup: data.pickup,
        destination: data.destination,
        date: data.date,
        time: data.time,
        passengers: data.passengers,
        meetAndGreet: data.meetAndGreet || undefined,
        notes: data.notes || undefined,
      });
      setStatus('success');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  }

  function getError(field: keyof BookingFormValues) {
    if (!errors[field]) return null;
    const key = errors[field]?.message as string;
    return key ? v(key) : null;
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[700px] mx-auto bg-[var(--brand-navy)] p-6 sm:p-10 border border-[var(--brand-gold)]/30 rounded-sm text-center"
      >
        <div className="w-10 h-0.5 bg-[var(--brand-gold)] mx-auto mb-4" />
        <div className="text-3xl sm:text-4xl mb-4 text-[var(--brand-gold)]">✓</div>
        <h2 className="font-serif text-xl sm:text-2xl text-white mb-2">
          {t('success')}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--bg-cream)]/60">{t('successText')}</p>
      </motion.div>
    );
  }

  const inputCls = (hasError: boolean) =>
    `block w-full mt-1.5 px-3 sm:px-4 py-2.5 border rounded-sm text-sm bg-[var(--brand-navy-light)] text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--brand-gold)] transition-colors ${
      hasError ? 'border-[var(--brand-burgundy)] bg-[var(--brand-burgundy)]/10' : 'border-[var(--brand-gold)]/20'
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[700px] mx-auto bg-white border border-gray-200/80 rounded-sm p-5 sm:p-8 md:p-10" noValidate>
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm">
          {serverError}
        </div>
      )}

      {/* Contact Info */}
      <fieldset className="border-none p-0 mb-8 sm:mb-10">
        <div className="w-8 h-0.5 bg-[var(--brand-gold)] mb-3 sm:mb-4" />
        <legend className="text-[0.6rem] sm:text-[0.65rem] font-bold text-[var(--brand-gold)] uppercase tracking-widest mb-4 sm:mb-5">
          {t('contactInfo')}
        </legend>
        <div className="flex gap-4 sm:gap-5 mb-4 sm:mb-5 flex-col sm:flex-row">
          <label className="flex-1 block text-[0.7rem] sm:text-xs text-[var(--text-secondary)]">
            {t('name')}
            <input {...register('name')} placeholder={t('namePlaceholder')} className={inputCls(!!errors.name)} />
            {getError('name') && <span className="block text-[0.65rem] sm:text-xs text-[var(--brand-burgundy)] mt-1">{getError('name')}</span>}
          </label>
          <label className="flex-1 block text-[0.7rem] sm:text-xs text-[var(--text-secondary)]">
            {t('company')}
            <input {...register('company')} placeholder={t('companyPlaceholder')} className={inputCls(false)} />
          </label>
        </div>
        <div className="flex gap-4 sm:gap-5 mb-4 sm:mb-5 flex-col sm:flex-row">
          <label className="flex-1 block text-[0.7rem] sm:text-xs text-[var(--text-secondary)]">
            {t('phone')}
            <input {...register('phone')} type="tel" placeholder={t('phonePlaceholder')} className={inputCls(!!errors.phone)} />
            {getError('phone') && <span className="block text-[0.65rem] sm:text-xs text-[var(--brand-burgundy)] mt-1">{getError('phone')}</span>}
          </label>
          <label className="flex-1 block text-[0.7rem] sm:text-xs text-[var(--text-secondary)]">
            {t('email')}
            <input {...register('email')} type="email" placeholder={t('emailPlaceholder')} className={inputCls(!!errors.email)} />
            {getError('email') && <span className="block text-[0.65rem] sm:text-xs text-[var(--brand-burgundy)] mt-1">{getError('email')}</span>}
          </label>
        </div>
      </fieldset>

      {/* Trip Details */}
      <fieldset className="border-none p-0 mb-8 sm:mb-10">
        <div className="w-8 h-0.5 bg-[var(--brand-gold)] mb-3 sm:mb-4" />
        <legend className="text-[0.6rem] sm:text-[0.65rem] font-bold text-[var(--brand-gold)] uppercase tracking-widest mb-4 sm:mb-5">
          {t('tripDetails')}
        </legend>
        <div className="flex gap-4 sm:gap-5 mb-4 sm:mb-5 flex-col sm:flex-row">
          <label className="flex-1 block text-[0.7rem] sm:text-xs text-[var(--text-secondary)]">
            {t('serviceType')}
            <select {...register('service')} className={inputCls(!!errors.service)}>
              <option value="">{t('servicePlaceholder')}</option>
              <option value="airport">{t('serviceAirport')}</option>
              <option value="corporate">{t('serviceCorporate')}</option>
              <option value="group">{t('serviceGroup')}</option>
              <option value="private">{t('servicePrivate')}</option>
            </select>
            {getError('service') && <span className="block text-[0.65rem] sm:text-xs text-[var(--brand-burgundy)] mt-1">{getError('service')}</span>}
          </label>
          <label className="flex-1 block text-[0.7rem] sm:text-xs text-[var(--text-secondary)]">
            {t('passengers')}
            <input {...register('passengers')} type="number" min={1} placeholder={t('passengersPlaceholder')} className={inputCls(!!errors.passengers)} />
            {getError('passengers') && <span className="block text-[0.65rem] sm:text-xs text-[var(--brand-burgundy)] mt-1">{getError('passengers')}</span>}
          </label>
        </div>
        <div className="flex gap-4 sm:gap-5 mb-4 sm:mb-5 flex-col sm:flex-row">
          <label className="flex-1 block text-[0.7rem] sm:text-xs text-[var(--text-secondary)]">
            {t('pickup')}
            <input {...register('pickup')} placeholder={t('pickupPlaceholder')} className={inputCls(!!errors.pickup)} />
            {getError('pickup') && <span className="block text-[0.65rem] sm:text-xs text-[var(--brand-burgundy)] mt-1">{getError('pickup')}</span>}
          </label>
          <label className="flex-1 block text-[0.7rem] sm:text-xs text-[var(--text-secondary)]">
            {t('destination')}
            <input {...register('destination')} placeholder={t('destinationPlaceholder')} className={inputCls(!!errors.destination)} />
            {getError('destination') && <span className="block text-[0.65rem] sm:text-xs text-[var(--brand-burgundy)] mt-1">{getError('destination')}</span>}
          </label>
        </div>
        <div className="flex gap-4 sm:gap-5 mb-4 sm:mb-5 flex-col sm:flex-row">
          <label className="flex-1 block text-[0.7rem] sm:text-xs text-[var(--text-secondary)]">
            {t('date')}
            <div className="relative">
              <input {...register('date')} type="date" className={`${inputCls(!!errors.date)} [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer`} />
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-[var(--brand-navy)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.5,2h-1.5V.5c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v1.5H7V.5c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v1.5h-1.5C2.019,2,0,4.019,0,6.5v13c0,2.481,2.019,4.5,4.5,4.5h4c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5H4.5c-1.93,0-3.5-1.57-3.5-3.5V9H23.5c.276,0,.5-.224,.5-.5v-2c0-2.481-2.019-4.5-4.5-4.5Zm3.5,6H1v-1.5c0-1.93,1.57-3.5,3.5-3.5h15c1.93,0,3.5,1.57,3.5,3.5v1.5Zm-3.268,3.732l-7.707,7.707c-.661,.661-1.025,1.54-1.025,2.475v1.586c0,.276,.224,.5,.5,.5h1.586c.935,0,1.814-.364,2.475-1.025l7.707-7.707c.472-.472,.732-1.1,.732-1.768s-.26-1.296-.732-1.768c-.943-.944-2.592-.944-3.535,0Zm2.828,2.828l-7.707,7.707c-.472,.472-1.1,.732-1.768,.732h-1.086v-1.086c0-.668,.26-1.295,.732-1.768l7.707-7.707c.566-.566,1.555-.566,2.121,0,.283,.283,.439,.66,.439,1.061s-.156,.777-.439,1.061Zm-17.561-1.061c0-.276,.224-.5,.5-.5H14.5c.276,0,.5,.224,.5,.5s-.224,.5-.5,.5H5.5c-.276,0-.5-.224-.5-.5Zm5,5c0,.276-.224,.5-.5,.5H5.5c-.276,0-.5-.224-.5-.5s.224-.5,.5-.5h4c.276,0,.5,.224,.5,.5Z"/>
                </svg>
              </div>
            </div>
            {getError('date') && <span className="block text-[0.65rem] sm:text-xs text-[var(--brand-burgundy)] mt-1">{getError('date')}</span>}
          </label>
          <label className="flex-1 block text-[0.7rem] sm:text-xs text-[var(--text-secondary)]">
            {t('time')}
            <div className="relative">
              <input {...register('time')} type="time" className={`${inputCls(!!errors.time)} [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer`} />
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-[var(--brand-navy)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,22c-5.514,0-10-4.486-10-10S6.486,2,12,2s10,4.486,10,10-4.486,10-10,10Zm2.5-6.5l-3.5-2.5v-5.5c0-.552-.448-1-1-1s-1,.448-1,1v6c0,.386,.222,.739,.571,.904,.349,.166,.763,.129,1.078-.089l4,3c.185,.139,.404,.209,.624,.209,.253,0,.507-.079,.719-.239,.372-.277,.447-.802,.17-1.175l-1.661-2.609Z"/>
                </svg>
              </div>
            </div>
            {getError('time') && <span className="block text-[0.65rem] sm:text-xs text-[var(--brand-burgundy)] mt-1">{getError('time')}</span>}
          </label>
        </div>
        <label className="block text-[0.7rem] sm:text-xs text-[var(--text-secondary)] mb-4">
          {t('meetAndGreet')}
          <select {...register('meetAndGreet')} className={inputCls(false)}>
            <option value="no">{t('meetAndGreetNo')}</option>
            <option value="yes">{t('meetAndGreetYes')}</option>
          </select>
        </label>
        <label className="block text-[0.7rem] sm:text-xs text-[var(--text-secondary)]">
          {t('notes')}
          <textarea {...register('notes')} rows={3} placeholder={t('notesPlaceholder')} className={`${inputCls(false)} resize-none`} />
        </label>
      </fieldset>

      {/* Consent */}
      <fieldset className="border-none p-0 mb-6 sm:mb-8">
        <div className="w-8 h-0.5 bg-[var(--brand-gold)] mb-3 sm:mb-4" />
        <legend className="text-[0.6rem] sm:text-[0.65rem] font-bold text-[var(--brand-gold)] uppercase tracking-widest mb-3 sm:mb-4">
          {t('fieldConsent')}
        </legend>
        <label className="flex items-start gap-3 text-[0.65rem] sm:text-xs text-[var(--text-secondary)] cursor-pointer">
          <input {...register('consent')} type="checkbox" className="mt-1 shrink-0 w-4 h-4 accent-[var(--brand-gold)]" />
          <span className="leading-relaxed">{t('consent')}</span>
        </label>
        {getError('consent') && <span className="block text-[0.65rem] sm:text-xs text-[var(--brand-burgundy)] mt-2">{getError('consent')}</span>}
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting || status === 'submitting'}
        className="font-serif w-full px-6 sm:px-10 py-3.5 sm:py-4 bg-[var(--brand-navy)] text-[var(--brand-gold)] border border-[var(--brand-gold)]/40 rounded-sm text-sm sm:text-base cursor-pointer transition-colors hover:bg-[var(--brand-gold)] hover:text-[var(--brand-navy)] disabled:opacity-50"
      >
        {status === 'submitting' ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
