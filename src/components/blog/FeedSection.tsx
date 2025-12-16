import { Calendar, Leaf, Sun, CloudRain, Snowflake } from 'lucide-react';
import type { FeedItem } from '@/data/feedItems';
import { Badge } from '@/components/ui/badge';

interface FeedSectionProps {
  items: FeedItem[];
}

const seasonIcons = {
  spring: Leaf,
  summer: Sun,
  fall: CloudRain,
  winter: Snowflake,
};

const seasonLabels = {
  spring: 'بهار',
  summer: 'تابستان',
  fall: 'پاییز',
  winter: 'زمستان',
};

const seasonColors = {
  spring: 'bg-green-500/20 text-green-600',
  summer: 'bg-amber-500/20 text-amber-600',
  fall: 'bg-orange-500/20 text-orange-600',
  winter: 'bg-blue-500/20 text-blue-600',
};

export function FeedSection({ items }: FeedSectionProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Leaf className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>هنوز پستی منتشر نشده است</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const SeasonIcon = seasonIcons[item.season];
        
        return (
          <article
            key={item.id}
            className="bg-card/80 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:border-rice-golden/50 transition-colors"
            dir="rtl"
          >
            {/* Image for image type */}
            {item.type === 'image' && item.imageUrl && (
              <div className="h-48 md:h-64 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Video placeholder for video type */}
            {item.type === 'video' && item.videoUrl && (
              <div className="h-48 md:h-64 bg-muted/20 flex items-center justify-center">
                <span className="text-muted-foreground">ویدیو</span>
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              {/* Season badge */}
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${seasonColors[item.season]} border-0`}>
                  <SeasonIcon className="w-3 h-3 ml-1" />
                  {seasonLabels[item.season]}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(item.date).toLocaleDateString('fa-IR')}
                </span>
              </div>

              <h3 className="font-bold text-lg mb-2 text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.content}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
