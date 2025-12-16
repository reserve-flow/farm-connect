/**
 * Blog API Service
 * 
 * Currently uses local markdown files. To integrate with real backend:
 * 1. Replace local file loading with actual API calls
 * 2. Update return types if needed
 */

import type { BlogPost } from '@/types';
import matter from 'gray-matter';
import tarikheBerenjIran from '@/data/posts/tarikhe-berenj-iran';
import raveshPokhtBerenj from '@/data/posts/ravesh-pokht-berenj';
import kharideBerenj from '@/data/posts/kharide-berenj';

// Static content map for blog posts
const postFiles: Record<string, string> = {
  'tarikhe-berenj-iran': tarikheBerenjIran,
  'ravesh-pokht-berenj': raveshPokhtBerenj,
  'kharide-berenj': kharideBerenj,
};

/**
 * Fetch all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  // TODO: Replace with actual API call
  // return fetch('/api/blog/posts').then(res => res.json());
  
  const posts: BlogPost[] = [];
  
  for (const [slug, raw] of Object.entries(postFiles)) {
    const { data, content } = matter(raw);
    
    posts.push({
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      keywords: data.keywords,
      image: data.image,
      content,
    });
  }
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Fetch a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // TODO: Replace with actual API call
  // return fetch(`/api/blog/posts/${slug}`).then(res => res.json());
  
  const raw = postFiles[slug as keyof typeof postFiles];
  if (!raw) return null;
  const { data, content } = matter(raw);
  
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    author: data.author,
    keywords: data.keywords,
    image: data.image,
    content,
  };
}
