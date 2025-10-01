import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Copy, ExternalLink, CheckCircle } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function WalletCard() {
  const { user } = useAuth();
  const { profile, loading, createWallet } = useProfile();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (profile?.wallet_address) {
      navigator.clipboard.writeText(profile.wallet_address);
      setCopied(true);
      toast({
        title: "Address copied!",
        description: "Wallet address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCreateWallet = async () => {
    const walletAddress = await createWallet();
    if (walletAddress) {
      toast({
        title: "Wallet created!",
        description: `Your Privy wallet is ready: ${walletAddress.slice(0, 8)}...`,
      });
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Your Wallet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Your Wallet
        </CardTitle>
        <CardDescription>
          {profile?.wallet_address 
            ? "Your Solana wallet is ready"
            : "Create your Solana wallet"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {profile?.wallet_address ? (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Address:</span>
                <Badge variant="secondary" className="font-mono">
                  {truncateAddress(profile.wallet_address)}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Provider:</span>
                <Badge variant="outline">
                  Solana
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyAddress}
                className="flex-1"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Address
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://solscan.io/account/${profile.wallet_address}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Solscan
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-muted-foreground">
              No Solana wallet found. Create your Solana wallet to get started with your Proof of Fandom identity.
            </div>
            <Button onClick={handleCreateWallet} variant="hero">
              <Wallet className="h-4 w-4 mr-2" />
              Create Solana Wallet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}