import { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Star, Phone, Car, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { SimpleLocationPicker } from '@/components/maps/SimpleLocationPicker';
import { calculateFare, COMMON_ROUTES } from '@/utils/pricing';
import { useToast } from '@/hooks/use-toast';
import { PaymentMethods } from '@/components/payment/PaymentMethods';
import { PhoneVerification } from '@/components/auth/PhoneVerification';
import { useAuth } from '@/contexts/AuthContext';

export function PassengerDashboard() {
  const { user } = useAuth();
  const [pickupLocation, setPickupLocation] = useState<{ name: string; coords: [number, number] } | null>(null);
  const [destinationLocation, setDestinationLocation] = useState<{ name: string; coords: [number, number] } | null>(null);
  const [activeRide, setActiveRide] = useState<any>(null);
  const [fareEstimate, setFareEstimate] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const { toast } = useToast();
  const [nearbyDrivers] = useState([
    {
      id: '1',
      name: 'Ravi Patil',
      rating: 4.8,
      distance: '2 min away',
      vehicleNumber: 'MH 08 RT 1234',
      location: 'Near Railway Station',
    },
    {
      id: '2', 
      name: 'Santosh Sawant',
      rating: 4.6,
      distance: '4 min away',
      vehicleNumber: 'MH 08 RT 5678',
      location: 'Bus Stand Area',
    },
    {
      id: '3',
      name: 'Prakash Bhosale',
      rating: 4.9,
      distance: '6 min away', 
      vehicleNumber: 'MH 08 RT 9012',
      location: 'Market Road',
    }
  ]);

  const [rideHistory] = useState([
    {
      id: '1',
      from: 'Railway Station',
      to: 'Ganpatipule Beach',
      date: '2024-01-15',
      fare: 195,
      driver: 'Ravi Patil',
      rating: 5,
    },
    {
      id: '2',
      from: 'Market Road',
      to: 'Ratnadurg Fort',
      date: '2024-01-10',
      fare: 60,
      driver: 'Santosh Sawant',
      rating: 4,
    }
  ]);

  // Calculate fare when both locations are selected
  useEffect(() => {
    if (pickupLocation && destinationLocation) {
      const estimate = calculateFare(pickupLocation.coords, destinationLocation.coords);
      setFareEstimate(estimate);
    } else {
      setFareEstimate(null);
    }
  }, [pickupLocation, destinationLocation]);

  const handleBookRide = (driver: any) => {
    if (!pickupLocation || !destinationLocation || !fareEstimate) {
      toast({
        title: "Missing Information",
        description: "Please select both pickup and destination locations.",
        variant: "destructive",
      });
      return;
    }

    // Check if user's phone is verified
    if (!user?.isVerified) {
      setShowPhoneVerification(true);
      return;
    }

    // Show payment options
    setShowPayment(true);
  };

  const handlePaymentComplete = (paymentMethod: string) => {
    setShowPayment(false);
    
    // Create the ride after successful payment
    const selectedDriver = nearbyDrivers[0]; // For demo, use first driver
    setActiveRide({
      id: Date.now().toString(),
      driver: { ...selectedDriver, fare: fareEstimate.totalFare },
      pickup: pickupLocation!.name,
      destination: destinationLocation!.name,
      status: 'confirmed',
      estimatedTime: fareEstimate.estimatedTime,
      distance: fareEstimate.distance,
      paymentMethod,
    });

    toast({
      title: "Ride Booked Successfully!",
      description: `${selectedDriver.name} is on the way. Payment via ${paymentMethod}.`,
    });
  };

  const handlePhoneVerified = () => {
    setShowPhoneVerification(false);
    toast({
      title: "Phone Verified!",
      description: "You can now book rides.",
    });
    setShowPayment(true);
  };

  const handleCancelRide = () => {
    setActiveRide(null);
  };

  // Show phone verification modal
  if (showPhoneVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10 flex items-center justify-center p-4">
        <PhoneVerification
          phone={user?.phone || '+91 9876543210'}
          onVerified={handlePhoneVerified}
          onBack={() => setShowPhoneVerification(false)}
        />
      </div>
    );
  }

  // Show payment options modal
  if (showPayment && fareEstimate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10 flex items-center justify-center p-4">
        <PaymentMethods
          amount={fareEstimate.totalFare}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    );
  }

  if (activeRide) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="shadow-elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    Ride in Progress
                  </CardTitle>
                  <Badge className="bg-secondary text-secondary-foreground">
                    On the way
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="font-medium">{activeRide.pickup}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span className="font-medium">{activeRide.destination}</span>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{activeRide.driver.name}</h4>
                      <p className="text-sm text-muted-foreground">{activeRide.driver.vehicleNumber}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{activeRide.driver.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">ETA: {activeRide.estimatedTime}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Driver
                    </Button>
                  </div>
                </div>

                <div className="bg-accent/10 rounded-lg p-4 text-center">
                  <p className="text-accent font-semibold text-lg">₹{activeRide.driver.fare}</p>
                  <p className="text-sm text-muted-foreground">Estimated Fare</p>
                </div>

                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleCancelRide}
                >
                  Cancel Ride
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-primary" />
                  Book a Ride
                </CardTitle>
                <CardDescription>Enter your pickup and destination</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Pickup Location</Label>
                  <SimpleLocationPicker
                    onLocationSelect={setPickupLocation}
                    placeholder="Search pickup location in Ratnagiri"
                    selectedLocation={pickupLocation}
                  />
                  {pickupLocation && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{pickupLocation.name}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Destination</Label>
                  <SimpleLocationPicker
                    onLocationSelect={setDestinationLocation}
                    placeholder="Search destination in Ratnagiri"
                    selectedLocation={destinationLocation}
                  />
                  {destinationLocation && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{destinationLocation.name}</span>
                    </div>
                  )}
                </div>

                {fareEstimate && (
                  <Card className="bg-accent/5 border-accent/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Calculator className="h-4 w-4" />
                        Fare Estimate
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Distance:</span>
                        <span className="font-medium">{fareEstimate.distance}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Estimated Time:</span>
                        <span className="font-medium">{fareEstimate.estimatedTime}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total Fare:</span>
                        <span className="text-accent">₹{fareEstimate.totalFare}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {pickupLocation && destinationLocation && fareEstimate && (
              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle>Available Drivers</CardTitle>
                  <CardDescription>Choose from nearby auto-rickshaws</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {nearbyDrivers.map((driver) => (
                    <div key={driver.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-semibold">{driver.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-primary text-primary" />
                              <span>{driver.rating}</span>
                            </div>
                            <span>{driver.distance}</span>
                            <span>{driver.vehicleNumber}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-accent">₹{fareEstimate.totalFare}</p>
                          <p className="text-xs text-muted-foreground mb-2">{driver.location}</p>
                          <Button 
                            size="sm" 
                            variant="passenger"
                            onClick={() => handleBookRide(driver)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Rides</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Money Saved</span>
                  <span className="font-semibold text-secondary">₹255</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Recent Rides</CardTitle>
                <CardDescription>Your recent trips in Ratnagiri</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {rideHistory.map((ride) => (
                  <div key={ride.id} className="border-b pb-3 last:border-b-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{ride.from} → {ride.to}</span>
                      <span className="text-accent font-semibold">₹{ride.fare}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{ride.date}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span>{ride.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}