"use client";

import { t } from "@/constants/copy";
import { useLang } from "@/hooks/useLang";

export default function HowTrustWorksPage() {
	const lang = useLang();
	const statements = t<string[]>("howTrustWorksDetail", lang);

	return (
		<div className="mx-auto w-full max-w-screen-lg px-4 py-12 space-y-8">
			<header className="space-y-2">
				<p className="text-sm font-medium text-primary">
					{lang === "fa" ? "قواعد اعتماد در این پلتفرم" : "The rules of trust on this platform"}
				</p>
				<h1 className="text-3xl font-semibold">
					{lang === "fa" ? "اعتماد چگونه کار می‌کند" : "How trust works"}
				</h1>
			</header>

			<section className="space-y-4">
				{statements.map((text) => (
					<div key={text} className="rounded-md border border-border bg-card p-4 text-sm leading-6 text-foreground">
						{text}
					</div>
				))}
			</section>
		</div>
	);
}
