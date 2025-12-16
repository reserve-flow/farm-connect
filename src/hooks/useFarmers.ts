"use client";

/**
 * Custom hooks for farmers data fetching
 * Follows the same pattern as useBlogPosts for consistency
 */

import { useQuery } from '@tanstack/react-query';
import { farmersApi } from '@/services/api';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export function useFarmers() {
  return useQuery({
    queryKey: ['farmers'],
    queryFn: farmersApi.getAllFarmers,
    staleTime: STALE_TIME,
  });
}

export function useFarmer(farmerId: string | undefined) {
  return useQuery({
    queryKey: ['farmer', farmerId],
    queryFn: () => (farmerId ? farmersApi.getFarmerById(farmerId) : null),
    enabled: !!farmerId,
    staleTime: STALE_TIME,
  });
}
