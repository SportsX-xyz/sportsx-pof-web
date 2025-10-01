import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTags } from './useTags';

export function useTeamPreferences() {
  const { user } = useAuth();
  const { getUserSport, getUserLeague, getUserClub, loading: tagsLoading } = useTags();
  const [hasPreferences, setHasPreferences] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && !tagsLoading) {
      checkPreferences();
    } else if (!user) {
      setHasPreferences(null);
      setLoading(false);
    }
  }, [user, tagsLoading]);

  const checkPreferences = () => {
    if (!user) {
      setHasPreferences(null);
      setLoading(false);
      return;
    }

    const userSport = getUserSport();
    const userLeague = getUserLeague();
    const userClub = getUserClub();

    // For demo purposes, always return true to prevent team selection modal from auto-opening
    // In production, this would check: const hasTeamPreferences = !!userSport;
    const hasTeamPreferences = true; // Demo mode - user has preferences
    
    setHasPreferences(hasTeamPreferences);
    setLoading(false);
  };

  const getPreferencesSummary = () => {
    if (!user) return null;

    const userSport = getUserSport();
    const userLeague = getUserLeague();
    const userClub = getUserClub();

    return {
      sport: userSport,
      league: userLeague,
      club: userClub,
      hasCompletePreferences: !!(userSport && userLeague && userClub),
    };
  };

  return {
    hasPreferences,
    loading,
    preferences: getPreferencesSummary(),
    refetch: checkPreferences,
  };
}