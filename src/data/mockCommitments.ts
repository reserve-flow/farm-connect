import type { Commitment, Farmer, Reservation, SuspensionFlag } from "@/types";

export const mockFarmers: Farmer[] = [
	{
		id: "f-1",
		name: "علی رضایی",
		region: "مازندران، آمل",
		yearsFarming: 12,
		productType: "برنج طارم",
		invited: true,
		biography: "کشاورز دعوت‌شده با سابقه برداشت ثابت.",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ali",
	},
	{
		id: "f-2",
		name: "محمد کریمی",
		region: "گیلان، رشت",
		yearsFarming: 9,
		productType: "برنج دمسیاه",
		invited: true,
		biography: "تمرکز بر برداشت‌های محدود و تحویل به‌موقع.",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohammad",
	},
	{
		id: "f-3",
		name: "حسین احمدی",
		region: "مازندران، ساری",
		yearsFarming: 15,
		productType: "برنج ندا",
		invited: true,
		biography: "یک سابقه خلف وعده ثبت‌شده؛ در حال پیگیری.",
		status: "suspended",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hossein",
	},
];

export const mockCommitments: Commitment[] = [
	{
		id: "c-1",
		farmerId: "f-1",
		quantity: 1200,
		unit: "kg",
		deliveryWindowStart: "2024-09-01",
		deliveryWindowEnd: "2024-09-20",
		createdAt: "2024-07-10",
		status: "open",
		publicLinkSlug: "ali-rezaei-tarom-1403",
	},
	{
		id: "c-2",
		farmerId: "f-2",
		quantity: 800,
		unit: "kg",
		deliveryWindowStart: "2024-09-10",
		deliveryWindowEnd: "2024-09-25",
		createdAt: "2024-07-18",
		status: "delivered",
		publicLinkSlug: "mohammad-karimi-domsiah-1403",
	},
	{
		id: "c-3",
		farmerId: "f-3",
		quantity: 600,
		unit: "kg",
		deliveryWindowStart: "2024-08-20",
		deliveryWindowEnd: "2024-09-05",
		createdAt: "2024-07-05",
		status: "failed",
		publicLinkSlug: "hossein-ahmadi-neda-1403",
	},
	{
		id: "c-4",
		farmerId: "f-2",
		quantity: 500,
		unit: "kg",
		deliveryWindowStart: "2024-10-01",
		deliveryWindowEnd: "2024-10-20",
		createdAt: "2024-08-02",
		status: "pending",
		publicLinkSlug: "mohammad-karimi-domsiah-1403b",
	},
];

export const mockReservations: Reservation[] = [
	{
		id: "r-1",
		commitmentId: "c-1",
		status: "reserved",
		buyerContact: "09xx-xxx-1234",
		createdAt: "2024-07-20",
	},
	{
		id: "r-2",
		commitmentId: "c-2",
		status: "delivered",
		markedByBuyerAt: "2024-09-15",
		createdAt: "2024-08-01",
	},
	{
		id: "r-3",
		commitmentId: "c-3",
		status: "not_delivered",
		markedByBuyerAt: "2024-09-06",
		createdAt: "2024-07-12",
		note: "تحویل انجام نشد (گزارش خریدار)",
	},
	{
		id: "r-4",
		commitmentId: "c-3",
		status: "not_delivered",
		markedByBuyerAt: "2024-09-07",
		createdAt: "2024-07-15",
		note: "Late delivery reported",
	},
	{
		id: "r-5",
		commitmentId: "c-4",
		status: "reserved",
		createdAt: "2024-08-05",
	},
];

export const mockSuspensions: SuspensionFlag[] = [
	{
		id: "s-1",
		farmerId: "f-3",
		reason: "ثبت نتیجه تحویل انجام نشد در تعهد c-3",
		createdAt: "2024-09-06",
	},
	{
		id: "s-2",
		farmerId: "f-3",
		reason: "تکرار گزارش تحویل انجام نشد در رزروهای متعدد",
		createdAt: "2024-09-08",
	},
];
