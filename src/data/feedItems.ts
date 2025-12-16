export interface FeedItem {
  id: string;
  type: 'text' | 'image' | 'video';
  title: string;
  content: string;
  date: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  imageUrl?: string;
  videoUrl?: string;
}

// Mock feed items - seasonal rice farming updates
export const feedItems: FeedItem[] = [
  {
    id: '1',
    type: 'image',
    title: 'شروع فصل نشاکاری',
    content: 'فصل بهار و آغاز نشاکاری برنج در شالیزارهای شمال. کشاورزان با همت بالا مشغول آماده‌سازی زمین هستند.',
    date: '2024-03-15',
    season: 'spring',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
  },
  {
    id: '2',
    type: 'text',
    title: 'نکات مهم آبیاری در تابستان',
    content: 'در فصل تابستان، آبیاری منظم و به موقع شالیزار اهمیت ویژه‌ای دارد. بهتر است صبح زود یا عصر آبیاری انجام شود تا از تبخیر بیش از حد جلوگیری شود.',
    date: '2024-07-20',
    season: 'summer',
  },
  {
    id: '3',
    type: 'image',
    title: 'برداشت برنج طارم',
    content: 'فصل پاییز و زمان برداشت رسیده. خوشه‌های طلایی برنج آماده برداشت هستند.',
    date: '2024-09-10',
    season: 'fall',
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&q=80',
  },
  {
    id: '4',
    type: 'text',
    title: 'نگهداری برنج در زمستان',
    content: 'برای حفظ کیفیت برنج در فصل زمستان، برنج را در ظروف درب‌دار و در جای خشک و خنک نگهداری کنید. از قرار دادن برنج در معرض رطوبت خودداری کنید.',
    date: '2024-12-01',
    season: 'winter',
  },
  {
    id: '5',
    type: 'image',
    title: 'آماده‌سازی خزانه',
    content: 'کشاورزان در حال آماده‌سازی خزانه برای کاشت بذر برنج. این مرحله اولین گام مهم در تولید برنج است.',
    date: '2024-02-28',
    season: 'spring',
    imageUrl: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=800&q=80',
  },
];
