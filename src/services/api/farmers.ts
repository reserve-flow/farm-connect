/**
 * Farmers API Service
 * 
 * Currently uses mock data. To integrate with real backend:
 * 1. Replace mock implementations with actual API calls
 * 2. Update return types if needed
 */

import type { Farmer } from '@/types';
import { mockLots } from '@/data/mockLots';

/**
 * Fetch a farmer by ID
 */
export async function getFarmerById(farmerId: string): Promise<Farmer | null> {
  // TODO: Replace with actual API call
  // return fetch(`/api/farmers/${farmerId}`).then(res => res.json());
  const lot = mockLots.find((l) => l.farmer.id === farmerId);
  return Promise.resolve(lot?.farmer || null);
}

/**
 * Fetch all farmers
 */
export async function getAllFarmers(): Promise<Farmer[]> {
  // TODO: Replace with actual API call
  // return fetch('/api/farmers').then(res => res.json());
  const uniqueFarmers = new Map<string, Farmer>();
  mockLots.forEach((l) => {
    if (!uniqueFarmers.has(l.farmer.id)) {
      uniqueFarmers.set(l.farmer.id, l.farmer);
    }
  });
  return Promise.resolve(Array.from(uniqueFarmers.values()));
}
