import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface EventDescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const EventDescriptionField = ({ value, onChange }: EventDescriptionFieldProps) => {
  return (
    <div className="flex items-start bg-white p-5 rounded-lg shadow-sm">
      <div className="text-gray-400 mr-4 mt-1">📝</div>
      <div className="flex flex-col flex-1">
        <Textarea 
          className="border-none p-0 min-h-0 focus-visible:ring-0 resize-none"
          placeholder="Add Description"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EventDescriptionField;