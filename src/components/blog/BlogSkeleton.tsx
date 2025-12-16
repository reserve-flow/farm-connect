export function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-rice-green-light via-background to-rice-golden-light pb-20">
      {/* Header skeleton */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-muted/30" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs skeleton */}
        <div className="flex gap-2 mb-6">
          <div className="h-12 w-32 animate-pulse rounded-lg bg-muted/30" />
          <div className="h-12 w-32 animate-pulse rounded-lg bg-muted/30" />
        </div>

        {/* Content skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-card/80 rounded-xl border border-border overflow-hidden"
            >
              <div className="h-40 animate-pulse bg-muted/20" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted/30" />
                <div className="h-4 w-full animate-pulse rounded bg-muted/20" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-muted/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
