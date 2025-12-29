"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_LANG, resolveLang, type Lang } from "@/constants/i18n";
import { useSearchParams } from "next/navigation";

/**
 * Minimal client-side language resolver using `?lang=` and a cookie fallback.
 * Default is Farsi (`fa`).
 */
export function useLang(): Lang {
	const searchParams = useSearchParams();
	const [lang, setLang] = useState<Lang>(DEFAULT_LANG);

	const fromSearch = useMemo(() => resolveLang(searchParams?.get("lang")), [searchParams]);

	useEffect(() => {
		if (fromSearch) {
			setLang(fromSearch);
			document.cookie = `lang=${fromSearch}; path=/; max-age=${60 * 60 * 24 * 365}`;
			return;
		}

		const cookieLang = resolveLang(
			document.cookie
				.split(";")
				.map((c) => c.trim())
				.find((c) => c.startsWith("lang="))
				?.split("=")[1] ?? null,
		);

		setLang(cookieLang);
	}, [fromSearch]);

	return lang;
}
