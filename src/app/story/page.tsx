import { t } from "@/constants/copy";
import { resolveLang, type Lang } from "@/constants/i18n";

type PageProps = {
	searchParams?: Promise<{ lang?: string }>;
};

export default async function StoryPage({ searchParams }: PageProps) {
	const resolvedSearchParams = searchParams ? await searchParams : undefined;
	const lang = resolveLang(resolvedSearchParams?.lang ?? null) as Lang;
	const story = t<{ intro: string; body: string[]; outro: { before: string; linkText: string; after: string } }>("story", lang);

	return (
		<div className="mx-auto w-full max-w-screen-lg px-4 py-12 space-y-6">
			<header className="space-y-2">
				<p className="text-sm font-medium text-primary">
					{lang === "fa" ? "چرا این پلتفرم ساخته شد" : "Why this platform exists"}
				</p>
				<h1 className="text-3xl font-semibold">{lang === "fa" ? "داستان" : "Story"}</h1>
			</header>

			<p className="text-sm text-foreground leading-6">{story.intro}</p>

			<div className="space-y-3">
				{story.body.map((paragraph) => (
					<p key={paragraph} className="text-sm text-foreground leading-6">
						{paragraph}
					</p>
				))}
			</div>

			<p className="text-sm font-medium text-foreground leading-6">
				{story.outro.before}
				<a
					href="https://tally.so/r/ODlOa7"
					target="_blank"
					rel="noreferrer noopener"
					className="text-primary underline underline-offset-4"
				>
					{story.outro.linkText}
				</a>
				{story.outro.after}
			</p>
		</div>
	);
}
