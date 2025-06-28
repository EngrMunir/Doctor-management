import { z } from 'zod';

export const createServiceValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.number(),
    duration: z.number(),
  }),
});

export const updateServiceValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    duration: z.number().optional(),
  }),
});
