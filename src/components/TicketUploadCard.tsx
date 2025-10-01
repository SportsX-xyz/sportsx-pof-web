import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Image, AlertCircle, CheckCircle, Clock, X } from "lucide-react";
// Removed Supabase import
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useFanPoints } from '@/hooks/useFanPoints';
// Removed crypto-js and tesseract.js imports

interface TicketUpload {
  id: string;
  file_name: string;
  file_url: string;
  status: string;
  ocr_data: any;
  points_awarded: number;
  created_at: string;
  rejection_reason?: string;
}

export function TicketUploadCard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { addPoints } = useFanPoints();
  const [uploading, setUploading] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [tickets, setTickets] = useState<TicketUpload[]>([]);
  const [showTickets, setShowTickets] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user || acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, or PDF file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setOcrProgress(0);

    try {
      // Generate mock file hash for duplicate detection
      const hash = 'mock-hash-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

      // Mock file upload - simulate duplicate check
      const existingTickets = JSON.parse(localStorage.getItem('uploaded_tickets') || '[]');
      if (existingTickets.includes(hash)) {
        toast({
          title: "Duplicate ticket detected",
          description: "This ticket has already been uploaded.",
          variant: "destructive",
        });
        setUploading(false);
        return;
      }

      // Mock file upload
      const fileName = `${user.id}/${Date.now()}_${file.name}`;
      const mockFileUrl = `https://example.com/tickets/${fileName}`;

      // Mock OCR processing
      let ocrData = {};
      if (file.type.startsWith('image/')) {
        setOcrProgress(10);
        
        // Simulate OCR processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setOcrProgress(80);

        // Mock OCR validation
        ocrData = {
          text: 'Mock ticket text: Super Bowl Ticket, Section A, Row 5, Seat 12',
          foundKeywords: ['ticket', 'section', 'row', 'seat'],
          confidence: 0.8,
          isValidTicket: true
        };
      }

      setOcrProgress(90);

      // Mock ticket record creation
      const ticketData = {
        id: Date.now().toString(),
        user_id: user.id,
        file_url: mockFileUrl,
        file_name: file.name,
        file_hash: hash,
        ocr_data: ocrData,
        status: (ocrData as any).isValidTicket ? 'approved' : 'pending',
        points_awarded: (ocrData as any).isValidTicket ? 100 : null,
        created_at: new Date().toISOString(),
      };

      // Store in localStorage for demo
      const uploadedTickets = JSON.parse(localStorage.getItem('uploaded_tickets') || '[]');
      uploadedTickets.push(hash);
      localStorage.setItem('uploaded_tickets', JSON.stringify(uploadedTickets));

      setOcrProgress(100);

      // Award points if automatically approved
      if ((ocrData as any).isValidTicket) {
        await addPoints('ticket_upload', 100, {
          ticket_id: ticketData.id,
          auto_approved: true
        });

        toast({
          title: "Ticket Verified! 🎫",
          description: "Your ticket has been verified and you earned 100 PoF points!",
        });
      } else {
        toast({
          title: "Ticket Uploaded",
          description: "Your ticket is pending manual review. You'll be notified once verified.",
        });
      }

      // Refresh tickets list
      fetchTickets();

    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setOcrProgress(0);
    }
  }, [user, toast, addPoints]);

  const fetchTickets = async () => {
    if (!user) return;

    try {
      // Mock tickets data from localStorage
      const mockTickets: TicketUpload[] = [
        {
          id: 'ticket-1',
          file_name: 'demo_ticket.jpg',
          file_url: 'https://example.com/demo_ticket.jpg',
          status: 'approved',
          ocr_data: { text: 'Demo Ticket', confidence: 0.95 },
          points_awarded: 100,
          created_at: new Date().toISOString(),
        },
      ];

      setTickets(mockTickets);
    } catch (error) {
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: uploading
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <Card className="hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-left-5 fade-in-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 group">
          <FileText className="h-5 w-5 group-hover:animate-bounce transition-all duration-300" />
          <span className="group-hover:text-primary transition-colors duration-300">Upload Ticket</span>
        </CardTitle>
        <CardDescription className="animate-pulse">
          Upload your match tickets to earn 100 PoF points each
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-primary/50'
          } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          
          {uploading ? (
            <div className="space-y-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Processing ticket...</p>
                {ocrProgress > 0 && (
                  <>
                    <Progress value={ocrProgress} className="w-full" />
                    <p className="text-xs text-muted-foreground">
                      {ocrProgress < 30 ? 'Uploading...' : 
                       ocrProgress < 80 ? 'Performing OCR verification...' : 
                       'Finalizing...'}
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {isDragActive ? (
                <Upload className="h-12 w-12 text-primary mx-auto" />
              ) : (
                <Image className="h-12 w-12 text-muted-foreground mx-auto" />
              )}
              
              <div>
                <p className="text-sm font-medium">
                  {isDragActive ? 'Drop your ticket here' : 'Upload your ticket'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, or PDF files up to 10MB
                </p>
              </div>
              
              <Button variant="outline" size="sm" disabled={uploading}>
                Choose File
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>Tickets are verified using OCR technology</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setShowTickets(!showTickets);
              if (!showTickets) fetchTickets();
            }}
          >
            {showTickets ? 'Hide' : 'View'} My Tickets
          </Button>
        </div>

        {showTickets && (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            <h4 className="font-medium text-sm">Uploaded Tickets</h4>
            {tickets.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No tickets uploaded yet
              </p>
            ) : (
              tickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(ticket.status)}
                    <div>
                      <p className="text-sm font-medium">{ticket.file_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    {ticket.status === 'approved' && (
                      <Badge variant="secondary">
                        +{ticket.points_awarded || 100} PoF
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}