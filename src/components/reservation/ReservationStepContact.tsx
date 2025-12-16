/**
 * Reservation Step 2: Contact Information
 * Single Responsibility: Handle contact info collection UI
 */

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CALL_TIME_OPTIONS } from '@/constants/reservation';

interface ReservationStepContactProps {
  phone: string;
  callTime: string;
  phoneError: string;
  onPhoneChange: (value: string) => void;
  onCallTimeChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  isEditMode: boolean;
}

export function ReservationStepContact({
  phone,
  callTime,
  phoneError,
  onPhoneChange,
  onCallTimeChange,
  onBack,
  onNext,
  isEditMode,
}: ReservationStepContactProps) {
  const isNextDisabled = !phone.trim() || phone.length !== 11;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-right">
          {isEditMode ? 'ویرایش اطلاعات تماس' : 'اطلاعات تماس'}
        </DialogTitle>
        <DialogDescription className="text-right">
          برای هماهنگی تحویل، شماره تماس خود را وارد کنید
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-right block">
            شماره موبایل
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="09123456789"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className={`text-right ${phoneError ? 'border-destructive' : ''}`}
            dir="rtl"
            maxLength={11}
          />
          {phoneError && (
            <p className="text-xs text-destructive text-right">{phoneError}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-right block">زمان مناسب تماس</Label>
          <RadioGroup
            value={callTime}
            onValueChange={onCallTimeChange}
            className="gap-2"
          >
            {CALL_TIME_OPTIONS.map((time) => (
              <div
                key={time.value}
                className="flex items-center justify-between rounded-lg border border-border p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => onCallTimeChange(time.value)}
              >
                <Label
                  htmlFor={`time-${time.value}`}
                  className="flex-1 cursor-pointer"
                >
                  {time.label}
                </Label>
                <RadioGroupItem value={time.value} id={`time-${time.value}`} />
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="flex-1">
          بازگشت
        </Button>
        <Button onClick={onNext} className="flex-1" disabled={isNextDisabled}>
          ادامه
        </Button>
      </div>
    </>
  );
}
