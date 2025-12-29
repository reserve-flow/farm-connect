import { mockCommitments, mockFarmers, mockReservations, mockSuspensions } from "@/data/mockCommitments";
import type { Commitment, Farmer, Reservation } from "@/types";

export async function getCommitments(): Promise<Commitment[]> {
	return Promise.resolve(mockCommitments);
}

export async function getCommitmentById(id: string): Promise<Commitment | null> {
	return Promise.resolve(mockCommitments.find((c) => c.id === id) ?? null);
}

export async function getFarmers(): Promise<Farmer[]> {
	return Promise.resolve(mockFarmers);
}

export async function getFarmerById(id: string): Promise<Farmer | null> {
	return Promise.resolve(mockFarmers.find((f) => f.id === id) ?? null);
}

export async function getReservationsByCommitmentId(commitmentId: string): Promise<Reservation[]> {
	return Promise.resolve(mockReservations.filter((r) => r.commitmentId === commitmentId));
}

export async function getSuspensionsForFarmer(farmerId: string) {
	return Promise.resolve(mockSuspensions.filter((s) => s.farmerId === farmerId));
}
