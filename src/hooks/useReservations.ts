"use client";

/**
 * Custom hooks for reservations
 * Encapsulates reservation state and operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reservationsApi } from '@/services/api';
import type { CreateReservationInput, UpdateReservationInput } from '@/types';
import { toast } from '@/hooks/use-toast';

export function useReservations() {
  return useQuery({
    queryKey: ['reservations'],
    queryFn: reservationsApi.getAllReservations,
    staleTime: 0, // Always fresh for localStorage
  });
}

export function useCreateReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateReservationInput) => 
      reservationsApi.createReservation(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: () => {
      toast({
        title: 'خطا',
        description: 'ذخیره رزرو با مشکل مواجه شد',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      index, 
      input, 
      pricePerKg 
    }: { 
      index: number; 
      input: UpdateReservationInput; 
      pricePerKg: number;
    }) => reservationsApi.updateReservation(index, input, pricePerKg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: () => {
      toast({
        title: 'خطا',
        description: 'بروزرسانی رزرو با مشکل مواجه شد',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (index: number) => reservationsApi.deleteReservation(index),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: () => {
      toast({
        title: 'خطا',
        description: 'حذف رزرو با مشکل مواجه شد',
        variant: 'destructive',
      });
    },
  });
}
