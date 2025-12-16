/**
 * Mock data for lots
 * This file contains sample data for development.
 * In production, this data would come from the API.
 */

import type { LotWithFarmer } from '@/types';

export const mockLots: LotWithFarmer[] = [
  {
    farmer: {
      id: "1",
      name: "علی رضایی",
      region: "مازندران، آمل",
      verified: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ali",
    },
    lot: {
      id: "1",
      title: "برنج طارم هاشمی درجه یک",
      pricePerKg: 1850,
      minKg: 10,
      harvestStart: "15 شهریور",
      harvestEnd: "30 شهریور",
      reservedPct: 68,
      heroPoster: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=640&h=360&fit=crop&fm=webp&q=80",
    },
  },
  {
    farmer: {
      id: "2",
      name: "محمد کریمی",
      region: "گیلان، رشت",
      verified: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohammad",
    },
    lot: {
      id: "2",
      title: "برنج دمسیاه محلی",
      pricePerKg: 1650,
      minKg: 15,
      harvestStart: "20 شهریور",
      harvestEnd: "5 مهر",
      reservedPct: 42,
      heroPoster: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=640&h=360&fit=crop&fm=webp&q=80&sat=-20",
    },
  },
  {
    farmer: {
      id: "3",
      name: "حسین احمدی",
      region: "مازندران، ساری",
      verified: false,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hossein",
    },
    lot: {
      id: "3",
      title: "برنج ندا ارگانیک",
      pricePerKg: 2100,
      minKg: 8,
      harvestStart: "10 شهریور",
      harvestEnd: "25 شهریور",
      reservedPct: 85,
      heroPoster: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=640&h=360&fit=crop&fm=webp&q=80",
    },
  },
];
