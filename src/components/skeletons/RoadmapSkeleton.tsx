import { Skeleton } from "@/components/ui/skeleton";

export function RoadmapSkeleton() {
  return (
    <div className="animate-fade-in" dir="rtl">
      {/* Back button skeleton */}
      <Skeleton className="h-6 w-20 mb-6" />

      {/* Title skeleton */}
      <div className="text-center mb-8">
        <Skeleton className="h-8 w-48 mx-auto mb-2" />
        <Skeleton className="h-5 w-40 mx-auto" />
      </div>

      {/* Roadmap steps skeleton */}
      <div className="max-w-lg mx-auto space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="relative">
            {/* Connector line */}
            {i < 5 && (
              <div className="absolute right-7 top-20 w-0.5 h-8 bg-border" />
            )}
            
            <div className="rounded-xl border-2 border-border p-4 bg-muted/10">
              <div className="flex items-start gap-4">
                {/* Icon skeleton */}
                <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
                
                {/* Content skeleton */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="w-5 h-5 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer skeleton */}
      <Skeleton className="h-4 w-64 mx-auto mt-8" />
    </div>
  );
}
