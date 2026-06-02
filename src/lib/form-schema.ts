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
  passengers: z.string().min(1, 'passengersRequired'),
  meetAndGreet: z.string().optional(),
  notes: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'consentRequired',
  }),
}).superRefine((data, ctx) => {
  const passengersNum = parseInt(data.passengers, 10);
  if (isNaN(passengersNum) || passengersNum < 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'passengersMin',
      path: ['passengers'],
    });
  }
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
