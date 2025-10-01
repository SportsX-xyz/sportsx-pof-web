import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, X, Loader2 } from "lucide-react";
import { useTags } from "@/hooks/useTags";
import "./ClubSelectionModal.css";

interface Club {
  id: string;
  name: string;
  logo: string;
  sport: string;
}

interface SelectedClub {
  clubId: string;
  clubName: string;
  sport: string;
}

interface ClubSelectionModalProps {
  isOpen: boolean;
  onComplete: (selectedClubs: SelectedClub[]) => void;
  onCancel: () => void;
}

// Mock club data organized by sports
const CLUBS_BY_SPORT = {
  basketball: [
    { id: 'lakers', name: 'LA Lakers', logo: '🏀', sport: 'basketball' },
    { id: 'warriors', name: 'Golden State Warriors', logo: '🏀', sport: 'basketball' },
    { id: 'celtics', name: 'Boston Celtics', logo: '🏀', sport: 'basketball' },
    { id: 'bulls', name: 'Chicago Bulls', logo: '🏀', sport: 'basketball' },
    { id: 'heat', name: 'Miami Heat', logo: '🏀', sport: 'basketball' },
    { id: 'nets', name: 'Brooklyn Nets', logo: '🏀', sport: 'basketball' },
  ],
  football: [
    { id: 'barcelona', name: 'Barcelona', logo: '⚽', sport: 'football' },
    { id: 'manchester-united', name: 'Manchester United', logo: '⚽', sport: 'football' },
    { id: 'real-madrid', name: 'Real Madrid', logo: '⚽', sport: 'football' },
    { id: 'liverpool', name: 'Liverpool', logo: '⚽', sport: 'football' },
    { id: 'psg', name: 'Paris Saint-Germain', logo: '⚽', sport: 'football' },
    { id: 'bayern', name: 'Bayern Munich', logo: '⚽', sport: 'football' },
  ],
  'american-football': [
    { id: 'patriots', name: 'New England Patriots', logo: '🏈', sport: 'american-football' },
    { id: 'chiefs', name: 'Kansas City Chiefs', logo: '🏈', sport: 'american-football' },
    { id: 'packers', name: 'Green Bay Packers', logo: '🏈', sport: 'american-football' },
    { id: 'cowboys', name: 'Dallas Cowboys', logo: '🏈', sport: 'american-football' },
    { id: 'steelers', name: 'Pittsburgh Steelers', logo: '🏈', sport: 'american-football' },
    { id: 'bills', name: 'Buffalo Bills', logo: '🏈', sport: 'american-football' },
  ],
  baseball: [
    { id: 'yankees', name: 'New York Yankees', logo: '⚾', sport: 'baseball' },
    { id: 'dodgers', name: 'Los Angeles Dodgers', logo: '⚾', sport: 'baseball' },
    { id: 'red-sox', name: 'Boston Red Sox', logo: '⚾', sport: 'baseball' },
    { id: 'giants', name: 'San Francisco Giants', logo: '⚾', sport: 'baseball' },
    { id: 'cardinals', name: 'St. Louis Cardinals', logo: '⚾', sport: 'baseball' },
    { id: 'cubs', name: 'Chicago Cubs', logo: '⚾', sport: 'baseball' },
  ],
  hockey: [
    { id: 'bruins', name: 'Boston Bruins', logo: '🏒', sport: 'hockey' },
    { id: 'rangers', name: 'New York Rangers', logo: '🏒', sport: 'hockey' },
    { id: 'maple-leafs', name: 'Toronto Maple Leafs', logo: '🏒', sport: 'hockey' },
    { id: 'canadiens', name: 'Montreal Canadiens', logo: '🏒', sport: 'hockey' },
    { id: 'blackhawks', name: 'Chicago Blackhawks', logo: '🏒', sport: 'hockey' },
    { id: 'red-wings', name: 'Detroit Red Wings', logo: '🏒', sport: 'hockey' },
  ],
};

