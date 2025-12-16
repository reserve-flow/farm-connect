/**
 * Reservation Modal Component
 * Orchestrates the multi-step reservation flow
 * Uses composition of step components and form hook
 */

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useReservationForm } from '@/hooks/useReservationForm';
import { useCreateReservation, useUpdateReservation } from '@/hooks/useReservations';
import {
  ReservationStepQuantity,
  ReservationStepContact,
  ReservationStepConfirm,
  ReservationStepSuccess,
} from '@/components/reservation';
import type { CallTimeValue } from '@/constants/reservation';

interface ReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lot: {
    id: string;
    title: string;
    pricePerKg: number;
  };
  farmer: {
    name: string;
  };
  initialData?: {
    quantity: string;
    phone: string;
    callTime: CallTimeValue;
  };
  reservationIndex?: number;
  onUpdate?: () => void;
}

export function ReservationModal({
  open,
  onOpenChange,
  lot,
  farmer,
  initialData,
  reservationIndex,
  onUpdate,
}: ReservationModalProps) {
  const isEditMode = reservationIndex !== undefined;

  const form = useReservationForm({
    initialData,
    pricePerKg: lot.pricePerKg,
  });

  const createReservation = useCreateReservation();
  const updateReservation = useUpdateReservation();

  const handleConfirm = async () => {
    if (!form.validatePhone(form.phone)) {
      return;
    }

    const reservationData = {
      quantity: parseInt(form.quantity),
      phone: form.phone.trim(),
      callTime: form.callTime,
    };

    try {
      if (isEditMode && reservationIndex !== undefined) {
        await updateReservation.mutateAsync({
          index: reservationIndex,
          input: reservationData,
          pricePerKg: lot.pricePerKg,
        });
      } else {
        await createReservation.mutateAsync({
          lotId: lot.id,
          lotTitle: lot.title,
          farmerName: farmer.name,
          pricePerKg: lot.pricePerKg,
          ...reservationData,
        });
      }

      onUpdate?.();
      form.complete();
    } catch {
      // Error handling is done in the hooks
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(form.resetForm, 300);
  };

  const isLoading = createReservation.isPending || updateReservation.isPending;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {form.step === 1 && (
          <ReservationStepQuantity
            quantity={form.quantity}
            onQuantityChange={form.setQuantity}
            onNext={form.goToNextStep}
            isEditMode={isEditMode}
          />
        )}

        {form.step === 2 && (
          <ReservationStepContact
            phone={form.phone}
            callTime={form.callTime}
            phoneError={form.phoneError}
            onPhoneChange={form.handlePhoneChange}
            onCallTimeChange={(v) => form.setCallTime(v as CallTimeValue)}
            onBack={form.goToPrevStep}
            onNext={form.goToNextStep}
            isEditMode={isEditMode}
          />
        )}

        {form.step === 3 && (
          <ReservationStepConfirm
            lotTitle={lot.title}
            farmerName={farmer.name}
            quantity={form.quantity}
            phone={form.phone}
            callTime={form.callTime}
            totalPrice={form.totalPrice}
            onBack={form.goToPrevStep}
            onConfirm={handleConfirm}
            isEditMode={isEditMode}
            isLoading={isLoading}
          />
        )}

        {form.step === 4 && (
          <ReservationStepSuccess isEditMode={isEditMode} onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}
