import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trophy, Shield, Users, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login();
    onClose();
  };

  const handleClose = () => {
    onClose();
    // Redirect to landing page if user closes modal without logging in
    navigate('/');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-black border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white text-center text-2xl font-bold">
            Welcome to SportsX
          </DialogTitle>
          <DialogDescription className="text-white/80 text-center">
            Please sign in to access this page and start building your Proof of Fandom
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Features Preview */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-center">What you'll get:</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 text-sm text-white/80">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>Fan-Owned Identity</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-white/80">
                <Users className="h-4 w-4 text-red-500" />
                <span>Cross-Platform Recognition</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-white/80">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Proof of Fandom</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-white/80">
                <Trophy className="h-4 w-4 text-green-500" />
                <span>Verifiable Reputation</span>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <div className="space-y-3">
            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-semibold py-3"
            >
              <Trophy className="h-5 w-5 mr-2" />
              Sign In & Start Building
            </Button>
            
            <Button 
              onClick={handleClose}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              Maybe Later
            </Button>
            
            <p className="text-xs text-white/60 text-center">
              By signing in, you agree to our terms and start earning Proof of Fandom points
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;