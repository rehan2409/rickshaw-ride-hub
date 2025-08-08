import { useState } from 'react';
import { Users, Car, DollarSign, TrendingUp, Eye, UserX, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AdminDashboard() {
  const [stats] = useState({
    totalUsers: 1847,
    totalDrivers: 156,
    activeRides: 28,
    totalRevenue: 18520,
    todayRides: 45,
    completionRate: 96.8,
  });

  const [users] = useState([
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      role: 'passenger',
      rides: 23,
      status: 'active',
      joinDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      role: 'driver',
      rides: 156,
      status: 'active',
      joinDate: '2023-12-05',
    },
    {
      id: '3',
      name: 'Amit Singh',
      email: 'amit@example.com',
      role: 'passenger',
      rides: 8,
      status: 'inactive',
      joinDate: '2024-01-20',
    }
  ]);

  const [drivers] = useState([
    {
      id: '1',
      name: 'Ravi Patil',
      vehicle: 'MH 08 RT 1234',
      rating: 4.8,
      totalRides: 156,
      earnings: 12450,
      status: 'online',
      location: 'Railway Station',
    },
    {
      id: '2',
      name: 'Santosh Sawant',
      vehicle: 'MH 08 RT 5678',
      rating: 4.6,
      totalRides: 89,
      earnings: 8320,
      status: 'offline',
      location: 'Bus Stand',
    }
  ]);

  const [recentRides] = useState([
    {
      id: '1',
      passenger: 'Priya Patil',
      driver: 'Ravi Patil',
      from: 'Railway Station',
      to: 'Ganpatipule Beach',
      fare: 195,
      status: 'completed',
      time: '2:30 PM',
    },
    {
      id: '2',
      passenger: 'Amit Kulkarni',
      driver: 'Santosh Sawant',
      from: 'Market Road',
      to: 'Ratnadurg Fort',
      fare: 60,
      status: 'in-progress',
      time: '2:45 PM',
    }
  ]);

  const handleToggleUserStatus = (userId: string, currentStatus: string) => {
    console.log(`Toggle user ${userId} from ${currentStatus}`);
    // In real app, would call API to update user status
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</span>
                <Users className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Drivers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stats.totalDrivers}</span>
                <Car className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Rides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stats.activeRides}</span>
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Live tracking</p>
            </CardContent>
          </Card>

          <Card className="shadow-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</span>
                <DollarSign className="h-5 w-5 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="rides">Rides</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage passengers and their accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.filter(u => u.role === 'passenger').map((user) => (
                    <div key={user.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                      <div>
                        <h4 className="font-semibold">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">Joined: {user.joinDate} • {user.rides} rides</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleUserStatus(user.id, user.status)}
                        >
                          <UserX className="h-4 w-4 mr-2" />
                          {user.status === 'active' ? 'Suspend' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drivers" className="space-y-6">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Driver Management</CardTitle>
                <CardDescription>Monitor and manage driver accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {drivers.map((driver) => (
                    <div key={driver.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                      <div>
                        <h4 className="font-semibold">{driver.name}</h4>
                        <p className="text-sm text-muted-foreground">{driver.vehicle} • {driver.location}</p>
                        <p className="text-xs text-muted-foreground">
                          {driver.totalRides} rides • ₹{driver.earnings.toLocaleString()} earned
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={driver.status === 'online' ? 'default' : 'secondary'}>
                          {driver.status}
                        </Badge>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">{driver.rating}</span>
                            <span className="text-xs text-muted-foreground">★</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rides" className="space-y-6">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Recent Rides</CardTitle>
                <CardDescription>Monitor all ride activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRides.map((ride) => (
                    <div key={ride.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                      <div>
                        <h4 className="font-semibold">{ride.passenger} → {ride.driver}</h4>
                        <p className="text-sm text-muted-foreground">{ride.from} to {ride.to}</p>
                        <p className="text-xs text-muted-foreground">{ride.time}</p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={ride.status === 'completed' ? 'default' : 'secondary'}
                          className="mb-2"
                        >
                          {ride.status}
                        </Badge>
                        <p className="font-semibold text-accent">₹{ride.fare}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle>Today's Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rides Today</span>
                    <span className="font-bold text-primary">{stats.todayRides}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Completion Rate</span>
                    <span className="font-bold text-secondary">{stats.completionRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Avg. Fare</span>
                    <span className="font-bold text-accent">₹85</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Active Drivers</span>
                    <Badge className="bg-secondary text-secondary-foreground">38 online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Server Status</span>
                    <Badge className="bg-secondary text-secondary-foreground">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium">120ms</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}