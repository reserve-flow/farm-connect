/**
 * Reservation Step 3: Confirmation
 * Single Responsibility: Display reservation summary for confirmation
 */

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CALL_TIME_OPTIONS } from '@/constants/reservation';

interface ReservationStepConfirmProps {
  lotTitle: string;
  farmerName: string;
  quantity: string;
  phone: string;
  callTime: string;
  totalPrice: number;
  onBack: () => void;
  onConfirm: () => void;
  isEditMode: boolean;
  isLoading?: boolean;
}

export function ReservationStepConfirm({
  lotTitle,
  farmerName,
  quantity,
  phone,
  callTime,
  totalPrice,
  onBack,
  onConfirm,
  isEditMode,
  isLoading = false,
}: ReservationStepConfirmProps) {
  const callTimeLabel = CALL_TIME_OPTIONS.find((t) => t.value === callTime)?.label;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center">
          {isEditMode ? 'تایید ویرایش' : 'تایید رزرو'}
        </DialogTitle>
        <DialogDescription className="text-right">
          لطفاً اطلاعات رزرو خود را بررسی کنید
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4 text-right">
        <div className="rounded-xl bg-muted/40 p-4 space-y-4">

          {/* TL;DR Summary */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">خلاصه سفارش</span>
            <span className="text-lg font-bold">
              {quantity} کیلوگرم · {lotTitle}
            </span>
          </div>

          <div className="pt-3 border-t border-border space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">کشاورز</span>
              <span className="font-medium">{farmerName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">شماره تماس</span>
              <span className="font-medium">{phone}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">زمان تماس</span>
              <span className="font-medium">{callTimeLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="flex-1" disabled={isLoading}>
          بازگشت
        </Button>
        <Button onClick={onConfirm} className="flex-1" disabled={isLoading}>
          {isEditMode ? 'تایید ویرایش' : 'تایید رزرو'}
        </Button>
      </div>
    </>
  );
}
