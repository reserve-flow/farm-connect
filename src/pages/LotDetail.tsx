"use client";

import {
  ArrowRight,
  Calendar,
  Check,
  MapPin,
  Package,
  RefreshCw,
} from "lucide-react";
import { FarmerHeader } from "@/components/FarmerHeader";
import { useLot } from "@/hooks/useLots";
import { LotDetailSkeleton } from "@/components/skeletons/LotDetailSkeleton";
import { ReservationModal } from "@/components/ReservationModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LotDetail({ id }: any) {
  const router = useRouter();
  const { data: lotData, isLoading } = useLot(id);
  const [reservationOpen, setReservationOpen] = useState(false);
  const isBrowser = typeof window !== "undefined";
  const locationHref = isBrowser ? window.location.href : "";
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";

  if (isLoading) {
    return <LotDetailSkeleton />;
  }

  if (!lotData) {
    const shareText = encodeURIComponent(
      `درخواست مشتری برای محصول با شناسه ${id} - لطفا در صورت امکان موجود کنید.`
    );

    const supportUsername = "miladtsx";
    const draft = `سلام. این محصول باز نمی‌شود.
لینک: ${locationHref}
دستگاه/مرورگر: ${userAgent}`;

    const dmLink = `https://t.me/${supportUsername}?text=${encodeURIComponent(draft)}`;

    return (
      <div className="min-h-svh grid place-items-center bg-background px-4">
        <div className="w-full max-w-sm rounded-2xl border bg-card p-6">
          <div className="space-y-2 text-center">
            <p className="text-base font-semibold text-foreground">این محصول یافت نشد</p>
            <p className="text-sm text-muted-foreground">
              ممکن است آدرس اشتباه باشد یا خطایی از سمت ما باشد.
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            {/* PRIMARY */}
            <button
              onClick={() => router.replace("/")}
              className="h-11 rounded-xl border border-foreground/30 bg-background text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-[0_1px_0_rgba(0,0,0,0.05)] hover:bg-muted/40 active:translate-y-px
    "
            >
              بازگشت به صفحه اصلی
            </button>

            <a
              href={dmLink}
              target="_blank"
              rel="noreferrer"
              className="h-11 rounded-xl border border-foreground/30 bg-background text-sm font-semibold inline-flex items-center justify-center gap-2      shadow-[0_1px_0_rgba(0,0,0,0.05)] hover:bg-muted/40 active:translate-y-px"
            >
              💬 گزارش به پشتیبانی تلگرام
            </a>
            <button
              onClick={() => isBrowser && window.location.reload()}
              className="h-9 text-sm font-medium text-muted-foreground inline-flex items-center justify-center gap-1 hover:text-foreground hover:underline"
            >
              <RefreshCw className="size-4" />
              تلاش مجدد
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            اگر مشکل ادامه داشت، پشتیبانی سریع‌تر راهنمایی می‌کند.
          </p>
        </div>
      </div>
    );
  }


  const { lot, farmer } = lotData;

  // Trust factors - could be moved to data layer
  const trustFactors = [
    "تایید شده توسط سازمان جهاد کشاورزی",
    "آزمایش کیفیت در آزمایشگاه",
    "۹۸٪ رضایت خریداران",
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-8" dir="rtl">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-elev">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary/50 transition-colors"
            aria-label="بازگشت"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold truncate">{lot.title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="aspect-[16/9] overflow-hidden bg-secondary">
          <img
            src={lot.heroPoster}
            alt={lot.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{lot.title}</h2>
                <p className="text-muted-foreground">
                  برنج با کیفیت عالی از مزارع {farmer.region}
                </p>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold">
                  ${(lot.pricePerKg / 100).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">هر کیلوگرم</div>
              </div>
            </div>

            <div className="h-1.5 w-full rounded-full bg-elev mb-2">
              <div
                className="h-1.5 rounded-full bg-primary"
                style={{ width: `${lot.reservedPct}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {lot.reservedPct}% رزرو شده
            </p>
          </div>

          <div className="border-t border-elev pt-6">
            <h3 className="font-semibold mb-3">جزئیات</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">محدوده سفارش</p>
                  <p className="text-sm text-muted-foreground">
                    حداقل {lot.minKg} کیلوگرم
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">زمان برداشت</p>
                  <p className="text-sm text-muted-foreground">
                    {lot.harvestStart} – {lot.harvestEnd}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">منطقه</p>
                  <p className="text-sm text-muted-foreground">
                    {farmer.region}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-elev pt-6">
            <h3 className="font-semibold mb-3">اعتماد و کیفیت</h3>
            <div className="space-y-2">
              {trustFactors.map((factor, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{factor}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-elev pt-6">
            <h3 className="font-semibold mb-3">درباره کشاورز</h3>
            <FarmerHeader farmer={farmer} />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-elev bg-background p-4 pb-safe-bottom">
        <div className="max-w-3xl mx-auto flex items-center gap-3" dir="rtl">
          <div>
            <div className="font-bold text-lg">
              ${(lot.pricePerKg / 100).toFixed(2)}/kg
            </div>
            <div className="text-xs text-muted-foreground">
              حداقل {lot.minKg} کیلوگرم
            </div>
          </div>
          <button
            onClick={() => setReservationOpen(true)}
            className="flex-1 h-12 rounded-xl bg-primary font-semibold text-primary-foreground active:scale-95 transition-transform"
          >
            رزرو کنید
          </button>
        </div>
      </div>

      <ReservationModal
        open={reservationOpen}
        onOpenChange={setReservationOpen}
        lot={lot}
        farmer={farmer}
      />
    </div>
  );
}
