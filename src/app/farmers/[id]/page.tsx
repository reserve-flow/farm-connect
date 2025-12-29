"use client";

import { useParams } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { useLang } from "@/hooks/useLang";
import { t } from "@/constants/copy";
import { useFarmerById, useFarmers } from "@/hooks/useFarmers";
import { useCommitments, useFarmerCommitments } from "@/hooks/useCommitments";
import { commitmentsApi } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export default function FarmerProfilePage() {
	const params = useParams();
	const lang = useLang();
	const farmerId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
	const { data: farmer } = useFarmerById(farmerId);
	const { data: commitments = [] } = useFarmerCommitments(farmerId);
	const { data: suspensions = [] } = useQuery({
		queryKey: ["suspensions", farmerId],
		queryFn: () => (farmerId ? commitmentsApi.getSuspensionsForFarmer(farmerId) : Promise.resolve([])),
		enabled: !!farmerId,
	});
	const reservationCountQuery = useQuery({
		queryKey: ["reservations", "farmer", farmerId],
		queryFn: async () => {
			if (!farmerId) return 0;
			const allCommitments = await commitmentsApi.getCommitments();
			const ids = allCommitments.filter((c) => c.farmerId === farmerId).map((c) => c.id);
			const reservations = await Promise.all(ids.map((id) => commitmentsApi.getReservationsByCommitmentId(id)));
			return reservations.flat().length;
		},
		enabled: !!farmerId,
	});
	const liveTitle = t<string>("liveCommitmentsTitle", lang);

	if (!farmer) {
		return (
			<section className="mx-auto w-full max-w-screen-lg px-4 py-10">
				<p className="text-sm text-muted-foreground">
					{lang === "fa" ? "کشاورز یافت نشد." : "Farmer not found."}
				</p>
			</section>
		);
	}

	return (
		<section className="mx-auto w-full max-w-screen-lg px-4 py-10 space-y-6">
			<header className="space-y-2">
				<p className="text-sm font-medium text-primary">
					{lang === "fa" ? "کشاورز انتخاب‌شده" : "Selected farmer"}
				</p>
				<h1 className="text-2xl font-semibold">{farmer.name}</h1>
				<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
					<span>{farmer.region}</span>
					<span>·</span>
					<span>
						{lang === "fa" ? `${farmer.yearsFarming} سال کشت` : `${farmer.yearsFarming} years farming`}
					</span>
					<span>·</span>
					<span>{farmer.productType}</span>
					<span>·</span>
					<span>
						{lang === "fa"
							? `رزروها: ${reservationCountQuery.data ?? 0}`
							: `Reservations: ${reservationCountQuery.data ?? 0}`}
					</span>
					{farmer.status === "suspended" && (
						<span className="text-destructive">
							{lang === "fa" ? "حساب تعلیق شده است" : "Account suspended"}
						</span>
					)}
				</div>
			</header>

			{farmer.status === "suspended" && (
				<div className="rounded-md border border-destructive/50 bg-destructive/5 p-4 text-destructive text-sm">
					<p className="font-semibold">
						{lang === "fa" ? "حساب تعلیق شده است" : "Account suspended"}
					</p>
					<p className="mt-1">
						{suspensions[0]?.reason ??
							(lang === "fa"
								? "به دلیل ثبت نتیجه تحویل انجام نشد."
								: "Due to recorded unmet commitments.")}
					</p>
				</div>
			)}

			<section className="space-y-3">
				<h2 className="text-xl font-semibold">
					{lang === "fa" ? "سابقه تعهدات" : "Commitment history"}
				</h2>
				<div className="overflow-hidden rounded-md border border-border bg-card">
					<div className="grid grid-cols-12 gap-3 border-b border-border px-4 py-3 text-xs font-medium text-muted-foreground">
						<div className="col-span-3">{lang === "fa" ? "تاریخ ثبت" : "Recorded"}</div>
						<div className="col-span-3">{lang === "fa" ? "مقدار" : "Quantity"}</div>
						<div className="col-span-3">{lang === "fa" ? "بازه تحویل" : "Delivery window"}</div>
						<div className="col-span-3">{lang === "fa" ? "نتیجه" : "Outcome"}</div>
					</div>
					<div className="divide-y divide-border">
						{commitments.map((c) => (
							<div key={c.id} className="grid grid-cols-12 gap-3 px-4 py-4 items-center">
								<div className="col-span-3 text-sm text-muted-foreground">{c.createdAt}</div>
								<div className="col-span-3 text-sm">
									{c.quantity.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")} {c.unit}
								</div>
								<div className="col-span-3 text-sm text-muted-foreground">
									{c.deliveryWindowStart} — {c.deliveryWindowEnd}
								</div>
								<div className="col-span-3">
									<StatusBadge status={c.status} lang={lang} />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold">{lang === "fa" ? "تعهدات جاری" : liveTitle}</h2>
				<div className="grid gap-4 md:grid-cols-2">
					{commitments
						.filter((c) => c.status === "open" || c.status === "pending")
						.map((c) => (
							<div key={c.id} className="rounded-md border border-border bg-card p-4 space-y-3">
								<div className="flex items-center justify-between">
									<p className="text-sm font-semibold">
										{lang === "fa" ? "مقدار تعهد شده" : "Committed quantity"}
									</p>
									<StatusBadge status={c.status} lang={lang} />
								</div>
								<p className="text-lg font-semibold">
									{c.quantity.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")} {c.unit}
								</p>
								<p className="text-sm text-muted-foreground">
									{lang === "fa" ? "زمان تحویل" : "Delivery window"}: {c.deliveryWindowStart} —{" "}
									{c.deliveryWindowEnd}
								</p>
								<div className="flex flex-wrap gap-3">
									<button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
										{lang === "fa" ? "رزرو" : "Reserve"}
									</button>
									<button className="rounded-md border border-border px-3 py-2 text-sm font-medium">
										{lang === "fa" ? "مشاهده سابقه" : "View history"}
									</button>
								</div>
							</div>
						))}
					{commitments.filter((c) => c.status === "open" || c.status === "pending").length === 0 && (
						<p className="text-sm text-muted-foreground">
							{lang === "fa" ? "تعهد فعال ندارد." : "No active commitments."}
						</p>
					)}
				</div>
			</section>
		</section>
	);
}
