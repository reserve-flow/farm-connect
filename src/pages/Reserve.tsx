"use client";

import { ArrowRight, Clock, Package, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReservationModal } from "@/components/ReservationModal";
import { useReservations, useDeleteReservation } from "@/hooks/useReservations";
import { Skeleton } from "@/components/ui/skeleton";
import { CALL_TIME_OPTIONS } from "@/constants/reservation";
import type { CallTimeValue } from "@/constants/reservation";
import { useRouter } from "next/navigation";

function ReservationsSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2].map((i) => (
        <div key={i} className="rounded-2xl border border-elev bg-card p-4">
          <Skeleton className="h-5 w-48 mb-2" />
          <Skeleton className="h-4 w-32 mb-3" />
          <div className="flex gap-4 mb-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}

function getCallTimeLabel(callTime: string): string {
  return CALL_TIME_OPTIONS.find((t) => t.value === callTime)?.label || callTime;
}

export default function Reserve() {
  const router = useRouter();
  const { data: reservations = [], isLoading, refetch } = useReservations();
  const deleteReservation = useDeleteReservation();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    deleteReservation.mutate(index);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditModalOpen(true);
  };

  const handleReservationUpdate = () => {
    refetch();
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8" dir="rtl">
      <header className="sticky top-0 z-40 border-b border-elev bg-background/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="p-2 -ml-1 rounded-full hover:bg-accent transition-colors"
            aria-label="بازگشت"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold font-display">رزروهای من</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        {isLoading ? (
          <ReservationsSkeleton />
        ) : reservations.length > 0 ? (
          <div className="space-y-3">
            {reservations.map((reservation, index) => (
              <div
                key={index}
                className="rounded-2xl border border-elev bg-card overflow-hidden"
              >
                <div
                  onClick={() => handleEdit(index)}
                  className="block hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-base">
                        {reservation.lotTitle}
                      </h3>
                      <span className="text-sm font-medium px-2 py-1 rounded-lg bg-warning/10 text-warning shrink-0">
                        در انتظار
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      کشاورز: {reservation.farmerName}
                    </p>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Package className="h-4 w-4" />
                        <span>{reservation.quantity} کیلوگرم</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{getCallTimeLabel(reservation.callTime ?? "")}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-sm text-muted-foreground">تماس:</span>
                      <span className="font-medium">{reservation.phone}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">مبلغ کل:</span>
                      <span className="text-lg font-bold">${(reservation.totalPrice ?? 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(index)}
                    className="w-full"
                    disabled={deleteReservation.isPending}
                  >
                    <Trash2 className="h-4 w-4 ml-2" />
                    حذف رزرو
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="h-16 w-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">هنوز رزروی ندارید</h3>
            <p className="text-sm text-muted-foreground mb-4">
              محصولات را مرور کنید و برداشت خود را رزرو کنید
            </p>
            <Link
              href="/"
              className="inline-flex h-10 px-6 rounded-lg bg-primary text-primary-foreground font-medium items-center justify-center"
            >
              مشاهده محصولات
            </Link>
          </div>
        )}
      </main>

      {editingIndex !== null && reservations[editingIndex] && (
        <ReservationModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          lot={{
            id: reservations[editingIndex].lotId ?? "",
            title: reservations[editingIndex].lotTitle ?? "",
            pricePerKg: reservations[editingIndex].pricePerKg || 1850,
          }}
          farmer={{
            name: reservations[editingIndex].farmerName ?? "",
          }}
          initialData={{
            quantity: (reservations[editingIndex].quantity ?? 0).toString(),
            phone: reservations[editingIndex].phone ?? "",
            callTime: (reservations[editingIndex].callTime as CallTimeValue | undefined) ?? "morning_1",
          }}
          reservationIndex={editingIndex}
          onUpdate={handleReservationUpdate}
        />
      )}
    </div>
  );
}
