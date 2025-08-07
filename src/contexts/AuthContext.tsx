import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, LoginCredentials, SignupData } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('rickshaw_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in real app, this would be an API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock user data based on role
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        name: credentials.role === 'admin' ? 'Admin User' : 
              credentials.role === 'driver' ? 'Driver Kumar' : 'Passenger Singh',
        phone: '+91 98765 43210',
        role: credentials.role,
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem('rickshaw_user', JSON.stringify(mockUser));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: data.role,
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      setUser(newUser);
      localStorage.setItem('rickshaw_user', JSON.stringify(newUser));
      
      toast({
        title: "Account Created",
        description: "Welcome to RickshawGo!",
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rickshaw_user');
    toast({
      title: "Logged Out",
      description: "See you again soon!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}