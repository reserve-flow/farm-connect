import { resolveLang, type Lang } from "@/constants/i18n";
import { SearchPageClient } from "./SearchPageClient";

type PageProps = {
	searchParams?: Promise<{ lang?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
	const resolvedSearchParams = searchParams ? await searchParams : undefined;
	const lang = resolveLang(resolvedSearchParams?.lang ?? null) as Lang;

	return <SearchPageClient lang={lang} />;
}
