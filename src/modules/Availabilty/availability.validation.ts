import { z } from 'zod';

export const createAvailabilityValidationSchema = z.object({
  body: z.object({
    day: z.string(),
    timeSlots: z.array(z.string().min(1)),
    serviceId: z.string(),
  }),
});

export const updateAvailabilityValidationSchema = z.object({
  body: z.object({
    day: z.string().optional(),
    timeSlots: z.array(z.string().min(1)).optional(),
    serviceId: z.string().optional(),
  }),
});
