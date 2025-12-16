import { ArrowRight, CheckCircle2, Circle, Clock } from 'lucide-react';
import { productionRoadmap, type RoadmapStep } from '@/data/productionRoadmap';

interface ProductionRoadmapProps {
  onBack: () => void;
}

function StepCard({ step, isLast }: { step: RoadmapStep; isLast: boolean }) {
  const statusStyles = {
    completed: 'bg-rice-green/20 border-rice-green dark:bg-rice-green/10',
    current: 'bg-rice-golden/20 border-rice-golden ring-2 ring-rice-golden/40 dark:bg-rice-golden/10 dark:ring-rice-golden/30',
    upcoming: 'bg-secondary border-border',
  };

  const iconBgStyles = {
    completed: 'bg-rice-green text-white',
    current: 'bg-rice-golden text-white',
    upcoming: 'bg-muted text-muted-foreground',
  };

  const StatusIcon = {
    completed: CheckCircle2,
    current: Clock,
    upcoming: Circle,
  }[step.status];

  return (
    <div className="relative" dir="rtl">
      {/* Connector line */}
      {!isLast && (
        <div 
          className={`absolute right-7 top-20 w-0.5 h-8 ${
            step.status === 'completed' ? 'bg-rice-green' : 'bg-border'
          }`}
        />
      )}
      
      <div className={`rounded-xl border-2 p-4 ${statusStyles[step.status]} transition-all`}>
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 ${iconBgStyles[step.status]}`}>
            {step.icon}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg">{step.title}</h3>
              <StatusIcon className={`w-5 h-5 ${
                step.status === 'completed' ? 'text-rice-green' : 
                step.status === 'current' ? 'text-rice-golden' : 
                'text-muted-foreground'
              }`} />
            </div>
            <p className="text-muted-foreground text-sm mb-2">{step.description}</p>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              step.status === 'current' 
                ? 'bg-rice-golden/20 text-rice-golden' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {step.month}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductionRoadmap({ onBack }: ProductionRoadmapProps) {
  const currentStep = productionRoadmap.find(s => s.status === 'current');
  
  return (
    <div className="animate-fade-in" dir="rtl">
      {/* Header with back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowRight className="w-5 h-5" />
        <span>بازگشت</span>
      </button>

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          نقشه راه تولید برنج
        </h2>
        {currentStep && (
          <p className="text-rice-golden font-medium">
            مرحله فعلی: {currentStep.title} ({currentStep.month})
          </p>
        )}
      </div>

      {/* Roadmap steps */}
      <div className="max-w-lg mx-auto space-y-4">
        {productionRoadmap.map((step, index) => (
          <StepCard 
            key={step.id} 
            step={step} 
            isLast={index === productionRoadmap.length - 1}
          />
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-muted-foreground text-sm mt-8">
        این نقشه راه بر اساس تقویم کشاورزی شمال ایران تنظیم شده است
      </p>
    </div>
  );
}
