'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { BookingStatus } from '@/lib/types';
import { getBookings, updateBookingStatus, BookingResponse } from '@/lib/api';

const statusStyles: Record<BookingStatus, string> = {
  confirmed: 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50',
  pending: 'bg-amber-900/60 text-amber-300 border border-amber-700/50',
  completed: 'bg-blue-900/60 text-blue-300 border border-blue-700/50',
  cancelled: 'bg-red-900/60 text-red-300 border border-red-700/50',
};

export default function BookingTable() {
  const t = useTranslations('manager');
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  async function fetchData() {
    try {
      setLoading(true);
      setError('');
      const data = await getBookings(search || undefined, statusFilter || undefined);
      setBookings(data);
    } catch {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [search, statusFilter]);

  async function handleStatusChange(id: string, newStatus: string) {
    try {
      await updateBookingStatus(id, newStatus);
      await fetchData();
    } catch {
      setError('Failed to update status');
    }
  }

  const stats = useMemo(() => {
    return {
      total: bookings.length,
      confirmed: bookings.filter((b) => b.status === 'confirmed').length,
      pending: bookings.filter((b) => b.status === 'pending').length,
      completed: bookings.filter((b) => b.status === 'completed').length,
    };
  }, [bookings]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-0">
      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {([
          { key: 'total', label: t('total'), value: stats.total, accent: 'bg-[var(--brand-navy)] border-[var(--brand-gold)]/20 text-white' },
          { key: 'confirmed', label: t('confirmed'), value: stats.confirmed, accent: 'bg-emerald-900/40 border-emerald-700/50 text-emerald-200' },
          { key: 'pending', label: t('pending'), value: stats.pending, accent: 'bg-amber-900/40 border-amber-700/50 text-amber-200' },
          { key: 'completed', label: t('completed'), value: stats.completed, accent: 'bg-blue-900/40 border-blue-700/50 text-blue-200' },
        ] as const).map((stat) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border rounded-sm p-4 sm:p-6 text-center ${stat.accent}`}
          >
            <div className="text-xl sm:text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-[0.6rem] sm:text-xs uppercase tracking-widest opacity-70">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5 sm:mb-6">
        <div className="flex gap-2 sm:gap-3 flex-1 flex-wrap">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="flex-1 min-w-[160px] px-3 sm:px-4 py-2.5 bg-white border border-gray-200/80 rounded-sm text-xs sm:text-sm text-[var(--brand-navy)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--brand-gold)] transition-colors"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto min-w-[130px] sm:min-w-[160px] px-3 sm:px-4 py-2.5 bg-white border border-gray-200/80 rounded-sm text-xs sm:text-sm text-[var(--brand-navy)] focus:outline-none focus:border-[var(--brand-gold)] transition-colors"
          >
            <option value="">{t('allStatuses')}</option>
            <option value="confirmed">{t('statusConfirmed')}</option>
            <option value="pending">{t('statusPending')}</option>
            <option value="completed">{t('statusCompleted')}</option>
            <option value="cancelled">{t('statusCancelled')}</option>
          </select>
        </div>
        <span className="text-[0.6rem] sm:text-[0.7rem] text-[var(--text-muted)] uppercase tracking-wider whitespace-nowrap text-right">
          {bookings.length} {t('records')}
        </span>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-[var(--text-muted)] text-sm">{t('loading')}</div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 text-[var(--text-muted)] text-sm border border-gray-200/80 rounded-sm bg-white">
          {t('empty')}
        </div>
      ) : (
        <div className="border border-gray-200/80 rounded-sm overflow-x-auto bg-white">
          <table className="w-full border-collapse text-xs sm:text-sm leading-snug min-w-[640px]">
            <thead>
              <tr className="bg-[var(--brand-navy)] text-[var(--brand-gold)]">
                <th className="text-left px-2 sm:px-3 py-2 sm:py-3 font-bold text-[0.6rem] sm:text-xs uppercase tracking-widest whitespace-nowrap">{t('table.id')}</th>
                <th className="text-left px-2 sm:px-3 py-2 sm:py-3 font-bold text-[0.6rem] sm:text-xs uppercase tracking-widest whitespace-nowrap">{t('table.client')}</th>
                <th className="text-left px-2 sm:px-3 py-2 sm:py-3 font-bold text-[0.6rem] sm:text-xs uppercase tracking-widest whitespace-nowrap">{t('table.phone')}</th>
                <th className="text-left px-2 sm:px-3 py-2 sm:py-3 font-bold text-[0.6rem] sm:text-xs uppercase tracking-widest whitespace-nowrap">{t('table.service')}</th>
                <th className="text-left px-2 sm:px-3 py-2 sm:py-3 font-bold text-[0.6rem] sm:text-xs uppercase tracking-widest whitespace-nowrap">{t('table.route')}</th>
                <th className="text-left px-2 sm:px-3 py-2 sm:py-3 font-bold text-[0.6rem] sm:text-xs uppercase tracking-widest whitespace-nowrap">{t('table.date')}</th>
                <th className="text-left px-2 sm:px-3 py-2 sm:py-3 font-bold text-[0.6rem] sm:text-xs uppercase tracking-widest whitespace-nowrap">{t('table.passengers')}</th>
                <th className="text-left px-2 sm:px-3 py-2 sm:py-3 font-bold text-[0.6rem] sm:text-xs uppercase tracking-widest whitespace-nowrap">{t('table.status')}</th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 font-bold text-[0.6rem] sm:text-xs uppercase tracking-widest whitespace-nowrap">{t('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-gray-100 hover:bg-[var(--bg-warm)] transition-colors"
                >
                  <td className="px-2 sm:px-3 py-2 sm:py-3 font-semibold text-[var(--brand-gold)] whitespace-nowrap align-top">{booking.id.slice(0, 8)}</td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 align-top">
                    <div className="font-semibold text-[var(--brand-navy)] break-words max-w-[100px] sm:max-w-[140px] leading-tight">{booking.clientName}</div>
                    <div className="text-[0.55rem] sm:text-[0.65rem] text-[var(--text-muted)] break-words max-w-[120px] sm:max-w-[160px]">{booking.email}</div>
                  </td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 text-[var(--text-secondary)] break-all max-w-[100px] sm:max-w-[140px] align-top leading-tight">{booking.phone}</td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 text-[var(--text-secondary)] whitespace-nowrap align-top leading-tight">{booking.service}</td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 text-[var(--text-secondary)] break-words max-w-[120px] sm:max-w-[200px] align-top leading-tight">{booking.pickup} → {booking.destination}</td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 text-[var(--text-secondary)] whitespace-nowrap align-top leading-tight">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 text-[var(--text-secondary)] text-center align-top leading-tight">{booking.passengers ?? '—'}</td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 align-top">
                    <span className={`inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm text-[0.5rem] sm:text-[0.6rem] font-bold uppercase tracking-wider whitespace-nowrap ${statusStyles[booking.status as BookingStatus]}`}>
                      {booking.status === 'confirmed' && t('statusConfirmed')}
                      {booking.status === 'pending' && t('statusPending')}
                      {booking.status === 'completed' && t('statusCompleted')}
                      {booking.status === 'cancelled' && t('statusCancelled')}
                    </span>
                  </td>
                  <td className="px-2 sm:px-3 py-2 sm:py-3 text-center align-top">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className="text-[0.55rem] sm:text-xs px-1 sm:px-1.5 py-0.5 sm:py-1 rounded-sm border border-gray-200 bg-white text-[var(--brand-navy)] cursor-pointer hover:border-[var(--brand-gold)] transition-colors max-w-[90px] sm:max-w-none"
                    >
                      <option value="pending">{t('statusPending')}</option>
                      <option value="confirmed">{t('statusConfirmed')}</option>
                      <option value="completed">{t('statusCompleted')}</option>
                      <option value="cancelled">{t('statusCancelled')}</option>
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
