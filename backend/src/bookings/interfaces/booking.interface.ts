export type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  service: string;
  pickup: string;
  destination: string;
  date: string;
  status: BookingStatus;
  company?: string;
  passengers?: number;
  meetAndGreet: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
