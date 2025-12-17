/**
 * Reservation Step 1: Quantity Selection
 * Single Responsibility: Handle quantity selection UI
 */

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QUANTITY_OPTIONS } from '@/constants/reservation';

interface ReservationStepQuantityProps {
  quantity: string;
  onQuantityChange: (value: string) => void;
  onNext: () => void;
  isEditMode: boolean;
}

export function ReservationStepQuantity({
  quantity,
  onQuantityChange,
  onNext,
  isEditMode,
}: ReservationStepQuantityProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center">
          {isEditMode ? 'ویرایش مقدار' : 'انتخاب مقدار'}
        </DialogTitle>
        <DialogDescription className="text-right">
          چند کیلوگرم می‌خواهید رزرو کنید؟
        </DialogDescription>
      </DialogHeader>
      <RadioGroup
        value={quantity}
        onValueChange={onQuantityChange}
        className="gap-3 py-4"
      >
        {QUANTITY_OPTIONS.map((q) => (
          <div
            key={q}
            className="flex items-center text-right rounded-lg border border-border p-4 cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => onQuantityChange(q)}
          >
            <RadioGroupItem value={q} id={`qty-${q}`} />
            <Label
              htmlFor={`qty-${q}`}
              dir="rtl"
              className="flex-1 cursor-pointer text-lg text-right"
            >
              {q} کیلوگرم
            </Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={onNext} className="w-full">
        ادامه
      </Button>
    </>
  );
}
