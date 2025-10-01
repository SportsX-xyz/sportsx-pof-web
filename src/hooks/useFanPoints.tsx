import { useState, useEffect } from 'react';
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
      // Mock points data
      const mockPoints: FanPoints[] = [
        {
          id: '1',
          action_type: 'daily_checkin',
          points: 10,
          metadata: { date: '2024-01-01' },
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          action_type: 'ticket_upload',
          points: 100,
          metadata: { ticket_id: 'ticket-1' },
          created_at: new Date().toISOString(),
        },
      ];

      setPoints(mockPoints);
      const total = mockPoints.reduce((sum, point) => sum + point.points, 0);
      setTotalPoints(total);
    } catch (error) {
      toast({
        title: "错误",
        description: "无法获取积分数据",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCheckinStatus = async () => {
    if (!user) return;

    try {
      // Mock checkin status
      const mockCheckinStatus: CheckinStatus = {
        canCheckin: true,
        totalPoints: 110,
        lastCheckin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        streak: 3,
      };

      setCheckinStatus(mockCheckinStatus);
    } catch (error) {
      toast({
        title: "错误",
        description: "无法获取签到状态",
        variant: "destructive",
      });
    }
  };

  const performDailyCheckin = async () => {
    if (!user || !checkinStatus.canCheckin) return;

    setCheckinLoading(true);
    try {
      // Mock daily checkin
      const mockResult = {
        success: true,
        points: 10,
        message: 'Checkin successful'
      };

      if (mockResult.success) {
        toast({
          title: "每日签到完成！🎉",
          description: `您获得了 ${mockResult.points} PoF 积分！`,
        });

        // Refresh data
        await fetchUserPoints();
        await fetchCheckinStatus();
      } else {
        toast({
          title: "签到失败",
          description: mockResult.message || "无法完成签到",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "错误",
        description: "每日签到失败，请重试。",
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