const SPORT_DISPLAY_NAMES = {
  basketball: 'Basketball',
  football: 'Football',
  'american-football': 'American Football',
  baseball: 'Baseball',
  hockey: 'Hockey',
};

const SPORT_EMOJIS = {
  basketball: '🏀',
  football: '⚽',
  'american-football': '🏈',
  baseball: '⚾',
  hockey: '🏒',
};

export function ClubSelectionModal({ isOpen, onComplete, onCancel }: ClubSelectionModalProps) {
  const [selectedClubs, setSelectedClubs] = useState<SelectedClub[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addUserTag, removeUserTag } = useTags();

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedClubs([]);
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleClubSelect = (club: Club) => {
    setError(null);
    
    // Remove any existing selection for this sport
    const filteredSelections = selectedClubs.filter(selected => selected.sport !== club.sport);
    
    // Add new selection
    const newSelection: SelectedClub = {
      clubId: club.id,
      clubName: club.name,
      sport: club.sport,
    };
    
    setSelectedClubs([...filteredSelections, newSelection]);
  };

  const handleClubDeselect = (clubId: string) => {
    setSelectedClubs(selectedClubs.filter(club => club.clubId !== clubId));
  };

  const isClubSelected = (clubId: string) => {
    return selectedClubs.some(club => club.clubId === clubId);
  };

  const handleConfirm = async () => {
    if (selectedClubs.length === 0) {
      setError("Please select at least one club");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save selections to the tags system
      for (const selectedClub of selectedClubs) {
        // Add club tag
        await addUserTag(selectedClub.clubId);
      }
      
      // Complete the selection
      onComplete(selectedClubs);
    } catch (err) {
      setError("Failed to save selections. Please try again.");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (selectedClubs.length > 0) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="club-selection-modal-overlay">
      <div className="club-selection-modal-container">
        {/* Header */}
        <div className="club-selection-header">
          <h1 className="club-selection-title">Select the Club You Support</h1>
          <p className="club-selection-subtitle">Only one club can be selected for each sport</p>
        </div>

        {/* Content Area */}
        <div className="club-selection-content">
          {Object.entries(CLUBS_BY_SPORT).map(([sportKey, clubs]) => (
            <div key={sportKey} className="sport-section">
              <div className="sport-header">
                <span className="sport-emoji">{SPORT_EMOJIS[sportKey as keyof typeof SPORT_EMOJIS]}</span>
                <span className="sport-name">{SPORT_DISPLAY_NAMES[sportKey as keyof typeof SPORT_DISPLAY_NAMES]}</span>
              </div>
              
              <div className="clubs-grid">
                {clubs.map((club) => (
                  <Card
                    key={club.id}
                    className={`club-card ${isClubSelected(club.id) ? 'selected' : ''}`}
                    onClick={() => handleClubSelect(club)}
                  >
                    <CardContent className="club-card-content">
                      <div className="club-logo">{club.logo}</div>
                      <div className="club-name">{club.name}</div>
                      {isClubSelected(club.id) && (
                        <div className="selection-indicator">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Clubs Summary */}
        {selectedClubs.length > 0 && (
          <div className="selected-clubs-summary">
            <h3 className="selected-clubs-title">Selected Clubs</h3>
            <div className="selected-clubs-list">
              {selectedClubs.map((club) => (
                <Badge
                  key={club.clubId}
                  variant="default"
                  className="selected-club-badge"
                >
                  {SPORT_EMOJIS[club.sport as keyof typeof SPORT_EMOJIS]} {club.clubName}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClubDeselect(club.clubId);
                    }}
                    className="remove-club-btn"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="club-selection-actions">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="action-buttons">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="cancel-btn"
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleConfirm}
              disabled={selectedClubs.length === 0 || isLoading}
              className="confirm-btn"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Confirm Selection'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}