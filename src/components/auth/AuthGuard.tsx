import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield, Phone, Clock } from 'lucide-react';

export function AuthGuard({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) {
  const { user, isLoading } = useAuth();
  const isAuthenticated = !!user;
  const [showAuthPrompt, setShowAuthPrompt] = useState(!isAuthenticated);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-elevated">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to book rides and access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Phone Verification</p>
                  <p className="text-sm text-muted-foreground">Secure your account with OTP</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Shield className="h-5 w-5 text-secondary" />
                <div>
                  <p className="font-medium">Safe & Verified</p>
                  <p className="text-sm text-muted-foreground">All drivers are background checked</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Clock className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">Quick Booking</p>
                  <p className="text-sm text-muted-foreground">Get rides in under 2 minutes</p>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={() => window.location.href = '/'}
            >
              Sign In / Sign Up
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-elevated">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this area. This section is for {requiredRole}s only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => window.location.href = '/'}
            >
              Go Back Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}