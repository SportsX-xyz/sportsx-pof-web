import { Badge } from "@/components/ui/badge";

interface UserBadge {
  id: string;
  badge_type: string;
  earned_at: string;
  metadata: any;
}

interface BadgeDisplayProps {
  badges: UserBadge[];
  showAll?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

const BADGE_CONFIG = {
  top_1_percent: {
    label: 'Top 1%',
    emoji: '🏆',
    variant: 'default' as const,
    description: 'Top 1% of all fans',
  },
  top_5_percent: {
    label: 'Top 5%',
    emoji: '🥇',
    variant: 'secondary' as const,
    description: 'Top 5% of all fans',
  },
  top_10_percent: {
    label: 'Top 10%',
    emoji: '🥈',
    variant: 'outline' as const,
    description: 'Top 10% of all fans',
  },
  superfan: {
    label: 'Superfan',
    emoji: '⭐',
    variant: 'default' as const,
    description: '1000+ points earned',
  },
  daily_devotee: {
    label: 'Daily Devotee',
    emoji: '📅',
    variant: 'secondary' as const,
    description: '30+ daily check-ins',
  },
  rising_star: {
    label: 'Rising Star',
    emoji: '🌟',
    variant: 'outline' as const,
    description: 'Rapid point accumulation',
  },
  loyal_fan: {
    label: 'Loyal Fan',
    emoji: '💎',
    variant: 'outline' as const,
    description: 'Consistent engagement',
  },
};

export function BadgeDisplay({ badges, showAll = false, size = 'default' }: BadgeDisplayProps) {
  const displayBadges = showAll ? badges : badges.slice(0, 3);
  const remainingCount = badges.length - displayBadges.length;

  if (badges.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No badges earned yet
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1">
      {displayBadges.map((badge) => {
        const config = BADGE_CONFIG[badge.badge_type as keyof typeof BADGE_CONFIG];
        if (!config) return null;

        return (
          <Badge
            key={badge.id}
            variant={config.variant}
            className={`
              ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs'}
              flex items-center gap-1
            `}
            title={`${config.description} - Earned on ${new Date(badge.earned_at).toLocaleDateString()}`}
          >
            <span className="text-xs">{config.emoji}</span>
            {config.label}
          </Badge>
        );
      })}
      
      {!showAll && remainingCount > 0 && (
        <Badge variant="outline" className="text-xs">
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
}