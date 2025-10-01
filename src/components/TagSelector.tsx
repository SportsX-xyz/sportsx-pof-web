import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTags } from "@/hooks/useTags";
import { Tag, X, Plus, CheckCircle } from "lucide-react";

interface SelectedTeam {
  sportId: string;
  sportName: string;
  leagueId: string;
  leagueName: string;
  clubId: string;
  clubName: string;
}

interface TagSelectorProps {
  onTeamsSelected?: (teams: SelectedTeam[]) => void;
}

export function TagSelector({ onTeamsSelected }: TagSelectorProps) {
  const {
    allTags,
    userTags,
    loading,
    addUserTag,
    removeUserTag,
    getSportsByType,
  } = useTags();

  const [selectedTeams, setSelectedTeams] = useState<SelectedTeam[]>([]);
  const [currentSelection, setCurrentSelection] = useState<{
    sport: string;
    league: string;
    club: string;
  }>({
    sport: '',
    league: '',
    club: ''
  });

  const sports = getSportsByType('sport');
  const leagues = currentSelection.sport ? getSportsByType('league', currentSelection.sport) : [];
  const clubs = currentSelection.league ? getSportsByType('club', currentSelection.league) : [];

  // Load existing user teams on mount
  useEffect(() => {
    if (!loading && userTags.length > 0) {
      const userTeams: SelectedTeam[] = [];
      const sportTags = userTags.filter(tag => tag.tag.type === 'sport');
      
      for (const sportTag of sportTags) {
        const leagueTag = userTags.find(tag => 
          tag.tag.type === 'league' && tag.tag.parent_id === sportTag.tag_id
        );
        const clubTag = userTags.find(tag => 
          tag.tag.type === 'club' && leagueTag && tag.tag.parent_id === leagueTag.tag_id
        );
        
        if (leagueTag && clubTag) {
          userTeams.push({
            sportId: sportTag.tag_id,
            sportName: sportTag.tag.name,
            leagueId: leagueTag.tag_id,
            leagueName: leagueTag.tag.name,
            clubId: clubTag.tag_id,
            clubName: clubTag.tag.name
          });
        }
      }
      
      setSelectedTeams(userTeams);
    }
  }, [loading, userTags]);

  // Notify parent component when teams are selected
  useEffect(() => {
    if (onTeamsSelected) {
      onTeamsSelected(selectedTeams);
    }
  }, [selectedTeams, onTeamsSelected]);

  const handleSportSelect = (sportId: string) => {
    setCurrentSelection({
      sport: sportId,
      league: '',
      club: ''
    });
  };

  const handleLeagueSelect = (leagueId: string) => {
    setCurrentSelection(prev => ({
      ...prev,
      league: leagueId,
      club: ''
    }));
  };

  const handleClubSelect = (clubId: string) => {
    setCurrentSelection(prev => ({
      ...prev,
      club: clubId
    }));
  };

  const handleAddTeam = async () => {
    if (!currentSelection.sport || !currentSelection.league || !currentSelection.club) {
      return;
    }

    const sport = sports.find(s => s.id === currentSelection.sport);
    const league = leagues.find(l => l.id === currentSelection.league);
    const club = clubs.find(c => c.id === currentSelection.club);

    if (!sport || !league || !club) return;

    // Check if this sport is already selected
    const existingTeamIndex = selectedTeams.findIndex(team => team.sportId === currentSelection.sport);
    
    const newTeam: SelectedTeam = {
      sportId: sport.id,
      sportName: sport.name,
      leagueId: league.id,
      leagueName: league.name,
      clubId: club.id,
      clubName: club.name
    };

    try {
      // Save the tags to the backend
      await addUserTag(sport.id);
      await addUserTag(league.id);
      await addUserTag(club.id);

      if (existingTeamIndex >= 0) {
        // Replace existing team for this sport
        setSelectedTeams(prev => prev.map((team, index) => 
          index === existingTeamIndex ? newTeam : team
        ));
      } else {
        // Add new team
        setSelectedTeams(prev => [...prev, newTeam]);
      }

      // Reset current selection
      setCurrentSelection({
        sport: '',
        league: '',
        club: ''
      });
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  const handleRemoveTeam = async (sportId: string) => {
    const teamToRemove = selectedTeams.find(team => team.sportId === sportId);
    if (!teamToRemove) return;

    try {
      // Remove the tags from the backend
      await removeUserTag(teamToRemove.sportId);
      await removeUserTag(teamToRemove.leagueId);
      await removeUserTag(teamToRemove.clubId);

      // Remove from local state
      setSelectedTeams(prev => prev.filter(team => team.sportId !== sportId));
    } catch (error) {
      console.error('Error removing team:', error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Team Selection
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
          Team Selection
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Select teams from different sports. You can choose one team per sport.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selected Teams */}
        {selectedTeams.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Selected Teams:</h3>
            <div className="space-y-2">
              {selectedTeams.map((team) => (
                <div key={team.sportId} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium">{team.clubName}</span>
                    <span className="text-sm text-muted-foreground">
                      ({team.sportName} - {team.leagueName})
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveTeam(team.sportId)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Team Section */}
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
          <h3 className="text-sm font-medium">Add a Team:</h3>
          
          {/* Sport Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Choose Sport:</label>
            <Select
              value={currentSelection.sport}
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
          {currentSelection.sport && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Choose League:</label>
              <Select
                value={currentSelection.league}
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
          {currentSelection.league && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Choose Club:</label>
              <Select
                value={currentSelection.club}
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

          {/* Add Button */}
          {currentSelection.sport && currentSelection.league && currentSelection.club && (
            <Button
              onClick={handleAddTeam}
              className="w-full"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Team
            </Button>
          )}
        </div>

        {/* Debug info */}
        <div className="text-xs text-muted-foreground">
          Teams selected: {selectedTeams.length} | Sports loaded: {sports.length}
        </div>
      </CardContent>
    </Card>
  );
}