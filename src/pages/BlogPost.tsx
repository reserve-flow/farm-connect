"use client";

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { blogApi } from '@/services/api';
import type { BlogPost } from '@/types';
import { Badge } from '@/components/ui/badge';

import Script from "next/script";

export default function BlogPostPage({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      blogApi.getPostBySlug(slug).then((data) => {
        setPost(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 border border-border">
          <div className="h-12 w-3/4 animate-pulse rounded-lg bg-muted/20 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 animate-pulse rounded bg-muted/20" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-8">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 border border-border text-center">
          <h1 className="text-2xl font-bold text-foreground">مقاله پیدا نشد</h1>
          <p className="mt-4 text-muted-foreground">لطفاً مقاله دیگری را انتخاب کنید.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Structured Data improving how posts appear in SERPs*/}
      <Script
        id="post-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        author: { '@type': 'Person', name: post.author },
        datePublished: post.date,
        keywords: post.keywords,
      })}</Script>

      <article className="bg-card/80 backdrop-blur-sm rounded-lg border border-border shadow-sm overflow-hidden" dir="rtl">
        {/* Hero Image */}
        {post.image && (
          <div className="w-full h-96 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-rice-green">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{post.description}</p>
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <span className="font-medium">{post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('fa-IR')}</time>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.keywords.split(',').map((keyword, index) => (
                <Badge key={index} variant="secondary" className="bg-rice-green-light text-rice-green hover:bg-rice-green hover:text-white">
                  {keyword.trim()}
                </Badge>
              ))}
            </div>
          </header>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4 text-rice-green border-b-2 border-rice-green-light pb-2">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-6 mb-3 text-rice-green">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-4 mb-2 text-rice-brown">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="my-4 leading-relaxed text-foreground">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside my-4 space-y-2 text-foreground mr-6">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside my-4 space-y-2 text-foreground mr-6">{children}</ol>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-rice-brown">{children}</strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-r-4 border-rice-golden pr-4 my-4 italic bg-rice-golden-light/20 p-4 rounded">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-rice-green hover:text-rice-golden underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                hr: () => <hr className="my-8 border-rice-green-light" />,
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-border">
                      {children}
                    </table>
                  </div>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </>
  );
}
