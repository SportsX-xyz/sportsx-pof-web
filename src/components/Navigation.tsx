import { Button } from "@/components/ui/button";
import { useState } from "react";
import { WaitlistForm } from "@/components/WaitlistForm";

export function Navigation() {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);

  const handleJoinWaitlist = () => {
    setShowWaitlistForm(true);
  };

  return (
    <>
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/images/logo_black.png" 
              alt="SportsX Logo" 
              className="h-8 w-auto"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="hero" size="sm" onClick={handleJoinWaitlist}>
              Join waitlist
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Waitlist Form Modal */}
      <WaitlistForm 
        isOpen={showWaitlistForm}
        onClose={() => setShowWaitlistForm(false)}
      />
    </>
  );
}