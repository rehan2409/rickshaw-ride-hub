import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock } from 'lucide-react';
import { COMMON_ROUTES } from '@/utils/pricing';

interface CommonRoutesProps {
  onRouteSelect: (pickup: string, destination: string) => void;
}

export function CommonRoutes({ onRouteSelect }: CommonRoutesProps) {
  return (
    <Card className="shadow-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Popular Routes in Ratnagiri
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {COMMON_ROUTES.map((route, index) => (
          <div 
            key={index} 
            className="border rounded-lg p-3 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="font-medium text-sm">{route.from} → {route.to}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                  <span>{route.distance}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{route.estimatedTime}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-accent">₹{route.estimatedFare}</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-1"
                  onClick={() => onRouteSelect(route.from, route.to)}
                >
                  Select
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}