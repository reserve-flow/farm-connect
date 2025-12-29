"use client";

import { cn } from "@/lib/utils";
import type { CommitmentStatus, ReservationStatus } from "@/types";

type Status = CommitmentStatus | ReservationStatus;

const styles: Record<Status, string> = {
	open: "text-warning border-warning/60 bg-warning/5",
	pending: "text-warning border-warning/60 bg-warning/5",
	delivered: "text-success border-success/60 bg-success/5",
	failed: "text-destructive border-destructive/60 bg-destructive/5",
	reserved: "text-primary border-primary/60 bg-primary/5",
	not_delivered: "text-destructive border-destructive/60 bg-destructive/5",
};

const labels: Record<Status, { fa: string; en: string }> = {
	open: { fa: "در حال رزرو", en: "Open" },
	pending: { fa: "در انتظار", en: "Pending" },
	delivered: { fa: "تحویل شد", en: "Delivered" },
	failed: { fa: "تحویل نشد", en: "Failed" },
	reserved: { fa: "رزرو شد", en: "Reserved" },
	not_delivered: { fa: "تحویل نشد", en: "Not delivered" },
};

export function StatusBadge({ status, lang = "fa" }: { status: Status; lang?: "fa" | "en" }) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
				styles[status],
			)}
			aria-label={labels[status][lang]}
		>
			{labels[status][lang]}
		</span>
	);
}
