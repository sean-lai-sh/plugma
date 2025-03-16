import React from "react";
 import { Button } from "@/components/ui/button";
 import { Users, TrendingUp, DollarSign } from "lucide-react";
 
 interface ChartToggleProps {
   selectedChart: 'attendees' | 'engagement' | 'revenue';
   onChange: (chart: 'attendees' | 'engagement' | 'revenue') => void;
 }
 
 export const ChartToggle: React.FC<ChartToggleProps> = ({ 
   selectedChart, 
   onChange 
 }) => {
   return (
     <div className="flex items-center space-x-2 rounded-md bg-muted p-1">
       <Button
         variant={selectedChart === 'attendees' ? 'default' : 'ghost'}
         size="sm"
         onClick={() => onChange('attendees')}
         className="h-8 gap-1"
       >
         <Users className="h-4 w-4" />
         <span className="hidden sm:inline">Attendees</span>
       </Button>
       <Button
         variant={selectedChart === 'engagement' ? 'default' : 'ghost'}
         size="sm"
         onClick={() => onChange('engagement')}
         className="h-8 gap-1"
       >
         <TrendingUp className="h-4 w-4" />
         <span className="hidden sm:inline">Engagement</span>
       </Button>
       <Button
         variant={selectedChart === 'revenue' ? 'default' : 'ghost'}
         size="sm"
         onClick={() => onChange('revenue')}
         className="h-8 gap-1"
       >
         <DollarSign className="h-4 w-4" />
         <span className="hidden sm:inline">Revenue</span>
       </Button>
     </div>
   );
 };