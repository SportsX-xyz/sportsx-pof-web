import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Show modal after a brief delay when user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      const timer = setTimeout(() => {
        setShowLoginModal(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, user]);

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show login modal
  if (!user) {
    return (
      <>
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
        {/* Show a placeholder while modal is loading */}
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 w-8 bg-white/20 rounded-full mx-auto mb-4"></div>
              <p className="text-white/60">Please sign in to continue...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // If user is authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;