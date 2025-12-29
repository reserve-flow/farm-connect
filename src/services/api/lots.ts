/**
 * Legacy Lots API Service (for compatibility during migration).
 * Uses mock lots data; to be removed once all views switch to commitments.
 */
import type { LotWithFarmer } from "@/types";
import { mockLots } from "@/data/mockLots";

export async function getAllLots(): Promise<LotWithFarmer[]> {
	return Promise.resolve(mockLots);
}

export async function getLotById(lotId: string): Promise<LotWithFarmer | null> {
	const lot = mockLots.find((l) => l.lot.id === lotId);
	return Promise.resolve(lot || null);
}

export async function searchLots(query: string): Promise<LotWithFarmer[]> {
	if (!query.trim()) return Promise.resolve([]);

	const searchTerm = query.toLowerCase().trim();
	const results = mockLots.filter(
		({ farmer, lot }) =>
			lot.title.toLowerCase().includes(searchTerm) ||
			farmer.name.toLowerCase().includes(searchTerm) ||
			farmer.region.toLowerCase().includes(searchTerm),
	);

	return Promise.resolve(results);
}

export async function getLotsByFarmerId(farmerId: string): Promise<LotWithFarmer[]> {
	const lots = mockLots.filter((l) => l.farmer.id === farmerId);
	return Promise.resolve(lots);
}
