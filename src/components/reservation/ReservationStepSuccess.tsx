/**
 * Reservation Step 4: Success
 * Single Responsibility: Display success message
 */

import { DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface ReservationStepSuccessProps {
  isEditMode: boolean;
  onClose: () => void;
}

export function ReservationStepSuccess({
  isEditMode,
  onClose,
}: ReservationStepSuccessProps) {
  return (
    <>
      <div className="text-center py-6 space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <DialogTitle className="text-2xl">
          {isEditMode ? 'رزرو شما به‌روزرسانی شد!' : 'رزرو شما ثبت شد!'}
        </DialogTitle>
        <DialogDescription className="text-base leading-relaxed">
          از شما برای حمایت از کشاورز واقعی متشکریم.
          <br />
          {isEditMode
            ? 'تغییرات شما ذخیره شد و کشاورز مطلع خواهد شد.'
            : 'کشاورز یا نماینده وی با شما تماس خواهد گرفت.'}
        </DialogDescription>
      </div>
      <Button onClick={onClose} className="w-full">
        خوبه
      </Button>
    </>
  );
}
