import { useState, useEffect, startTransition } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from './use-toast';

interface FanPoints {
  id: string;
  action_type: string;
  points: number;
  metadata: any;
  created_at: string;
}

interface CheckinStatus {
  canCheckin: boolean;
  totalPoints: number;
  lastCheckin: string | null;
  streak: number;
}

export function useFanPoints() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [points, setPoints] = useState<FanPoints[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [checkinStatus, setCheckinStatus] = useState<CheckinStatus>({
    canCheckin: true,
    totalPoints: 0,
    lastCheckin: null,
    streak: 0,
  });
  const [loading, setLoading] = useState(true);
  const [checkinLoading, setCheckinLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserPoints();
      fetchCheckinStatus();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserPoints = async () => {
    if (!user) return;

    try {
      // Mock points data with realistic demo data
      const mockPoints: FanPoints[] = [
        {
          id: '1',
          action_type: 'daily_checkin',
          points: 30,
          metadata: { date: '2024-01-15', teams: ['Basketball', 'Football', 'Baseball'] },
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        },
        {
          id: '2',
          action_type: 'daily_checkin',
          points: 30,
          metadata: { date: '2024-01-14', teams: ['Basketball', 'Football', 'Baseball'] },
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        },
        {
          id: '3',
          action_type: 'daily_checkin',
          points: 30,
          metadata: { date: '2024-01-13', teams: ['Basketball', 'Football', 'Baseball'] },
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        },
        {
          id: '4',
          action_type: 'ticket_upload',
          points: 150,
          metadata: { ticket_id: 'ticket-lakers-vs-warriors', event: 'Lakers vs Warriors', date: '2024-01-10' },
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '5',
          action_type: 'ticket_upload',
          points: 200,
          metadata: { ticket_id: 'ticket-chiefs-vs-bills', event: 'Chiefs vs Bills Playoff', date: '2024-01-08' },
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '6',
          action_type: 'prediction_correct',
          points: 50,
          metadata: { prediction: 'Lakers win', outcome: 'correct', date: '2024-01-12' },
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '7',
          action_type: 'prediction_correct',
          points: 75,
          metadata: { prediction: 'Chiefs win by 7+', outcome: 'correct', date: '2024-01-08' },
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '8',
          action_type: 'social_engagement',
          points: 25,
          metadata: { action: 'shared_prediction', platform: 'twitter', date: '2024-01-11' },
          created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '9',
          action_type: 'community_participation',
          points: 40,
          metadata: { action: 'joined_fan_group', group: 'Lakers Nation', date: '2024-01-09' },
          created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '10',
          action_type: 'achievement_unlock',
          points: 100,
          metadata: { achievement: 'First Week Streak', description: 'Checked in for 7 consecutive days' },
          created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];

      setPoints(mockPoints);
      const total = mockPoints.reduce((sum, point) => sum + point.points, 0);
      setTotalPoints(total);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to fetch points data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCheckinStatus = async () => {
    if (!user) return;

    try {
      // Mock checkin status with realistic demo data
      const mockCheckinStatus: CheckinStatus = {
        canCheckin: true,
        totalPoints: 750, // Total from all the demo points
        lastCheckin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        streak: 3, // 3-day streak from daily checkins
      };

      setCheckinStatus(mockCheckinStatus);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to fetch check-in status",
        variant: "destructive",
      });
    }
  };

  const performDailyCheckin = async (teamType?: string) => {
    if (!user || !checkinStatus.canCheckin) return;

    setCheckinLoading(true);
    try {
      // Simulate backend API call with loading delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock daily checkin with team-specific success
      const mockResult = {
        success: true,
        points: 10,
        message: 'Checkin successful'
      };

      if (mockResult.success) {
        // Show team-specific success message
        const teamName = teamType ? 
          (teamType === 'basketball' ? 'Los Angeles Lakers' :
           teamType === 'american football' ? 'Kansas City Chiefs' :
           teamType === 'baseball' ? 'New York Yankees' : 'your team') :
          'your team';

        toast({
          title: "Check-in Successful! 🎉",
          description: `You earned ${mockResult.points} PoF points for ${teamName}!`,
        });

        // Update local state to show "already checked in" status
        setCheckinStatus(prev => ({
          ...prev,
          canCheckin: false,
          streak: prev.streak + 1,
          lastCheckin: new Date().toISOString()
        }));

        // Add points to local state
        setTotalPoints(prev => prev + mockResult.points);
        
        // Add new activity to points array for immediate feedback
        const newPoint: FanPoints = {
          id: Date.now().toString(),
          action_type: 'daily_checkin',
          points: mockResult.points,
          metadata: { 
            date: new Date().toISOString().split('T')[0], 
            team: teamName,
            teamType: teamType 
          },
          created_at: new Date().toISOString(),
        };
        
        setPoints(prev => [newPoint, ...prev]);
        
        // Simulate backend sync delay
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        toast({
          title: "Check-in Failed",
          description: mockResult.message || "Unable to complete check-in",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Daily check-in failed, please try again.",
        variant: "destructive",
      });
    } finally {
      setCheckinLoading(false);
    }
  };

  const addPoints = async (actionType: string, points: number, metadata: any = {}) => {
    if (!user) return;

    try {
      // Mock adding points
      const newPoint: FanPoints = {
        id: Date.now().toString(),
        action_type: actionType,
        points,
        metadata,
        created_at: new Date().toISOString(),
      };

      setPoints(prev => [newPoint, ...prev]);
      setTotalPoints(prev => prev + points);

      toast({
        title: "积分获得！🏆",
        description: `您因为 ${actionType.replace('_', ' ')} 获得了 ${points} PoF 积分！`,
      });
    } catch (error) {
      toast({
        title: "错误",
        description: "无法添加积分，请重试。",
        variant: "destructive",
      });
    }
  };

  return {
    points,
    totalPoints,
    checkinStatus,
    loading,
    checkinLoading,
    performDailyCheckin,
    addPoints,
    refetch: fetchUserPoints,
  };
}