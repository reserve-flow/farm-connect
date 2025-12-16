import { Activity } from 'lucide-react';
import { getCurrentStep, getProgressPercentage } from '@/data/productionRoadmap';

interface ProductionStatusButtonProps {
  onClick: () => void;
}

export function ProductionStatusButton({ onClick }: ProductionStatusButtonProps) {
  const currentStep = getCurrentStep();
  const progress = getProgressPercentage();

  return (
    <button
      onClick={onClick}
      className="w-full max-w-md mx-auto block bg-linear-to-l from-rice-green to-rice-green/80 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
      dir="rtl"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
          <Activity className="w-7 h-7" />
        </div>
        <div className="flex-1 text-right">
          <h3 className="font-bold text-lg mb-1">وضعیت تولید برنج</h3>
          {currentStep && (
            <p className="text-white/80 text-sm">
              مرحله فعلی: {currentStep.title}
            </p>
          )}
        </div>
        <div className="text-left">
          <div className="text-2xl font-bold">{progress}%</div>
          <div className="text-xs text-white/70">پیشرفت</div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-rice-golden rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </button>
  );
}
