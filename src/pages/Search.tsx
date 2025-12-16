"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { LotCard } from "@/components/LotCard";
import { ReservationModal } from "@/components/ReservationModal";
import { useSearchLots, useLot } from "@/hooks/useLots";
import { Skeleton } from "@/components/ui/skeleton";

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div key={i} className="rounded-2xl border border-elev bg-card p-3">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="aspect-video w-full rounded-xl mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedLotId, setSelectedLotId] = useState<string | null>(null);

  const { data: filteredLots = [], isLoading } = useSearchLots(debouncedQuery);
  const { data: selectedLot } = useLot(selectedLotId || undefined);

  // Debounce search query
  const handleQueryChange = (value: string) => {
    setQuery(value);
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(value);
    }, 150);
    return () => clearTimeout(timeoutId);
  };

  const handleReserve = (lotId: string) => {
    setSelectedLotId(lotId);
    setReservationModalOpen(true);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8" dir="rtl">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-secondary/50 border border-border/50">
            <SearchIcon className="h-5 w-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="جستجوی نام برنج، کشاورز یا منطقه..."
              className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground text-foreground"
              autoFocus
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setDebouncedQuery("");
                }}
                className="p-1 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        {!query.trim() ? (
          <div className="text-center py-16">
            <div className="h-16 w-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">جستجو کنید</h3>
            <p className="text-sm text-muted-foreground">
              نام برنج، کشاورز یا منطقه را وارد کنید
            </p>
          </div>
        ) : isLoading ? (
          <SearchResultsSkeleton />
        ) : filteredLots.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-16 w-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">نتیجه‌ای یافت نشد</h3>
            <p className="text-sm text-muted-foreground">
              برای «{query}» نتیجه‌ای پیدا نشد
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {filteredLots.length} نتیجه برای «{query}»
            </p>
            {filteredLots.map((item) => (
              <LotCard
                key={item.lot.id}
                farmer={item.farmer}
                lot={item.lot}
                onReserve={handleReserve}
                searchQuery={query}
              />
            ))}
          </div>
        )}
      </main>

      {selectedLot && (
        <ReservationModal
          open={reservationModalOpen}
          onOpenChange={(open) => {
            setReservationModalOpen(open);
            if (!open) setSelectedLotId(null);
          }}
          farmer={selectedLot.farmer}
          lot={selectedLot.lot}
        />
      )}
    </div>
  );
}
