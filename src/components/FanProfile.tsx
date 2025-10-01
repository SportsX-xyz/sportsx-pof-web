import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wallet, Trophy, Target, Users } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useFanPoints } from "@/hooks/useFanPoints";
import { useTags } from "@/hooks/useTags";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { WalletCard } from "@/components/WalletCard";
import { PointsChart } from "@/components/PointsChart";
import { TagSelector } from "@/components/TagSelector";
import { BadgeDisplay } from "@/components/BadgeDisplay";

export function FanProfile() {
  const { profile } = useProfile();
  const { totalPoints, points } = useFanPoints();
  const { userBadges } = useLeaderboard();
  const { getUserSport, getUserLeague, getUserClub } = useTags();

  const userSport = getUserSport();
  const userLeague = getUserLeague();
  const userClub = getUserClub();

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Fan Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="text-sm text-muted-foreground">Email</div>
            <div className="font-medium">{profile?.email}</div>
          </div>
          
          {(profile?.first_name || profile?.last_name) && (
            <div className="flex flex-col space-y-2">
              <div className="text-sm text-muted-foreground">Name</div>
              <div className="font-medium">
                {profile?.first_name} {profile?.last_name}
              </div>
            </div>
          )}

          {profile?.country && (
            <div className="flex flex-col space-y-2">
              <div className="text-sm text-muted-foreground">Country</div>
              <div className="font-medium">{profile?.country}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* PoF Points Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            PoF Points Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary mb-2">
            {totalPoints.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Points Earned</div>
        </CardContent>
      </Card>

      {/* Fandom Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            My Fandom
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {userSport && (
              <Badge variant="secondary" className="text-sm">
                🏃‍♂️ {userSport.name}
              </Badge>
            )}
            {userLeague && (
              <Badge variant="secondary" className="text-sm">
                🏆 {userLeague.name}
              </Badge>
            )}
            {userClub && (
              <Badge variant="secondary" className="text-sm">
                ⚽ {userClub.name}
              </Badge>
            )}
          </div>
          
          {/* User Badges */}
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Badges Earned:</div>
            <BadgeDisplay badges={userBadges} showAll={true} />
          </div>
          
          {!userSport && (
            <div className="text-sm text-muted-foreground">
              No fandom preferences set. Choose your favorite sport, league, and club below!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tag Selection */}
      <TagSelector />

      {/* Wallet Information */}
      <WalletCard />

      {/* Points History Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Points History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PointsChart points={points} />
        </CardContent>
      </Card>

      {/* Leaderboard Link */}
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            See how you rank against other fans!
          </div>
          <Link to="/leaderboard">
            <Button variant="outline" className="w-full">
              View Leaderboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}