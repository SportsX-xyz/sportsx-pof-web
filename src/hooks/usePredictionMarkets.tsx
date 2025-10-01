import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface PredictionMarket {
  id: string;
  title: string;
  description: string | null;
  sport_id: string | null;
  league_id: string | null;
  club_id: string | null;
  contract_address: string;
  chain_id: number;
  outcome_a: string;
  outcome_b: string;
  starts_at: string;
  ends_at: string;
  resolved_at: string | null;
  winning_outcome: number | null;
  status: 'active' | 'resolved' | 'cancelled';
  metadata: any;
  created_at: string;
  updated_at: string;
}

interface UserPrediction {
  id: string;
  user_id: string;
  market_id: string;
  outcome: number;
  amount: number;
  tx_hash: string;
  block_number: number | null;
  points_awarded: number;
  is_winning_prediction: boolean | null;
  created_at: string;
  updated_at: string;
  market?: PredictionMarket;
}

export function usePredictionMarkets() {
  const { user } = useAuth();
  const [markets, setMarkets] = useState<PredictionMarket[]>([]);
  const [userPredictions, setUserPredictions] = useState<UserPrediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarkets();
    if (user) {
      fetchUserPredictions();
    }
  }, [user]);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      
      // Mock prediction markets data
      const mockMarkets: PredictionMarket[] = [
        {
          id: 'market-1',
          title: 'Super Bowl Winner 2024',
          description: 'Who will win the Super Bowl?',
          sport_id: 'football',
          league_id: 'nfl',
          club_id: null,
          contract_address: '0x1234567890123456789012345678901234567890',
          chain_id: 8453,
          outcome_a: 'Chiefs',
          outcome_b: '49ers',
          starts_at: new Date().toISOString(),
          ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          resolved_at: null,
          winning_outcome: null,
          status: 'active',
          metadata: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      setMarkets(mockMarkets);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPredictions = async () => {
    if (!user) return;

    try {
      // Mock user predictions
      const mockPredictions: UserPrediction[] = [
        {
          id: 'prediction-1',
          user_id: user.id,
          market_id: 'market-1',
          outcome: 0,
          amount: 0.1,
          tx_hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
          block_number: 12345678,
          points_awarded: 50,
          is_winning_prediction: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      setUserPredictions(mockPredictions);
    } catch (error) {
    }
  };

  const recordPrediction = async (
    marketId: string,
    outcome: number,
    amount: string,
    txHash: string,
    blockNumber?: number
  ) => {
    if (!user) return;

    try {
      // Mock prediction recording
      const newPrediction: UserPrediction = {
        id: Date.now().toString(),
        user_id: user.id,
        market_id: marketId,
        outcome,
        amount: parseFloat(amount),
        tx_hash: txHash,
        block_number: blockNumber,
        points_awarded: 50,
        is_winning_prediction: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setUserPredictions(prev => [newPrediction, ...prev]);

      // Refresh data
      await fetchUserPredictions();
    } catch (error) {
      throw error;
    }
  };

  const getMarketsByTag = (sportId?: string, leagueId?: string, clubId?: string) => {
    return markets.filter(market => {
      if (sportId && market.sport_id !== sportId) return false;
      if (leagueId && market.league_id !== leagueId) return false;
      if (clubId && market.club_id !== clubId) return false;
      return true;
    });
  };

  const getUserPredictionForMarket = (marketId: string) => {
    return userPredictions.find(p => p.market_id === marketId);
  };

  return {
    markets,
    userPredictions,
    loading,
    recordPrediction,
    getMarketsByTag,
    getUserPredictionForMarket,
    refetch: fetchMarkets,
  };
}