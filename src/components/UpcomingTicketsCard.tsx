import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ticket, Calendar, MapPin, Clock, ExternalLink } from "lucide-react";

interface UpcomingTicket {
  id: string;
  event: string;
  team: string;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  sport: string;
  emoji: string;
  status: 'confirmed' | 'pending';
}

export function UpcomingTicketsCard() {
  // Mock upcoming tickets data
  const upcomingTickets: UpcomingTicket[] = [
    {
      id: '1',
      event: 'Lakers vs Warriors',
      team: 'Los Angeles Lakers',
      opponent: 'Golden State Warriors',
      date: '2024-01-25',
      time: '20:00',
      venue: 'Crypto.com Arena',
      sport: 'Basketball',
      emoji: '🏀',
      status: 'confirmed'
    },
    {
      id: '2',
      event: 'Chiefs vs Bills',
      team: 'Kansas City Chiefs',
      opponent: 'Buffalo Bills',
      date: '2024-01-28',
      time: '15:30',
      venue: 'Arrowhead Stadium',
      sport: 'American Football',
      emoji: '🏈',
      status: 'confirmed'
    },
    {
      id: '3',
      event: 'Yankees vs Red Sox',
      team: 'New York Yankees',
      opponent: 'Boston Red Sox',
      date: '2024-02-02',
      time: '19:05',
      venue: 'Yankee Stadium',
      sport: 'Baseball',
      emoji: '⚾',
      status: 'pending'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past event';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-right-5 fade-in-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg group">
          <Ticket className="h-5 w-5 text-primary group-hover:animate-bounce transition-all duration-300" />
          <span className="group-hover:text-primary transition-colors duration-300">Upcoming Tickets</span>
        </CardTitle>
        <CardDescription className="animate-pulse">
          Your upcoming events and matches
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingTickets.length > 0 ? (
          <>
            {/* Show only the first ticket */}
            <div className="p-3 border rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 hover:shadow-md hover:border-primary/30 group animate-in slide-in-from-bottom-3 fade-in-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg group-hover:animate-pulse transition-all duration-300">{upcomingTickets[0].emoji}</span>
                  <div>
                    <div className="font-medium text-sm group-hover:text-primary transition-colors duration-300">{upcomingTickets[0].event}</div>
                    <div className="text-xs text-muted-foreground">{upcomingTickets[0].sport}</div>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${getStatusColor(upcomingTickets[0].status)} text-white group-hover:animate-pulse transition-all duration-300`}
                >
                  {getStatusText(upcomingTickets[0].status)}
                </Badge>
              </div>
              
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1 group-hover:text-foreground transition-colors duration-300">
                  <Calendar className="h-3 w-3 group-hover:text-primary transition-colors duration-300" />
                  {formatDate(upcomingTickets[0].date)} at {upcomingTickets[0].time}
                </div>
                <div className="flex items-center gap-1 group-hover:text-foreground transition-colors duration-300">
                  <MapPin className="h-3 w-3 group-hover:text-primary transition-colors duration-300" />
                  {upcomingTickets[0].venue}
                </div>
                <div className="flex items-center gap-1 group-hover:text-foreground transition-colors duration-300">
                  <Clock className="h-3 w-3 group-hover:text-primary transition-colors duration-300" />
                  {getDaysUntil(upcomingTickets[0].date)}
                </div>
              </div>
            </div>
            
            {/* View All button - always show if there are tickets */}
            <div className="text-center pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-2 fade-in-0 delay-150"
                onClick={() => window.open('https://ticket.tortorcoin.top', '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1 group-hover:animate-bounce transition-all duration-300" />
                View All ({upcomingTickets.length} tickets)
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Ticket className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No upcoming tickets</p>
            <p className="text-xs">Purchase tickets to see them here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}