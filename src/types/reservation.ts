export type ReservationStatus = "reserved" | "delivered" | "not_delivered";

export interface Reservation {
	id?: string;
	commitmentId?: string;
	buyerContact?: string;
	status?: ReservationStatus;
	markedByBuyerAt?: string;
	note?: string;
	createdAt?: string;
	date?: string;

	// Legacy lot-based reservations (kept for compatibility during migration)
	lotId?: string;
	lotTitle?: string;
	farmerName?: string;
	pricePerKg?: number;
	quantity?: number;
	phone?: string;
	callTime?: string;
	totalPrice?: number;
}

export interface CreateReservationInput {
	lotId: string;
	lotTitle: string;
	farmerName: string;
	pricePerKg: number;
	quantity: number;
	phone: string;
	callTime: string;
	note?: string;
}

export interface UpdateReservationInput {
	quantity?: number;
	phone?: string;
	callTime?: string;
	status?: ReservationStatus;
	note?: string;
}
