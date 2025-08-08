import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle, 
  Shield, 
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  User
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
}

export function SupportCenter() {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'tickets'>('faq');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium' as const,
    description: '',
  });
  const [tickets] = useState<SupportTicket[]>([
    {
      id: '1',
      subject: 'Driver not arriving',
      category: 'Ride Issue',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      subject: 'Payment failed',
      category: 'Payment',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2024-01-10',
    },
  ]);

  const faqs = [
    {
      question: 'How do I book a ride in Ratnagiri?',
      answer: 'Select your pickup and destination locations on the map, choose from available drivers, and confirm your booking. Payment can be made via cash, UPI, or card.',
    },
    {
      question: 'What are the fare rates?',
      answer: 'Base fare starts at ₹15 with ₹12 per km. Night charges (11 PM - 6 AM) have 50% surcharge. Minimum fare is ₹20.',
    },
    {
      question: 'How do I cancel a ride?',
      answer: 'You can cancel your ride from the active ride screen. Cancellation charges may apply if cancelled after driver acceptance.',
    },
    {
      question: 'Is phone verification mandatory?',
      answer: 'Yes, phone verification is required for safety and security. You\'ll receive an OTP to verify your mobile number.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept cash payments, UPI (PhonePe, Google Pay), and credit/debit cards. A small processing fee applies for card payments.',
    },
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ticket submitted:', ticketForm);
    // Reset form
    setTicketForm({ subject: '', category: '', priority: 'medium', description: '' });
  };

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Support Center
          </CardTitle>
          <CardDescription>
            Get help with your RickshawGo experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-1 mb-6">
            {[
              { id: 'faq', label: 'FAQ', icon: FileText },
              { id: 'contact', label: 'Contact Us', icon: MessageCircle },
              { id: 'tickets', label: 'My Tickets', icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>

          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
              {faqs.map((faq, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="pt-4">
                    <h4 className="font-medium mb-2">{faq.question}</h4>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      Emergency Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">+91 9876543210</p>
                    <p className="text-sm text-muted-foreground">24/7 emergency assistance</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      Email Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">help@rickshawgo.com</p>
                    <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <h3 className="text-lg font-semibold">Submit a Support Ticket</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full p-2 border rounded-md"
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Ride Issue">Ride Issue</option>
                      <option value="Payment">Payment</option>
                      <option value="App Bug">App Bug</option>
                      <option value="Driver Feedback">Driver Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your issue"
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    required
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Ticket
                </Button>
              </form>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Support Tickets</h3>
              
              {tickets.length === 0 ? (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    You don't have any support tickets yet.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-3">
                  {tickets.map((ticket) => (
                    <Card key={ticket.id} className="hover:bg-muted/50 transition-colors">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{ticket.subject}</h4>
                            <p className="text-sm text-muted-foreground">
                              {ticket.category} • Created on {ticket.createdAt}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={ticket.priority === 'high' ? 'destructive' : 'secondary'}
                            >
                              {ticket.priority}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <StatusIcon status={ticket.status} />
                              <span className="text-sm capitalize">{ticket.status}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          For immediate safety concerns or emergencies, please contact local authorities or call our emergency helpline.
        </AlertDescription>
      </Alert>
    </div>
  );
}