import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock, CheckCircle, AlertTriangle, Wallet } from "lucide-react";
import { usePredictionMarkets } from "@/hooks/usePredictionMarkets";
import { useTags } from "@/hooks/useTags";
import { useToast } from "@/hooks/use-toast";

interface PredictionMarket {
  id: string;
  title: string;
  description: string | null;
  sport_id: string | null;
  league_id: string | null;
  club_id: string | null;
  contract_address: string;
  outcome_a: string;
  outcome_b: string;
  starts_at: string;
  ends_at: string;
  status: string;
}

interface MarketCardProps {
  market: PredictionMarket;
  userPrediction?: any;
  onPlacePrediction: (marketId: string, outcome: number, amount: string) => void;
  isConnected: boolean;
}

function MarketCard({ market, userPrediction, onPlacePrediction, isConnected }: MarketCardProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState('0.01');
  const [isPlacing, setIsPlacing] = useState(false);

  const handlePlacePrediction = async () => {
    if (selectedOutcome === null) return;
    
    setIsPlacing(true);
    try {
      await onPlacePrediction(market.id, selectedOutcome, betAmount);
    } finally {
      setIsPlacing(false);
    }
  };

  const isExpired = new Date(market.ends_at) < new Date();
  const timeUntilEnd = new Date(market.ends_at).getTime() - new Date().getTime();
  const hoursLeft = Math.max(0, Math.floor(timeUntilEnd / (1000 * 60 * 60)));

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{market.title}</CardTitle>
          <div className="flex gap-2">
            {hoursLeft > 0 ? (
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {hoursLeft}h left
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs">
                Expired
              </Badge>
            )}
          </div>
        </div>
        {market.description && (
          <p className="text-sm text-muted-foreground">{market.description}</p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {userPrediction ? (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              You predicted <strong>{userPrediction.outcome === 0 ? market.outcome_a : market.outcome_b}</strong> with {userPrediction.amount} ETH.
              Earned {userPrediction.points_awarded} PoF points!
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {!isConnected ? (
              <Alert>
                <Wallet className="h-4 w-4" />
                <AlertDescription>
                  Connect your wallet to participate in prediction markets.
                </AlertDescription>
              </Alert>
            ) : isExpired ? (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  This market has expired and no longer accepts predictions.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="space-y-2">
                  <h4 className="font-medium">Choose your prediction:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={selectedOutcome === 0 ? "default" : "outline"}
                      onClick={() => setSelectedOutcome(0)}
                      className="h-auto p-3 text-left"
                    >
                      <div>
                        <div className="font-medium">{market.outcome_a}</div>
                        <div className="text-xs text-muted-foreground">Option A</div>
                      </div>
                    </Button>
                    <Button
                      variant={selectedOutcome === 1 ? "default" : "outline"}
                      onClick={() => setSelectedOutcome(1)}
                      className="h-auto p-3 text-left"
                    >
                      <div>
                        <div className="font-medium">{market.outcome_b}</div>
                        <div className="text-xs text-muted-foreground">Option B</div>
                      </div>
                    </Button>
                  </div>
                </div>

                {selectedOutcome !== null && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bet Amount (ETH):</label>
                    <Input
                      type="number"
                      step="0.001"
                      min="0.001"
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                      placeholder="0.01"
                    />
                  </div>
                )}

                <Button
                  onClick={handlePlacePrediction}
                  disabled={selectedOutcome === null || !betAmount || isPlacing}
                  className="w-full"
                >
                  {isPlacing ? "Placing Prediction..." : `Place Prediction (+50 PoF Points)`}
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function PredictionMarkets() {
  const { markets, userPredictions, loading, recordPrediction, getUserPredictionForMarket } = usePredictionMarkets();
  const { getSportsByType } = useTags();
  const { toast } = useToast();

  const [selectedSport, setSelectedSport] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');
  const [isConnected] = useState(true); // For MVP, simulate connection

  const sports = getSportsByType('sport');

  const handlePlacePrediction = async (marketId: string, outcome: number, amount: string) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to place predictions.",
        variant: "destructive",
      });
      return;
    }

    try {
      const market = markets.find(m => m.id === marketId);
      if (!market) return;

      // For MVP, we'll simulate the contract call
      // In production, this would interact with the actual smart contract
      const simulatedTxHash = `0x${Math.random().toString(16).substring(2, 66)}`;
      
      // Record in database
      await recordPrediction(marketId, outcome, amount, simulatedTxHash);
      
      setTxHash(simulatedTxHash);

      toast({
        title: "Prediction Submitted! 🚀",
        description: "Your prediction is being processed on-chain...",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place prediction. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredMarkets = selectedSport 
    ? markets.filter(m => m.sport_id === selectedSport)
    : markets;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-muted rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Prediction Markets</h2>
          <p className="text-muted-foreground">
            Predict sports outcomes and earn PoF points. All markets run on Base testnet.
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Markets</TabsTrigger>
          <TabsTrigger value="my-predictions">My Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {!isConnected && (
            <Alert>
              <Wallet className="h-4 w-4" />
              <AlertDescription>
                Connect your wallet to participate in prediction markets and earn PoF points.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMarkets.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No active markets</h3>
                <p className="text-muted-foreground">
                  Check back soon for new prediction opportunities!
                </p>
              </div>
            ) : (
              filteredMarkets.map((market) => (
                <MarketCard
                  key={market.id}
                  market={market}
                  userPrediction={getUserPredictionForMarket(market.id)}
                  onPlacePrediction={handlePlacePrediction}
                  isConnected={isConnected}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="my-predictions" className="space-y-4">
          {userPredictions.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No predictions yet</h3>
              <p className="text-muted-foreground">
                Start predicting to earn PoF points and track your success!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {userPredictions.map((prediction) => (
                <Card key={prediction.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{prediction.market?.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Predicted: {prediction.outcome === 0 ? prediction.market?.outcome_a : prediction.market?.outcome_b}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Amount: {prediction.amount} ETH
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">
                          +{prediction.points_awarded} PoF Points
                        </Badge>
                        {prediction.is_winning_prediction !== null && (
                          <div className="mt-1">
                            <Badge variant={prediction.is_winning_prediction ? "default" : "destructive"}>
                              {prediction.is_winning_prediction ? "Won" : "Lost"}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}