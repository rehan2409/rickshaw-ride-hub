import { useState } from 'react';
import { Car, DollarSign, Star, ToggleLeft, ToggleRight, MapPin, Phone, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';

export function DriverDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeRide, setActiveRide] = useState<any>(null);
  const [rideRequests] = useState([
    {
      id: '1',
      passengerName: 'Priya Sharma',
      pickup: 'Bandra West Station',
      destination: 'Linking Road',
      distance: '3.2 km',
      fare: 65,
      estimatedTime: '15 mins',
    },
    {
      id: '2',
      passengerName: 'Rahul Gupta', 
      pickup: 'Juhu Beach',
      destination: 'Andheri East',
      distance: '5.1 km',
      fare: 85,
      estimatedTime: '22 mins',
    }
  ]);

  const [todayStats] = useState({
    earnings: 1250,
    rides: 8,
    rating: 4.8,
    onlineTime: '6h 30m',
  });

  const [rideHistory] = useState([
    {
      id: '1',
      passenger: 'Amit Kumar',
      from: 'Andheri',
      to: 'Bandra',
      fare: 75,
      time: '2:30 PM',
      rating: 5,
    },
    {
      id: '2',
      passenger: 'Sneha Patel',
      from: 'Juhu',
      to: 'Vile Parle',
      fare: 45,
      time: '1:15 PM',
      rating: 4,
    }
  ]);

  const handleAcceptRide = (ride: any) => {
    setActiveRide({ ...ride, status: 'accepted' });
  };

  const handleRejectRide = (rideId: string) => {
    // In real app, would remove from requests
    console.log('Rejected ride:', rideId);
  };

  const handleCompleteRide = () => {
    setActiveRide(null);
    // Would update earnings, stats, etc.
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
                    <Car className="h-5 w-5 text-secondary" />
                    Active Ride
                  </CardTitle>
                  <Badge className="bg-secondary text-secondary-foreground">
                    In Progress
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{activeRide.passengerName}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="font-medium">{activeRide.pickup}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span className="font-medium">{activeRide.destination}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/10 rounded-lg p-3 text-center">
                    <p className="text-secondary font-semibold text-lg">₹{activeRide.fare}</p>
                    <p className="text-sm text-muted-foreground">Trip Fare</p>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-3 text-center">
                    <p className="text-accent font-semibold text-lg">{activeRide.distance}</p>
                    <p className="text-sm text-muted-foreground">Distance</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Passenger
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Navigation className="h-4 w-4 mr-2" />
                    Navigate
                  </Button>
                </div>

                <Button 
                  variant="driver" 
                  className="w-full"
                  onClick={handleCompleteRide}
                >
                  Complete Ride
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Toggle */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-secondary" />
                    Driver Status
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAvailable(!isAvailable)}
                    className="flex items-center gap-2"
                  >
                    {isAvailable ? (
                      <>
                        <ToggleRight className="h-5 w-5 text-secondary" />
                        Online
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                        Offline
                      </>
                    )}
                  </Button>
                </CardTitle>
                <CardDescription>
                  {isAvailable ? 'You are available to receive ride requests' : 'Go online to start receiving rides'}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Ride Requests */}
            {isAvailable && (
              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle>Ride Requests</CardTitle>
                  <CardDescription>New ride requests near you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rideRequests.map((ride) => (
                    <div key={ride.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{ride.passengerName}</h4>
                          <Badge className="bg-primary/10 text-primary">₹{ride.fare}</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>{ride.pickup}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                            <span>{ride.destination}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{ride.distance} • {ride.estimatedTime}</span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button 
                            variant="driver" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleAcceptRide(ride)}
                          >
                            Accept
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleRejectRide(ride.id)}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recent Rides */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Today's Rides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {rideHistory.map((ride) => (
                  <div key={ride.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                    <div>
                      <h4 className="font-medium">{ride.passenger}</h4>
                      <p className="text-sm text-muted-foreground">{ride.from} → {ride.to}</p>
                      <p className="text-xs text-muted-foreground">{ride.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-secondary">₹{ride.fare}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-sm">{ride.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Today's Stats */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Earnings</span>
                  <span className="font-bold text-secondary text-lg">₹{todayStats.earnings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rides Completed</span>
                  <span className="font-semibold">{todayStats.rides}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold">{todayStats.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Online Time</span>
                  <span className="font-semibold">{todayStats.onlineTime}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  View Earnings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Update Location
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Car className="h-4 w-4 mr-2" />
                  Vehicle Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}