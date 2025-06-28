import { z } from 'zod';

export const bookAppointmentValidationSchema = z.object({
  body: z.object({
    doctorId: z.string(),
    serviceId: z.string(),
    selectedDate: z.string(),
    timeSlot: z.string(),
  }),
});

export const updateAppointmentStatusSchema = z.object({
  body: z.object({
    status: z.enum(['pending', 'accepted', 'cancelled', 'completed']),
  }),
});
