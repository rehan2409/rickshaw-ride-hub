export type RideStatus = 'pending' | 'accepted' | 'started' | 'completed' | 'cancelled';

export interface Location {
  lat: number;
  lng: number;
  address: string;
  landmark?: string;
}

export interface Ride {
  id: string;
  passengerId: string;
  passengerName: string;
  passengerPhone: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverRating?: number;
  pickup: Location;
  destination: Location;
  distance: number;
  duration: number;
  fare: number;
  status: RideStatus;
  requestedAt: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  paymentMethod: 'cash' | 'upi' | 'card';
  paymentStatus: 'pending' | 'completed';
  rating?: number;
  feedback?: string;
}

export interface RideRequest {
  pickup: Location;
  destination: Location;
  passengerNotes?: string;
  paymentMethod: 'cash' | 'upi' | 'card';
}

export interface RideStats {
  totalRides: number;
  completedRides: number;
  cancelledRides: number;
  totalEarnings: number;
  averageRating: number;
  totalDistance: number;
}