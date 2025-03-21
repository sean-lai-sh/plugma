import React from "react";
import { Ticket, Users } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "../ui/input";

interface EventOptionsFieldsProps {
  requireApproval: boolean;
  onRequireApprovalChange: (value: boolean) => void;
  capacity?: number;
  onCapacityChange: (value: number | undefined) => void;
}

const EventOptionsFields = ({ 
  requireApproval, 
  onRequireApprovalChange 
}: EventOptionsFieldsProps) => {
  return (
    <div>
      <h3 className="text-gray-500 mb-4 font-medium">Event Options</h3>
      
      {/* Tickets FUTURE FEATURE */}
      {/* <div className="flex items-center justify-between bg-white p-5 rounded-lg shadow-sm mb-4">
        <div className="flex items-center">
          <Ticket className="text-gray-400 mr-4" size={20} />
          <span>Tickets</span>
        </div>
        <div>
          <span className="text-gray-500 mr-2">Free</span>
          <button className="text-gray-400">✏️</button>
        </div>
      </div> */}

      {/* Require Approval */}
      <div className="flex items-center justify-between bg-white p-5 rounded-lg shadow-sm mb-4">
        <div className="flex items-center">
          <Users className="text-gray-400 mr-4" size={20} />
          <span>Require Approval</span>
        </div>
        <Switch
          checked={requireApproval}
          onCheckedChange={onRequireApprovalChange}
        />
      </div>

      {/* Capacity */}
      <div className="flex items-center justify-between bg-white p-5 rounded-lg shadow-sm">
        <div className="flex items-center">
          <Users className="text-gray-400 mr-4" size={20} />
          <span>Capacity</span>
        </div>
        <div>
          <Input type='number' className="text-gray-500" defaultValue={0} min="0" />
        </div>
      </div>
    </div>
  );
};

export default EventOptionsFields;