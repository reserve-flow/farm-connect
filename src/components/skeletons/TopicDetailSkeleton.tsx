import { Skeleton } from "@/components/ui/skeleton";

export function TopicDetailSkeleton() {
  return (
    <div dir="rtl" className="animate-fade-in">
      {/* Back button skeleton */}
      <Skeleton className="h-6 w-24 mb-4" />
      
      {/* Header skeleton */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/20 mb-6">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Label skeleton */}
      <Skeleton className="h-4 w-20 mb-4" />

      {/* Post items skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 bg-card/80 rounded-xl border border-border"
          >
            <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="w-5 h-5 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
