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
      <div className="min-h-screen pb-12 md:pb-8">
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs text-muted-foreground">خرید مستقیم و شفاف</p>
              <h1 className="text-xl font-bold font-display">RiceDirect</h1>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex h-8 items-center rounded-full bg-card px-3">برنج تضمینی</span>
              <span className="inline-flex h-8 items-center rounded-full bg-card px-3">تحویل مطمئن</span>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          {/* Hero Section */}
          <section className="mb-10 rounded-3xl bg-card/90 p-6 shadow-sm ring-1 ring-border/60 lg:p-8" aria-label="معرفی">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
              <div className="flex-1 text-center lg:text-right">
                <p className="text-sm text-primary font-semibold mb-1">مستقیم از کشاورز</p>
                <h2 className="text-3xl font-bold font-display mb-3 leading-tight">
                  خرید مستقیم برنج از کشاورزهای تایید شده
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  بدون واسطه، با قیمت شفاف و تضمین کیفیت. برداشت تازه فریدونکنار را از قبل رزرو کنید و در زمان برداشت تحویل بگیرید.
                </p>
                <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center lg:justify-end">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    ظرفیت محدود فصل جاری
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-2 ring-1 ring-border/70">
                    پرداخت امن و مرحله‌ای
                  </span>
                </div>
              </div>
              <div className="w-full rounded-2xl bg-linear-to-br from-rice-green-light/60 via-card to-rice-golden-light/70 p-4 shadow-inner lg:w-[360px]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">متوسط قیمت</span>
                    <span className="font-semibold">$ {((lots?.[0]?.lot.pricePerKg ?? 0) / 100).toFixed(2)}/kg</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">کشاورزان تایید شده</span>
                    <span className="font-semibold">{lots.length || 6}+</span>
                  </div>
                  <div className="h-2 rounded-full bg-border/50">
                    <div className="h-2 rounded-full bg-primary/80" style={{ width: "72%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground">۷۲٪ ظرفیت برداشت تابستان رزرو شده است. فرصت را از دست ندهید.</p>
                </div>
              </div>
            </div>
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
            className="space-y-4 scroll-mt-24"
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

          <footer className="mt-10 text-center text-sm text-muted-foreground">
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
