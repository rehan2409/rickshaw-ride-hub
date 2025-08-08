import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation, Loader2 } from 'lucide-react';

// Alternative map using OpenStreetMap (no API key required)
const RATNAGIRI_LOCATIONS = [
  { name: 'Ratnagiri Bus Stand', coords: [73.3004, 16.9944] as [number, number], type: 'transport' },
  { name: 'Ratnagiri Railway Station', coords: [73.3092, 16.9854] as [number, number], type: 'transport' },
  { name: 'Ganpatipule Beach', coords: [73.2602, 17.1377] as [number, number], type: 'tourist' },
  { name: 'Ratnadurg Fort', coords: [73.2899, 16.9778] as [number, number], type: 'tourist' },
  { name: 'Jaigad Fort', coords: [73.3186, 17.0044] as [number, number], type: 'tourist' },
  { name: 'Mandavi Beach', coords: [73.2543, 16.9654] as [number, number], type: 'beach' },
  { name: 'Ratnagiri Market', coords: [73.3015, 16.9934] as [number, number], type: 'market' },
  { name: 'Government Hospital', coords: [73.3025, 16.9924] as [number, number], type: 'hospital' },
  { name: 'Swami Swaroopanand Saraswati Chowk', coords: [73.3005, 16.9940] as [number, number], type: 'landmark' },
  { name: 'Thibaw Palace', coords: [73.3020, 16.9950] as [number, number], type: 'tourist' },
];

interface SimpleMapProps {
  onLocationSelect: (location: { name: string; coords: [number, number] }) => void;
  placeholder?: string;
  selectedLocation?: { name: string; coords: [number, number] } | null;
}

export function SimpleLocationPicker({ onLocationSelect, placeholder = "Search location in Ratnagiri", selectedLocation }: SimpleMapProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(RATNAGIRI_LOCATIONS);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ name: string; coords: [number, number] } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleLocationSelect = (location: typeof RATNAGIRI_LOCATIONS[0]) => {
    onLocationSelect(location);
    setSearchQuery(location.name);
    setShowSuggestions(false);
    setCurrentLocation(location);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = RATNAGIRI_LOCATIONS.filter(location =>
        location.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredLocations(RATNAGIRI_LOCATIONS);
      setShowSuggestions(false);
    }
  };

  const getCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
          // Find closest location or create a custom one
          const customLocation = {
            name: `Current Location (${coords[1].toFixed(4)}, ${coords[0].toFixed(4)})`,
            coords,
            type: 'current'
          };
          handleLocationSelect(customLocation);
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
          // Fallback to Ratnagiri center
          handleLocationSelect(RATNAGIRI_LOCATIONS[0]);
        }
      );
    } else {
      setIsLocating(false);
      handleLocationSelect(RATNAGIRI_LOCATIONS[0]);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Select Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
              />
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button 
              variant="outline" 
              onClick={getCurrentLocation}
              disabled={isLocating}
            >
              {isLocating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4" />
              )}
            </Button>
          </div>

          {showSuggestions && filteredLocations.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
              {filteredLocations.map((location, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors flex items-center gap-2"
                  onClick={() => handleLocationSelect(location)}
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="flex-1">{location.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{location.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {currentLocation && (
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">{currentLocation.name}</p>
                <p className="text-sm text-muted-foreground">
                  Coordinates: {currentLocation.coords[1].toFixed(4)}, {currentLocation.coords[0].toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            💡 <strong>Pro Tip:</strong> Use "Current Location" button to automatically detect your position, or search from popular Ratnagiri locations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}