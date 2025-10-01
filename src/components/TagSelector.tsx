import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTags } from "@/hooks/useTags";
import { Tag, X } from "lucide-react";

export function TagSelector() {
  const {
    allTags,
    userTags,
    loading,
    addUserTag,
    removeUserTag,
    getSportsByType,
    getUserSport,
    getUserLeague,
    getUserClub,
  } = useTags();

  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedLeague, setSelectedLeague] = useState<string>('');
  const [selectedClub, setSelectedClub] = useState<string>('');

  const sports = getSportsByType('sport');
  const leagues = selectedSport ? getSportsByType('league', selectedSport) : [];
  const clubs = selectedLeague ? getSportsByType('club', selectedLeague) : [];

  const userSport = getUserSport();
  const userLeague = getUserLeague();
  const userClub = getUserClub();

  const handleSportSelect = async (sportId: string) => {
    // Remove existing sport and its children
    if (userSport) await removeUserTag(userSport.id);
    if (userLeague) await removeUserTag(userLeague.id);
    if (userClub) await removeUserTag(userClub.id);
    
    // Add new sport
    await addUserTag(sportId);
    setSelectedSport(sportId);
    setSelectedLeague('');
    setSelectedClub('');
  };

  const handleLeagueSelect = async (leagueId: string) => {
    // Remove existing league and club
    if (userLeague) await removeUserTag(userLeague.id);
    if (userClub) await removeUserTag(userClub.id);
    
    // Add new league
    await addUserTag(leagueId);
    setSelectedLeague(leagueId);
    setSelectedClub('');
  };

  const handleClubSelect = async (clubId: string) => {
    // Remove existing club
    if (userClub) await removeUserTag(userClub.id);
    
    // Add new club
    await addUserTag(clubId);
    setSelectedClub(clubId);
  };

  const handleRemoveTag = async (tagId: string) => {
    await removeUserTag(tagId);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Fandom Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Fandom Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Tags */}
        {(userSport || userLeague || userClub) && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Current Preferences:</div>
            <div className="flex flex-wrap gap-2">
              {userSport && (
                <Badge variant="default" className="flex items-center gap-1">
                  🏃‍♂️ {userSport.name}
                  <button
                    onClick={() => handleRemoveTag(userSport.id)}
                    className="ml-1 hover:bg-primary-foreground rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {userLeague && (
                <Badge variant="default" className="flex items-center gap-1">
                  🏆 {userLeague.name}
                  <button
                    onClick={() => handleRemoveTag(userLeague.id)}
                    className="ml-1 hover:bg-primary-foreground rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {userClub && (
                <Badge variant="default" className="flex items-center gap-1">
                  ⚽ {userClub.name}
                  <button
                    onClick={() => handleRemoveTag(userClub.id)}
                    className="ml-1 hover:bg-primary-foreground rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Sport Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Choose Your Sport:</label>
          <Select
            value={selectedSport || userSport?.id || ''}
            onValueChange={handleSportSelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a sport..." />
            </SelectTrigger>
            <SelectContent>
              {sports.map((sport) => (
                <SelectItem key={sport.id} value={sport.id}>
                  🏃‍♂️ {sport.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* League Selection */}
        {(selectedSport || userSport) && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Choose Your League:</label>
            <Select
              value={selectedLeague || userLeague?.id || ''}
              onValueChange={handleLeagueSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a league..." />
              </SelectTrigger>
              <SelectContent>
                {leagues.map((league) => (
                  <SelectItem key={league.id} value={league.id}>
                    🏆 {league.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Club Selection */}
        {(selectedLeague || userLeague) && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Choose Your Club:</label>
            <Select
              value={selectedClub || userClub?.id || ''}
              onValueChange={handleClubSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a club..." />
              </SelectTrigger>
              <SelectContent>
                {clubs.map((club) => (
                  <SelectItem key={club.id} value={club.id}>
                    ⚽ {club.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
}