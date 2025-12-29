"use client";

import { StatusBadge } from "@/components/StatusBadge";
import { useLang } from "@/hooks/useLang";
import Link from "next/link";
import { t } from "@/constants/copy";
import { useCommitments } from "@/hooks/useCommitments";
import { useFarmers } from "@/hooks/useFarmers";

export default function HarvestsPage() {
	const lang = useLang();
	const liveTitle = t<string>("liveCommitmentsTitle", lang);
	const { data: commitments = [] } = useCommitments();
	const { data: farmers = [] } = useFarmers();
	return (
		<section className="mx-auto w-full max-w-screen-xl px-4 py-10 space-y-4">
			<div className="flex items-center justify-between flex-wrap gap-3">
				<div>
					<h1 className="text-2xl font-semibold">{liveTitle}</h1>
					<p className="text-sm text-muted-foreground">
						{lang === "fa"
							? "تعهدات عمومی کشاورزان انتخاب‌شده. وضعیت‌ها دائمی و قابل مشاهده است."
							: "Public commitments from selected farmers. Statuses remain visible."}
					</p>
				</div>
			</div>

			<div className="overflow-hidden rounded-md border border-border bg-card">
					<div className="grid grid-cols-12 gap-3 border-b border-border px-4 py-3 text-xs font-medium text-muted-foreground">
					<div className="col-span-3">{lang === "fa" ? "کشاورز" : "Farmer"}</div>
					<div className="col-span-2">{lang === "fa" ? "مقدار" : "Quantity"}</div>
					<div className="col-span-3">{lang === "fa" ? "بازه تحویل" : "Delivery window"}</div>
					<div className="col-span-2">{lang === "fa" ? "وضعیت" : "Status"}</div>
					<div className="col-span-2">{lang === "fa" ? "ثبت شده" : "Recorded"}</div>
				</div>

				<div className="divide-y divide-border">
					{commitments.map((c) => {
						const farmer = farmers.find((f) => f.id === c.farmerId);
						return (
							<div key={c.id} className="grid grid-cols-12 gap-3 px-4 py-4 items-center">
								<div className="col-span-3">
									{farmer ? (
										<Link
											href={`/farmers/${farmer.id}?lang=${lang}`}
											className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
										>
											{farmer.name}
										</Link>
									) : (
										<div className="text-sm font-semibold">{lang === "fa" ? "نامشخص" : "Unknown"}</div>
									)}
									<div className="text-xs text-muted-foreground">{farmer?.region}</div>
								</div>
								<div className="col-span-2 text-sm">
									{c.quantity.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")} {c.unit}
								</div>
								<div className="col-span-3 text-sm text-muted-foreground">
									{c.deliveryWindowStart} — {c.deliveryWindowEnd}
								</div>
								<div className="col-span-2">
									<StatusBadge status={c.status} lang={lang} />
								</div>
								<div className="col-span-2 text-xs text-muted-foreground">{c.createdAt}</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
