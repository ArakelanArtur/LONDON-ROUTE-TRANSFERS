const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface CreateBookingData {
  name: string;
  company?: string;
  phone: string;
  email: string;
  service: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  meetAndGreet?: string;
  notes?: string;
}

export interface BookingResponse {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  service: string;
  pickup: string;
  destination: string;
  date: string;
  status: string;
  company?: string;
  passengers?: number;
  meetAndGreet: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export async function createBooking(data: CreateBookingData): Promise<BookingResponse> {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Network error' }));
    throw new Error(Array.isArray(err.message) ? err.message[0] : err.message);
  }

  return res.json();
}

export async function getBookings(search?: string, status?: string): Promise<BookingResponse[]> {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (status) params.set('status', status);

  const url = `${API_BASE}/bookings${params.toString() ? `?${params}` : ''}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }

  return res.json();
}

export async function updateBookingStatus(id: string, status: string): Promise<BookingResponse> {
  const res = await fetch(`${API_BASE}/bookings/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Failed to update status' }));
    throw new Error(Array.isArray(err.message) ? err.message[0] : err.message);
  }

  return res.json();
}
