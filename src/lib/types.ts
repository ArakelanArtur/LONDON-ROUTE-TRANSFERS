export type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  service: string;
  route: string;
  date: string;
  status: BookingStatus;
}

export interface BookingFormData {
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
  consent: boolean;
}
