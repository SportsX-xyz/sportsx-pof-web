import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Navigation } from "@/components/Navigation";
import { TicketReviewModal } from "@/components/TicketReviewModal";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/context/AuthContext";
import "./AdminDashboard.css";
import { 
  Users, 
  FileText, 
  Clock, 
  TrendingUp, 
  Shield,
  CheckCircle,
  XCircle,
  Eye
} from "lucide-react";
import { format } from "date-fns";

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

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading, stats, fetchStats } = useAdmin();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [tickets, setTickets] = useState<TicketWithUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketWithUser | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [activeTab, setActiveTab] = useState("tickets");
  const [ticketFilter, setTicketFilter] = useState<"all" | "pending">("all");

  const { fetchUsers, fetchTickets, approveTicket, rejectTicket } = useAdmin();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
      loadUsers();
      loadTickets();
    }
  }, [isAdmin]);

  const loadUsers = async () => {
    setLoadingUsers(true);
    const userData = await fetchUsers();
    setUsers(userData);
    setLoadingUsers(false);
  };

  const loadTickets = async () => {
    setLoadingTickets(true);
    const ticketData = await fetchTickets();
    setTickets(ticketData);
    setLoadingTickets(false);
  };

  const handleApproveTicket = async (ticketId: string) => {
    const success = await approveTicket(ticketId, 100);
    if (success) {
      loadTickets();
      fetchStats();
    }
  };

  const handleRejectTicket = async (ticketId: string, reason: string) => {
    const success = await rejectTicket(ticketId, reason);
    if (success) {
      loadTickets();
      fetchStats();
    }
  };

  const handleTicketReview = (ticket: TicketWithUser) => {
    setSelectedTicket(ticket);
    setShowReviewModal(true);
  };

  const handleShowAllTickets = () => {
    setTicketFilter("all");
    setActiveTab("tickets");
  };

  const handleShowPendingTickets = () => {
    setTicketFilter("pending");
    setActiveTab("tickets");
  };

  const getFilteredTickets = () => {
    if (ticketFilter === "pending") {
      return tickets.filter(ticket => ticket.status === "pending");
    }
    return tickets;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />待审核</Badge>;
      case 'approved':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />已通过</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />已拒绝</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">加载管理后台...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">管理员后台</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            管理用户、审核票据和查看平台统计
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-primary transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总用户数</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                注册用户总数
              </p>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-secondary transition-all cursor-pointer" 
            onClick={handleShowAllTickets}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">票据总数</CardTitle>
              <FileText className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{stats.totalTickets}</div>
              <p className="text-xs text-muted-foreground">
                点击查看所有票据
              </p>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-yellow-500 transition-all cursor-pointer" 
            onClick={handleShowPendingTickets}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待审核票据</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingTickets}</div>
              <p className="text-xs text-muted-foreground">
                点击查看待审核票据
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-green-500 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总积分</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.totalPoints.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                用户总积分
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tickets">票据管理</TabsTrigger>
            <TabsTrigger value="users">用户管理</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>票据审核</CardTitle>
                    <CardDescription>
                      审核用户上传的票据，验证真实性并分配积分
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={ticketFilter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTicketFilter("all")}
                    >
                      全部票据 ({stats.totalTickets})
                    </Button>
                    <Button
                      variant={ticketFilter === "pending" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTicketFilter("pending")}
                    >
                      待审核 ({stats.pendingTickets})
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loadingTickets ? (
                  <div className="text-center py-8">
                    <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-muted-foreground">加载票据数据...</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>用户</TableHead>
                        <TableHead>文件名</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>上传时间</TableHead>
                        <TableHead>积分</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredTickets().map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {ticket.user.first_name} {ticket.user.last_name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {ticket.user.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {ticket.file_name}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(ticket.status)}
                          </TableCell>
                          <TableCell>
                            {format(new Date(ticket.created_at), 'MM/dd HH:mm')}
                          </TableCell>
                          <TableCell>
                            {ticket.points_awarded > 0 ? ticket.points_awarded : '-'}
                          </TableCell>
                           <TableCell>
                             <div className="flex gap-2">
                               <Button
                                 size="sm"
                                 onClick={() => handleTicketReview(ticket)}
                               >
                                 <Eye className="h-3 w-3 mr-1" />
                                 审核
                               </Button>
                               {ticket.status === 'pending' && (
                                 <>
                                   <Button
                                     size="sm"
                                     variant="outline"
                                     onClick={() => handleApproveTicket(ticket.id)}
                                   >
                                     <CheckCircle className="h-3 w-3 mr-1" />
                                     通过
                                   </Button>
                                 </>
                               )}
                             </div>
                           </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>用户管理</CardTitle>
                <CardDescription>
                  查看所有注册用户的详细信息和活动统计
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingUsers ? (
                  <div className="text-center py-8">
                    <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-muted-foreground">加载用户数据...</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>用户信息</TableHead>
                        <TableHead>国家</TableHead>
                        <TableHead>注册时间</TableHead>
                        <TableHead>总积分</TableHead>
                        <TableHead>票据数量</TableHead>
                        <TableHead>最后签到</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {user.first_name} {user.last_name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {user.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.country || '-'}</TableCell>
                          <TableCell>
                            {format(new Date(user.created_at), 'yyyy-MM-dd')}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.total_points}</Badge>
                          </TableCell>
                          <TableCell>{user.ticket_count}</TableCell>
                          <TableCell>
                            {user.last_checkin 
                              ? format(new Date(user.last_checkin), 'MM-dd')
                              : '从未签到'
                            }
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 票据审核模态框 */}
      <TicketReviewModal
        ticket={selectedTicket}
        open={showReviewModal}
        onOpenChange={setShowReviewModal}
        onApprove={handleApproveTicket}
        onReject={handleRejectTicket}
      />
    </div>
  );
}