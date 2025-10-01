import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Zap, Flame } from "lucide-react";
import { useFanPoints } from "@/hooks/useFanPoints";
import { useTeamPreferences } from "@/hooks/useTeamPreferences";

export function DailyCheckinCard() {
  const { checkinStatus, checkinLoading, performDailyCheckin, totalPoints } = useFanPoints();
  const { preferences } = useTeamPreferences();
  
  // Demo data for multiple sports
  const demoTeams = [
    { sport: 'Basketball', league: 'NBA', club: 'Los Angeles Lakers', emoji: '🏀' },
    { sport: 'American Football', league: 'NFL', club: 'Kansas City Chiefs', emoji: '🏈' },
    { sport: 'Baseball', league: 'MLB', club: 'New York Yankees', emoji: '⚾' }
  ];

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
    <Card className="relative overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.01] animate-in slide-in-from-left-5 fade-in-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      {checkinLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm font-medium">Processing check-in...</p>
            <p className="text-xs text-muted-foreground mt-1">Syncing with backend</p>
          </div>
        </div>
      )}
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2 group">
          <Calendar className="h-5 w-5 group-hover:animate-bounce transition-all duration-300" />
          <span className="group-hover:text-primary transition-colors duration-300">Daily Check-in</span>
        </CardTitle>
        <CardDescription className="animate-pulse">
          Earn 10 PoF points per team every day and build your streak!
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
            <div className="space-y-2">
              {/* Demo check-in buttons for multiple sports */}
              {demoTeams.map((team, index) => (
                <Button 
                  key={team.sport}
                  onClick={() => performDailyCheckin(team.sport.toLowerCase())}
                  disabled={checkinLoading}
                  variant={index === 0 ? "hero" : index === 1 ? "outline" : "secondary"}
                  className={`w-full hover:scale-105 hover:shadow-lg transition-all duration-300 animate-in slide-in-from-bottom-3 fade-in-0 delay-${index * 100} group`}
                  size={index === 0 ? "lg" : "default"}
                >
                  {checkinLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Checking in...
                    </>
                  ) : (
                    <>
                      <span className="mr-2 group-hover:animate-bounce transition-all duration-300">{team.emoji}</span>
                      <Calendar className="h-4 w-4 mr-2 group-hover:animate-pulse transition-all duration-300" />
                      Check in for {team.club} (+10 PoF)
                    </>
                  )}
                </Button>
              ))}
            </div>
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