import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().min(1, 'nameRequired'),
  company: z.string().optional(),
  phone: z.string().min(1, 'phoneRequired').regex(/^[\d\s\-+()]{7,20}$/, 'phoneInvalid'),
  email: z.string().min(1, 'emailRequired').email('emailInvalid'),
  service: z.string().min(1, 'serviceRequired'),
  pickup: z.string().min(1, 'pickupRequired'),
  destination: z.string().min(1, 'destinationRequired'),
  date: z.string().min(1, 'dateRequired'),
  time: z.string().min(1, 'timeRequired'),
  passengers: z.coerce.number({ message: 'passengersRequired' }).min(1, 'passengersMin'),
  meetAndGreet: z.string().optional(),
  notes: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'consentRequired',
  }),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const quickBookingSchema = z.object({
  destination: z.string().min(1, 'destinationRequired'),
  date: z.string().min(1, 'dateRequired'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'consentRequired',
  }),
});

export type QuickBookingFormValues = z.infer<typeof quickBookingSchema>;
