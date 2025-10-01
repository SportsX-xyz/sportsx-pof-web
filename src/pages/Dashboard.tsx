import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useTeamPreferences } from "@/hooks/useTeamPreferences";
import { useTags } from "@/hooks/useTags";
import { useFanPoints } from "@/hooks/useFanPoints";
import { TeamSelectionModal } from "@/components/TeamSelectionModal";
import { Navigation } from "@/components/Navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WalletCard } from "@/components/WalletCard";
import "./Dashboard.css";
import { DailyCheckinCard } from "@/components/DailyCheckinCard";
import { TicketUploadCard } from "@/components/TicketUploadCard";
import { PointsChart } from "@/components/PointsChart";
import { UpcomingTicketsCard } from "@/components/UpcomingTicketsCard";
import { Trophy, Target, Users, Star, TrendingUp, Calendar } from "lucide-react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const { profile } = useProfile();
  const { hasPreferences, loading: preferencesLoading, preferences } = useTeamPreferences();
  const { getUserSport, getUserLeague, getUserClub } = useTags();
  const { points, totalPoints, checkinLoading } = useFanPoints();
  const navigate = useNavigate();
  const [showTeamSelectionModal, setShowTeamSelectionModal] = useState(false);

  // Memoize the recent activity points to prevent unnecessary re-renders
  const recentActivityPoints = useMemo(() => points.slice(0, 5), [points]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!preferencesLoading && user && hasPreferences === false) {
      setShowTeamSelectionModal(true);
    }
  }, [hasPreferences, preferencesLoading, user]);

  const handleTeamSelectionComplete = () => {
    setShowTeamSelectionModal(false);
  };

  if (loading || preferencesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Team Selection Modal */}
      <TeamSelectionModal 
        isOpen={showTeamSelectionModal}
        onComplete={handleTeamSelectionComplete}
      />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back{profile?.first_name ? `, ${profile.first_name}` : ', Fan'}! 🏆
          </h1>
          <p className="text-xl text-muted-foreground">
            Continue building your Proof of Fandom
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-primary hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in slide-in-from-top-5 fade-in-0 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors duration-300">Total PoF Points</CardTitle>
              <Trophy className="h-4 w-4 text-primary group-hover:animate-bounce transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:animate-pulse transition-all duration-300">
                {checkinLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </div>
                ) : (
                  totalPoints.toLocaleString()
                )}
              </div>
              <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {checkinLoading ? "Syncing with backend..." : "+50 from last week"}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-red hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in slide-in-from-top-5 fade-in-0 delay-100 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-secondary transition-colors duration-300">Fan Level</CardTitle>
              <Star className="h-4 w-4 text-secondary group-hover:animate-bounce transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary group-hover:animate-pulse transition-all duration-300">Superfan</div>
              <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Level 3 of 10
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-glow hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in slide-in-from-top-5 fade-in-0 delay-200 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-primary-glow transition-colors duration-300">Sports Tracked</CardTitle>
              <Target className="h-4 w-4 text-primary-glow group-hover:animate-bounce transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:animate-pulse transition-all duration-300">3</div>
              <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Basketball, Soccer, Football
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-primary hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in slide-in-from-top-5 fade-in-0 delay-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors duration-300">Global Rank</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary group-hover:animate-bounce transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:animate-pulse transition-all duration-300">#1,847</div>
              <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Top 5% of fans
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Boost your Proof of Fandom with these activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Users className="h-6 w-6" />
                    <span>Join Challenge</span>
                    <Badge variant="secondary" className="text-xs">+250 PoF</Badge>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                    onClick={() => window.open('https://ticket.tortorcoin.top', '_blank')}
                  >
                    <Star className="h-6 w-6" />
                    <span>Buy Ticket</span>
                    <Badge variant="secondary" className="text-xs">+25 PoF</Badge>
                  </Button>
                  
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Trophy className="h-6 w-6" />
                    <span>Complete Survey</span>
                    <Badge variant="secondary" className="text-xs">+50 PoF</Badge>
                  </Button>
                  
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Target className="h-6 w-6" />
                    <span>Predict Game</span>
                    <Badge variant="secondary" className="text-xs">+75 PoF</Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fan Engagement Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailyCheckinCard />
              <TicketUploadCard />
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest Proof of Fandom contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivityPoints.map((point) => {
                    const getActivityIcon = (actionType: string) => {
                      switch (actionType) {
                        case 'daily_checkin':
                          return <Calendar className="h-5 w-5 text-white" />;
                        case 'ticket_upload':
                          return <Trophy className="h-5 w-5 text-white" />;
                        case 'prediction_correct':
                          return <Target className="h-5 w-5 text-white" />;
                        case 'social_engagement':
                          return <Users className="h-5 w-5 text-white" />;
                        case 'community_participation':
                          return <Users className="h-5 w-5 text-white" />;
                        case 'achievement_unlock':
                          return <Star className="h-5 w-5 text-white" />;
                        default:
                          return <Trophy className="h-5 w-5 text-white" />;
                      }
                    };

                    const getActivityBg = (actionType: string) => {
                      switch (actionType) {
                        case 'daily_checkin':
                          return 'bg-secondary';
                        case 'ticket_upload':
                          return 'bg-gradient-primary';
                        case 'prediction_correct':
                          return 'bg-primary-glow';
                        case 'social_engagement':
                          return 'bg-primary';
                        case 'community_participation':
                          return 'bg-primary';
                        case 'achievement_unlock':
                          return 'bg-gradient-primary';
                        default:
                          return 'bg-gradient-primary';
                      }
                    };

                    const getActivityText = (point: any) => {
                      switch (point.action_type) {
                        case 'daily_checkin':
                          return `Daily check-in${point.metadata?.team ? ` for ${point.metadata.team}` : ''}`;
                        case 'ticket_upload':
                          return `Uploaded ticket${point.metadata?.event ? `: ${point.metadata.event}` : ''}`;
                        case 'prediction_correct':
                          return `Correct prediction${point.metadata?.prediction ? `: ${point.metadata.prediction}` : ''}`;
                        case 'social_engagement':
                          return `Social engagement${point.metadata?.action ? `: ${point.metadata.action}` : ''}`;
                        case 'community_participation':
                          return `Community participation${point.metadata?.action ? `: ${point.metadata.action}` : ''}`;
                        case 'achievement_unlock':
                          return `Achievement unlocked${point.metadata?.achievement ? `: ${point.metadata.achievement}` : ''}`;
                        default:
                          return point.action_type.replace('_', ' ');
                      }
                    };

                    const timeAgo = (dateString: string) => {
                      const now = new Date();
                      const date = new Date(dateString);
                      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
                      
                      if (diffInHours < 1) return 'Just now';
                      if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
                      const diffInDays = Math.floor(diffInHours / 24);
                      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
                    };

                    return (
                      <div 
                        key={point.id} 
                        className="flex items-center justify-between p-4 border rounded-lg transition-all duration-200"
                        style={{ 
                          transform: 'translateZ(0)', // Force hardware acceleration
                          willChange: 'auto' // Optimize for changes
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${getActivityBg(point.action_type)} rounded-full flex items-center justify-center`}>
                            {getActivityIcon(point.action_type)}
                          </div>
                          <div>
                            <p className="font-medium">{getActivityText(point)}</p>
                            <p className="text-sm text-muted-foreground">{timeAgo(point.created_at)}</p>
                          </div>
                        </div>
                        <Badge variant="default">+{point.points} PoF</Badge>
                      </div>
                    );
                  })}
                  
                  {points.length === 0 && (
                    <div className="text-center p-8 text-muted-foreground">
                      <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No activity yet</p>
                      <p className="text-sm">Start earning PoF points by checking in daily!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tickets - Important message at top */}
            <UpcomingTicketsCard />
            
            {/* Wallet Card */}
            <WalletCard />
            
            {/* Sports Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Your Sports Profile</CardTitle>
                <CardDescription>
                  Progress with your selected teams
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Demo data for Basketball */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">🏀 Basketball - NBA</span>
                    <Badge variant="default">Level 4</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-3/4"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">Los Angeles Lakers</div>
                </div>
                
                {/* Demo data for American Football */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">🏈 American Football - NFL</span>
                    <Badge variant="secondary">Level 3</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full w-2/3"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">Kansas City Chiefs</div>
                </div>
                
                {/* Demo data for Baseball */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">⚾ Baseball - MLB</span>
                    <Badge className="bg-primary-glow text-white">Level 2</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary-glow h-2 rounded-full w-1/2"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">New York Yankees</div>
                </div>
                
                {/* Keep original logic as fallback for edge cases */}
                {preferences?.sport && (
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">🏃‍♂️ {preferences.sport.name}</span>
                      <Badge variant="outline">Level 1</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-1/4"></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Points History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Points History
                </CardTitle>
                <CardDescription>
                  Track your PoF points over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PointsChart points={points} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}