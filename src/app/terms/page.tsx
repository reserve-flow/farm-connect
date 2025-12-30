"use client";

import { t } from "@/constants/copy";
import { useLang } from "@/hooks/useLang";

type TermsCopy = {
	summaryTitle: string;
	summaryItems: string[];
	sections: { title: string; body: string; bullets?: string[]; emphasis?: string }[];
};

export default function TermsPage() {
	const lang = useLang();
	const terms = t<TermsCopy>("terms", lang);

	return (
		<section className="mx-auto w-full max-w-screen-lg px-4 py-10 space-y-6">
			<div className="space-y-2">
				<h1 className="text-2xl font-semibold">
					{lang === "fa" ? "قوانین و مسئولیت‌ها" : "Terms & Responsibility"}
				</h1>
				<p className="text-sm text-muted-foreground">
					{lang === "fa"
						? "متن کوتاه و دقیق است تا نکات حیاتی پنهان نماند."
						: "Short and precise so the critical points are never missed."}
				</p>
			</div>

			<div className="rounded-lg border bg-muted/40 p-4">
				<p className="mb-2 text-sm font-semibold">{terms.summaryTitle}</p>
				<ul className="list-disc space-y-1 pl-5 text-sm">
					{terms.summaryItems.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</div>

			<div className="grid gap-6">
				{terms.sections.map((section) => (
					<div key={section.title} className="space-y-2 rounded-lg border p-4">
						<h2 className="text-lg font-semibold">{section.title}</h2>
						<p className="text-sm leading-relaxed">{section.body}</p>
						{section.bullets && (
							<ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
								{section.bullets.map((bullet) => (
									<li key={bullet}>{bullet}</li>
								))}
							</ul>
						)}
						{section.emphasis && <p className="text-sm font-semibold">{section.emphasis}</p>}
					</div>
				))}
			</div>
		</section>
	);
}
