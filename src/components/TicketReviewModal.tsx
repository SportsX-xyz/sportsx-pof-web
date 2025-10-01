import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  XCircle, 
  User, 
  FileText, 
  Calendar,
  Eye
} from "lucide-react";
import { format } from "date-fns";

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

interface TicketReviewModalProps {
  ticket: TicketWithUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (ticketId: string) => void;
  onReject: (ticketId: string, reason: string) => void;
}

export function TicketReviewModal({
  ticket,
  open,
  onOpenChange,
  onApprove,
  onReject
}: TicketReviewModalProps) {
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!ticket) return null;

  const handleApprove = () => {
    onApprove(ticket.id);
    onOpenChange(false);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) return;
    onReject(ticket.id, rejectionReason);
    setRejectionReason("");
    setShowRejectForm(false);
    onOpenChange(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">待审核</Badge>;
      case 'approved':
        return <Badge variant="default">已通过</Badge>;
      case 'rejected':
        return <Badge variant="destructive">已拒绝</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            票据审核详情
          </DialogTitle>
          <DialogDescription>
            查看票据详细信息并进行审核
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 票据图片 */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">票据图片</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <img 
                    src={ticket.file_url} 
                    alt="票据图片"
                    className="w-full rounded-lg border shadow-sm"
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => window.open(ticket.file_url, '_blank')}
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    在新窗口查看原图
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 票据信息 */}
          <div className="space-y-4">
            {/* 用户信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-4 w-4" />
                  用户信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">姓名</Label>
                  <p className="text-sm text-muted-foreground">
                    {ticket.user.first_name} {ticket.user.last_name}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">邮箱</Label>
                  <p className="text-sm text-muted-foreground">
                    {ticket.user.email}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 票据基本信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  票据信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">文件名</Label>
                  <p className="text-sm text-muted-foreground font-mono">
                    {ticket.file_name}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">上传时间</Label>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(ticket.created_at), 'yyyy-MM-dd HH:mm:ss')}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">当前状态</Label>
                  <div className="mt-1">
                    {getStatusBadge(ticket.status)}
                  </div>
                </div>
                {ticket.points_awarded > 0 && (
                  <div>
                    <Label className="text-sm font-medium">已分配积分</Label>
                    <p className="text-sm text-muted-foreground">
                      {ticket.points_awarded} 分
                    </p>
                  </div>
                )}
                {ticket.rejection_reason && (
                  <div>
                    <Label className="text-sm font-medium">拒绝原因</Label>
                    <p className="text-sm text-muted-foreground">
                      {ticket.rejection_reason}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* OCR 数据 */}
            {ticket.ocr_data && Object.keys(ticket.ocr_data).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">OCR 识别结果</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-32">
                    {JSON.stringify(ticket.ocr_data, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* 审核操作 */}
            {ticket.status === 'pending' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">审核操作</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!showRejectForm ? (
                    <div className="flex gap-3">
                      <Button 
                        onClick={handleApprove}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        通过审核
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={() => setShowRejectForm(true)}
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        拒绝审核
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="rejection-reason">拒绝原因</Label>
                        <Textarea
                          id="rejection-reason"
                          placeholder="请输入拒绝原因..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowRejectForm(false);
                            setRejectionReason("");
                          }}
                          className="flex-1"
                        >
                          取消
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleReject}
                          disabled={!rejectionReason.trim()}
                          className="flex-1"
                        >
                          确认拒绝
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}