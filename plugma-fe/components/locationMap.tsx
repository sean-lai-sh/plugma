'use client';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LocationMapProps {
  locationName: string;
  address: string;
  className?: string;
  mapHeight?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  locationName,
  address,
  className = "",
  mapHeight = "400px"
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [coordinates, setCoordinates] = useState<[number, number]>([-74.006, 40.7128]); // Default to NYC
  const [fallbackName, setFallbackName] = useState<string | null>(null);
  const [fallbackAddress, setFallbackAddress] = useState<string | null>(null);


  // This function would be replaced with a real geocoding service in production
  const getCoordinatesFromAddress = async (name:string, address: string): Promise<{
    coords: [number, number],
    name: string,
    fullAddress: string
  }> => {
    const encoded = encodeURIComponent(address);
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?` +
      new URLSearchParams({
        access_token: mapboxToken,
        proximity: '-73.9851,40.7589',
        country: 'US',
        types: 'address,poi',
        limit: '1'
      });
  
    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();
  
      if (data?.features?.length > 0) {
        const [lng, lat] = data.features[0].center;
        return {
          coords: [lng, lat],
          name: name,
          fullAddress: address
        };
      } else {
        throw new Error("No results");
      }
    } catch (error) {
      console.warn('Geocoding failed, using fallback location:', error);
      return {
        coords: [-73.9928, 40.7442],
        name: "Nowhere",
        fullAddress: "112 W 25th St, Manhattan, NY 10001"
      };
    }
  };

  useEffect(() => {
    // In a real app, this could come from environment variables or Supabase secrets
    const storedToken = localStorage.getItem('mapbox_token');
    if (storedToken) {
      setMapboxToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const initializeMap = async () => {
        if (!mapContainer.current || !mapboxToken) return;
        setIsLoading(true);

        try {
            const { coords, name, fullAddress } = await getCoordinatesFromAddress(locationName, address);
            setCoordinates(coords);
            setFallbackName(name);
            setFallbackAddress(fullAddress);

            // Map and marker setup
            mapboxgl.accessToken = mapboxToken;

            if (map.current) map.current.remove();

            map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: coords,
            zoom: 14,
            });

            map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

            new mapboxgl.Marker({ color: '#4F46E5' })
            .setLngLat(coords)
            .addTo(map.current);

            new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 25
            })
            .setLngLat(coords)
            .setHTML(`<strong>${name}</strong>`)
            .addTo(map.current);

            map.current.on('load', () => {
            setIsLoading(false);
            });
        } catch (error) {
            console.error('Failed to initialize map:', error);
            setIsLoading(false);
        }
    }

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const handleSaveToken = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('mapbox_token') as string;
    
    if (token) {
      localStorage.setItem('mapbox_token', token);
      setMapboxToken(token);
    }
  };

  if (!mapboxToken) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Mapbox API Key Required</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          To display the interactive map, please enter your Mapbox public token.
          You can get this from your Mapbox account dashboard.
        </p>
        <form onSubmit={handleSaveToken} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="mapbox_token" className="text-sm font-medium">
              Mapbox Public Token
            </label>
            <input
              id="mapbox_token"
              name="mapbox_token"
              type="text"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="pk.eyJ1Ijoi..."
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Save Token
          </button>
        </form>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
        <div>
            <h3 className="font-medium">{fallbackName ?? locationName}</h3>
            <p className="text-muted-foreground text-sm">{fallbackAddress ?? address}</p>
        </div>
      </div>
      
      <div className="relative rounded-lg overflow-hidden" style={{ height: mapHeight }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <Skeleton className="h-full w-full absolute" />
            <div className="text-center z-20">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Loading map...</p>
            </div>
          </div>
        )}
        <div 
          ref={mapContainer} 
          className="w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default LocationMap;