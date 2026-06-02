'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Booking, BookingStatus } from '@/lib/types';
import { mockBookings } from '@/lib/mock-data';

const statusStyles: Record<BookingStatus, string> = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
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
          b.route.toLowerCase().includes(q) ||
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {([
          { key: 'total', label: t('total'), value: stats.total, color: 'bg-gray-100 text-gray-900' },
          { key: 'confirmed', label: t('confirmed'), value: stats.confirmed, color: 'bg-green-100 text-green-800' },
          { key: 'pending', label: t('pending'), value: stats.pending, color: 'bg-yellow-100 text-yellow-800' },
          { key: 'completed', label: t('completed'), value: stats.completed, color: 'bg-blue-100 text-blue-800' },
        ] as const).map((stat) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-4 text-center"
          >
            <div className={`text-2xl font-bold ${stat.color.split(' ')[1]} mb-1`}>{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
        <div className="flex gap-3 flex-1 flex-wrap">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="flex-1 min-w-[200px] px-3.5 py-2.5 border border-gray-300 rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-gold transition-colors"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="min-w-[160px] px-3.5 py-2.5 border border-gray-300 rounded text-sm bg-white text-gray-800 focus:outline-none focus:border-gold transition-colors"
          >
            <option value="">{t('allStatuses')}</option>
            <option value="confirmed">{t('statusConfirmed')}</option>
            <option value="pending">{t('statusPending')}</option>
            <option value="completed">{t('statusCompleted')}</option>
            <option value="cancelled">{t('statusCancelled')}</option>
          </select>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {filtered.length} {t('records')}
        </span>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full border-collapse bg-white text-xs">
          <thead>
            <tr className="bg-black text-white">
              <th className="text-left px-3 py-2.5 font-bold text-[0.75rem] tracking-wide">{t('table.id')}</th>
              <th className="text-left px-3 py-2.5 font-bold text-[0.75rem] tracking-wide">{t('table.client')}</th>
              <th className="text-left px-3 py-2.5 font-bold text-[0.75rem] tracking-wide hidden sm:table-cell">{t('table.phone')}</th>
              <th className="text-left px-3 py-2.5 font-bold text-[0.75rem] tracking-wide hidden md:table-cell">{t('table.service')}</th>
              <th className="text-left px-3 py-2.5 font-bold text-[0.75rem] tracking-wide hidden lg:table-cell">{t('table.route')}</th>
              <th className="text-left px-3 py-2.5 font-bold text-[0.75rem] tracking-wide hidden sm:table-cell">{t('table.date')}</th>
              <th className="text-left px-3 py-2.5 font-bold text-[0.75rem] tracking-wide">{t('table.status')}</th>
              <th className="px-3 py-2.5">{t('table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
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
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2.5 font-semibold text-gold text-[0.8rem]">{booking.id}</td>
                  <td className="px-3 py-2.5">
                    <div className="font-semibold text-gray-900">{booking.clientName}</div>
                    <div className="text-[0.7rem] text-gray-400">{booking.email}</div>
                  </td>
                  <td className="px-3 py-2.5 text-gray-700 hidden sm:table-cell">{booking.phone}</td>
                  <td className="px-3 py-2.5 text-gray-700 hidden md:table-cell">{booking.service}</td>
                  <td className="px-3 py-2.5 text-gray-700 hidden lg:table-cell">{booking.route}</td>
                  <td className="px-3 py-2.5 text-gray-700 hidden sm:table-cell whitespace-nowrap">{booking.date}</td>
                  <td className="px-3 py-2.5">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[0.7rem] font-bold ${statusStyles[booking.status]}`}>
                      {booking.status === 'confirmed' && t('statusConfirmed')}
                      {booking.status === 'pending' && t('statusPending')}
                      {booking.status === 'completed' && t('statusCompleted')}
                      {booking.status === 'cancelled' && t('statusCancelled')}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className="text-gold text-xs cursor-pointer hover:bg-gold hover:text-white px-2 py-1 rounded transition-colors inline-block">
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
