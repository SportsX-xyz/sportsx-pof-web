import React, { createContext, useContext, ReactNode } from 'react';
import { usePrivy } from '@privy-io/react-auth';

interface User {
  id: string;
  email: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
    country?: string;
  };
}

interface Session {
  access_token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { 
    ready, 
    authenticated, 
    user: privyUser, 
    login: privyLogin, 
    logout: privyLogout 
  } = usePrivy();

  const loading = !ready;

  // Convert Privy user to our User interface
  const user: User | null = privyUser ? {
    id: privyUser.id,
    email: privyUser.email?.address || '',
    user_metadata: {
      first_name: privyUser.google?.firstName || '',
      last_name: privyUser.google?.lastName || '',
      country: 'United States' // Default country
    }
  } : null;

  // Create a mock session for compatibility
  const session: Session | null = user ? {
    access_token: 'privy-token',
    user: user
  } : null;

  const login = async () => {
    await privyLogin();
  };

  const logout = async () => {
    await privyLogout();
  };

  return (
    <AuthContext.Provider value={{ 
      user: authenticated ? user : null, 
      session: authenticated ? session : null, 
      loading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};