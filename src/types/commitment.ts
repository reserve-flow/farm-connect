export type CommitmentStatus = "open" | "delivered" | "failed" | "pending";

export interface Commitment {
	id: string;
	farmerId: string;
	quantity: number;
	unit: string;
	deliveryWindowStart: string;
	deliveryWindowEnd: string;
	createdAt: string;
	status: CommitmentStatus;
	publicLinkSlug: string;
}
