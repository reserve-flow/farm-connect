import { Sprout, UtensilsCrossed, ShoppingBasket } from "lucide-react";

interface TopicCard {
  id: 'production' | 'consumption' | 'ordering';
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

interface KnowledgeTopicCardsProps {
  onSelectTopic: (topicId: 'production' | 'consumption' | 'ordering') => void;
}

const topics: TopicCard[] = [
  {
    id: 'production',
    icon: <Sprout className="w-8 h-8" />,
    title: "چطور تولید می‌شه؟",
    description: "از کاشت تا برداشت را ببینید",
    gradient: "from-emerald-500/20 to-emerald-600/10",
  },
  {
    id: 'consumption',
    icon: <UtensilsCrossed className="w-8 h-8" />,
    title: "چطور مصرف کنیم؟",
    description: "روش‌های پخت و نگهداری",
    gradient: "from-amber-500/20 to-amber-600/10",
  },
  {
    id: 'ordering',
    icon: <ShoppingBasket className="w-8 h-8" />,
    title: "چه چیزی سفارش بدم؟",
    description: "راهنمای خرید برنج",
    gradient: "from-sky-500/20 to-sky-600/10",
  },
];

export function KnowledgeTopicCards({ onSelectTopic }: KnowledgeTopicCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" dir="rtl">
      {topics.map((topic) => (
        <button
          key={topic.id}
          onClick={() => onSelectTopic(topic.id)}
          className={`relative overflow-hidden rounded-2xl p-6 text-right transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bg-linear-to-br ${topic.gradient} border border-border/50 hover:border-primary/30 group`}
        >
          <div className="flex flex-col items-center sm:items-start gap-3">
            <div className="p-3 rounded-xl bg-background/80 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {topic.icon}
            </div>
            <div className="text-center sm:text-right">
              <h3 className="font-bold text-lg mb-1">{topic.title}</h3>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
