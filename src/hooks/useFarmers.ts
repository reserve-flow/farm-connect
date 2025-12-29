"use client";

import { useQuery } from "@tanstack/react-query";
import { commitmentsApi } from "@/services/api";

const STALE_TIME = 5 * 60 * 1000;

export function useFarmers() {
	return useQuery({
		queryKey: ["farmers"],
		queryFn: commitmentsApi.getFarmers,
		staleTime: STALE_TIME,
	});
}

export function useFarmerById(id: string | undefined) {
	return useQuery({
		queryKey: ["farmers", id],
		queryFn: () => (id ? commitmentsApi.getFarmerById(id) : Promise.resolve(null)),
		enabled: !!id,
		staleTime: STALE_TIME,
	});
}
