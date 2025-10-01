import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  phone?: string;
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
      
      // Mock profile data with realistic demo data
      const mockProfile: Profile = {
        id: 'demo-profile-id',
        user_id: user.id,
        email: user.email,
        phone: user.phone,
        first_name: user.user_metadata?.first_name || 'Alex',
        last_name: user.user_metadata?.last_name || 'Johnson',
        country: user.user_metadata?.country || 'United States',
        wallet_address: 'So1234567890123456789012345678901234567890',
        wallet_provider: 'solana',
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
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
        phone: user.phone,
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
      // Mock Solana wallet creation
      const walletAddress = 'So' + Math.random().toString(36).substr(2, 40);
      
      // Store in localStorage for development
      localStorage.setItem(`solana_wallet_${user.id}`, walletAddress);

      // Update profile with mock Solana wallet
      const updatedProfile = {
        ...profile,
        wallet_address: walletAddress,
        wallet_provider: 'solana',
        updated_at: new Date().toISOString(),
      };

      setProfile(updatedProfile);
      return walletAddress;
    } catch (err) {
      setError('Failed to create Solana wallet');
      return null;
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) return;

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedProfile = {
        ...profile,
        ...updates,
        updated_at: new Date().toISOString(),
      };

      setProfile(updatedProfile);
    } catch (err) {
      setError('Failed to update profile');
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    createWallet,
    createProfile,
    updateProfile,
    refetch: fetchProfile,
  };
}