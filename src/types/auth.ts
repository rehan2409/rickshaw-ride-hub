export type UserRole = 'passenger' | 'driver' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Driver extends User {
  role: 'driver';
  licenseNumber: string;
  vehicleNumber: string;
  vehicleType: string;
  isAvailable: boolean;
  rating: number;
  totalRides: number;
  earnings: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface Passenger extends User {
  role: 'passenger';
  totalRides: number;
  favoriteLocations: string[];
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface SignupData extends LoginCredentials {
  name: string;
  phone: string;
  licenseNumber?: string;
  vehicleNumber?: string;
  vehicleType?: string;
}