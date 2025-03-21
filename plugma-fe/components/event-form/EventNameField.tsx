import React from "react";
import { Input } from "@/components/ui/input";

interface EventNameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const EventNameField = ({ value, onChange }: EventNameFieldProps) => {
  return (
    <div>
      <Input 
        className="text-2xl font-semibold border-none bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto py-0"
        placeholder="Event Name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default EventNameField;
