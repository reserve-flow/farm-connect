"use client";

/**
 * Custom hook for reservation form state management
 * Separates form logic from UI components
 */

import { useState, useEffect, useCallback } from 'react';
import { phoneSchema } from '@/lib/validation';
import type { CallTimeValue } from '@/constants/reservation';

interface ReservationFormData {
  quantity: string;
  phone: string;
  callTime: CallTimeValue;
}

interface UseReservationFormOptions {
  initialData?: ReservationFormData;
  pricePerKg: number;
}

export function useReservationForm({ initialData, pricePerKg }: UseReservationFormOptions) {
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(initialData?.quantity || '5');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [callTime, setCallTime] = useState<CallTimeValue>(initialData?.callTime || 'morning_1');
  const [phoneError, setPhoneError] = useState('');

  // Calculate total price
  const totalPrice = (parseInt(quantity) * pricePerKg) / 100;

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      setQuantity(initialData.quantity);
      setPhone(initialData.phone);
      setCallTime(initialData.callTime);
    }
  }, [initialData]);

  // Validate phone number
  const validatePhone = useCallback((value: string): boolean => {
    setPhoneError('');
    const result = phoneSchema.safeParse(value);
    if (!result.success) {
      setPhoneError(result.error.message);
      return false;
    }
    return true;
  }, []);

  // Handle phone change with error clearing
  const handlePhoneChange = useCallback((value: string) => {
    setPhone(value);
    if (phoneError) {
      setPhoneError('');
    }
  }, [phoneError]);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setStep(1);
    if (!initialData) {
      setQuantity('5');
      setPhone('');
      setCallTime('morning_1');
    }
    setPhoneError('');
  }, [initialData]);

  // Navigate to next step with validation
  const goToNextStep = useCallback(() => {
    if (step === 2 && !validatePhone(phone)) {
      return false;
    }
    setStep((prev) => Math.min(prev + 1, 4));
    return true;
  }, [step, phone, validatePhone]);

  // Navigate to previous step
  const goToPrevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
  }, []);

  // Mark as completed (step 4)
  const complete = useCallback(() => {
    setStep(4);
  }, []);

  return {
    // State
    step,
    quantity,
    phone,
    callTime,
    phoneError,
    totalPrice,
    
    // Setters
    setQuantity,
    setCallTime,
    handlePhoneChange,
    
    // Validation
    validatePhone,
    
    // Navigation
    goToNextStep,
    goToPrevStep,
    complete,
    resetForm,
  };
}
