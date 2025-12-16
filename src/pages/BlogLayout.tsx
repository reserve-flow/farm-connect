"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, BookOpen } from 'lucide-react';
import { BlogSkeleton } from '@/components/blog/BlogSkeleton';
import { KnowledgeBaseSection } from '@/components/blog/KnowledgeBaseSection';
import { ProductionStatusButton } from '@/components/blog/ProductionStatusButton';
import { ProductionRoadmap } from '@/components/blog/ProductionRoadmap';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { RoadmapSkeleton } from '@/components/skeletons/RoadmapSkeleton';
import type { BlogPost } from '@/types';

type ViewType = 'main' | 'roadmap';

type BlogLayoutProps = {
  children?: React.ReactNode;
  initialPosts?: BlogPost[];
};

export default function BlogLayout({ children, initialPosts }: BlogLayoutProps) {
  const pathname = usePathname();
  const isPostPage = pathname?.startsWith("/blog/") && pathname !== "/blog";


  const { data: posts = [], isLoading } = useBlogPosts(initialPosts);
  const [viewType, setViewType] = useState<ViewType>('main');
  const [isTransitioning, setIsTransitioning] = useState(false);


  const handleRoadmapClick = () => {
    setIsTransitioning(true);
    setViewType('roadmap');
  };

  const handleBackToMain = () => {
    setViewType('main');
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Optional: when user navigates to a post, ensure main UI state doesn't matter
  useEffect(() => {
    if (isPostPage) {
      setViewType("main");
      setIsTransitioning(false);
    }
  }, [isPostPage]);

  // Only block on loading when we're on the blog index UI (not a post page)
  if (!isPostPage && isLoading) return <BlogSkeleton />;

  return (
    <div className="min-h-screen bg-linear-to-br from-rice-green-light via-background to-rice-golden-light pb-20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-rice-green hover:text-rice-golden transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">صفحه اصلی</span>
            </Link>

            {isPostPage && (
              <Link
                href={"/BlogPost"}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">همه مطالب</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {isPostPage ? (
          children
        ) : (
          <>
            {/* Page Title */}
            <div className="text-center mb-6" dir="rtl">
              <h1 className="text-3xl font-bold text-rice-green mb-2">دانستنی‌ها</h1>
              <p className="text-muted-foreground">
                همه چیز درباره برنج ایرانی
              </p>
            </div>

            {/* Production Status Button */}
            <div className="mb-8">
              <ProductionStatusButton onClick={handleRoadmapClick} />
            </div>

            {/* Content based on view */}
            {viewType === 'roadmap' ? (
              isTransitioning ? (
                <RoadmapSkeleton />
              ) : (
            <ProductionRoadmap onBack={handleBackToMain} />
              )
            ) : (
              <KnowledgeBaseSection posts={posts} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
