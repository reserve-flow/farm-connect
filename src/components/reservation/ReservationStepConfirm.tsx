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
        <DialogTitle className="text-right">
          {isEditMode ? 'تایید ویرایش' : 'تایید رزرو'}
        </DialogTitle>
        <DialogDescription className="text-right">
          لطفاً اطلاعات رزرو خود را بررسی کنید
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="rounded-lg bg-muted p-4 space-y-3 text-right">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">محصول:</span>
            <span className="font-medium">{lotTitle}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">کشاورز:</span>
            <span className="font-medium">{farmerName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">مقدار:</span>
            <span className="font-medium">{quantity} کیلوگرم</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">شماره تماس:</span>
            <span className="font-medium">{phone}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">زمان تماس:</span>
            <span className="font-medium">{callTimeLabel}</span>
          </div>
          <div className="pt-3 border-t border-border flex justify-between items-center">
            <span className="text-sm text-muted-foreground">جمع کل:</span>
            <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
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
