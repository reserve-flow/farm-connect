export interface Reservation {
  lotId: string;
  lotTitle: string;
  farmerName: string;
  quantity: number;
  phone: string;
  callTime: 'morning' | 'afternoon' | 'night';
  totalPrice: number;
  date: string;
  pricePerKg?: number;
}

export interface CreateReservationInput {
  lotId: string;
  lotTitle: string;
  farmerName: string;
  quantity: number;
  phone: string;
  callTime: 'morning' | 'afternoon' | 'night';
  pricePerKg: number;
}

export interface UpdateReservationInput {
  quantity?: number;
  phone?: string;
  callTime?: 'morning' | 'afternoon' | 'night';
}
