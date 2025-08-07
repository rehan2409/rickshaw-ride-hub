import { useAuth } from '@/contexts/AuthContext';
import { LandingPage } from './LandingPage';
import { PassengerDashboard } from './PassengerDashboard';
import { DriverDashboard } from './DriverDashboard';
import { AdminDashboard } from './AdminDashboard';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <LandingPage />;
  }

  switch (user.role) {
    case 'passenger':
      return <PassengerDashboard />;
    case 'driver':
      return <DriverDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <LandingPage />;
  }
};

export default Index;
