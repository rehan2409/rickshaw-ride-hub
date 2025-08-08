// Ratnagiri Auto Rickshaw Pricing Calculator
// Based on local rates in Ratnagiri, Maharashtra

export interface PricingDetails {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  totalFare: number;
  estimatedTime: string;
  distance: string;
}

// Ratnagiri auto rickshaw rates (in INR)
const PRICING_CONFIG = {
  BASE_FARE: 15, // Starting fare
  PER_KM_RATE: 12, // Rate per kilometer
  WAITING_CHARGE_PER_MIN: 1, // Waiting charges
  NIGHT_SURCHARGE: 1.5, // 50% extra between 11 PM - 6 AM
  MINIMUM_FARE: 20, // Minimum fare regardless of distance
  MAX_FARE_CAP: 200, // Maximum fare within city limits
};

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Estimate travel time based on distance and traffic conditions
function estimateTime(distanceKm: number): { minutes: number; display: string } {
  // Average speed in Ratnagiri considering traffic: 20 km/h
  const avgSpeedKmh = 20;
  const timeHours = distanceKm / avgSpeedKmh;
  const timeMinutes = Math.ceil(timeHours * 60);
  
  // Add buffer time for traffic/stops
  const totalMinutes = Math.max(5, timeMinutes + 3);
  
  return {
    minutes: totalMinutes,
    display: totalMinutes < 60 ? `${totalMinutes} mins` : `${Math.floor(totalMinutes/60)}h ${totalMinutes%60}m`
  };
}

// Check if current time is night hours
function isNightTime(): boolean {
  const hour = new Date().getHours();
  return hour >= 23 || hour < 6;
}

export function calculateFare(
  pickupCoords: [number, number],
  destinationCoords: [number, number],
  waitingMinutes: number = 0
): PricingDetails {
  const [pickupLng, pickupLat] = pickupCoords;
  const [destLng, destLat] = destinationCoords;
  
  // Calculate distance
  const distanceKm = calculateDistance(pickupLat, pickupLng, destLat, destLng);
  
  // Calculate time
  const timeEstimate = estimateTime(distanceKm);
  
  // Calculate fare components
  let baseFare = PRICING_CONFIG.BASE_FARE;
  let distanceFare = distanceKm * PRICING_CONFIG.PER_KM_RATE;
  let timeFare = waitingMinutes * PRICING_CONFIG.WAITING_CHARGE_PER_MIN;
  
  let totalFare = baseFare + distanceFare + timeFare;
  
  // Apply night surcharge if applicable
  if (isNightTime()) {
    totalFare *= PRICING_CONFIG.NIGHT_SURCHARGE;
  }
  
  // Apply minimum fare
  totalFare = Math.max(totalFare, PRICING_CONFIG.MINIMUM_FARE);
  
  // Apply maximum fare cap
  totalFare = Math.min(totalFare, PRICING_CONFIG.MAX_FARE_CAP);
  
  // Round to nearest rupee
  totalFare = Math.round(totalFare);
  
  return {
    baseFare: Math.round(baseFare),
    distanceFare: Math.round(distanceFare),
    timeFare: Math.round(timeFare),
    totalFare,
    estimatedTime: timeEstimate.display,
    distance: `${distanceKm.toFixed(1)} km`,
  };
}

// Get fare estimate without exact coordinates (for display purposes)
export function getEstimatedFare(distanceKm: number): number {
  let fare = PRICING_CONFIG.BASE_FARE + (distanceKm * PRICING_CONFIG.PER_KM_RATE);
  
  if (isNightTime()) {
    fare *= PRICING_CONFIG.NIGHT_SURCHARGE;
  }
  
  fare = Math.max(fare, PRICING_CONFIG.MINIMUM_FARE);
  fare = Math.min(fare, PRICING_CONFIG.MAX_FARE_CAP);
  
  return Math.round(fare);
}

// Common routes in Ratnagiri with pre-calculated fares
export const COMMON_ROUTES = [
  {
    from: 'Ratnagiri Railway Station',
    to: 'Ganpatipule Beach',
    distance: '15.2 km',
    estimatedFare: 195,
    estimatedTime: '45 mins'
  },
  {
    from: 'Ratnagiri Bus Stand',
    to: 'Ratnadurg Fort',
    distance: '3.8 km',
    estimatedFare: 60,
    estimatedTime: '12 mins'
  },
  {
    from: 'Ratnagiri Market',
    to: 'Mandavi Beach',
    distance: '6.2 km',
    estimatedFare: 85,
    estimatedTime: '18 mins'
  },
  {
    from: 'Railway Station',
    to: 'Thibaw Palace',
    distance: '2.1 km',
    estimatedFare: 40,
    estimatedTime: '8 mins'
  }
];