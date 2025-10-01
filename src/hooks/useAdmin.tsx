import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AdminStats {
  totalUsers: number;
  totalTickets: number;
  pendingTickets: number;
  totalPoints: number;
}

interface TicketWithUser {
  id: string;
  file_name: string;
  file_url: string;
  status: string;
  rejection_reason?: string;
  points_awarded: number;
  created_at: string;
  ocr_data: any;
  user: {
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

interface UserWithStats {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  created_at: string;
  total_points: number;
  ticket_count: number;
  last_checkin: string | null;
}

export function useAdmin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalTickets: 0,
    pendingTickets: 0,
    totalPoints: 0,
  });

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // Mock admin status - set to true for development/testing
      // In production, this will check user role/permissions
      setIsAdmin(true);
      setLoading(false);
    };

    checkAdminStatus();
  }, [user]);

  // Fetch admin stats
  const fetchStats = async () => {
    if (!isAdmin) return;

    try {
      // Mock admin stats
      const mockStats: AdminStats = {
        totalUsers: 150,
        totalTickets: 45,
        pendingTickets: 12,
        totalPoints: 25000,
      };

      setStats(mockStats);
    } catch (error) {
    }
  };

  // Fetch all users with stats
  const fetchUsers = async (): Promise<UserWithStats[]> => {
    if (!isAdmin) return [];

    try {
      // Mock users data
      const mockUsers: UserWithStats[] = [
        {
          id: 'user-1',
          email: 'john@example.com',
          first_name: 'John',
          last_name: 'Doe',
          country: 'United States',
          created_at: new Date().toISOString(),
          total_points: 2500,
          ticket_count: 5,
          last_checkin: new Date().toISOString(),
        },
        {
          id: 'user-2',
          email: 'jane@example.com',
          first_name: 'Jane',
          last_name: 'Smith',
          country: 'Canada',
          created_at: new Date().toISOString(),
          total_points: 1800,
          ticket_count: 3,
          last_checkin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
      ];

      return mockUsers;
    } catch (error) {
      return [];
    }
  };

  // Fetch all tickets for review
  const fetchTickets = async (): Promise<TicketWithUser[]> => {
    if (!isAdmin) {
      return [];
    }

    try {
      // Mock tickets data
      const mockTickets: TicketWithUser[] = [
        {
          id: 'ticket-1',
          file_name: 'superbowl_ticket.jpg',
          file_url: 'https://example.com/ticket1.jpg',
          status: 'pending',
          rejection_reason: undefined,
          points_awarded: 0,
          created_at: new Date().toISOString(),
          ocr_data: { text: 'Super Bowl Ticket', confidence: 0.95 },
          user: {
            email: 'john@example.com',
            first_name: 'John',
            last_name: 'Doe',
          },
        },
        {
          id: 'ticket-2',
          file_name: 'nba_finals.pdf',
          file_url: 'https://example.com/ticket2.pdf',
          status: 'approved',
          rejection_reason: undefined,
          points_awarded: 100,
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          ocr_data: { text: 'NBA Finals Ticket', confidence: 0.88 },
          user: {
            email: 'jane@example.com',
            first_name: 'Jane',
            last_name: 'Smith',
          },
        },
      ];

      return mockTickets;
    } catch (error) {
      return [];
    }
  };

  // Approve ticket
  const approveTicket = async (ticketId: string, points: number = 100) => {
    if (!isAdmin) return false;

    try {
      // Mock ticket approval
      toast({
        title: "Ticket approved",
        description: `Ticket approved and ${points} points awarded to user.`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve ticket. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Reject ticket
  const rejectTicket = async (ticketId: string, reason: string) => {
    if (!isAdmin) return false;

    try {
      // Mock ticket rejection
      toast({
        title: "Ticket rejected",
        description: "Ticket has been rejected with reason provided.",
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject ticket. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    isAdmin,
    loading,
    stats,
    fetchStats,
    fetchUsers,
    fetchTickets,
    approveTicket,
    rejectTicket,
  };
}