import { notFound } from "next/navigation";
import { commitmentsApi } from "@/services/api";
import { StatusBadge } from "@/components/StatusBadge";
import Link from "next/link";
import { resolveLang, type Lang } from "@/constants/i18n";

type PageProps = { params: { id: string }; searchParams?: { lang?: string } };

export default async function Page({ params, searchParams }: PageProps) {
	const { id } = params;
	const commitment = await commitmentsApi.getCommitmentById(id);
	const farmer = commitment ? await commitmentsApi.getFarmerById(commitment.farmerId) : null;

	if (!commitment || !farmer) {
		notFound();
	}

	const lang = resolveLang(searchParams?.lang ?? null) as Lang;

	return (
		<section className="mx-auto w-full max-w-screen-lg px-4 py-10 space-y-4">
			<header className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">
						{lang === "fa" ? "تعهد عمومی کشاورز انتخاب‌شده" : "Public commitment by selected farmer"}
					</p>
					<h1 className="text-2xl font-semibold">
						{farmer.name} — {commitment.quantity} {commitment.unit}
					</h1>
					<p className="text-sm text-muted-foreground">
						{commitment.deliveryWindowStart} — {commitment.deliveryWindowEnd}
					</p>
				</div>
				<StatusBadge status={commitment.status} lang={lang as "fa" | "en"} />
			</header>
			<div className="rounded-md border border-border bg-card p-4 space-y-2">
				<p className="text-sm">
					{lang === "fa" ? "کشاورز" : "Farmer"}:{" "}
					<Link href={`/farmers/${farmer.id}?lang=${lang}`} className="text-primary underline-offset-4 hover:underline">
						{farmer.name}
					</Link>
				</p>
				<p className="text-sm text-muted-foreground">
					{lang === "fa" ? "ثبت شده در" : "Recorded on"} {commitment.createdAt}
				</p>
				<p className="text-sm text-muted-foreground">
					{lang === "fa" ? "پیوند عمومی" : "Public link"}: {commitment.publicLinkSlug}
				</p>
			</div>
		</section>
	);
}
