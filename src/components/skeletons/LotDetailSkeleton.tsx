import { Skeleton } from "@/components/ui/skeleton";

export function LotDetailSkeleton() {
  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Header skeleton */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-elev">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-6 w-48" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Hero image skeleton */}
        <Skeleton className="aspect-[16/9] w-full" />

        <div className="p-4 space-y-6">
          {/* Title and price */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="text-left space-y-1">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
            
            {/* Progress bar */}
            <Skeleton className="h-1.5 w-full rounded-full mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Details section */}
          <div className="border-t border-elev pt-6">
            <Skeleton className="h-5 w-16 mb-3" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="h-5 w-5 mt-0.5" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust section */}
          <div className="border-t border-elev pt-6">
            <Skeleton className="h-5 w-28 mb-3" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <Skeleton className="h-4 w-4 mt-0.5" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ))}
            </div>
          </div>

          {/* Farmer section */}
          <div className="border-t border-elev pt-6">
            <Skeleton className="h-5 w-32 mb-3" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA skeleton */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-elev bg-background p-4 pb-safe-bottom">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="space-y-1">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="flex-1 h-12 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
