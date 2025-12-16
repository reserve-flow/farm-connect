/**
 * Rice Production Roadmap Data
 * Easy to maintain - just update status and dates
 */

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  month: string;
  status: 'completed' | 'current' | 'upcoming';
}

export const productionRoadmap: RoadmapStep[] = [
  {
    id: 'preparation',
    title: 'آماده‌سازی زمین',
    description: 'شخم زدن و آماده‌سازی شالیزار',
    icon: '🌱',
    month: 'فروردین',
    status: 'completed',
  },
  {
    id: 'seeding',
    title: 'کاشت بذر',
    description: 'بذرپاشی در خزانه',
    icon: '🌾',
    month: 'اردیبهشت',
    status: 'completed',
  },
  {
    id: 'transplanting',
    title: 'نشاکاری',
    description: 'انتقال نشا به شالیزار اصلی',
    icon: '👨‍🌾',
    month: 'خرداد',
    status: 'completed',
  },
  {
    id: 'growing',
    title: 'رشد و مراقبت',
    description: 'آبیاری، کوددهی و مبارزه با آفات',
    icon: '💧',
    month: 'تیر - مرداد',
    status: 'current',
  },
  {
    id: 'flowering',
    title: 'گل‌دهی',
    description: 'مرحله گل‌دهی و تشکیل دانه',
    icon: '🌸',
    month: 'شهریور',
    status: 'upcoming',
  },
  {
    id: 'harvest',
    title: 'برداشت',
    description: 'درو و جمع‌آوری محصول',
    icon: '🌾',
    month: 'مهر',
    status: 'upcoming',
  },
  {
    id: 'processing',
    title: 'فرآوری',
    description: 'خشک‌کردن، پوست‌گیری و بسته‌بندی',
    icon: '📦',
    month: 'آبان',
    status: 'upcoming',
  },
];

// Helper to get current step
export const getCurrentStep = () => 
  productionRoadmap.find(step => step.status === 'current');

// Helper to get progress percentage
export const getProgressPercentage = () => {
  const completedSteps = productionRoadmap.filter(s => s.status === 'completed').length;
  const currentSteps = productionRoadmap.filter(s => s.status === 'current').length;
  return Math.round(((completedSteps + currentSteps * 0.5) / productionRoadmap.length) * 100);
};
