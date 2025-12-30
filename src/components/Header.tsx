'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils'; // Assuming cn is a utility for class merging
import { Button } from '@/components/ui/button'; // Assuming Button component exists
import { navLabels, toggleLang, type Lang } from '@/constants/i18n';
import { useLang } from '@/hooks/useLang';
import type { UrlObject } from 'url';

// Placeholder for logo component
const Logo = () => (
  <Link href="/" className="flex items-center space-x-2">
    {/* Replace with actual logo SVG or image */}
    <svg
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7 17l5-5 5 5" />
      <path d="m7 10 5-5 5 5" />
    </svg>
    <span className="hidden font-bold md:inline">FarmConnect</span>
  </Link>
);

export function Header() {
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const currentLang = useLang();
  const router = useRouter();

  // Navigation links with translation support considerations
  const navItems = [
    { key: 'harvests' as const, href: '/harvests' },
    { key: 'trust' as const, href: '/how-trust-works' },
    { key: 'story' as const, href: '/story' },
  ];

  const langOptions: { code: Lang; label: string; flag: string }[] = [
    { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  const withLang = (href: string, lang: Lang): UrlObject => {
    const url = new URL(href, 'http://localhost');
    url.searchParams.set('lang', lang);
    return {
      pathname: url.pathname,
      query: Object.fromEntries(url.searchParams),
    };
  };

  const activeLang = langOptions.find((lang) => lang.code === currentLang) ?? langOptions[0];

  const handleToggleLang = () => {
    const nextLang = toggleLang(currentLang);
    const params = new URLSearchParams(searchParams?.toString());
    params.set('lang', nextLang);

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    document.cookie = `lang=${nextLang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.push(nextUrl);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-8">
        <div className="flex items-center">
          <Logo />
          <nav className="ml-10 flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={withLang(item.href, currentLang)}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href || pathname?.startsWith(item.href + '/')
                    ? 'text-primary'
                    : 'text-muted-foreground',
                )}
              >
                {navLabels[item.key][currentLang]}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleLang}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <span className="text-lg leading-none">{activeLang.flag}</span>
            <span className="text-xs font-medium uppercase">{activeLang.code}</span>
            <span className="sr-only">{activeLang.label}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
