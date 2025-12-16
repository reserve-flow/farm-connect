/**
 * Reservation-related constants
 * Centralized configuration for reservation flow
 */

export const QUANTITY_OPTIONS = ['5', '10', '50', '100'] as const;

export const CALL_TIME_OPTIONS = [
  { value: 'morning', label: 'صبح' },
  { value: 'afternoon', label: 'عصر' },
  { value: 'night', label: 'شب' },
] as const;

export type CallTimeValue = typeof CALL_TIME_OPTIONS[number]['value'];
