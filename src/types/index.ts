export type { Farmer, FarmerStatus } from './farmer';
export type { Commitment, CommitmentStatus } from './commitment';
export type { Reservation, ReservationStatus, CreateReservationInput, UpdateReservationInput } from './reservation';
export type { SuspensionFlag } from './suspension';
export type { BlogPost } from './blog';

// Legacy types (to be migrated)
export type { Lot } from './lot';
export interface LotWithFarmer {
  farmer: import('./farmer').Farmer;
  lot: import('./lot').Lot;
}
