// Privy configuration and utilities
import { PrivyProvider } from '@privy-io/react-auth';

export const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID;

if (!PRIVY_APP_ID) {
  throw new Error('VITE_PRIVY_APP_ID environment variable is required. Please check your .env file.');
}

export const privyConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets' as const,
    requireUserPasswordOnCreate: false,
  },
  loginMethods: ['email', 'sms'],
  appearance: {
    theme: 'dark' as const,
    accentColor: '#1d4ed8',
  },
};

// Mock Privy wallet creation for development
export const createPrivyWallet = async (userId: string): Promise<string> => {
  // In a real implementation, this would call the Privy API
  // For now, we'll generate a mock wallet address
  const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
  
  // Store the wallet mapping
  return mockAddress;
};

export const getWalletAddress = async (userId: string): Promise<string | null> => {
  // In a real implementation, this would fetch from Privy API
  // For development, we'll return a mock address if the user has one
  return localStorage.getItem(`wallet_${userId}`);
};