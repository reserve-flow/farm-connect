"use client";

/**
 * Custom hooks for lots data fetching
 * Follows the same pattern as useBlogPosts for consistency
 */

import { useQuery } from '@tanstack/react-query';
import { lotsApi } from '@/services/api';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export function useLots() {
  return useQuery({
    queryKey: ['lots'],
    queryFn: lotsApi.getAllLots,
    staleTime: STALE_TIME,
  });
}

export function useLot(lotId: string | undefined) {
  return useQuery({
    queryKey: ['lot', lotId],
    queryFn: () => (lotId ? lotsApi.getLotById(lotId) : null),
    enabled: !!lotId,
    staleTime: STALE_TIME,
  });
}

export function useLotsByFarmer(farmerId: string | undefined) {
  return useQuery({
    queryKey: ['lots', 'farmer', farmerId],
    queryFn: () => (farmerId ? lotsApi.getLotsByFarmerId(farmerId) : []),
    enabled: !!farmerId,
    staleTime: STALE_TIME,
  });
}

export function useSearchLots(query: string) {
  return useQuery({
    queryKey: ['lots', 'search', query],
    queryFn: () => lotsApi.searchLots(query),
    enabled: query.trim().length > 0,
    staleTime: STALE_TIME,
  });
}
