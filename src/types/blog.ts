export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  keywords: string;
  image: string;
  content: string;
  topic?: 'production' | 'consumption' | 'ordering';
  order?: number;
}

export interface KnowledgeTopic {
  id: 'production' | 'consumption' | 'ordering';
  title: string;
  description: string;
  icon: string;
  gradient: string;
  posts: BlogPost[];
}
