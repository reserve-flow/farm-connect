import { Check, Star } from "lucide-react";

type FarmerHeaderProps = {
  farmer: {
    id: string;
    name: string;
    region: string;
    verified: boolean;
    avatar: string;
    rating?: number;
    followersCount?: number;
  };
  isFollowing?: boolean;
  onFollow?: () => void;
};

export function FarmerHeader({
  farmer,
  isFollowing = false,
  onFollow,
}: FarmerHeaderProps) {
  return (
    <div className="flex items-start gap-4 p-4">
      <img
        src={farmer.avatar}
        alt={farmer.name}
        className="h-16 w-16 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-semibold truncate">{farmer.name}</h2>
          {farmer.verified && (
            <Check className="h-4 w-4 text-primary flex-shrink-0" />
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-2">{farmer.region}</p>
        {farmer.rating && (
          <div className="flex items-center gap-1.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(farmer.rating!)
                    ? "fill-warning text-warning"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              {farmer.rating.toFixed(1)}
            </span>
          </div>
        )}
        {farmer.followersCount !== undefined && (
          <p className="text-xs text-muted-foreground">
            {farmer.followersCount.toLocaleString()} followers
          </p>
        )}
      </div>
      {onFollow && (
        <button
          onClick={onFollow}
          className={`h-8 px-4 rounded-lg font-medium text-sm transition-all duration-150 active:scale-95 ${
            isFollowing
              ? "bg-secondary text-secondary-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
}
