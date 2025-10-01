import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// Removed Supabase import
import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { User, LogOut, Trophy, TrendingUp, Shield } from "lucide-react";

export function Navigation() {
  const { user, login, logout } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  const handleSignIn = async () => {
    await login();
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="SportsX Logo" 
            className="h-8 w-auto"
          />
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <Trophy className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button variant="ghost" size="sm">
                  <Trophy className="h-4 w-4 mr-2" />
                  Leaderboard
                </Button>
              </Link>
              <Link to="/predictions">
                <Button variant="ghost" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Predictions
                </Button>
              </Link>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="ghost" size="sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              )}
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="hero" size="sm" onClick={handleSignIn}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}