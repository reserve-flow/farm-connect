/**
 * Reservations API Service
 * 
 * Currently uses localStorage. To integrate with real backend:
 * 1. Replace localStorage calls with actual API calls
 * 2. Update return types if needed
 */

import type { Reservation, CreateReservationInput, UpdateReservationInput } from '@/types';
import { getItem, setItem, STORAGE_KEYS } from '@/services/storage/localStorage';

/**
 * Fetch all reservations for current user
 */
export async function getAllReservations(): Promise<Reservation[]> {
  // TODO: Replace with actual API call
  // return fetch('/api/reservations').then(res => res.json());
  const reservations = getItem<Reservation[]>(STORAGE_KEYS.RESERVATIONS);
  return Promise.resolve(reservations || []);
}

/**
 * Create a new reservation
 */
export async function createReservation(input: CreateReservationInput): Promise<Reservation> {
  // TODO: Replace with actual API call
  // return fetch('/api/reservations', { method: 'POST', body: JSON.stringify(input) }).then(res => res.json());
  
  const reservations = getItem<Reservation[]>(STORAGE_KEYS.RESERVATIONS) || [];
  
  const newReservation: Reservation = {
    ...input,
    totalPrice: (input.pricePerKg / 100) * input.quantity,
    date: new Date().toISOString(),
  };
  
  reservations.push(newReservation);
  setItem(STORAGE_KEYS.RESERVATIONS, reservations);
  
  return Promise.resolve(newReservation);
}

/**
 * Update an existing reservation by index
 * Note: When using real backend, this would use reservation ID instead of index
 */
export async function updateReservation(
  index: number,
  input: UpdateReservationInput,
  pricePerKg: number
): Promise<Reservation | null> {
  // TODO: Replace with actual API call
  // return fetch(`/api/reservations/${id}`, { method: 'PATCH', body: JSON.stringify(input) }).then(res => res.json());
  
  const reservations = getItem<Reservation[]>(STORAGE_KEYS.RESERVATIONS) || [];
  
  if (index < 0 || index >= reservations.length) {
    return Promise.resolve(null);
  }
  
  const updated: Reservation = {
    ...reservations[index],
    ...input,
    totalPrice: input.quantity 
      ? (pricePerKg / 100) * input.quantity 
      : reservations[index].totalPrice,
  };
  
  reservations[index] = updated;
  setItem(STORAGE_KEYS.RESERVATIONS, reservations);
  
  return Promise.resolve(updated);
}

/**
 * Delete a reservation by index
 * Note: When using real backend, this would use reservation ID instead of index
 */
export async function deleteReservation(index: number): Promise<boolean> {
  // TODO: Replace with actual API call
  // return fetch(`/api/reservations/${id}`, { method: 'DELETE' }).then(res => res.ok);
  
  const reservations = getItem<Reservation[]>(STORAGE_KEYS.RESERVATIONS) || [];
  
  if (index < 0 || index >= reservations.length) {
    return Promise.resolve(false);
  }
  
  reservations.splice(index, 1);
  setItem(STORAGE_KEYS.RESERVATIONS, reservations);
  
  return Promise.resolve(true);
}
