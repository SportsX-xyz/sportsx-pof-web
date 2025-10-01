import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Zap, Flame } from "lucide-react";
import { useFanPoints } from "@/hooks/useFanPoints";

export function DailyCheckinCard() {
  const { checkinStatus, checkinLoading, performDailyCheckin, totalPoints } = useFanPoints();

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-purple-500";
    if (streak >= 14) return "text-orange-500";
    if (streak >= 7) return "text-blue-500";
    if (streak >= 3) return "text-green-500";
    return "text-muted-foreground";
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return "🔥";
    if (streak >= 14) return "⚡";
    if (streak >= 7) return "🌟";
    if (streak >= 3) return "🚀";
    return "👋";
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Daily Check-in
        </CardTitle>
        <CardDescription>
          Earn 10 PoF points every day and build your streak!
        </CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Points</p>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-xl font-bold text-primary">{totalPoints}</span>
            </div>
          </div>
          
          <div className="space-y-1 text-right">
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <div className="flex items-center gap-2 justify-end">
              <span className={`text-xl font-bold ${getStreakColor(checkinStatus.streak)}`}>
                {checkinStatus.streak}
              </span>
              <span className="text-lg">{getStreakEmoji(checkinStatus.streak)}</span>
            </div>
          </div>
        </div>

        {checkinStatus.streak > 0 && (
          <div className="flex flex-wrap gap-2">
            {checkinStatus.streak >= 3 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                3+ Day Streak
              </Badge>
            )}
            {checkinStatus.streak >= 7 && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Weekly Champion
              </Badge>
            )}
            {checkinStatus.streak >= 14 && (
              <Badge className="flex items-center gap-1 bg-orange-500">
                <Flame className="h-3 w-3" />
                Fortnight Master
              </Badge>
            )}
            {checkinStatus.streak >= 30 && (
              <Badge className="flex items-center gap-1 bg-purple-500">
                <Trophy className="h-3 w-3" />
                Monthly Legend
              </Badge>
            )}
          </div>
        )}

        <div className="pt-2">
          {checkinStatus.canCheckin ? (
            <Button 
              onClick={performDailyCheckin}
              disabled={checkinLoading}
              variant="hero"
              className="w-full"
              size="lg"
            >
              {checkinLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Checking in...
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4 mr-2" />
                  Check in Today (+10 PoF)
                </>
              )}
            </Button>
          ) : (
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <Trophy className="h-5 w-5" />
                <span className="font-medium">Already checked in today!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Come back tomorrow to continue your streak
              </p>
            </div>
          )}
        </div>

        {checkinStatus.lastCheckin && (
          <p className="text-xs text-muted-foreground text-center">
            Last check-in: {new Date(checkinStatus.lastCheckin).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}