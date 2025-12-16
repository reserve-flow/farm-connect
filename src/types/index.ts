export type { Farmer } from './farmer';
export type { Lot } from './lot';
export type { Reservation, CreateReservationInput, UpdateReservationInput } from './reservation';
export type { BlogPost } from './blog';

// Combined type for lot with farmer info
export interface LotWithFarmer {
  farmer: import('./farmer').Farmer;
  lot: import('./lot').Lot;
}
