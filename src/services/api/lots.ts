/**
 * Lots API Service
 *
 * Currently uses mock data. To integrate with real backend:
 * 1. Replace mock implementations with actual API calls
 * 2. Update return types if needed
 */

import type { LotWithFarmer } from "@/types";
import { mockLots } from "@/data/mockLots";

/**
 * Fetch all available lots
 */
export async function getAllLots(): Promise<LotWithFarmer[]> {
  // TODO: Replace with actual API call
  // return fetch('/api/lots').then(res => res.json());
  return Promise.resolve(mockLots);
}

/**
 * Fetch a single lot by ID
 */
export async function getLotById(lotId: string): Promise<LotWithFarmer | null> {
  // TODO: Replace with actual API call
  // return fetch(`/api/lots/${lotId}`).then(res => res.json());
  const lot = mockLots.find((l) => l.lot.id === lotId);
  return Promise.resolve(lot || null);
}

/**
 * Search lots by query (title, farmer name, or region)
 */
export async function searchLots(query: string): Promise<LotWithFarmer[]> {
  // TODO: Replace with actual API call
  // return fetch(`/api/lots/search?q=${encodeURIComponent(query)}`).then(res => res.json());
  if (!query.trim()) return Promise.resolve([]);

  const searchTerm = query.toLowerCase().trim();
  const results = mockLots.filter(
    ({ farmer, lot }) =>
      lot.title.toLowerCase().includes(searchTerm) ||
      farmer.name.toLowerCase().includes(searchTerm) ||
      farmer.region.toLowerCase().includes(searchTerm)
  );

  return Promise.resolve(results);
}

/**
 * Fetch lots by farmer ID
 */
export async function getLotsByFarmerId(
  farmerId: string
): Promise<LotWithFarmer[]> {
  // TODO: Replace with actual API call
  // return fetch(`/api/farmers/${farmerId}/lots`).then(res => res.json());
  const lots = mockLots.filter((l) => l.farmer.id === farmerId);
  return Promise.resolve(lots);
}
