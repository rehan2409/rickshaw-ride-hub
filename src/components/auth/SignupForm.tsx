import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface SignupFormProps {
  onToggleMode: () => void;
}

export function SignupForm({ onToggleMode }: SignupFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('passenger');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const { signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup({
      name,
      email,
      phone,
      password,
      role,
      ...(role === 'driver' && {
        licenseNumber,
        vehicleNumber,
        vehicleType,
      }),
    });
  };

  const roleVariants = {
    passenger: 'passenger',
    driver: 'driver', 
    admin: 'admin'
  } as const;

  return (
    <Card className="w-full max-w-md mx-auto shadow-elevated">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Join RickshawGo</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Join as</Label>
            <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passenger">Passenger</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {role === 'driver' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="license">License Number</Label>
                <Input
                  id="license"
                  placeholder="Enter license number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle Number</Label>
                <Input
                  id="vehicle"
                  placeholder="MH 12 AB 1234"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto Rickshaw</SelectItem>
                    <SelectItem value="e-rickshaw">E-Rickshaw</SelectItem>
                    <SelectItem value="shared-auto">Shared Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          <Button 
            type="submit" 
            className="w-full" 
            variant={roleVariants[role]}
          disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
          
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}