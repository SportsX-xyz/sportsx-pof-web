import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Target, Users, Edit3, Save, X } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useTags } from "@/hooks/useTags";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { WalletCard } from "@/components/WalletCard";
import { TagSelector } from "@/components/TagSelector";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import { TeamSelectionModal } from "@/components/TeamSelectionModal";
import { useToast } from "@/hooks/use-toast";

export function FanProfile() {
  const { profile, updateProfile } = useProfile();
  const { userBadges } = useLeaderboard();
  const { getUserSport, getUserLeague, getUserClub } = useTags();
  const { toast } = useToast();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    country: profile?.country || ''
  });

  const userSport = getUserSport();
  const userLeague = getUserLeague();
  const userClub = getUserClub();

  const handleSaveProfile = async () => {
    try {
      await updateProfile(editedProfile);
      setIsEditingProfile(false);
      toast({
        title: "Profile Updated! ✅",
        description: "Your profile information has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditedProfile({
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      country: profile?.country || ''
    });
    setIsEditingProfile(false);
  };

  const handlePreferencesComplete = () => {
    setIsEditingPreferences(false);
    toast({
      title: "Preferences Updated! 🏆",
      description: "Your team preferences have been updated successfully.",
    });
  };

  const handlePreferencesClose = () => {
    setIsEditingPreferences(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Row: Fan Profile and Wallet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fan Profile Card */}
        <Card className="hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-left-5 fade-in-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2 group">
                <Users className="h-5 w-5 group-hover:animate-bounce transition-all duration-300" />
                <span className="group-hover:text-primary transition-colors duration-300">Fan Profile</span>
              </div>
              {!isEditingProfile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingProfile(true)}
                  className="hover:scale-105 hover:shadow-lg transition-all duration-300 group"
                >
                  <Edit3 className="h-4 w-4 mr-1 group-hover:animate-bounce transition-all duration-300" />
                  Edit
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{profile?.email}</div>
            </div>
            
            {profile?.phone && (
              <div className="flex flex-col space-y-2">
                <div className="text-sm text-muted-foreground">Phone</div>
                <div className="font-medium">{profile.phone}</div>
              </div>
            )}
            
            {isEditingProfile ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={editedProfile.first_name}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, first_name: e.target.value }))}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={editedProfile.last_name}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, last_name: e.target.value }))}
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={editedProfile.country}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="Enter your country"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSaveProfile} 
                    size="sm"
                    className="hover:scale-105 hover:shadow-lg transition-all duration-300 group animate-in slide-in-from-bottom-2 fade-in-0"
                  >
                    <Save className="h-4 w-4 mr-1 group-hover:animate-bounce transition-all duration-300" />
                    Save
                  </Button>
                  <Button 
                    onClick={handleCancelEdit} 
                    variant="outline" 
                    size="sm"
                    className="hover:scale-105 hover:shadow-lg transition-all duration-300 group animate-in slide-in-from-bottom-2 fade-in-0 delay-100"
                  >
                    <X className="h-4 w-4 mr-1 group-hover:animate-bounce transition-all duration-300" />
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </CardContent>
        </Card>

        {/* Wallet Card */}
        <WalletCard />
      </div>

      {/* Fandom Preferences Card */}
      <Card className="hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-right-5 fade-in-0 delay-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2 group">
              <Target className="h-5 w-5 group-hover:animate-bounce transition-all duration-300" />
              <span className="group-hover:text-primary transition-colors duration-300">Fandom Preferences</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingPreferences(true)}
              className="hover:scale-105 hover:shadow-lg transition-all duration-300 group"
            >
              <Edit3 className="h-4 w-4 mr-1 group-hover:animate-bounce transition-all duration-300" />
              Edit Teams
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {/* Demo data for multiple sports */}
            <Badge variant="secondary" className="text-sm">
              🏀 Basketball
            </Badge>
            <Badge variant="secondary" className="text-sm">
              🏆 NBA
            </Badge>
            <Badge variant="secondary" className="text-sm">
              ⚽ Los Angeles Lakers
            </Badge>
            <Badge variant="secondary" className="text-sm">
              🏈 American Football
            </Badge>
            <Badge variant="secondary" className="text-sm">
              🏆 NFL
            </Badge>
            <Badge variant="secondary" className="text-sm">
              ⚽ Kansas City Chiefs
            </Badge>
            <Badge variant="secondary" className="text-sm">
              ⚾ Baseball
            </Badge>
            <Badge variant="secondary" className="text-sm">
              🏆 MLB
            </Badge>
            <Badge variant="secondary" className="text-sm">
              ⚽ New York Yankees
            </Badge>
            
            {/* Keep original logic as fallback */}
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

      {/* Team Selection Modal */}
      <TeamSelectionModal 
        isOpen={isEditingPreferences}
        onComplete={handlePreferencesComplete}
        onClose={handlePreferencesClose}
        showCloseButton={true}
      />
    </div>
  );
}