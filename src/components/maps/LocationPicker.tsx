import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';

// Ratnagiri famous locations
const RATNAGIRI_LOCATIONS: { name: string; coords: [number, number]; type: string }[] = [
  { name: 'Ratnagiri Bus Stand', coords: [73.3004, 16.9944], type: 'transport' },
  { name: 'Ratnagiri Railway Station', coords: [73.3092, 16.9854], type: 'transport' },
  { name: 'Ganpatipule Beach', coords: [73.2602, 17.1377], type: 'tourist' },
  { name: 'Ratnadurg Fort', coords: [73.2899, 16.9778], type: 'tourist' },
  { name: 'Jaigad Fort', coords: [73.3186, 17.0044], type: 'tourist' },
  { name: 'Mandavi Beach', coords: [73.2543, 16.9654], type: 'beach' },
  { name: 'Ratnagiri Market', coords: [73.3015, 16.9934], type: 'market' },
  { name: 'Government Hospital', coords: [73.3025, 16.9924], type: 'hospital' },
  { name: 'Swami Swaroopanand Saraswati Chowk', coords: [73.3005, 16.9940], type: 'landmark' },
  { name: 'Thibaw Palace', coords: [73.3020, 16.9950], type: 'tourist' },
];

interface LocationPickerProps {
  onLocationSelect: (location: { name: string; coords: [number, number] }) => void;
  placeholder?: string;
  selectedLocation?: { name: string; coords: [number, number] } | null;
}

export function LocationPicker({ onLocationSelect, placeholder = "Search location in Ratnagiri", selectedLocation }: LocationPickerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(RATNAGIRI_LOCATIONS);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    // Check if user has provided Mapbox token
    const token = localStorage.getItem('mapbox_token');
    if (token) {
      setMapboxToken(token);
      initializeMap(token);
    }
  }, []);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [73.3004, 16.9944], // Ratnagiri center
      zoom: 13,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add click event to map
    map.current.on('click', (e) => {
      const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      addMarker(coords);
      onLocationSelect({ name: `Custom Location (${coords[1].toFixed(4)}, ${coords[0].toFixed(4)})`, coords });
    });

    // Add markers for famous locations
    RATNAGIRI_LOCATIONS.forEach(location => {
      const el = document.createElement('div');
      el.className = 'w-3 h-3 bg-primary rounded-full border-2 border-white shadow-lg';
      
      new mapboxgl.Marker(el)
        .setLngLat(location.coords)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3 class="font-semibold">${location.name}</h3>`))
        .addTo(map.current!);
    });
  };

  const addMarker = (coords: [number, number]) => {
    if (!map.current) return;

    if (marker.current) {
      marker.current.remove();
    }

    const el = document.createElement('div');
    el.className = 'w-6 h-6 bg-accent rounded-full border-4 border-white shadow-lg animate-pulse';

    marker.current = new mapboxgl.Marker(el)
      .setLngLat(coords)
      .addTo(map.current);

    map.current.flyTo({ center: coords, zoom: 15 });
  };

  const handleLocationSelect = (location: typeof RATNAGIRI_LOCATIONS[0]) => {
    onLocationSelect(location);
    setSearchQuery(location.name);
    setShowSuggestions(false);
    addMarker(location.coords);
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

  if (!mapboxToken) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Map Setup Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            To use the map feature, please enter your Mapbox access token. You can get one for free at{' '}
            <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              mapbox.com
            </a>
          </p>
          <Input
            placeholder="Enter Mapbox access token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <Button 
            onClick={() => {
              localStorage.setItem('mapbox_token', mapboxToken);
              initializeMap(mapboxToken);
            }}
            disabled={!mapboxToken}
            className="w-full"
          >
            Initialize Map
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
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

      <div 
        ref={mapContainer} 
        className="w-full h-64 rounded-lg border shadow-sm"
        style={{ minHeight: '300px' }}
      />

      <p className="text-xs text-muted-foreground">
        Click on the map or search for locations in Ratnagiri to set your pickup/destination
      </p>
    </div>
  );
}