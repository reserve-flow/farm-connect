import Link from "next/link"; //TODO use next router
import type { BlogPost } from "@/types";
import { Search } from "lucide-react";

interface KnowledgeSearchResultsProps {
  posts: BlogPost[];
  query: string;
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-rice-golden/30 text-foreground rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export function KnowledgeSearchResults({ posts, query }: KnowledgeSearchResultsProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground" dir="rtl">
        <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>نتیجه‌ای برای "{query}" یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="space-y-3" dir="rtl">
      <p className="text-sm text-muted-foreground mb-4">
        {posts.length} نتیجه برای "{query}"
      </p>
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="block p-4 bg-card/80 backdrop-blur-sm rounded-xl border border-border hover:border-rice-green/50 hover:shadow-md transition-all"
        >
          <h3 className="font-bold text-foreground mb-1">
            {highlightText(post.title, query)}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {highlightText(post.description, query)}
          </p>
        </Link>
      ))}
    </div>
  );
}
