import { useState } from 'react';
import { MapPin, Navigation, Clock, Star, Phone, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';

export function PassengerDashboard() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [activeRide, setActiveRide] = useState<any>(null);
  const [nearbyDrivers] = useState([
    {
      id: '1',
      name: 'Rajesh Kumar',
      rating: 4.8,
      distance: '2 min away',
      vehicleNumber: 'MH 12 AB 1234',
      fare: 45,
    },
    {
      id: '2', 
      name: 'Suresh Patel',
      rating: 4.6,
      distance: '4 min away',
      vehicleNumber: 'MH 12 CD 5678',
      fare: 48,
    },
    {
      id: '3',
      name: 'Vikram Singh',
      rating: 4.9,
      distance: '6 min away', 
      vehicleNumber: 'MH 12 EF 9012',
      fare: 42,
    }
  ]);

  const [rideHistory] = useState([
    {
      id: '1',
      from: 'Bandra West',
      to: 'Andheri East',
      date: '2024-01-15',
      fare: 85,
      driver: 'Ramesh Sharma',
      rating: 5,
    },
    {
      id: '2',
      from: 'Juhu Beach',
      to: 'Linking Road',
      date: '2024-01-10',
      fare: 65,
      driver: 'Amit Joshi',
      rating: 4,
    }
  ]);

  const handleBookRide = (driver: any) => {
    setActiveRide({
      id: Date.now().toString(),
      driver,
      pickup,
      destination,
      status: 'confirmed',
      estimatedTime: '12 mins',
    });
  };

  const handleCancelRide = () => {
    setActiveRide(null);
  };

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
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input
                    id="pickup"
                    placeholder="Enter pickup location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {pickup && destination && (
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
                          <p className="text-lg font-bold text-accent">₹{driver.fare}</p>
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
                  <span className="font-semibold text-secondary">₹340</span>
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