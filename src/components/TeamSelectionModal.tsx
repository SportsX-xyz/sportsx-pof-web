import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTeamPreferences } from "@/hooks/useTeamPreferences";
import { TagSelector } from "@/components/TagSelector";
import { Target, Trophy, Users, ArrowRight, CheckCircle, X } from "lucide-react";
import "./TeamSelectionModal.css";

interface TeamSelectionModalProps {
  isOpen: boolean;
  onComplete: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
}

interface SelectedTeam {
  sportId: string;
  sportName: string;
  leagueId: string;
  leagueName: string;
  clubId: string;
  clubName: string;
}

export function TeamSelectionModal({ isOpen, onComplete, onClose, showCloseButton = false }: TeamSelectionModalProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<SelectedTeam[]>([]);
  const { preferences } = useTeamPreferences();

  const handleComplete = async () => {
    setIsCompleting(true);
    // Simulate a brief delay for better UX
    setTimeout(() => {
      setIsCompleting(false);
      onComplete();
    }, 500);
  };

  const handleTeamsSelected = (teams: SelectedTeam[]) => {
    setSelectedTeams(teams);
  };

  const canComplete = selectedTeams.length > 0;

  if (!isOpen) return null;

  return (
    <div className="team-selection-modal-overlay">
      <div className="team-selection-modal-container">
        <div className="team-selection-modal-content">
        {/* Header */}
        <div className="team-selection-header">
          <div className="flex items-center justify-between">
            <h1 className="team-selection-title">
              Choose Your Teams 🏆
            </h1>
            {showCloseButton && onClose && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="team-selection-subtitle">
            Select teams from different sports. You can choose one team per sport to personalize your experience.
          </p>
        </div>

        {/* Selected Teams Summary */}
        {selectedTeams.length > 0 && (
          <div className="team-selection-progress">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-center">Selected Teams ({selectedTeams.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedTeams.map((team) => (
                      <div key={team.sportId} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm truncate">{team.clubName}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {team.sportName} • {team.leagueName}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Team Selection */}
        <div className="team-selection-main">
          <TagSelector onTeamsSelected={handleTeamsSelected} />
        </div>

          {/* Benefits Card */}
          <div className="team-selection-benefits">
            <Card>
              <CardHeader>
                <CardTitle>Why Choose Teams?</CardTitle>
                <CardDescription>
                  Personalize your SportsX experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Personalized Content</p>
                      <p className="text-xs text-muted-foreground">
                        Get updates and content tailored to your favorite teams
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Enhanced PoF Points</p>
                      <p className="text-xs text-muted-foreground">
                        Earn more points for activities related to your teams
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-glow rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Community Access</p>
                      <p className="text-xs text-muted-foreground">
                        Join fan communities and exclusive team discussions
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        {/* Action Buttons */}
        <div className="team-selection-actions">
          <Button 
            onClick={handleComplete}
            disabled={!canComplete || isCompleting}
            variant="hero"
            size="lg"
            className="w-full"
          >
            {isCompleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Setting up your profile...
              </>
            ) : (
              <>
                <Users className="h-4 w-4 mr-2" />
                Continue to Dashboard
              </>
            )}
          </Button>
          
          {!canComplete && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              Please select at least one team to continue
            </p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}