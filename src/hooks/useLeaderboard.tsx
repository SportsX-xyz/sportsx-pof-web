import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface LeaderboardEntry {
  user_id: string;
  display_name?: string; // For public leaderboard
  email?: string; // Only for admin access
  first_name?: string | null; // Only for admin access
  last_name?: string | null; // Only for admin access
  country: string | null;
  total_points: number;
  checkin_streak: number;
  sport_name: string | null;
  league_name: string | null;
  club_name: string | null;
  badge_count: number;
  last_activity: string | null;
}

interface Badge {
  id: string;
  user_id: string;
  badge_type: string;
  earned_at: string;
  sport_id: string | null;
  league_id: string | null;
  club_id: string | null;
  metadata: any;
}

export function useLeaderboard() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userBadges, setUserBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filters, setFilters] = useState({
    sport: '',
    league: '',
    club: '',
    limit: 100,
  });

  useEffect(() => {
    checkAdminStatus();
    fetchLeaderboard();
    if (user) {
      fetchUserBadges();
    }
  }, [filters, user]);

  const checkAdminStatus = async () => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    
    // Mock admin status - set to false for demo
    setIsAdmin(false);
  };

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      
      // Mock leaderboard data
      const mockLeaderboard: LeaderboardEntry[] = [
        {
          user_id: 'user-1',
          display_name: 'SportsFan123',
          email: 'fan1@example.com',
          first_name: 'John',
          last_name: 'Doe',
          country: 'United States',
          total_points: 2500,
          checkin_streak: 15,
          sport_name: 'Football',
          league_name: 'NFL',
          club_name: 'Patriots',
          badge_count: 5,
          last_activity: new Date().toISOString(),
        },
        {
          user_id: 'user-2',
          display_name: 'BasketballKing',
          email: 'fan2@example.com',
          first_name: 'Jane',
          last_name: 'Smith',
          country: 'Canada',
          total_points: 1800,
          checkin_streak: 8,
          sport_name: 'Basketball',
          league_name: 'NBA',
          club_name: 'Lakers',
          badge_count: 3,
          last_activity: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          user_id: 'demo-user-id',
          display_name: 'Demo User',
          email: 'demo@sportsx.com',
          first_name: 'Demo',
          last_name: 'User',
          country: 'United States',
          total_points: 110,
          checkin_streak: 3,
          sport_name: 'Soccer',
          league_name: 'Premier League',
          club_name: 'Arsenal',
          badge_count: 1,
          last_activity: new Date().toISOString(),
        },
      ];

      setLeaderboard(mockLeaderboard);
    } catch (error) {
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBadges = async () => {
    if (!user) return;

    try {
      // Mock user badges
      const mockBadges: Badge[] = [
        {
          id: 'badge-1',
          user_id: user.id,
          badge_type: 'daily_devotee',
          earned_at: new Date().toISOString(),
          sport_id: null,
          league_id: null,
          club_id: null,
          metadata: { total_checkins: 30 },
        },
      ];

      setUserBadges(mockBadges);
    } catch (error) {
    }
  };

  const calculateBadges = async () => {
    try {
      // Mock badge calculation
      const mockResult = {
        success: true,
        message: 'Badges calculated successfully',
        totalUsers: 100,
        badgesAwarded: 25
      };
      
      // Refresh data after calculation
      await fetchLeaderboard();
      await fetchUserBadges();
      
      return mockResult;
    } catch (error) {
      throw error;
    }
  };

  const getUserRank = () => {
    if (!user) return null;
    const userIndex = leaderboard.findIndex(entry => entry.user_id === user.id);
    return userIndex >= 0 ? userIndex + 1 : null;
  };

  const setFilter = (key: keyof typeof filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return {
    leaderboard,
    userBadges,
    loading,
    filters,
    getUserRank,
    setFilter,
    calculateBadges,
    refetch: fetchLeaderboard,
  };
}