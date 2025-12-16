export interface Lot {
  id: string;
  title: string;
  pricePerKg: number;
  minKg: number;
  harvestStart: string;
  harvestEnd: string;
  reservedPct: number;
  heroVideo?: string;
  heroPoster: string;
}
