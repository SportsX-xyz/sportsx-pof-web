import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { Navigation } from "@/components/Navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WalletCard } from "@/components/WalletCard";
import "./Dashboard.css";
import { DailyCheckinCard } from "@/components/DailyCheckinCard";
import { TicketUploadCard } from "@/components/TicketUploadCard";
import { Trophy, Target, Users, Star, TrendingUp, Calendar } from "lucide-react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
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
          <Card className="hover:shadow-primary transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total PoF Points</CardTitle>
              <Trophy className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">1,250</div>
              <p className="text-xs text-muted-foreground">
                +50 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-red transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fan Level</CardTitle>
              <Star className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">Superfan</div>
              <p className="text-xs text-muted-foreground">
                Level 3 of 10
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-glow transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sports Tracked</CardTitle>
              <Target className="h-4 w-4 text-primary-glow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Basketball, Soccer, Football
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-primary transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#1,847</div>
              <p className="text-xs text-muted-foreground">
                Top 5% of fans
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
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
                  
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Star className="h-6 w-6" />
                    <span>Share Activity</span>
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
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Uploaded Lakers vs Warriors ticket</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <Badge variant="default">+100 PoF</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Completed daily check-in</p>
                        <p className="text-sm text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <Badge variant="secondary">+10 PoF</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-glow rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Joined NBA Playoffs Challenge</p>
                        <p className="text-sm text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                    <Badge className="bg-primary-glow text-white">+250 PoF</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet Card */}
            <WalletCard />
            
            {/* Sports Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Your Sports Profile</CardTitle>
                <CardDescription>
                  Build your identity across sports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Basketball</span>
                    <Badge variant="default">Level 4</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Soccer</span>
                    <Badge variant="secondary">Level 2</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full w-1/2"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Football</span>
                    <Badge className="bg-primary-glow text-white">Level 1</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary-glow h-2 rounded-full w-1/4"></div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Add New Sport
                </Button>
              </CardContent>
            </Card>

            {/* Leaderboard Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
                <CardDescription>
                  See how you rank among fans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs text-white font-bold">1</span>
                      <span className="text-sm">SuperFan2024</span>
                    </div>
                    <span className="text-sm font-medium">5,240 PoF</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-xs text-white font-bold">2</span>
                      <span className="text-sm">HoopsLegend</span>
                    </div>
                    <span className="text-sm font-medium">4,890 PoF</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center text-xs text-white font-bold">3</span>
                      <span className="text-sm">SoccerKing</span>
                    </div>
                    <span className="text-sm font-medium">3,750 PoF</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between bg-accent/50 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-white font-bold">1847</span>
                        <span className="text-sm font-medium">You</span>
                      </div>
                      <span className="text-sm font-medium text-primary">1,250 PoF</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View Full Leaderboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}