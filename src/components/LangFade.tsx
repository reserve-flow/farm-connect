'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
};

/**
 * Fades content when the language switches so the RTL/LTR flip feels smoother.
 */
export function LangFade({ children }: Props) {
  const lang = useLang();
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setIsFading(true);
    const timer = setTimeout(() => setIsFading(false), 150);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <div
      className={cn(
        'transition-opacity duration-300 ease-in-out',
        isFading ? 'opacity-40' : 'opacity-100',
      )}
    >
      {children}
    </div>
  );
}
