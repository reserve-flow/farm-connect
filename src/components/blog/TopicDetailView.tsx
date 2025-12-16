import Link from "next/link"; //TODO use next router
import { ArrowRight, Sprout, UtensilsCrossed, ShoppingBasket, ChevronLeft } from "lucide-react";
import type { BlogPost } from "@/types";

interface TopicDetailViewProps {
  topicId: 'production' | 'consumption' | 'ordering';
  posts: BlogPost[];
  onBack: () => void;
}

const topicMeta = {
  production: {
    title: "چطور تولید می‌شه؟",
    subtitle: "از کاشت تا برداشت",
    icon: <Sprout className="w-6 h-6" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
  consumption: {
    title: "چطور مصرف کنیم؟",
    subtitle: "روش‌های پخت و نگهداری",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
  },
  ordering: {
    title: "چه چیزی سفارش بدم؟",
    subtitle: "راهنمای خرید برنج",
    icon: <ShoppingBasket className="w-6 h-6" />,
    color: "text-sky-600",
    bgColor: "bg-sky-500/10",
  },
};

export function TopicDetailView({ topicId, posts, onBack }: TopicDetailViewProps) {
  const meta = topicMeta[topicId];

  return (
    <div dir="rtl">
      {/* Back button & Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowRight className="w-4 h-4" />
          <span>تغییر موضوع</span>
        </button>

        <div className={`flex items-center gap-3 p-4 rounded-xl ${meta.bgColor}`}>
          <div className={meta.color}>{meta.icon}</div>
          <div>
            <h2 className="font-bold text-xl">{meta.title}</h2>
            <p className="text-sm text-muted-foreground">{meta.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Ordered subsections */}
      {posts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>هنوز مقاله‌ای در این بخش منتشر نشده است</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            به ترتیب بخوانید:
          </p>
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-center gap-4 p-4 bg-card/80 backdrop-blur-sm rounded-xl border border-border hover:border-rice-green/50 hover:shadow-md transition-all group"
            >
              {/* Order number */}
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground group-hover:text-rice-green transition-colors line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {post.description}
                </p>
              </div>

              {/* Arrow */}
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-rice-green transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
