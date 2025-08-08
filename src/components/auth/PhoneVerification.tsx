import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Shield, Phone, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PhoneVerificationProps {
  phone: string;
  onVerified: () => void;
  onBack: () => void;
}

export function PhoneVerification({ phone, onVerified, onBack }: PhoneVerificationProps) {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate OTP verification
    setTimeout(() => {
      if (otp === '123456') {
        onVerified();
      } else {
        setError('Invalid OTP. Please try again.');
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleResendOTP = () => {
    setResendCooldown(30);
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <Card className="max-w-md w-full shadow-elevated">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="h-8 w-8 text-primary" />
        </div>
        <CardTitle>Verify Your Phone</CardTitle>
        <CardDescription>
          We've sent a 6-digit code to {phone}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="otp">Enter OTP</Label>
          <Input
            id="otp"
            type="text"
            placeholder="123456"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="text-center text-2xl tracking-wider"
          />
        </div>

        <Button 
          className="w-full" 
          onClick={handleVerifyOTP}
          disabled={isVerifying || otp.length !== 6}
        >
          {isVerifying ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Verifying...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Verify OTP
            </>
          )}
        </Button>

        <div className="text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleResendOTP}
            disabled={resendCooldown > 0}
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
          </Button>
        </div>

        <Button variant="outline" className="w-full" onClick={onBack}>
          Change Phone Number
        </Button>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>Demo:</strong> Use OTP <code className="bg-blue-100 px-1 rounded">123456</code> to verify
          </p>
        </div>
      </CardContent>
    </Card>
  );
}