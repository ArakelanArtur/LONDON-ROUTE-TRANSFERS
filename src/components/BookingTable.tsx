'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Booking, BookingStatus } from '@/lib/types';
import { mockBookings } from '@/lib/mock-data';

const statusStyles: Record<BookingStatus, string> = {
  confirmed: 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50',
  pending: 'bg-amber-900/60 text-amber-300 border border-amber-700/50',
  completed: 'bg-blue-900/60 text-blue-300 border border-blue-700/50',
  cancelled: 'bg-red-900/60 text-red-300 border border-red-700/50',
};

export default function BookingTable() {
  const t = useTranslations('manager');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => {
    let items = mockBookings;
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (b) =>
          b.clientName.toLowerCase().includes(q) ||
          b.phone.includes(q) ||
          b.pickup.toLowerCase().includes(q) ||
          b.destination.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q)
      );
    }
    if (statusFilter) {
      items = items.filter((b) => b.status === statusFilter);
    }
    return items;
  }, [search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: mockBookings.length,
      confirmed: mockBookings.filter((b) => b.status === 'confirmed').length,
      pending: mockBookings.filter((b) => b.status === 'pending').length,
      completed: mockBookings.filter((b) => b.status === 'completed').length,
    };
  }, []);

  return (
    <div className="max-w-[900px] mx-auto">
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
            className={`border rounded-sm p-4 sm:p-5 text-center ${stat.accent}`}
          >
            <div className="text-xl sm:text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-[0.55rem] sm:text-[0.65rem] uppercase tracking-widest opacity-70">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6 flex-wrap">
        <div className="flex gap-2 sm:gap-3 flex-1 flex-wrap min-w-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="flex-1 min-w-[140px] sm:min-w-[200px] px-3 sm:px-4 py-2.5 bg-white border border-gray-200/80 rounded-sm text-xs sm:text-sm text-[var(--brand-navy)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--brand-gold)] transition-colors"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="min-w-[130px] sm:min-w-[160px] px-3 sm:px-4 py-2.5 bg-white border border-gray-200/80 rounded-sm text-xs sm:text-sm text-[var(--brand-navy)] focus:outline-none focus:border-[var(--brand-gold)] transition-colors"
          >
            <option value="">{t('allStatuses')}</option>
            <option value="confirmed">{t('statusConfirmed')}</option>
            <option value="pending">{t('statusPending')}</option>
            <option value="completed">{t('statusCompleted')}</option>
            <option value="cancelled">{t('statusCancelled')}</option>
          </select>
        </div>
        <span className="text-[0.6rem] sm:text-[0.7rem] text-[var(--text-muted)] uppercase tracking-wider whitespace-nowrap">
          {filtered.length} {t('records')}
        </span>
      </div>

      {/* Mobile: card layout */}
      <div className="sm:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)] text-sm">{t('empty')}</div>
        ) : (
          filtered.map((booking, idx) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="bg-white border border-gray-200/80 rounded-sm p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[var(--brand-gold)] text-[0.75rem]">{booking.id}</span>
                <span className={`inline-block px-2 py-0.5 rounded-sm text-[0.6rem] font-bold uppercase tracking-wider ${statusStyles[booking.status]}`}>
                  {booking.status === 'confirmed' && t('statusConfirmed')}
                  {booking.status === 'pending' && t('statusPending')}
                  {booking.status === 'completed' && t('statusCompleted')}
                  {booking.status === 'cancelled' && t('statusCancelled')}
                </span>
              </div>
              <div className="font-semibold text-[var(--brand-navy)] text-xs">{booking.clientName}</div>
              <div className="text-[0.65rem] text-[var(--text-muted)]">{booking.phone} · {booking.email}</div>
              <div className="text-[0.65rem] text-[var(--text-secondary)]">{booking.service}</div>
              <div className="text-[0.65rem] text-[var(--text-secondary)]">{booking.pickup} → {booking.destination}</div>
              <div className="flex items-center justify-between">
                <span className="text-[0.65rem] text-[var(--text-secondary)]">{booking.date}</span>
                {booking.passengers && <span className="text-[0.65rem] text-[var(--text-muted)]">Pax: {booking.passengers}</span>}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Desktop: table layout */}
      <div className="hidden sm:block border border-gray-200/80 rounded-sm overflow-hidden">
        <table className="w-full border-collapse bg-white text-xs">
          <thead>
            <tr className="bg-[var(--brand-navy)] text-[var(--brand-gold)]">
              <th className="text-left px-3 sm:px-4 py-2.5 sm:py-3 font-bold text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest">{t('table.id')}</th>
              <th className="text-left px-3 sm:px-4 py-2.5 sm:py-3 font-bold text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest">{t('table.client')}</th>
              <th className="text-left px-3 sm:px-4 py-2.5 sm:py-3 font-bold text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest hidden md:table-cell">{t('table.phone')}</th>
              <th className="text-left px-3 sm:px-4 py-2.5 sm:py-3 font-bold text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest hidden lg:table-cell">{t('table.service')}</th>
              <th className="text-left px-3 sm:px-4 py-2.5 sm:py-3 font-bold text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest hidden lg:table-cell">{t('table.route')}</th>
              <th className="text-left px-3 sm:px-4 py-2.5 sm:py-3 font-bold text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest hidden md:table-cell">{t('table.date')}</th>
              <th className="text-left px-3 sm:px-4 py-2.5 sm:py-3 font-bold text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest hidden xl:table-cell">{t('table.passengers')}</th>
              <th className="text-left px-3 sm:px-4 py-2.5 sm:py-3 font-bold text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest">{t('table.status')}</th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest">{t('table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-16 text-center text-[var(--text-muted)]">
                  {t('empty')}
                </td>
              </tr>
            ) : (
              filtered.map((booking, idx) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-gray-100 hover:bg-[var(--bg-warm)] transition-colors"
                >
                  <td className="px-3 sm:px-4 py-2.5 font-semibold text-[var(--brand-gold)] text-[0.7rem] sm:text-[0.75rem]">{booking.id}</td>
                  <td className="px-3 sm:px-4 py-2.5">
                    <div className="font-semibold text-[var(--brand-navy)] text-[0.7rem] sm:text-xs">{booking.clientName}</div>
                    <div className="text-[0.6rem] sm:text-[0.65rem] text-[var(--text-muted)]">{booking.email}</div>
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 text-[var(--text-secondary)] text-[0.7rem] hidden md:table-cell">{booking.phone}</td>
                  <td className="px-3 sm:px-4 py-2.5 text-[var(--text-secondary)] text-[0.7rem] hidden lg:table-cell">{booking.service}</td>
                  <td className="px-3 sm:px-4 py-2.5 text-[var(--text-secondary)] text-[0.7rem] hidden lg:table-cell">{booking.pickup} → {booking.destination}</td>
                  <td className="px-3 sm:px-4 py-2.5 text-[var(--text-secondary)] text-[0.7rem] hidden md:table-cell whitespace-nowrap">{booking.date}</td>
                  <td className="px-3 sm:px-4 py-2.5 text-[var(--text-secondary)] text-[0.7rem] hidden xl:table-cell">{booking.passengers ?? '—'}</td>
                  <td className="px-3 sm:px-4 py-2.5">
                    <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-sm text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-wider ${statusStyles[booking.status]}`}>
                      {booking.status === 'confirmed' && t('statusConfirmed')}
                      {booking.status === 'pending' && t('statusPending')}
                      {booking.status === 'completed' && t('statusCompleted')}
                      {booking.status === 'cancelled' && t('statusCancelled')}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 text-center">
                    <span className="text-[var(--brand-gold)] text-xs cursor-pointer hover:text-[var(--brand-navy)] px-2 py-1 rounded transition-colors inline-block border border-transparent hover:border-[var(--brand-gold)]/30">
                      ✎
                    </span>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
