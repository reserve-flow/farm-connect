import { Skeleton } from "@/components/ui/skeleton";

export function FarmerProfileSkeleton() {
  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Header skeleton */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-elev">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Farmer header skeleton */}
        <div className="p-4">
          <div className="flex items-start gap-4 mb-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-4 mt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="border-t border-elev">
          <div className="flex">
            <Skeleton className="flex-1 h-12 rounded-none" />
            <Skeleton className="flex-1 h-12 rounded-none" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="p-4 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-border overflow-hidden">
              <Skeleton className="aspect-[16/9] w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-9 w-24 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
