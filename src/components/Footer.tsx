'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; // Assuming cn is a utility for class merging
import { footerLabels, type Lang } from '@/constants/i18n';
import { useLang } from '@/hooks/useLang';

export function Footer() {
  const pathname = usePathname();

  const footerLinks = [
    { key: 'story' as const, href: '/story' },
    { key: 'trustManifesto' as const, href: '/how-trust-works' }, // Assuming this maps to how-trust-works
    { key: 'terms' as const, href: '/terms' },
    { key: 'contact' as const, href: '/contact' }, // Assuming /contact exists
  ];

  const currentLang = useLang();

  const withLang = (href: string, lang: Lang) => {
    const url = new URL(href, 'http://localhost');
    url.searchParams.set('lang', lang);
    const query = url.searchParams.toString();
    return `${url.pathname}${query ? `?${query}` : ''}`;
  };

  return (
    <footer className="border-t bg-background text-muted-foreground py-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="text-center md:text-left flex flex-col space-y-2">
          <p className="text-sm">
            {footerLabels.transparencyLine[currentLang]}
          </p>
          <p className="text-xs">
            © {new Date().getFullYear()} FarmConnect. {footerLabels.copyright[currentLang]}
          </p>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={withLang(link.href, currentLang)}
              className={cn(
                'text-sm transition-colors hover:text-primary',
                pathname === link.href || pathname?.startsWith(link.href + '/')
                  ? 'text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {footerLabels[link.key][currentLang]}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
