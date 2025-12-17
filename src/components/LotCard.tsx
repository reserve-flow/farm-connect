import { Check } from "lucide-react";
import Link from "next/link";
import type { Farmer, Lot } from "@/types";

export type LotCardProps = {
  farmer: Farmer;
  lot: Lot;
  onReserve: (lotId: string) => void;
  searchQuery?: string;
  priority?: boolean;
};

function HighlightText({ text, query }: { text: string; query?: string }) {
  if (!query?.trim()) return <>{text}</>;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-warning/40 text-foreground rounded px-0.5">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export function LotCard({ farmer, lot, onReserve, searchQuery, priority = false }: LotCardProps) {
  return (
    <article className="rounded-3xl border border-border/70 bg-card/80 p-4 shadow-sm backdrop-blur-sm animate-fade-in">
      <Link href={`/farmer/${farmer.id}`}>
        <header className="mb-4 flex items-center gap-3">
          <img
            src={farmer.avatar}
            alt={`تصویر پروفایل ${farmer.name}`}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-sm truncate">
                <HighlightText text={farmer.name} query={searchQuery} />
              </span>
              {farmer.verified && (
                <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" aria-label="verified" />
              )}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              <HighlightText text={farmer.region} query={searchQuery} />
            </div>
          </div>
        </header>
      </Link>

      <Link href={`/lot/${lot.id}`}>
        <div className="mb-4 overflow-hidden rounded-2xl border border-border/70">
          {lot.heroVideo ? (
            <video
              className="aspect-video w-full object-cover"
              src={lot.heroVideo}
              poster={lot.heroPoster}
              muted
              playsInline
              preload="metadata"
              loop
            />
          ) : (
            <img
              src={lot.heroPoster}
              srcSet={`${lot.heroPoster.replace(/w=\d+/, 'w=400').replace(/h=\d+/, 'h=225')} 400w, ${lot.heroPoster.replace(/w=\d+/, 'w=640').replace(/h=\d+/, 'h=360')} 640w, ${lot.heroPoster.replace(/w=\d+/, 'w=800').replace(/h=\d+/, 'h=450')} 800w`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt={lot.title}
              className="aspect-video w-full object-cover"
              loading={priority ? "eager" : "lazy"}
              decoding={priority ? "sync" : "async"}
              fetchPriority={priority ? "high" : "auto"}
            />
          )}
        </div>

        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="mb-1 text-base font-semibold truncate">
              <HighlightText text={lot.title} query={searchQuery} />
            </div>
            <div className="text-sm text-muted-foreground">
              {lot.harvestStart} – {lot.harvestEnd}
            </div>
          </div>
          <div className="text-left shrink-0">
            <div className="text-base font-semibold">
              ${(lot.pricePerKg / 100).toFixed(2)}/kg
            </div>
            <div className="text-xs text-muted-foreground">
              حداقل {lot.minKg} کیلو
            </div>
          </div>
        </div>

        <div className="mb-3 h-1.5 w-full rounded-full bg-elev">
          <div
            className="h-1.5 rounded-full bg-primary transition-all duration-300"
            style={{ width: `${lot.reservedPct}%` }}
          />
        </div>
      </Link>

      <button
        className=" h-11 w-full items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-transform duration-75 active:scale-95"
        onClick={() => onReserve(lot.id)}
      >
        <span>رزرو کن</span>
      </button>
    </article>
  );
}
