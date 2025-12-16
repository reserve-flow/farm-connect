"use client";

import { useQuery } from "@tanstack/react-query";
import { blogApi } from "@/services/api";
import type { BlogPost } from "@/types";

export function useBlogPosts(initialData?: BlogPost[]) {
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: blogApi.getAllPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    initialData,
  });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => (slug ? blogApi.getPostBySlug(slug) : null),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

// Map posts to topics based on content
export function getPostsByTopic(posts: BlogPost[], topicId: 'production' | 'consumption' | 'ordering'): BlogPost[] {
  const topicKeywords: Record<string, string[]> = {
    production: ['تاریخ', 'تولید', 'کاشت', 'برداشت', 'مزرعه'],
    consumption: ['پخت', 'مصرف', 'طبخ', 'آشپزی', 'دستور'],
    ordering: ['خرید', 'سفارش', 'انتخاب', 'قیمت', 'نگهداری'],
  };
  
  const keywords = topicKeywords[topicId] || [];
  
  return posts
    .filter(post => {
      const text = `${post.title} ${post.description} ${post.keywords}`.toLowerCase();
      return keywords.some(keyword => text.includes(keyword));
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Oldest first for reading order
}

export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return posts.filter(post => {
    const title = post.title.toLowerCase();
    const description = post.description.toLowerCase();
    return title.includes(normalizedQuery) || description.includes(normalizedQuery);
  });
}
