import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

interface EventLocationFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const EXAMPLE_LOCATIONS = [
  { label: "New York City", value: "New York City, NY" },
  { label: "Los Angeles", value: "Los Angeles, CA" },
  { label: "Chicago", value: "Chicago, IL" },
  { label: "San Francisco", value: "San Francisco, CA" },
  { label: "Austin", value: "Austin, TX" },
  { label: "Boston", value: "Boston, MA" },
  { label: "Zoom Meeting", value: "Virtual (Zoom)" },
  { label: "Microsoft Teams", value: "Virtual (Teams)" },
  { label: "Google Meet", value: "Virtual (Google Meet)" },
];

const EventLocationField = ({ value, onChange }: EventLocationFieldProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setSearchTerm(newValue);
    
    if (newValue.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleLocationSelect = (selectedLocation: string) => {
    onChange(selectedLocation);
    setOpen(false);
  };

  const filteredLocations = EXAMPLE_LOCATIONS.filter(location => 
    location.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex items-center bg-white p-5 rounded-lg shadow-sm">
      <MapPin className="text-gray-400 mr-4" size={20} />
      <div className="flex flex-col flex-1 relative">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="w-full">
              <Input 
                className="border-none p-0 h-auto focus-visible:ring-0"
                placeholder="Add Event Location"
                value={value}
                onChange={handleInputChange}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-full" align="start">
            <Command>
              <CommandInput placeholder="Search location..." />
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {filteredLocations.map((location) => (
                  <CommandItem
                    key={location.value}
                    onSelect={() => handleLocationSelect(location.value)}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{location.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <span className="text-xs text-gray-400 mt-1">Offline location or virtual link</span>
      </div>
    </div>
  );
};

export default EventLocationField;