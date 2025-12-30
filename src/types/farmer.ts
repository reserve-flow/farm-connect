export type FarmerStatus = "active" | "suspended";

export interface Farmer {
  id: string;
  name: string;
  region: string;
  yearsFarming: number;
  productType: string;
  invited: boolean;
  biography: string;
  status: FarmerStatus;
  avatar?: string;
  verified?: boolean;
  followersCount?: number;
  rating?: number;
}
