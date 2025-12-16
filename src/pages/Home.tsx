"use client";

import { useState } from "react";
import { LotCard } from "@/components/LotCard";
import { ReservationModal } from "@/components/ReservationModal";
import { useLots, useLot } from "@/hooks/useLots";
import type { LotWithFarmer } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

function HomeLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl border border-elev bg-card p-3">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="aspect-[16/9] w-full rounded-xl mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-1.5 w-full rounded-full mb-3" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { data: lots = [], isLoading } = useLots();
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedLotId, setSelectedLotId] = useState<string | null>(null);

  // Fetch selected lot data
  const { data: selectedLot } = useLot(selectedLotId || undefined);

  const handleReserve = (lotId: string) => {
    setSelectedLotId(lotId);
    setReservationModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen pb-20 md:pb-8">
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto px-4 py-3">
            <h1 className="text-xl font-bold font-display">RiceDirect</h1>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-6">
          {/* Hero Section */}
          <section className="mb-8 text-center" aria-label="معرفی">
            <h2 className="text-2xl font-bold font-display mb-2">
              خرید مستقیم برنج از کشاورز
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              بدون واسطه، با قیمت شفاف و تضمین کیفیت
            </p>
          </section>

          {/* Products heading */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">محصولات موجود</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Products Section */}
          <section
            id="products-section"
            aria-label="لیست محصولات برنج موجود"
            className="space-y-4 scroll-mt-20"
          >
            {isLoading ? (
              <HomeLoadingSkeleton />
            ) : (
              lots.map((item, index) => (
                <LotCard
                  key={item.lot.id}
                  farmer={item.farmer}
                  lot={item.lot}
                  onReserve={handleReserve}
                  priority={index === 0}
                />
              ))
            )}
          </section>

          <footer className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} RiceDirect. تمام حقوق محفوظ است.
          </footer>
        </main>

        {selectedLot && (
          <ReservationModal
            open={reservationModalOpen}
            onOpenChange={setReservationModalOpen}
            lot={selectedLot.lot}
            farmer={selectedLot.farmer}
          />
        )}
      </div>
    </>
  );
}
