/**
 * Validation schemas using Zod
 * Centralized validation for forms and API inputs
 */

import { z } from 'zod';

// Phone number validation for Iranian mobile numbers
export const phoneSchema = z
  .string()
  .trim()
  .regex(/^09\d{9}$/, 'شماره موبایل باید با 09 شروع شده و 11 رقم باشد');

// Reservation input validation
export const reservationSchema = z.object({
  quantity: z.number().min(1, 'مقدار باید حداقل 1 کیلوگرم باشد'),
  phone: phoneSchema,
  callTime: z.enum(['morning', 'afternoon', 'night']),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

// Generic validation helper
export function validateField<T>(
  schema: z.ZodSchema<T>,
  value: unknown
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(value);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error.message || 'Invalid input' };
}
