import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  Banknote, 
  QrCode, 
  Shield,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PaymentMethodsProps {
  amount: number;
  onPaymentComplete: (method: string) => void;
}

export function PaymentMethods({ amount, onPaymentComplete }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'cash',
      name: 'Cash Payment',
      icon: Banknote,
      description: 'Pay directly to the driver',
      available: true,
      fee: 0,
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: QrCode,
      description: 'PhonePe, Google Pay, Paytm',
      available: true,
      fee: 0,
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay',
      available: true,
      fee: 2,
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: Smartphone,
      description: 'Paytm, PhonePe Wallet',
      available: false,
      fee: 0,
    },
  ];

  const handlePayment = async (methodId: string) => {
    setSelectedMethod(methodId);
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete(methodId);
    }, 2000);
  };

  const totalAmount = amount + (selectedMethod === 'card' ? 2 : 0);

  return (
    <Card className="max-w-md w-full shadow-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Choose Payment Method
        </CardTitle>
        <CardDescription>
          Select how you'd like to pay for your ride
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-accent/10 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-accent">₹{amount}</p>
          <p className="text-sm text-muted-foreground">Trip Fare</p>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            
            return (
              <button
                key={method.id}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  method.available 
                    ? isSelected 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                    : 'border-muted bg-muted/50 opacity-60 cursor-not-allowed'
                }`}
                onClick={() => method.available && !isProcessing && handlePayment(method.id)}
                disabled={!method.available || isProcessing}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="font-medium">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.fee > 0 && (
                      <Badge variant="outline" className="text-xs">
                        +₹{method.fee}
                      </Badge>
                    )}
                    {method.available ? (
                      isSelected && isProcessing ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      ) : (
                        <CheckCircle className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                      )
                    ) : (
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedMethod === 'card' && (
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Additional ₹2 processing fee applies for card payments
            </AlertDescription>
          </Alert>
        )}

        {selectedMethod && !isProcessing && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total Amount:</span>
              <span className="text-lg font-bold text-accent">₹{totalAmount}</span>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <Shield className="h-4 w-4 inline mr-1" />
            All payments are secured and encrypted
          </p>
        </div>
      </CardContent>
    </Card>
  );
}