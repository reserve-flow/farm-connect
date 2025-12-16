"use client";

import { useState, useEffect } from "react";
import type { BlogPost } from "@/types";
import { KnowledgeTopicCards } from "./KnowledgeTopicCards";
import { KnowledgeSearch } from "./KnowledgeSearch";
import { KnowledgeSearchResults } from "./KnowledgeSearchResults";
import { TopicDetailView } from "./TopicDetailView";
import { getPostsByTopic, searchPosts } from "@/hooks/useBlogPosts";
import { TopicDetailSkeleton } from "@/components/skeletons/TopicDetailSkeleton";

interface KnowledgeBaseSectionProps {
  posts: BlogPost[];
}

type ViewState = 
  | { type: 'topics' }
  | { type: 'topic-detail'; topicId: 'production' | 'consumption' | 'ordering' };

export function KnowledgeBaseSection({ posts }: KnowledgeBaseSectionProps) {
  const [viewState, setViewState] = useState<ViewState>({ type: 'topics' });
  const [searchQuery, setSearchQuery] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const searchResults = searchPosts(posts, searchQuery);
  const isSearching = searchQuery.trim().length > 0;

  const handleSelectTopic = (topicId: 'production' | 'consumption' | 'ordering') => {
    setSearchQuery("");
    setIsTransitioning(true);
    setViewState({ type: 'topic-detail', topicId });
  };

  const handleBack = () => {
    setViewState({ type: 'topics' });
  };

  // Simulate loading when transitioning to topic detail
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // If searching, show search results
  if (isSearching) {
    return (
      <div>
        <KnowledgeSearch value={searchQuery} onChange={setSearchQuery} />
        <KnowledgeSearchResults posts={searchResults} query={searchQuery} />
      </div>
    );
  }

  // If viewing a topic detail
  if (viewState.type === 'topic-detail') {
    const topicPosts = getPostsByTopic(posts, viewState.topicId);
    
    if (isTransitioning) {
      return (
        <div>
          <KnowledgeSearch value={searchQuery} onChange={setSearchQuery} />
          <TopicDetailSkeleton />
        </div>
      );
    }
    
    return (
      <div>
        <KnowledgeSearch value={searchQuery} onChange={setSearchQuery} />
        <TopicDetailView 
          topicId={viewState.topicId} 
          posts={topicPosts} 
          onBack={handleBack} 
        />
      </div>
    );
  }

  // Default: show topic cards
  return (
    <div>
      <KnowledgeSearch value={searchQuery} onChange={setSearchQuery} />
      
      <div className="text-center mb-6" dir="rtl">
        <p className="text-muted-foreground">
          یکی از موضوعات زیر را انتخاب کنید
        </p>
      </div>
      
      <KnowledgeTopicCards onSelectTopic={handleSelectTopic} />
    </div>
  );
}
