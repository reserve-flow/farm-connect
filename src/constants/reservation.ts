/**
 * Reservation-related constants
 * Centralized configuration for reservation flow
 */

export const QUANTITY_OPTIONS = ["5", "10", "50", "100"] as const;

export const CALL_TIME_OPTIONS = [
  { value: "morning_1", label: "صبح ۸ تا ۱۰" },
  { value: "morning_2", label: "صبح ۱۰ تا ۱۲" },
  { value: "afternoon", label: "ظهر ۱۲ تا ۱۵" },
  { value: "night_1", label: "عصر ۱۵ تا ۱۸" },
  { value: "night_2", label: "شب ۱۸ تا ۲۱" },
] as const;

export type CallTimeValue = (typeof CALL_TIME_OPTIONS)[number]["value"];
