"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { useLang } from "@/hooks/useLang";
import { useCommitments } from "@/hooks/useCommitments";
import { useFarmers } from "@/hooks/useFarmers";
import Link from "next/link";

export default function Page() {
	const lang = useLang();
	const { data: commitments = [] } = useCommitments();
	const { data: farmers = [] } = useFarmers();
	const [query, setQuery] = useState("");

	const filtered = useMemo(() => {
		if (!query.trim()) return commitments;
		const term = query.toLowerCase().trim();
		return commitments.filter((c) => {
			const farmer = farmers.find((f) => f.id === c.farmerId);
			return (
				farmer?.name.toLowerCase().includes(term) ||
				(farmer?.region.toLowerCase() ?? "").includes(term) ||
				c.publicLinkSlug.toLowerCase().includes(term)
			);
		});
	}, [commitments, farmers, query]);

	return (
		<div className="mx-auto w-full max-w-screen-lg px-4 py-8 space-y-4">
			<header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur px-1 py-3">
				<div className="flex items-center gap-3 h-12 px-4 rounded-lg bg-secondary/50 border border-border/50">
					<SearchIcon className="h-5 w-5 text-muted-foreground shrink-0" />
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder={lang === "fa" ? "جستجوی کشاورز یا تعهد..." : "Search farmer or commitment..."}
						className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground text-foreground"
						autoFocus
					/>
					{query && (
						<button
							onClick={() => setQuery("")}
							className="p-1 rounded-full hover:bg-secondary transition-colors"
							aria-label={lang === "fa" ? "پاک کردن" : "Clear"}
						>
							<X className="h-4 w-4 text-muted-foreground" />
						</button>
					)}
				</div>
			</header>

			<section className="overflow-hidden rounded-md border border-border bg-card">
				<div className="grid grid-cols-12 gap-3 border-b border-border px-4 py-3 text-xs font-medium text-muted-foreground">
					<div className="col-span-3">{lang === "fa" ? "کشاورز" : "Farmer"}</div>
					<div className="col-span-3">{lang === "fa" ? "بازه تحویل" : "Delivery window"}</div>
					<div className="col-span-2">{lang === "fa" ? "مقدار" : "Quantity"}</div>
					<div className="col-span-2">{lang === "fa" ? "وضعیت" : "Status"}</div>
					<div className="col-span-2">{lang === "fa" ? "پیوند" : "Link"}</div>
				</div>
				<div className="divide-y divide-border">
					{filtered.map((c) => {
						const farmer = farmers.find((f) => f.id === c.farmerId);
						return (
							<div key={c.id} className="grid grid-cols-12 gap-3 px-4 py-4 items-center">
								<div className="col-span-3">
									<Link
										href={`/farmers/${farmer?.id ?? ""}?lang=${lang}`}
										className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
									>
										{farmer?.name ?? (lang === "fa" ? "نامشخص" : "Unknown")}
									</Link>
									<div className="text-xs text-muted-foreground">{farmer?.region}</div>
								</div>
								<div className="col-span-3 text-sm text-muted-foreground">
									{c.deliveryWindowStart} — {c.deliveryWindowEnd}
								</div>
								<div className="col-span-2 text-sm">
									{c.quantity.toLocaleString(lang === "fa" ? "fa-IR" : "en-US")} {c.unit}
								</div>
								<div className="col-span-2">
									<StatusBadge status={c.status} lang={lang} />
								</div>
								<div className="col-span-2 text-xs text-primary">
									<Link href={`/lot/${c.id}?lang=${lang}`} className="underline-offset-4 hover:underline">
										{c.publicLinkSlug}
									</Link>
								</div>
							</div>
						);
					})}
					{filtered.length === 0 && (
						<div className="px-4 py-6 text-sm text-muted-foreground">
							{lang === "fa" ? "نتیجه‌ای یافت نشد." : "No results found."}
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
