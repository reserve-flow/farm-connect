"use client";

import { t } from "@/constants/copy";
import type { Lang } from "@/constants/i18n";
import { useLang } from "@/hooks/useLang";

function withLang(href: string, lang: Lang) {
	const connector = href.includes("?") ? "&" : "?";
	return `${href}${connector}lang=${lang}`;
}

export default function Page() {
	const lang = useLang();

	const hero = t<{ titleLine1: string; titleLine2: string; titleLine3: string; primaryCta: string; secondaryCta: string }>("hero", lang);
	const steps = t<{ title: string; text: string }[]>("howTrustWorks", lang);
	const manifesto = t<{ title: string; points: string[]; cta: string }>("manifesto", lang);
	const liveTitle = t<string>("liveCommitmentsTitle", lang);

	return (
		<div className="mx-auto w-full max-w-screen-lg px-4 py-12 space-y-12">
			<section className="space-y-4">
				<p className="text-sm font-medium text-primary">
					{lang === "fa" ? "دفتر ثبت تعهدات کشاورز و خریدار" : "Registry for public commitments"}
				</p>
				<h1 className="text-3xl font-semibold leading-tight">
					{hero.titleLine1}
					<br />
					{hero.titleLine2}
					<br />
					{hero.titleLine3}
				</h1>
				<div className="flex flex-wrap items-center gap-3">
					<a
						className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
						href={withLang("/harvests", lang)}
					>
						{hero.primaryCta}
					</a>
					<a
						className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground"
						href={withLang("/how-trust-works", lang)}
					>
						{hero.secondaryCta}
					</a>
				</div>
			</section>

			<section className="grid gap-6 md:grid-cols-3" aria-labelledby="how-trust-works">
				<div className="md:col-span-3">
					<h2 id="how-trust-works" className="text-xl font-semibold">
						{lang === "fa" ? "اعتماد چگونه کار می‌کند" : "How trust works"}
					</h2>
				</div>
				{steps.map((item) => (
					<div key={item.title} className="rounded-md border border-border bg-card p-4 space-y-2">
						<p className="text-sm font-semibold">{item.title}</p>
						<p className="text-sm text-muted-foreground">{item.text}</p>
					</div>
				))}
			</section>

			<section className="space-y-4" aria-labelledby="manifesto">
				<h2 id="manifesto" className="text-xl font-semibold">
					{manifesto.title}
				</h2>
				<ul className="list-disc space-y-2 pl-5 text-sm text-foreground">
					{manifesto.points.map((point) => (
						<li key={point}>{point}</li>
					))}
				</ul>
				<a className="text-sm font-medium text-primary underline underline-offset-4" href={withLang("/story", lang)}>
					{manifesto.cta}
				</a>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold">{liveTitle}</h2>
				<p className="text-sm text-muted-foreground">
					{lang === "fa"
						? "کارت‌ها و جدول تعهدات در این بخش اضافه خواهد شد. وضعیت‌ها باید شفاف و تغییرناپذیر باشند."
						: "Cards and tables for commitments will be added here. Statuses must stay visible and immutable."}
				</p>
			</section>
		</div>
	);
}
