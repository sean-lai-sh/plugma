import React from "react";
 import { Card, CardContent } from "@/components/ui/card";
 import { LucideIcon } from "lucide-react";
 
 interface AnalyticsCardProps {
   label: string;
   value: string | number;
   change: string;
   icon: LucideIcon;
   color: string;
 }
 
 export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
   label,
   value,
   change,
   icon: Icon,
   color,
 }) => {
   const isPositive = !change.startsWith('-');
   
   return (
     <Card>
       <CardContent className="p-6">
         <div className="flex items-center justify-between">
           <div 
             className={`${color} rounded-lg p-2 text-white`}
           >
             <Icon className="h-5 w-5" />
           </div>
           <span 
             className={`text-sm font-medium ${
               isPositive ? 'text-green-600' : 'text-red-600'
             }`}
           >
             {change}
           </span>
         </div>
         <div className="mt-4">
           <h3 className="text-3xl font-bold">{value}</h3>
           <p className="text-sm text-muted-foreground">{label}</p>
         </div>
       </CardContent>
     </Card>
   );
 };