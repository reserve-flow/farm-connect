import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface KnowledgeSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function KnowledgeSearch({ value, onChange }: KnowledgeSearchProps) {
  return (
    <div className="relative max-w-md mx-auto mb-6" dir="rtl">
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="جستجو در دانستنی‌ها..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-10 pl-10 bg-card/80 border-border/50"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
