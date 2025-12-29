"use client";

import { useQuery } from "@tanstack/react-query";
import { commitmentsApi } from "@/services/api";

const STALE_TIME = 5 * 60 * 1000;

export function useCommitments() {
	return useQuery({
		queryKey: ["commitments"],
		queryFn: commitmentsApi.getCommitments,
		staleTime: STALE_TIME,
	});
}

export function useFarmerCommitments(farmerId: string | undefined) {
	return useQuery({
		queryKey: ["commitments", "farmer", farmerId],
		queryFn: async () => {
			if (!farmerId) return [];
			const all = await commitmentsApi.getCommitments();
			return all.filter((c) => c.farmerId === farmerId);
		},
		enabled: !!farmerId,
		staleTime: STALE_TIME,
	});
}
