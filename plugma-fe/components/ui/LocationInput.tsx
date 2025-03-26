import * as React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export interface Location {
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationInputProps {
  onLocationSelect?: (location: Location) => void;
}

export function LocationInput({ onLocationSelect }: LocationInputProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const searchLocations = React.useCallback(async (search: string) => {
    if (search.length < 2) {
      setLocations([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}&limit=5`,
        {
          headers: {
            'Accept-Language': 'en',
          },
        }
      );
      const data = await response.json();
      setLocations(data || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = React.useCallback(
    React.useMemo(
      () =>
        debounce((search: string) => {
          searchLocations(search);
        }, 300),
      [searchLocations]
    ),
    []
  );

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel?.();
    };
  }, [debouncedSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? (
            <span className="truncate">{value}</span>
          ) : (
            <span className="text-muted-foreground">Search for a location...</span>
          )}
          <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start" sideOffset={4}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search for a location..."
            value={value}
            onValueChange={(search) => {
              setValue(search);
              debouncedSearch(search);
            }}
            className="h-9"
          />
          <CommandList>
            {loading && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Loading...
              </div>
            )}
            {!loading && locations.length === 0 && value.length >= 2 && (
              <CommandEmpty>No location found.</CommandEmpty>
            )}
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={`${location.lat}-${location.lon}`}
                  value={location.display_name}
                  onSelect={() => {
                    setValue(location.display_name);
                    setOpen(false);
                    onLocationSelect?.(location);
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">{location.display_name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
) {
  let timeout: NodeJS.Timeout;
  
  const debouncedFn = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  debouncedFn.cancel = () => {
    clearTimeout(timeout);
  };

  return debouncedFn;
}