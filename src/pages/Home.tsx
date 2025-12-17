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

  const { data: selectedLot } = useLot(selectedLotId || undefined);

  const handleReserve = (lotId: string) => {
    setSelectedLotId(lotId);
    setReservationModalOpen(true);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-5xl">

        <header className="sticky top-0 z-40 border-b border-border/60  bg-background/70 backdrop-blur-sm
  supports-backdrop-filter:bg-background/50">

          <div className="flex items-center justify-between gap-3 p-4 ">

            {/* Right side (title + description) */}
            <div className="space-y-2">
              <h1 className="text-xl font-bold font-display">رزرو برنج تازه فریدونکنار</h1>
              <p className="text-sm">بدون واسطه، مستقیم از کشاورز</p>
            </div>

            {/* Left side (badges stacked) */}
            <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex h-8 items-center rounded-full border border-border/70 bg-card px-3">تحویل مطمئن</span>
              <span className="inline-flex h-8 items-center rounded-full border border-border/70 bg-card px-3">پرداخت مرحله‌ای</span>
            </div>
          </div>

        </header>

        <main className="space-y-10 py-8 px-4  lg:py-12">
          <section className="rounded-2xl border border-border/70 bg-card px-6 py-8 shadow-sm lg:px-10" aria-label="معرفی">
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div className="space-y-6 text-center lg:text-right">
                <div className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary lg:justify-start">
                  برداشت تابستان · ظرفیت محدود
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-secondary/40 p-5 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">میانگین قیمت</span>
                    <span className="text-lg font-semibold">
                      ${((lots?.[0]?.lot.pricePerKg ?? 1425) / 100).toFixed(2)}/kg
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">کشاورزان فعال</span>
                    <span className="text-lg font-semibold">{lots.length || 6}+</span>
                  </div>
                  <div className="h-2 rounded-full bg-border/60">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "72%" }} />
                  </div>
                  <p className="text-xs text-center text-muted-foreground">ظرفیت باقی‌مانده برای رزرو</p>
                </div>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="mb-10 grid gap-4 rounded-2xl border border-border/70 bg-card p-5 sm:grid-cols-3 sm:gap-6">
          <h2>شیوه کار</h2>
          <hr />
            {[
              { title: "انتخاب", text: "کشاورزان تایید هویت شده", },
              { title: "هماهنگی", text: "بدون پیش‌پرداخت، فقط ثبت‌نام جهت رزرو", },
              { title: "تحویل", text: "اطلاع‌رسانی و انجام خرید و ارسال سفارش", },
            ].map((item) => (
              <div key={item.title} className="space-y-1 text-center">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </section>

          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-semibold">محصولات آماده رزرو</span>
            <a href="#products-section" className="text-xs text-muted-foreground hover:text-foreground">
              مشاهده فهرست
            </a>
          </div>

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
      </div>

      {selectedLot && (
        <ReservationModal
          open={reservationModalOpen}
          onOpenChange={setReservationModalOpen}
          lot={selectedLot.lot}
          farmer={selectedLot.farmer}
        />
      )}
    </>
  );
}
