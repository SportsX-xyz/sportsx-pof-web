import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  country: string | null;
  wallet_address: string | null;
  wallet_provider: string | null;
  created_at: string;
  updated_at: string;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      
      // Mock profile data
      const mockProfile: Profile = {
        id: 'demo-profile-id',
        user_id: user.id,
        email: user.email,
        first_name: user.user_metadata?.first_name || 'Demo',
        last_name: user.user_metadata?.last_name || 'User',
        country: user.user_metadata?.country || 'United States',
        wallet_address: '0x1234567890123456789012345678901234567890',
        wallet_provider: 'privy',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setProfile(mockProfile);
    } catch (err) {
      setError('Failed to load profile');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async () => {
    if (!user) return null;

    try {
      const mockProfile: Profile = {
        id: 'demo-profile-id',
        user_id: user.id,
        email: user.email || '',
        first_name: user.user_metadata?.first_name || null,
        last_name: user.user_metadata?.last_name || null,
        country: user.user_metadata?.country || null,
        wallet_address: null,
        wallet_provider: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setProfile(mockProfile);
      return mockProfile;
    } catch (err) {
      setError('Failed to create profile');
      return null;
    }
  };

  const createWallet = async () => {
    if (!user || !profile) return null;

    try {
      // Mock wallet creation
      const walletAddress = '0x' + Math.random().toString(16).substr(2, 40);
      
      // Store in localStorage for development
      localStorage.setItem(`wallet_${user.id}`, walletAddress);

      // Update profile with mock wallet
      const updatedProfile = {
        ...profile,
        wallet_address: walletAddress,
        wallet_provider: 'privy',
        updated_at: new Date().toISOString(),
      };

      setProfile(updatedProfile);
      return walletAddress;
    } catch (err) {
      setError('Failed to create wallet');
      return null;
    }
  };

  return {
    profile,
    loading,
    error,
    createWallet,
    createProfile,
    refetch: fetchProfile,
  };
}